import dl from "download-git-repo"
import fse from "fs-extra"
import chalk from "chalk"
import { startLoading, endLoading } from "./loading.js"
import config from "./repo.js"

// 计算下载次数
let count = 0

export const download = (template_name, project_dir, app_name) => {
    // 模板的下载地址
    const { url } = config[template_name]
    return new Promise(async (resolve, reject) => {
        function execuate() {
            count++
            if (count >= 3) {
                count = 0
                reject()
                return
            }
            startLoading()
            dl(`${url}`, project_dir, { clone: true }, async function (err) {
                endLoading()
                if (err) {
                    // 出现下载错误,延时3秒重新下载3次
                    console.log("\n下载失败,3s后下载重试...\n", err)
                    await sleep()
                    execuate()
                } else {
                    const scripts = `cd ./${app_name} && npm install`
                    console.log("  " + chalk.blue(`${scripts}`))
                    console.log("  " + chalk.blue("npm run start"))
                    resolve(null)
                    count = 0
                }
            })
        }
        // 如果目录为空则删除目录内容,如果目录不存在,就创建一个
        await fse.emptyDir(project_dir)
        execuate()
    })
}

/**
 * 睡眠
 */
const sleep = (time = 3000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, time)
    })
}
