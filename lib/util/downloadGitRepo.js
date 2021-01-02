/**
 *@description: download-git-repo
 *@author: forguo
 *@date: 2020/12/30
 */
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const spinner = ora();
const logSymbols = require('log-symbols');
const inquirer = require('inquirer');
const download = require('download-git-repo');
const { baseGitUrl } = require('../config');
const installModules = require('./installModules');

/**
 * @desc 项目模板下载
 * @param projectName
 * @param targetDir（本地目录）
 * @param clone
 * If true use git clone instead of an http download. While this can be a bit slower, it does allow private repositories to be used if the appropriate SSH keys are setup.
 * @return {Promise<unknown>}
 */
const downloadGitRepo = async function (projectName, targetDir, clone = false) {
    return new Promise(async (resolve, reject) => {
        const promptList = [{
            type: 'list',
            name: 'projectType',
            choices: [
                "React",
                "Vue",
                "Taro",
                "Antd",
                "Wepy",
            ],
            message: '请选择项目类型',
        }];
        try {
            const promptRes = await inquirer.prompt(promptList);
            const projectType = promptRes['projectType'];

            /*******仓库地址********/
            // 仓库地址 不是复制的https://github.com/xxx/xxx.git
            // 正确写法：'github:username/repository#master'
            /*******仓库地址********/

            const gitPath = `${baseGitUrl}${projectType}-template#master`;
            fs.mkdirp(targetDir, async () => {
                console.log(logSymbols.info, `创建项目目录：`, chalk.green(`${targetDir}`));
                spinner.start(chalk.blue(`项目传送中：${gitPath}`));
                download(gitPath, targetDir, { clone }, async err => {
                    spinner.stop();
                    if (err) return reject(err)
                    try {
                        console.log(projectName, '--------------');
                        // 安装
                        await installModules(projectName);
                        resolve()
                    } catch (err) {
                        console.log(logSymbols.error, `安装失败，请尝试手动完成安装！错误信息：`,chalk.red(`${err}`));
                    }
                })
            });
        } catch (err) {
            spinner.stop();
            if (err) return reject(err)
        }
    })
}

module.exports = downloadGitRepo;
