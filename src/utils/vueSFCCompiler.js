/**
 * Vue SFC 浏览器端编译工具
 * 将 Vue Single File Component 编译为可在浏览器中执行的代码
 */

/**
 * 解析 Vue SFC 文件
 * @param {string} source - Vue SFC 源代码
 * @returns {Object} 解析后的各部分
 */
function parseSFC(source) {
  const templateMatch = source.match(/<template[^>]*>([\s\S]*)<\/template>/)
  const scriptMatch = source.match(/<script[^>]*>([\s\S]*)<\/script>/)
  const styleMatches = []
  const styleRegex =
    /<style[^>]*(?:lang=["']([^"']+)["'])?[^>]*(?:scoped)?[^>]*>([\s\S]*?)<\/style>/g
  let match
  while ((match = styleRegex.exec(source)) !== null) {
    styleMatches.push({
      lang: match[1] || 'css',
      scoped: match[0].includes('scoped'),
      content: match[2].trim(),
    })
  }

  return {
    template: templateMatch ? templateMatch[1].trim() : '',
    script: scriptMatch ? scriptMatch[1].trim() : '',
    styles: styleMatches,
  }
}

/**
 * 编译 Vue SFC
 * @param {string} source - Vue SFC 源代码
 * @returns {Object} 编译结果
 */
