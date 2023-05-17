import inquirer from "inquirer"
import path from "path"
import { download } from "../bin/download.js"
import { updatePackage } from "../bin/updatePackage.js"
import config from "../bin/repo.js"

async function createProject(appName) {
    const prompList = [
        {
            type: "input",
            name: "description",
            message: "请输入项目描述信息:",
        },
        {
            type: "list",
            message: "请选择一个模板下载:",
            name: "template_name",
            choices: Object.keys(config),
        },
    ]

    const { template_name, description } = await inquirer.prompt(prompList)
    // 新建项目的路径
    const project_dir = path.join(process.cwd(), appName)

    try {
        // 下载项目到本地
        await download(template_name, project_dir, appName)
        // 修改package.json
        await updatePackage(project_dir, { name: appName, description, template: template_name })
    } catch (error) {
        console.log(error)
    }
}

export default createProject
