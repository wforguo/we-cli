/**
 *@description: webpack.common.js
 *@author: forguo
 *@date: 2021/1/18
 */
const path = require('path');
const webpack = require('webpack'); // to access built-in plugins

// 这个大部分人应该都知道，自动创建 HTML 模板供 Webpack 打包结果使用，功能还是蛮强大的，包括文件名称 模板参数 meta 标签配置 压缩等等。SPA 与 MPA 都会使用到。
const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm

// 用于将静态文件拷贝到你的输出目录下，有时一些文件并没有适用的 loader 或者是不需要经过处理，原样复制的文件。
const CopyWebpackPlugin = require("copy-webpack-plugin");

// 友好的进度条
const WebpackBar = require('webpackbar');

const { name } = require('../../../package');

const _DEV_ = process.env.NODE_ENV === 'development';

const workDir = process.cwd();

module.exports = {
    entry: [path.resolve(workDir, './src/App.js')],
    output: {
        path: path.resolve(workDir, './dist'),
        filename: "js/[name].[chunkhash:8].js",
        publicPath: '/',
    },
    module: {
        rules: [
            // {
            //     enforce: "pre",
            //     test: /\.js|jsx$/,
            //     include: path.resolve(workDir, '../src'),
            //     use: ['eslint-loader']
            // },
            {
                test: /\.js|jsx$/,
                use: ["thread-loader", "babel-loader?cacheDirectory=true"],
                include: path.resolve(workDir, '../src')
            },
            {
                test:/\.css$/,
                use: ['thread-loader', 'style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'
                ],
                include: path.join(workDir, "../src")
            },
            {
                test: /\.(png|jpg|gif|svg|bmp|mp4)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit:8192,
                            name:"imgs/[name].[hash:8].[ext]",
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            },
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(workDir, "public/index.html"),
            filename: "index.html",
            inject: true,
            icon: path.join(workDir, "public/favicon.ico"),
            minify: _DEV_ ? false : {
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                useShortDoctype: true,
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(workDir, "public/index.html"),
                    to: path.resolve(workDir, "./dist")
                },
            ],
        }),
        new WebpackBar({
            name: name || 'WeCli',
            color: '#61dafb', // react 蓝
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 300,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'all'
                },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        }
    },
};
