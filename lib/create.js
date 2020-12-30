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
const downloadGitRepo = require('./util/downloadGitRepo');
/**
 *
 * @param projectName
 * @return {boolean}
 */
const create = async (projectName) => {
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
    const promptList = [{
        type: 'list',
        name: 'projectType',
        choices: [
            "React",
            "Vue",
            "Taro",
            "Antd",
        ],
        message: '请选择项目类型',
    }];
    try {
        const promptRes = await inquirer.prompt(promptList);
        const projectType = promptRes.projectType;
        // 仓库地址
        const gitPath = `${baseGitUrl}${projectType}-template#master`;
        fs.mkdirp(targetDir, async () => {
            console.log(chalk.green(`创建目录${projectName}~`));
            spinner.start(chalk.blue(`开始克隆项目：${gitPath}`));
            try {
                await downloadGitRepo(gitPath, projectName);
                spinner.stop();
                console.log(`✅ 项目创建成功，位于：`,chalk.blue(`${targetDir}`));
            } catch (e) {
                spinner.stop();
                console.log(`❌ 项目创建失败，错误信息：`,chalk.red(`${e}`));
            }
        });
    } catch (e) {
        spinner.stop();
        console.log(`❌ 项目创建失败，错误信息：`,chalk.red(`${e}`));
    }
};

module.exports = create;
