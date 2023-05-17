#! /usr/bin/env node

import fs from "fs"
import { program } from "commander"
import createProject from "../actions/create.js"

const packageJsonData = JSON.parse(fs.readFileSync("package.json", "utf8"))
program.version(packageJsonData.version, "-v,--version")

// 创建新项目
program
    .command("create <app-name>")
    .description("创建新项目")
    .action((name, description) => {
        createProject(name, program.opts())
    })
program.parse(process.argv)
