import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'

// 需要检验版本号的组件
const verifyList = [{
  name: '@hui-pro/tree-select',
  version: '2.0.0-beta.19'
}, {
  name: '@hui-pro/sync-tree-select',
  version: '2.0.0-beta.14'
}, {
  name: '@hui-pro/vehicle-number-input',
  version: '2.0.0-beta.7'
}]

async function getPackageVersion(verifyObj) {
  try {
    // ESM规范下无法直接使用__dirname，使用下面方法实现
    const _dirname = path.dirname(fileURLToPath(import.meta.url))
    const filePath = _dirname.split('node_modules', 1)[0]
    const packageLock = JSON.parse(fs.readFileSync(path.join(filePath, 'package.json'), 'utf-8'))
    // 获取已安装的包的版本
    const installedVersion = packageLock.dependencies[verifyObj.name] || packageLock.devDependencies[verifyObj.name]
    if (installedVersion && (compareVersions(installedVersion, verifyObj.version) < 0)) {
      console.error(chalk.red(`已安装的包${verifyObj.name}的版本为：${installedVersion},可能会与当前hui版本产生冲突，可将版本升级至${verifyObj.version}或将hui改成<2.50.0`))
      return true
    }
    return false
  }
  catch (error) {
    console.error(`无法读取 package.json 文件或获取${verifyObj.name}包版本信息。`, error)
  }
}

async function checkPackageVersion() {
  let isPassVerify = false
  verifyList.forEach(async(item) => {
    const verifyResult = await getPackageVersion(item)
    isPassVerify = verifyResult || isPassVerify
  })
  // if (isPassVerify) {
  //   process.exitCode = 1 // 如果检验未通过，可以使用此句代码终止安装此组件包
  // }
}

// 比较版本号
function compareVersions(nowVersion, vaildVersion) {
  const nowParts = nowVersion.split('.').map(Number)
  const vaildParts = vaildVersion.split('.').map(Number)

  for (let i = 0; i < Math.max(nowParts.length, vaildParts.length); i++) {
    if (nowParts[i] > (vaildParts[i] || 0))
      return 1
    else if (nowParts[i] < (vaildParts[i] || 0))
      return -1
  }

  return 0
}

// 执行检查
checkPackageVersion()
