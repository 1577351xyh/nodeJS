const homedir = require('os').homedir()
const home = process.env.HOME || homedir  // 获取用户当前执行命令的绝对路径

const path = require('path')
const fs = require('fs')
const { resolve } = require('path')
const { rejects } = require('assert')
const dbPath = path.join(home, '.todo')
const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (error, data) => {
        if (error) return reject(error)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(path, string + '\n', (error) => {
        if (error) return reject(error)
        resolve()
      })
    })
  }
}


module.exports = db