/**
 *@description: installModules
 *@author: forguo
 *@date: 2021/01/01
 */
const chalk = require('chalk');
const inquirer = require('inquirer');
const logSymbols = require('log-symbols');
const ora = require('ora');
const spinner = ora();
const execa = require('execa');

/**
 * @desc 项目依赖安装
 * @param projectName 项目名称（项目目录）
 * @return {Promise<unknown>}
 */
const installModules = async function (projectName) {
    return new Promise(async (resolve, reject) => {
        const promptConfirm = [{
            type: 'confirm',
            name: 'install',
            message: '项目下载完成，是否继续完成依赖安装？',
        }];
        try {
            const installRes = await inquirer.prompt(promptConfirm);
            if (installRes['install']) {
                try {
                    spinner.start(chalk.blue(`依赖安装中...`));
                    let result = await execa('npm', ['install'], { cwd: projectName});
                    spinner.stop();
                    console.log(result.result);
                    console.log(logSymbols.success, chalk.green('安装完成！可依次执行以下命令进行开发！'));
                    console.log(chalk.blue(`cd ${projectName}`));
                    console.log(chalk.blue(`npm run dev`));
                    resolve();
                } catch (err) {
                    spinner.stop();
                    console.log(chalk.blue(`cd ${projectName}`));
                    console.log(chalk.blue(`npm install`));
                    console.log(chalk.blue(`npm run dev`));
                    if (err) return reject(err)
                }
            } else {
                console.log(logSymbols.success, chalk.green('项目下载完成！可依次执行以下命令进行开发！'));
                console.log(chalk.blue(`cd ${projectName}`));
                console.log(chalk.blue(`npm install`));
                console.log(chalk.blue(`npm run dev`));
            }
        } catch (err) {
            spinner.stop();
            if (err) return reject(err)
        }
    });
};

module.exports = installModules;
