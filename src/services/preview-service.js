/**
 * 预览服务
 * 负责管理 iframe 预览、Mock 数据和错误处理
 */

/**
 * 将 Vue SFC 代码包装为可预览的 HTML
 * @param {string} sfcCode - Vue SFC 代码
 * @param {object} mockData - 模拟数据
 * @returns {string} 完整的 HTML 内容
 */
export function buildPreviewHTML(sfcCode, mockData = null) {
  const huiCss = '/hui2.43.2/theme/index.css'
  const huiJs = '/hui2.43.2/lib/hui.min.js'
  const vueJs = 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js'
  const elementCss = 'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
  const elementJs = 'https://unpkg.com/element-ui/lib/index.js'
  const axiosJs = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'

  // 将 SFC 转换为可执行的 JS 代码
  const componentScript = convertSFCToScript(sfcCode, mockData)

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面预览</title>
  <link rel="stylesheet" href="${huiCss}">
  <link rel="stylesheet" href="${elementCss}">
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: #f5f7fa;
    }
    #app {
      min-height: 100vh;
    }
    
    /* Mock 数据容器 */
    window.MOCK_DATA = ${JSON.stringify(mockData)};
    window.MOCK_DELAY = 300;
  </style>
</head>
<body>
  <div id="app"></div>
  
  <script src="${vueJs}"><\/script>
  <script src="${elementJs}"><\/script>
  <script src="${huiJs}"><\/script>
  <script src="${axiosJs}"><\/script>
  
  <script>
    // Mock Axios 拦截器
    const originalGet = axios.get;
    const originalPost = axios.post;
    
    axios.get = function(url, config) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (window.MOCK_DATA && url.match(/list|query|search/i)) {
            console.log('[Mock] GET', url, window.MOCK_DATA);
            resolve({
              data: window.MOCK_DATA,
              status: 200,
              headers: {}
            });
          } else {
            reject(new Error('Mock data not set for URL: ' + url));
          }
        }, window.MOCK_DELAY);
      });
    };
    
    axios.post = function(url, data, config) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (window.MOCK_DATA) {
            console.log('[Mock] POST', url, window.MOCK_DATA);
            resolve({
              data: window.MOCK_DATA,
              status: 200,
              headers: {}
            });
          } else {
            reject(new Error('Mock data not set for URL: ' + url));
          }
        }, window.MOCK_DELAY);
      });
    };
    
    // 错误处理
    window.addEventListener('error', function(e) {
      console.error('[Preview Error]', e.error);
      if (window.parent) {
        window.parent.postMessage({
          type: 'preview-error',
          message: e.error.message,
          stack: e.error.stack
        }, '*');
      }
    });
    
    // 注入组件代码
    ${componentScript}
    
    // 自动挂载
    if (window.PreviewComponent) {
      new Vue({
        render: h => h(window.PreviewComponent)
      }).$mount('#app');
      
      if (window.parent) {
        window.parent.postMessage({
          type: 'preview-ready',
          success: true
        }, '*');
      }
    } else {
      console.error('[Preview] PreviewComponent not found');
    }
  </script>
