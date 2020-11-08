#!/usr/bin/env node
const program = require('commander')
const api = require('./index.js')
const pkg = require('./package.json')

program
  .version(pkg.version)
program
  .command('add')
  .description('add a task')
  .action((args) => {
    const words = args.args[0]
    api.add(words).then(() => { console.log('创建成功') }, () => { console.log('删除失败') })
  })
program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear().then(() => { console.log('清除完毕') }, () => { console.log('清除失败') })
  })

program
  .command('all')
  .description('all tasks')
  .action(() => {
    void api.showAll()
  })
program.parse(process.argv)