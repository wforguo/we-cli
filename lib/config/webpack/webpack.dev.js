/**
 *@description: webpack.config.js
 *@author: forguo
 *@date: 2021/1/4
 */
const path = require('path');
const ip = require('ip');
module.exports = {
    mode: 'development',
    entry: './app.js',
    output: {
        filename: 'bundle.js',
    },
    stats: {
        colors: true,
    },
    //...
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // publicPath: 'http://localhost:8080/assets/',
        compress: true,
        host: ip.address(),
        port: 9000,
        open: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''}
            }
        },
    }
}