export function compileVueSFC(source) {
  try {
    // 手动解析 SFC
    const parsed = parseSFC(source)

    if (!parsed.template && !parsed.script) {
      throw new Error('Vue 文件必须包含 template 或 script 部分')
    }

    // 处理 script - 移除 import 语句（依赖将在 HTML 中全局引入）
    // 移除 import 语句和注释
    let processedScript = parsed.script
      .split('\n')
      .filter(line => {
        const trimmed = line.trim()
        // 移除 import 行和单行注释（但保留代码中的注释）
        return !trimmed.startsWith('import ') && !trimmed.startsWith('// import')
      })
      .join('\n')
      // 只替换非注释行中的 export default
      // 不使用 const，让它赋值给外部作用域的变量
      .replace(/^(\s*)export\s+default/m, '$1PreviewComponent =')

    // 如果 script 中没有定义组件，创建一个默认的
    if (
      !processedScript.includes('PreviewComponent') &&
      !processedScript.includes('const PreviewComponent')
    ) {
      processedScript = `
        PreviewComponent = {
          name: 'Preview',
          template: ${JSON.stringify(parsed.template)},
          data() {
            return {}
          }
        }
      `
    } else {
      // 如果有组件定义，确保添加 template
      if (parsed.template) {
        // 检查是否已经有 template 属性
        const hasTemplate = /template\s*:/.test(processedScript)

        if (!hasTemplate) {
          // 尝试在组件定义对象中添加 template
          // 需要跳过注释，找到真正的组件定义
          // 匹配 const PreviewComponent = { 或 PreviewComponent = {
          // 但不能是注释中的
          const lines = processedScript.split('\n')
          let componentDefLineIndex = -1
          let componentDefMatch = null

          // 从后往前查找，找到最后一个非注释的组件定义
          for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i]
            // 跳过注释行和空行
            if (line.trim().startsWith('//') || line.trim().startsWith('/*') || !line.trim()) {
              continue
            }
            // 查找组件定义（现在不再使用 const）
            const match = line.match(/PreviewComponent\s*=\s*\{/)
            if (match) {
              componentDefLineIndex = i
              componentDefMatch = match
              break
            }
          }

          if (componentDefLineIndex >= 0 && componentDefMatch) {
            // 找到组件定义行，在下一行插入 template
            const insertLineIndex = componentDefLineIndex + 1

            // 检查下一行是否已有内容（不是闭合大括号）
            const nextLine = lines[insertLineIndex] || ''
            const nextLineTrimmed = nextLine.trim()
            const hasContent = nextLineTrimmed && !nextLineTrimmed.startsWith('}')

            // 确定缩进：如果下一行有内容，使用下一行的缩进，否则使用基础缩进+2空格
            let finalIndent = ''
            if (hasContent && nextLine) {
              // 使用下一行的缩进（确保一致）
              const nextLineIndent = nextLine.match(/^(\s*)/)?.[1]
              if (nextLineIndent) {
                finalIndent = nextLineIndent
              } else {
                // 如果下一行没有缩进（不太可能），使用默认缩进
                const baseIndent = lines[componentDefLineIndex].match(/^(\s*)/)?.[1] || ''
                finalIndent = baseIndent + '  '
              }
            } else {
              // 如果没有下一行内容，使用基础缩进+2空格
              const baseIndent = lines[componentDefLineIndex].match(/^(\s*)/)?.[1] || ''
              finalIndent = baseIndent + '  '
            }

            // 构建 template 行，确保格式正确
            // 使用 JSON.stringify 确保特殊字符被正确转义
            const templateValue = JSON.stringify(parsed.template)
            // 如果下一行有内容，需要添加逗号
            const templateLine = `${finalIndent}template: ${templateValue},`

            // 插入 template 行
            lines.splice(insertLineIndex, 0, templateLine)
            processedScript = lines.join('\n')

            console.log(
              '插入 template 后的脚本片段:',
              lines
                .slice(
                  Math.max(0, componentDefLineIndex - 2),
                  Math.min(lines.length, insertLineIndex + 4)
                )
                .join('\n')
            )
          } else {
            // 如果找不到组件定义行，尝试使用正则匹配（作为后备方案）
            const match = processedScript.match(/PreviewComponent\s*=\s*\{/)
            if (match && !match[0].includes('//')) {
              const insertPos = match.index + match[0].length
              const afterBrace = processedScript.substring(insertPos).trim()
              const hasContent = afterBrace && !afterBrace.startsWith('}')
              const templateValue = JSON.stringify(parsed.template)
              const templateLine = hasContent
                ? `\n    template: ${templateValue},\n`
                : `\n    template: ${templateValue}\n`
              processedScript =
                processedScript.substring(0, insertPos) +
                templateLine +
                processedScript.substring(insertPos)
            }
          }
        } else {
          // 如果已有 template，替换它
          processedScript = processedScript.replace(
            /template\s*:\s*['"`][^'"`]*['"`]/,
            `template: ${JSON.stringify(parsed.template)}`
          )
        }
      }
    }

    return {
      success: true,
      template: parsed.template,
      script: processedScript,
      styles: parsed.styles,
      errors: [],
    }
  } catch (error) {
    console.error('Vue SFC 编译失败:', error)
    return {
      success: false,
      error: error.message || '编译失败',
      errors: [error.message],
    }
  }
}

/**
 * 构建预览 HTML
 * @param {string} vueCode - Vue SFC 源代码
 * @param {Object} options - 选项
 * @returns {Promise<string>} 完整的 HTML 字符串
 */
export async function buildPreviewHTML(vueCode, options = {}) {
  const { baseUrl = '/' } = options

  // 编译 Vue SFC（同步函数，但保持 async 以保持接口一致性）
  const compiled = compileVueSFC(vueCode)

  if (!compiled.success) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>预览错误</title>
        <style>
          body { font-family: monospace; padding: 20px; color: #f56565; }
        </style>
      </head>
      <body>
        <h2>编译错误</h2>
        <pre>${compiled.error || '未知错误'}</pre>
      </body>
      </html>
    `
  }

  // 构建样式
  const styleTags = compiled.styles
    .map(style => {
      const scopedAttr = style.scoped ? ' scoped' : ''
      return `<style${scopedAttr}>${style.content}</style>`
    })
    .join('\n    ')

  // 构建 HTML
  // 使用 CDN 或本地路径
  const useCDN = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')
  const vueCDN = useCDN
    ? 'https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.min.js'
    : `${baseUrl}node_modules/vue/dist/vue.min.js`
  const elementUICSS = useCDN
    ? 'https://cdn.jsdelivr.net/npm/element-ui@2.15.14/lib/theme-chalk/index.css'
    : `${baseUrl}node_modules/element-ui/lib/theme-chalk/index.css`
  const elementUIJS = useCDN
    ? 'https://cdn.jsdelivr.net/npm/element-ui@2.15.14/lib/index.js'
    : `${baseUrl}node_modules/element-ui/lib/index.js`

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>代码预览</title>
  
  <!-- Element UI CSS -->
  <link rel="stylesheet" href="${elementUICSS}">
  
  <!-- hui2.43.2 CSS -->
  <link rel="stylesheet" href="${baseUrl}hui2.43.2/lib/hui.css">
  
  <!-- hui-pro CSS -->
  <link rel="stylesheet" href="${baseUrl}hui-pro/page/dist/page.css">
  
  <!-- 组件样式 -->
  ${styleTags}
  
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    #app {
      width: 100%;
      min-height: 100vh;
    }
  </style>
</head>
<body>
  <div id="app"></div>
  
  <!-- Vue 2 -->
  <script src="${vueCDN}"></script>
  
  <!-- hui2.43.2 -->
  <script src="${baseUrl}hui2.43.2/lib/hui.umd.min.js"></script>
  
  <!-- 定义 process 对象（某些 UMD 包需要，必须在脚本加载前定义） -->
  <script>
    if (typeof process === 'undefined') {
      window.process = { env: { NODE_ENV: 'development' } };
    }
  </script>
  
  <!-- hui-pro -->
  <script src="${baseUrl}hui-pro/page/dist/page.umd.min.js"></script>
  
  <script>
    // 等待所有脚本加载完成
    function initApp() {
      try {
        // 检查 Vue 是否加载
        if (typeof Vue === 'undefined') {
          document.getElementById('app').innerHTML = '<div style="padding: 20px; color: red;">错误：Vue 未加载</div>';
          return;
        }
        

        // 注册 Element UI
        if (typeof ElementUI !== 'undefined') {
          Vue.use(ElementUI);
          console.log('✅ Element UI 已注册');
        } else {
          console.warn('⚠️ Element UI 未加载');
        }
        
        // 注册 hui2.43.2
        console.log('检查 hui2.43.2...');
        console.log('window.hui:', window.hui);
        if (window.hui && window.hui.default) {
          const HUI = window.hui.default;
          console.log('✅ 找到 window.hui.default');
          
          // 方式1: 如果有 install 方法，直接使用
          if (typeof HUI.install === 'function') {
            Vue.use(HUI);
            console.log('✅ hui2.43.2 已通过 Vue.use 注册');
          } else {
            // 方式2: 手动注册每个组件
            console.log('手动注册 hui2.43.2 组件...');
            let registeredCount = 0;
            Object.keys(HUI).forEach(key => {
              const component = HUI[key];
              // 只注册有 name 属性的 Vue 组件
              if (component && component.name && typeof component.name === 'string') {
                Vue.component(component.name, component);
                registeredCount++;
              }
            });
            console.log('✅ hui2.43.2 已手动注册 ' + registeredCount + ' 个组件');
          }
        } else {
          console.warn('⚠️ window.hui 未找到');
        }
        
        // 注册 hui-pro（UMD 导出为 page）
        console.log('检查 hui-pro/page...');
        console.log('window.page:', window.page);
        if (typeof window !== 'undefined' && window.page) {
          // page 可能是函数或对象
          if (typeof window.page === 'function') {
            Vue.use(window.page);
            console.log('✅ hui-pro/page 已通过 Vue.use(window.page) 注册');
          } else if (window.page.install) {
            Vue.use(window.page);
            console.log('✅ hui-pro/page 已通过 Vue.use(window.page) 注册（有 install）');
          } else if (window.page.default && window.page.default.install) {
            Vue.use(window.page.default);
            console.log('✅ hui-pro/page 已通过 Vue.use(window.page.default) 注册');
          } else {
            console.warn('⚠️ window.page 存在但无法注册');
          }
        } else {
          console.warn('⚠️ window.page 未找到');
        }
        
        // 组件代码
        console.log('开始执行组件脚本...');
        let PreviewComponent;
        try {
          ${compiled.script}
          // 确保 PreviewComponent 在正确的作用域中
          if (typeof PreviewComponent === 'undefined') {
            // 如果脚本中使用 const/let 定义，尝试从 window 获取
            PreviewComponent = window.PreviewComponent;
          }
          console.log('组件脚本执行完成');
          console.log('PreviewComponent 类型:', typeof PreviewComponent);
          console.log('PreviewComponent 值:', PreviewComponent);
        } catch (scriptError) {
          console.error('组件脚本执行错误:', scriptError);
          console.error('错误堆栈:', scriptError.stack);
          console.error('错误名称:', scriptError.name);
          console.error('错误消息:', scriptError.message);
          console.error('问题代码位置:', scriptError.lineNumber || '未知');
          document.getElementById('app').innerHTML = '<div style="padding: 20px; color: red;">脚本错误: ' + scriptError.message + '<br>行号: ' + (scriptError.lineNumber || '未知') + '<br>堆栈: ' + (scriptError.stack || '无') + '</div>';
          return;
        }
        
        // 创建 Vue 实例
        console.log('检查 PreviewComponent 是否定义...');
        console.log('PreviewComponent 在当前作用域:', typeof PreviewComponent);
        if (typeof PreviewComponent !== 'undefined' && PreviewComponent !== null) {
          console.log('✅ PreviewComponent 已定义，创建 Vue 实例');
          try {
            const app = new Vue({
              el: '#app',
              render: function(h) {
                return h(PreviewComponent);
              }
            });
            console.log('✅ Vue 实例创建成功', app);
          } catch (vueError) {
            console.error('❌ Vue 实例创建失败:', vueError);
            console.error('错误堆栈:', vueError.stack);
            document.getElementById('app').innerHTML = '<div style="padding: 20px; color: red;">Vue 实例创建失败: ' + vueError.message + '<br>请查看控制台了解详情</div>';
          }
        } else {
          console.error('❌ PreviewComponent 未定义');
          console.error('当前作用域中的变量:', Object.keys(window).filter(k => k.includes('Preview') || k.includes('Component')));
          console.error('尝试从 window 获取:', window.PreviewComponent);
          document.getElementById('app').innerHTML = '<div style="padding: 20px; color: red;">错误：组件未定义<br>请查看控制台了解详情</div>';
        }
      } catch (error) {
        console.error('初始化失败:', error);
        document.getElementById('app').innerHTML = '<div style="padding: 20px; color: red;">初始化失败: ' + error.message + '</div>';
      }
    }
    
    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initApp);
    } else {
      // DOM 已加载，直接初始化
      setTimeout(initApp, 100);
    }
  </script>
</body>
</html>`

  return html
}
