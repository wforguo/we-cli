/**
 *@description: create a serve
 *@author: forguo
 *@date: 2021/1/4
 */
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const WebpackConfig = require('./config/webpack/webpack.dev');
console.log(WebpackConfig.devServer);
const createServe = () => {
    // create compiler
    const compiler = Webpack(WebpackConfig);
    const server = new WebpackDevServer(compiler, Object.assign({}, WebpackConfig.devServer));
    const {
        port,
        host
    } = WebpackConfig.devServer;
    server.listen(port, host, err => {
        console.log(`Starting server on http://${host}:${port}`);
        if (err) {
            console.log(err);
            // reject(err)
        }
    })
}

module.exports = createServe
