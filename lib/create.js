/**
 * @Description create a new project
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
const { baseGitUrl } = require('./config');

/**
 *
 * @param projectName
 * @return {boolean}
 */
const create = (projectName) => {
    // process.cwd() 方法返回 Node.js 进程的当前工作目录。
    // path.resolve 解析为一个绝对路径
    const targetDir = path.resolve(process.cwd(), projectName || 'app');
    if (!targetDir) {
        console.error(chalk.red(`Project name Can not be empty`));
        return false;
    }
    if (fs.existsSync(targetDir)) {
        console.error(chalk.red(`Project <${projectName}> is exist`));
        return false;
    }
    // 仓库地址
    const gitPath = `${baseGitUrl + 'wepy-template.git'}`;
    console.log('即将克隆以下项目:', chalk.yellow(gitPath));

    spinner.start(chalk.blue('开始创建项目'));
    fs.mkdirp(targetDir);
    setTimeout(() => {
        spinner.stop();
        console.log(chalk.green(`create success!`));
        console.log(chalk.green(`创建成功！${targetDir}`));
    }, 3000);
};

module.exports = create;
