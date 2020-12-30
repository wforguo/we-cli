/**
 *@description: get cli version
 *@author: forguo
 *@date: 2020/12/29
 */
const chalk = require('chalk');

const getVersions = function () {
    // figlet('We Cli', function(err, data) {
    //     if (err) {
    //         console.log('Something went wrong...');
    //         console.dir(err); // 打印出该对象的所有属性和属性值.
    //         return;
    //     }
    //     data && console.log(chalk.bold.blue(data));
    // });
    return chalk.bold.blue(`We-Cli ${require('../../package').version}`)
};

module.exports = getVersions;
