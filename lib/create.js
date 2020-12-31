/**
 * @Description create a new project
 * @Author forguo
 * @Date 2020/1/13
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const npm = require('npm-run');
const ora = require('ora');
const logSymbols = require('log-symbols');
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
        console.error(logSymbols.warning, chalk.red(`Project name Can not be empty`));
        return false;
    }
    if (fs.existsSync(targetDir)) {
        console.error(logSymbols.warning, chalk.red(`Project <${projectName}> is exist`));
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
        const projectType = promptRes['projectType'];
        // 仓库地址
        const gitPath = `${baseGitUrl}${projectType}-template#master`;
        fs.mkdirp(targetDir, async () => {
            console.log(logSymbols.info, `创建目录：`, chalk.blue(`${targetDir}`));
            spinner.start(chalk.blue(`项目传送中：${gitPath}`));
            try {
                await downloadGitRepo(gitPath, projectName);
                spinner.stop();
                console.log(logSymbols.success, chalk.green('项目创建完成！可依次执行以下命令进行开发'));
                console.log(chalk.blue(`cd ${projectName}`));
                console.log(chalk.blue(`npm install`));
                console.log(chalk.blue(`npm run dev`));
            } catch (e) {
                spinner.stop();
                console.log(logSymbols.error, `项目创建失败，错误信息：`,chalk.red(`${e}`));
            }
        });
    } catch (e) {
        spinner.stop();
        console.log(logSymbols.error, `项目创建失败，错误信息：`,chalk.red(`${e}`));
    }
};

module.exports = create;
