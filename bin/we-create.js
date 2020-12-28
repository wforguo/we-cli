#!/usr/bin/env node

/**
 * @Description 创建项目
 * @Author forguo
 * @Date 2020/1/13
 */

const commander = require('commander');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const npm = require('npm-run');
const ora = require('ora');
const spinner = ora();
const { baseGitUrl } = require('../lib/config');

commander.usage('[project-name]');
// process.argv属性返回一个数组，
// 其中包含启动Node.js进程时传递的命令行参数。
commander.parse(process.argv);

// 获取项目名称的参数
const projectName = commander.args[0];
// process.cwd() 方法返回 Node.js 进程的当前工作目录。
// path.resolve 解析为一个绝对路径
const targetDir = path.resolve(process.cwd(), projectName || 'app');

const createProject = () => {
    if (!targetDir) {
        console.error(chalk.red(`Project name Can not be empty`));
        return false;
    }
    if (fs.existsSync(targetDir)) {
        console.error(chalk.red(`Project is exist`));
        return false;
    }
    // 仓库地址
    const gitPath = `${baseGitUrl + 'wepy-template.git'}`;
    console.log('即将克隆以下项目:', chalk.yellow(gitPath));

    spinner.start(chalk.green('开始创建项目'));
    fs.mkdirp(targetDir);

    npm.exec(`git clone ${gitPath} ${targetDir}`, function(code, stdout, stderr) {
        figlet('Wei CLI', function(err, data) {
            data && console.log(chalk.yellow(data));
            err && console.error(err);
            if (code == 0) {
                spinner.stop();
                console.log(chalk.green(`create success!`));
                console.log(chalk.green(`创建成功！${to}/${targetDir}`));
            } else {
                spinner.stop();
                console.log('Program output:', stdout);
                console.log('Program stderr:', stderr);
            }
        });
    });
};

createProject();
