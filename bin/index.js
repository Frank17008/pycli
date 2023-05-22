#! /usr/bin/env node

import fs from "fs"
import { readFile } from "fs/promises"
import { program } from "commander"
import createProject from "../actions/create.js"

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url)))
program.version(packageJson.version, "-v,--version")

// 创建新项目
program
    .command("create <app-name>")
    .description("创建新项目")
    .action((name, description) => {
        createProject(name, program.opts())
    })
program.parse(process.argv)
