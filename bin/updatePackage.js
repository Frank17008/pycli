import path from "path"
import fse from "fs-extra"

//更改package.json文件
export const updatePackage = async (dirpath, data) => {
    const filename = path.join(dirpath, "package.json")
    try {
        await fse.ensureFile(filename)
        let packageJson = await fse.readFile(filename)
        packageJson = JSON.parse(packageJson.toString())
        packageJson = { ...packageJson, ...data }
        // data.name
        packageJson = JSON.stringify(packageJson, null, "\t")
        await fse.writeFile(filename, packageJson)
    } catch (err) {
        console.error("\npackage.json文件操作失败!\n")
        throw err
    }
}
