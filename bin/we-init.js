const chalk = require('chalk');
const figlet = require('figlet');

figlet('we cli', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err); // 打印出该对象的所有属性和属性值.
        return;
    }
    data && console.log(chalk.yellow(data));
});
