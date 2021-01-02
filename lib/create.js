/**
 * @Description create a new project
 * @Author forguo
 * @Date 2020/1/13
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const { downloadGitRepo } = require('./util');
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
    try {
        // 下载
        await downloadGitRepo(projectName, targetDir);
    } catch (err) {
        console.log(logSymbols.error, `项目创建失败，错误信息：`,chalk.red(`${err}`));
    }
};

module.exports = create;
