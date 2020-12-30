/**
 *@description: download-git-repo
 *@author: forguo
 *@date: 2020/12/30
 */
const download = require('download-git-repo');

/**
 * @param repository 仓库地址
 * @desc 不是复制的https://github.com/xxx/xxx.git
 * @desc 正确写法：'github:username/repository#master'
 * @param tmpdir 项目目录
 * @param clone
 * @return {Promise<unknown>}
 */
const downloadGitRepo = function (repository, tmpdir, clone = false) {
    return new Promise((resolve, reject) => {
        download(repository, tmpdir, { clone }, err => {
            if (err) return reject(err)
            resolve()
        })
    })
}

module.exports = downloadGitRepo;
