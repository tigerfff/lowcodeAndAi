/**
 * 预览管理器
 * 负责管理 iframe 预览环境，包括通信、更新、生命周期等
 */

/**
 * 预览管理器类
 */
export class PreviewManager {
  constructor() {
    this.iframe = null
    this.iframeWindow = null
    this.messageQueue = []
    this.isIframeReady = false
    this.messageHandlers = new Map()
    
    // 绑定消息处理器
    this.handleMessage = this.handleMessage.bind(this)
  }

  /**
   * 初始化预览管理器
   * @param {HTMLIFrameElement} iframeElement - iframe 元素
   */
  init(iframeElement) {
    this.iframe = iframeElement
    this.iframeWindow = iframeElement.contentWindow

    // 监听 iframe 加载
    this.iframe.addEventListener('load', this.handleIframeLoad.bind(this))

    // 监听来自 iframe 的消息
    window.addEventListener('message', this.handleMessage)

    console.log('PreviewManager initialized')
  }

  /**
   * 销毁预览管理器
   */
  destroy() {
    window.removeEventListener('message', this.handleMessage)
    this.iframe = null
    this.iframeWindow = null
    this.messageQueue = []
    this.isIframeReady = false
    this.messageHandlers.clear()

    console.log('PreviewManager destroyed')
  }

  /**
   * iframe 加载完成
   */
  handleIframeLoad() {
    console.log('Preview iframe loaded')
    this.isIframeReady = false // 等待 iframe 内部发送 ready 消息
  }

  /**
   * 处理来自 iframe 的消息
   * @param {MessageEvent} event - 消息事件
   */
  handleMessage(event) {
    // 安全检查：确保消息来自 iframe
    if (event.source !== this.iframeWindow) {
      return
    }

    const { type, data } = event.data

    // iframe 准备就绪
    if (type === 'iframe-ready') {
      this.isIframeReady = true
      console.log('Preview iframe ready')
      
      // 处理消息队列
      this.flushMessageQueue()
      
      // 触发 ready 回调
      this.triggerHandler('ready')
      return
    }

    // 触发对应的处理器
    this.triggerHandler(type, data)
  }

  /**
   * 发送消息到 iframe
   * @param {string} type - 消息类型
   * @param {Object} data - 消息数据
   */
  postMessage(type, data = {}) {
    const message = { type, data }

    if (!this.isIframeReady) {
      // iframe 未准备好，消息加入队列
      this.messageQueue.push(message)
      console.log('Message queued:', type)
      return
    }

    try {
      this.iframeWindow.postMessage(message, '*')
      console.log('Message sent:', type)
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  /**
   * 刷新消息队列
   */
  flushMessageQueue() {
    console.log(`Flushing ${this.messageQueue.length} queued messages`)
    
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()
      this.iframeWindow.postMessage(message, '*')
    }
  }

  /**
   * 注册消息处理器
   * @param {string} type - 消息类型
   * @param {Function} handler - 处理函数
   */
  on(type, handler) {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, [])
    }
    this.messageHandlers.get(type).push(handler)
  }

  /**
   * 移除消息处理器
   * @param {string} type - 消息类型
   * @param {Function} handler - 处理函数
   */
  off(type, handler) {
    if (!this.messageHandlers.has(type)) {
      return
    }
    
    const handlers = this.messageHandlers.get(type)
    const index = handlers.indexOf(handler)
    if (index !== -1) {
      handlers.splice(index, 1)
    }
  }

  /**
   * 触发消息处理器
   * @param {string} type - 消息类型
   * @param {Object} data - 消息数据
   */
  triggerHandler(type, data) {
    if (!this.messageHandlers.has(type)) {
      return
    }

    const handlers = this.messageHandlers.get(type)
    handlers.forEach(handler => {
      try {
        handler(data)
      } catch (error) {
        console.error(`Handler error for ${type}:`, error)
      }
    })
  }

  /**
   * 更新预览配置
   * @param {Object} config - 页面配置
   */
  updatePreview(config) {
    this.postMessage('update-preview', { config })
  }

  /**
   * 更新搜索区组件
   * @param {Array} searchArea - 搜索区组件列表
   */
  updateSearchArea(searchArea) {
    this.postMessage('update-search-area', { searchArea })
  }

  /**
   * 更新操作区组件
   * @param {Array} actionArea - 操作区组件列表
   */
  updateActionArea(actionArea) {
    this.postMessage('update-action-area', { actionArea })
  }

  /**
   * 更新表格配置
   * @param {Object} tableConfig - 表格配置
   */
  updateTable(tableConfig) {
    this.postMessage('update-table', { tableConfig })
  }

  /**
   * 高亮组件
   * @param {string} componentId - 组件 ID
   */
  highlightComponent(componentId) {
    this.postMessage('highlight-component', { componentId })
  }

  /**
   * 取消高亮
   */
  unhighlightComponent() {
    this.postMessage('unhighlight-component')
  }

  /**
   * 刷新 iframe
   */
  refresh() {
    if (this.iframe) {
      this.isIframeReady = false
      this.messageQueue = []
      this.iframe.contentWindow.location.reload()
    }
  }

  /**
   * 设置设备模式
   * @param {string} mode - 设备模式 ('desktop' | 'mobile')
   */
  setDeviceMode(mode) {
    this.postMessage('set-device-mode', { mode })
  }

  /**
   * 获取 iframe 状态
   * @returns {Object} 状态对象
   */
  getStatus() {
    return {
      isReady: this.isIframeReady,
      queueLength: this.messageQueue.length,
      handlerCount: this.messageHandlers.size
    }
  }
}

/**
 * 创建预览管理器实例
 * @returns {PreviewManager} 预览管理器实例
 */
export function createPreviewManager() {
  return new PreviewManager()
}

/**
 * 预览更新防抖
 * @param {Function} fn - 更新函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
export function debouncePreviewUpdate(fn, delay = 300) {
  let timer = null

  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/**
 * 预览更新节流
 * @param {Function} fn - 更新函数
 * @param {number} interval - 间隔时间（毫秒）
 * @returns {Function} 节流后的函数
 */
export function throttlePreviewUpdate(fn, interval = 500) {
  let lastTime = 0

  return function(...args) {
    const now = Date.now()

    if (now - lastTime >= interval) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}

