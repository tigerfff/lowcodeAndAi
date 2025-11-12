/**
 * AI 服务
 * 负责调用外部 AI 模型生成代码
 */

/**
 * 调用 AI 生成代码
 * @param {Object} params - 参数
 * @param {string} params.prompt - Prompt 文本
 * @param {Object} params.aiConfig - AI 配置
 * @returns {Promise<string>} 生成的代码
 */
export async function callAIGenerate({ prompt, aiConfig }) {
  const { baseUrl, apiKey, model, temperature, maxTokens } = aiConfig

  if (!baseUrl || !apiKey) {
    throw new Error('AI 配置不完整，请先配置 Base URL 和 API Key')
  }

  try {
    console.log('🤖 Calling AI model:', model)
    console.log('📝 Prompt length:', prompt.length, 'characters')

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: `你是一个 Vue2 代码生成专家，专注于使用 hui2.43.2 + hui-pro 组件库生成高质量的页面代码。

你的任务：
1. 严格参考提供的 Handlebars 模板结构
2. 根据 API JSON 示例推断字段映射和数据路径
3. 根据组件配置生成完整的 Vue2 Options API 代码
4. 确保代码符合 hui2.43.2 + hui-pro 规范

代码规范：
- 使用 Vue2 Options API
- 使用 <script> (不使用 setup)
- 使用 data() 返回数据
- 使用 methods 定义方法
- 使用 mounted() 生命周期
- 使用 hui-pro 页面组件（h-page-container, h-page-search, etc）
- 使用 hui2.43.2 基础组件（el-input, el-select, etc）

只返回完整的 .vue 文件代码，不要有任何额外的解释或说明。`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature,
        max_tokens: maxTokens,
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(
        `AI API 调用失败: ${response.status} ${response.statusText}${error.error?.message ? ` - ${error.error.message}` : ''}`
      )
    }

    const data = await response.json()
    console.log('✅ AI response received')

    if (!data.choices || data.choices.length === 0) {
      throw new Error('AI 返回数据格式错误：没有 choices')
    }

    const code = data.choices[0].message.content
    if (!code) {
      throw new Error('AI 返回数据格式错误：没有 content')
    }

    console.log('📄 Generated code length:', code.length, 'characters')

    // 清理代码（移除可能的 markdown 代码块标记）
    let cleanedCode = code.trim()
    if (cleanedCode.startsWith('```vue')) {
      cleanedCode = cleanedCode.replace(/^```vue\n/, '').replace(/\n```$/, '')
    } else if (cleanedCode.startsWith('```')) {
      cleanedCode = cleanedCode.replace(/^```\n/, '').replace(/\n```$/, '')
    }

    return cleanedCode
  } catch (error) {
    console.error('❌ AI generation error:', error)
    throw error
  }
}

/**
 * 测试 AI 连接
 * @param {Object} aiConfig - AI 配置
 * @returns {Promise<boolean>} 是否连接成功
 */
export async function testAIConnection(aiConfig) {
  const { baseUrl, apiKey, model } = aiConfig

  if (!baseUrl || !apiKey) {
    throw new Error('AI 配置不完整')
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'user',
            content: 'test',
          },
        ],
        max_tokens: 5,
      }),
    })

    return response.ok
  } catch (error) {
    console.error('AI connection test failed:', error)
    return false
  }
}

/**
 * AI 对话
 * @param {Object} params
 * @param {Array} params.messages - 聊天消息数组
 * @param {Object} params.aiConfig - AI 配置
 * @returns {Promise<string>} AI 回复内容
 */
export async function sendChatMessages({ messages, aiConfig }) {
  const { baseUrl, apiKey, model, temperature, maxTokens } = aiConfig

  if (!baseUrl || !apiKey) {
    throw new Error('AI 配置不完整，请先配置 Base URL 和 API Key')
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: Math.min(maxTokens || 4000, 4000),
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(
        `AI 对话失败: ${response.status} ${response.statusText}${
          error.error?.message ? ` - ${error.error.message}` : ''
        }`
      )
    }

    const data = await response.json()
    const assistantMessage = data.choices?.[0]?.message?.content

    if (!assistantMessage) {
      throw new Error('AI 返回数据格式错误：没有 content')
    }

    return assistantMessage.trim()
  } catch (error) {
    console.error('❌ AI chat error:', error)
    throw error
  }
}

