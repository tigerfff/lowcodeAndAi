/**
 * AI Provider 统一适配层
 * 支持 OpenAI、Anthropic 和自定义 API
 */

/**
 * 加载 AI 配置
 * @returns {Object} AI 配置对象
 */
function loadAIConfig() {
  // 从 localStorage 读取用户配置（优先）
  const userConfig = localStorage.getItem('ai-config')
  if (userConfig) {
    try {
      return JSON.parse(userConfig)
    } catch (error) {
      console.error('Failed to parse AI config from localStorage:', error)
    }
  }
  
  // 默认配置（开发环境可从环境变量读取）
  return {
    provider: import.meta.env.VITE_AI_PROVIDER || 'openai',
    openai: {
      apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
      baseURL: import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1',
      model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0.3,
      maxTokens: 4000
    },
    anthropic: {
      apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
      baseURL: import.meta.env.VITE_ANTHROPIC_BASE_URL || 'https://api.anthropic.com',
      model: import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
      temperature: 0.3,
      maxTokens: 4000
    },
    timeout: 30000,
    retries: 2
  }
}

/**
 * 调用 OpenAI API
 * @param {string} prompt - 提示词
 * @param {Object} config - OpenAI 配置
 * @returns {Promise<string>} AI 响应文本
 */
async function callOpenAI(prompt, config) {
  const response = await fetch(`${config.baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates page configuration JSON for Vue2 applications. Always respond with valid JSON only, no markdown code blocks.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: config.temperature,
      max_tokens: config.maxTokens
    })
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`)
  }
  
  const data = await response.json()
  return data.choices[0]?.message?.content || ''
}

/**
 * 调用 Anthropic API
 * @param {string} prompt - 提示词
 * @param {Object} config - Anthropic 配置
 * @returns {Promise<string>} AI 响应文本
 */
async function callAnthropic(prompt, config) {
  const response = await fetch(`${config.baseURL}/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: config.maxTokens,
      temperature: config.temperature,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      system: 'You are a helpful assistant that generates page configuration JSON for Vue2 applications. Always respond with valid JSON only, no markdown code blocks.'
    })
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Anthropic API error: ${error.error?.message || response.statusText}`)
  }
  
  const data = await response.json()
  return data.content[0]?.text || ''
}

/**
 * 调用自定义 API
 * @param {string} prompt - 提示词
 * @param {Object} config - 自定义配置
 * @returns {Promise<string>} AI 响应文本
 */
async function callCustomAPI(prompt, config) {
  const headers = {
    'Content-Type': 'application/json'
  }
  
  // 处理自定义 headers
  if (config.headers) {
    Object.keys(config.headers).forEach(key => {
      let value = config.headers[key]
      // 替换 {apiKey} 占位符
      value = value.replace('{apiKey}', config.apiKey)
      headers[key] = value
    })
  }
  
  const response = await fetch(`${config.baseURL}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: config.model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates page configuration JSON for Vue2 applications. Always respond with valid JSON only, no markdown code blocks.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: config.temperature,
      max_tokens: config.maxTokens
    })
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Custom API error: ${error.error?.message || response.statusText}`)
  }
  
  const data = await response.json()
  return data.choices[0]?.message?.content || data.content || ''
}

/**
 * 统一的 AI 调用接口
 * @param {string} prompt - 提示词
 * @param {Object} options - 可选配置（覆盖默认配置）
 * @returns {Promise<string>} AI 响应文本
 */
export async function callAI(prompt, options = {}) {
  const config = loadAIConfig()
  const provider = options.provider || config.provider
  const providerConfig = { ...config[provider], ...options }
  
  // 验证 API Key
  if (!providerConfig.apiKey) {
    throw new Error(`${provider} API key is not configured. Please set it in settings.`)
  }
  
  let lastError = null
  const maxRetries = config.retries || 2
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      let response
      
      switch (provider) {
        case 'openai':
          response = await callOpenAI(prompt, providerConfig)
          break
        case 'anthropic':
          response = await callAnthropic(prompt, providerConfig)
          break
        case 'custom':
          response = await callCustomAPI(prompt, providerConfig)
          break
        default:
          throw new Error(`Unsupported AI provider: ${provider}`)
      }
      
      return response
    } catch (error) {
      lastError = error
      console.error(`AI call attempt ${attempt + 1} failed:`, error)
      
      // 最后一次尝试失败则抛出错误
      if (attempt === maxRetries) {
        throw error
      }
      
      // 等待一段时间后重试
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)))
    }
  }
  
  throw lastError
}

/**
 * 从 AI 响应中提取 JSON
 * @param {string} response - AI 响应文本
 * @returns {Object} 解析后的 JSON 对象
 */
export function extractJSON(response) {
  // 移除可能的 markdown 代码块标记
  let cleaned = response.trim()
  
  // 移除 ```json 和 ```
  cleaned = cleaned.replace(/^```json?\s*/i, '').replace(/```\s*$/, '')
  
  // 查找第一个 { 和最后一个 }
  const firstBrace = cleaned.indexOf('{')
  const lastBrace = cleaned.lastIndexOf('}')
  
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1)
  }
  
  try {
    return JSON.parse(cleaned)
  } catch (error) {
    console.error('Failed to parse JSON from AI response:', error)
    console.error('Response:', response)
    throw new Error('AI response is not valid JSON: ' + error.message)
  }
}

/**
 * 保存 AI 配置到 localStorage
 * @param {Object} config - AI 配置对象
 */
export function saveAIConfig(config) {
  localStorage.setItem('ai-config', JSON.stringify(config))
}

/**
 * 获取当前 AI 配置
 * @returns {Object} AI 配置对象
 */
export function getAIConfig() {
  return loadAIConfig()
}

export default {
  callAI,
  extractJSON,
  saveAIConfig,
  getAIConfig
}

