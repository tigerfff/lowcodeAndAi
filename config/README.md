# Config

配置文件目录

## 文件说明

- **ai.example.json** - AI 供应商配置示例
  - 复制为 `ai.json` 使用（本地开发）
  - 生产环境通过环境变量配置

## 配置项

```json
{
  "defaultProvider": "openai",
  "providers": [
    {
      "name": "openai",
      "baseUrl": "https://api.openai.com/v1",
      "model": "gpt-4o-mini",
      "requestTimeoutMs": 20000,
      "retry": { "maxAttempts": 2, "baseDelayMs": 500 },
      "generation": { "temperature": 0.1, "top_p": 1, "max_tokens": 3000 }
    }
  ]
}
```

