/**
 *@description: create a serve
 *@author: forguo
 *@date: 2021/1/4
 */
const webpackDevServer = require('webpack-dev-server');

const createServe = () => {
    console.log('start a serve in the current project');
    webpackDevServer.createServer({
        after: () => {

        }
    });
}

module.exports = createServe
