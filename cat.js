#!/usr/bin/env babel-node


require('./helper')
const fs = require('fs').promise
// const path = require('path')
require('songbird')
const argv = require('yargs').argv

async function cat(fileName) {
  process.stdout.write('reading file : ' + fileName.toString() + '\n')
  const fileStat = await fs.stat(fileName);
  // process.stdout.write('fileStat: ' + fileStat)
  if (!fileStat.isFile()) {
    process.stdout.write(fileName + ' is not a valid file\n')
    return
  }
  process.stdout.write('started reading\n')
  const data = await fs.readFile(fileName, 'utf8')
  process.stdout.write(data)
  process.stdout.write('\n')
}

async function main() {
  await cat(argv._.toString())
}

main()
