/**
 * @Description: webpack.prod.配置
 * @author: forguo
 * @date: 2020/9/1
 */
const chalk = require("chalk");
const { merge } = require('webpack-merge');
const webpack = require("webpack");
const path = require("path");
const ip = require("ip");

// 友好的错误提示
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.common.js');
const domain = require('./domainConfig');
const { env: environmental } = domain;
const workDir = process.cwd();
const host = ip.address() || '0.0.0.0';
const port = 10086;
console.log(chalk.blue(`start a serve in the file:${workDir}`));
module.exports = merge(common, {
    mode: 'development',
    stats: {
        all: false,
    },
    devtool: "inline-source-map",
    output: {
        filename: "js/[name].[hash].js",
    },
    devServer: {
        // open: true,
        open: 'Google Chrome',
        contentBase: path.resolve(workDir, "dist"),
        port,
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
        host,
        noInfo: true, // 禁止显示诸如 Webpack 捆绑包信息之类的消息
        // useLocalIp: true,
        proxy: {
            '/api/*': {
                target: domain[environmental].api,
                changeOrigin: true,
                pathRewrite: {'^/api': '/api'}
            },
            '/star/*': {
                target: domain[environmental].api,
                changeOrigin: true,
                pathRewrite: {'^/star': '/star'}
            },
            '/wx/*': {
                target: domain[environmental].api,
                changeOrigin: true,
                pathRewrite: {'^/wx': '/wx'}
            }
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`App running at:\n- Local:   http://localhost:${port}\n- Network: http://${host}:${port}`],
            }
        }),
    ]
});
