# 从0搭建一个Node Cli

> 参考

[用Node.js开发一个Command Line Interface (CLI)](https://zhuanlan.zhihu.com/p/38730825)

[开发前端 CLI 脚手架思路解析](https://mp.weixin.qq.com/s/iRN4CxP1gFpwyoInUeZtrw)

## 前沿

## git cz使用

### git cz

在`package`中配置：

- 默认配置选项
  
```json
    "config": {
        "commitizen": {
            "path": "cz-conventional-changelog"
        }
    }
```

- 自定义提交选项
  
```json
    "config": {
        "commitizen": {
             "path": "cz-customizable"
        }
    }
```

### npm release

生产`changelog`

- 指定版本
  
```bash
npm run release -- --release-as 1.1.0
```

- 主版本号

```bash
npm run release -- --release-as major
```  

生成`2`.0.0

- 次版本号

```bash
npm run release -- --release-as minor
```  

生成2.`2`.0

## 准备

node > 10.0.0

## 开始

### 搭建

- 创建`cli`对应的文件夹

`mkdir we-cli && cd we-cli`

- 创建`package`

`npm init`

添加入库文件配置

```json
   "main": "bin/we.js",
    "bin": {
        "we": "bin/we.js"
    }
```

- 创建入口文件

`mkdir bin && cd bin`

`touch we.js`

并输出

`console.log(this is my cli);`

- 全局使用

在命令行输入 `npm link` 或 `npm install -g` 将`cli`安装到全局，

这样就可以直接使用 `we` 命令了

## 用到的组件

- [figlet](https://link.zhihu.com/?target=https%3A//github.com/cmatsuoka/figlet) 基于ASCII字符组成的字符画【骚气的控制台输出】
- [commander](https://link.zhihu.com/?target=https%3A//github.com/tj/commander.js) CLI常用开发框架
- [chalk](https://link.zhihu.com/?target=https%3A//github.com/chalk/chalk) 终端文字加颜色js组件
- [clui](https://link.zhihu.com/?target=https%3A//github.com/nathanpeck/clui) spinners、sparklines、progress bars图样显示组件
- [shelljs](https://link.zhihu.com/?target=https%3A//github.com/shelljs/shelljs) node.js运行shell命令组件
- [blessed-contrib](https://link.zhihu.com/?target=https%3A//github.com/yaronn/blessed-contrib) 命令行可视化组件
- [inquirer](https://link.zhihu.com/?target=https%3A//github.com/SBoudrias/Inquirer.js) 命令行交互信息收集组件
- [log-symbols](https://github.com/sindresorhus/log-symbols) 可以在终端上显示出 √ 或 × 等的图标。

- More

[top-command-line-tools](https://stackify.com/top-command-line-tools/)

## 发布

[参考](https://juejin.cn/post/6877768129745944589)

- nrm ls

列出所有的`npm`源
  
- npm login

- npm publish

## 使用

## 版本

v0.1.0:

## 心得

### 关于Node

#### process.cwd()、__dirname和__filename的区别

- process.cwd() 
    
方法会返回 `Node.js` 进程的当前工作目录。

- __dirname 
  
当前模块的目录名。 相当于 `__filename` 的 `path.dirname()`。

- __filename 
  
当前模块的文件名。 这是当前的模块文件的绝对路径（符号链接会被解析）。


从 `/Users/mjr` 运行 `node example.js`：

```javascript
console.log(process.cwd());
// 打印: /Users/mjr
console.log(__filename);
// 打印: /Users/mjr/example.js
console.log(__dirname);
// 打印: /Users/mjr
```

当我们在 `webpackApp` 中执行 `we serve`,会打印出

```javascript
process.cwd() /Users/forguo/work/mine/we-cli/webpackApp
__dirname /Users/forguo/work/mine/we-cli/lib/config/webpack
__filename /Users/forguo/work/mine/we-cli/lib/config/webpack/webpack.dev.js
```

#### path.resolve()、path.join()的区别

- path.join()

`path.join()` 方法会将所有给定的 `path` 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径。

长度为零的 `path` 片段会被忽略。 如果连接后的路径字符串为长度为零的字符串，则返回 '.'，表示当前工作目录。

- path.resolve()

`path.resolve()` 方法会将路径或路径片段的序列解析为绝对路径。

