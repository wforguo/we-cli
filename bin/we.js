#!/usr/bin/env node
// 用node来运行这个文件
/**
 *@description: we-cli入口文件
 *@author: forguo
 *@date: 2020/12/28
 */
const commander = require('commander');

commander
    .version(require('../package').version)
    .usage('<command> [options]')
    .command('init', 'init a project')
    .command('create <app-name>', 'create a project')
    // .description('create a project')
    .parse(process.argv);
