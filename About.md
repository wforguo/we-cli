# 从0搭建一个Cli

> 参考

[用Node.js开发一个Command Line Interface (CLI)](https://zhuanlan.zhihu.com/p/38730825)

[从零开发一个Node Cli](https://juejin.cn/post/6844904080830103560)

## 前沿

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