</body>
</html>`
}

/**
 * 将 Vue SFC 代码转换为可执行的脚本
 * @param {string} sfcCode - Vue SFC 代码
 * @param {object} mockData - Mock 数据
 * @returns {string} 可执行的 JS 代码
 */
function convertSFCToScript(sfcCode, mockData) {
  // 简单的 SFC 解析（生产环境应使用 @vue/compiler-sfc）
  const templateMatch = sfcCode.match(/<template>([\s\S]*?)<\/template>/)
  const scriptMatch = sfcCode.match(/<script>([\s\S]*?)<\/script>/)
  const styleMatch = sfcCode.match(/<style[^>]*>([\s\S]*?)<\/style>/)

  if (!scriptMatch) {
    throw new Error('未找到 <script> 标签')
  }

  let scriptContent = scriptMatch[1]

  // 提取 export default 内容
  const exportMatch = scriptContent.match(/export\s+default\s+({[\s\S]*})/s)
  if (!exportMatch) {
    throw new Error('未找到 export default')
  }

  const componentOptions = exportMatch[1]

  // 注入 mock 数据
  if (mockData) {
    const mockDataStr = JSON.stringify(mockData)
    scriptContent = scriptContent.replace(
      /created\s*\(\)/,
      `created() {
        // 注入 mock 数据
        if (this.fetchData) {
          this.mockResponse = ${mockDataStr};
        }
      }`
    )
  }

  // 构建组件对象
  return `
    (function() {
      ${scriptContent.replace(/export\s+default/, 'const componentOptions =')}
      
      // 如果有 template，添加到组件选项
      ${templateMatch ? `componentOptions.template = ${JSON.stringify(templateMatch[1])};` : ''}
      
      // 注册为全局组件
      window.PreviewComponent = Vue.component('PreviewComponent', componentOptions);
    })();
  `
}

/**
 * 创建预览 URL
 * @param {string} sfcCode - Vue SFC 代码
 * @param {object} mockData - Mock 数据
 * @returns {string} Blob URL
 */
export function createPreviewURL(sfcCode, mockData) {
  const html = buildPreviewHTML(sfcCode, mockData)
  const blob = new Blob([html], { type: 'text/html' })
  return URL.createObjectURL(blob)
}

/**
 * 干跑断言（验证生成的页面是否基本可用）
 * @param {string} sfcCode - Vue SFC 代码
 * @param {object} config - 页面配置
 * @returns {object} { success: boolean, errors: string[], warnings: string[] }
 */
export function dryRunAssertion(sfcCode, config) {
  const errors = []
  const warnings = []

  // 1. 检查是否有表格组件且至少有 1 列
  if (sfcCode.includes('el-table') && config.columns) {
    if (config.columns.length === 0) {
      warnings.push('表格没有配置列')
    }
    if (config.columns.length > 0) {
      // 检查是否有 id 或 key 字段（用于 row-key）
      const hasKey = config.columns.some(col => 
        col.field === 'id' || col.field === 'key'
      )
      if (!hasKey && config.columns.length > 0) {
        warnings.push('建议添加 id 或 key 字段作为 row-key')
      }
    }
  }

  // 2. 检查分页配置
  if (config.pagination) {
    if (!config.pagination.pageNo && !config.pagination.page) {
      warnings.push('未检测到分页参数')
    }
    if (!config.pagination.total && !config.dataMapping?.totalPath) {
      warnings.push('未配置总数路径')
    }
  }

  // 3. 检查 API 调用
  if (!config.api) {
    errors.push('未配置 API 接口')
  } else {
    if (!config.api.method) {
      warnings.push('API 方法未指定（默认使用 GET）')
    }
    if (!config.api.url) {
      errors.push('API URL 未配置')
    }
  }

  // 4. 检查数据映射
  if (!config.dataMapping) {
    errors.push('未配置数据映射')
  } else {
    if (!config.dataMapping.dataPath) {
      errors.push('未配置数据路径')
    }
  }

  return {
    success: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * 注入 SFC 到 iframe
 * @param {HTMLIFrameElement} iframe - Iframe 元素
 * @param {string} sfcCode - Vue SFC 代码
 * @param {object} mockData - Mock 数据
 */
export function injectSFCToIframe(iframe, sfcCode, mockData) {
  if (!iframe || !sfcCode) {
    throw new Error('Invalid parameters')
  }

  const html = buildPreviewHTML(sfcCode, mockData)
  const doc = iframe.contentWindow.document

  doc.open()
  doc.write(html)
  doc.close()
}

/**
 * 监听 iframe 消息
 * @param {Function} callback - 消息回调函数
 * @returns {Function} 清理函数
 */
export function setupIframeMessageListener(callback) {
  function handler(event) {
    // 验证消息来源（可选，根据实际需求）
    if (event.data && typeof event.data === 'object') {
      callback(event.data)
    }
  }

  window.addEventListener('message', handler)

  // 返回清理函数
  return () => {
    window.removeEventListener('message', handler)
  }
}

