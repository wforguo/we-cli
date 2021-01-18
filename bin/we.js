#!/usr/bin/env node
// 用node来运行这个文件
/**
 *@description: we-cli入口文件
 *@author: forguo
 *@date: 2020/12/28
 */
const program = require('commander');
const chalk = require("chalk");
const { getVersions } = require('../lib/util');

program
    .version(getVersions())
    .usage('<command> [options]')

// create a new project
program
    .command('create <app-name>')
    .description('create a new project')
    .action((name) => {
        require('../lib/create')(name)
    })

// generator a new page or component
program
    .command('new <module>')
    .description('generator a new module')
    .action((name) => {
        require('../lib/new')(name)
    });

// start a serve in the current project
program
    .command('serve')
    .description('start a serve in the current project')
    .action(() => {
        require('../lib/serve')()
    });

// output help information on unknown commands
program
    .arguments('<command>')
    .action((cmd) => {
        program.outputHelp()
        console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
        console.log()
        process.exitCode = 1
    })

// 解析命令行参数
program.parse(process.argv)

if (!process.argv.slice(2).length) {
    program.outputHelp()
}
