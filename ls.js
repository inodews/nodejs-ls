#!/usr/bin/env babel-node

require('./helper')
const fs = require('fs').promise
const path = require('path')
require('songbird')
const { dir } = require('yargs').default('dir', __dirname).argv


async function ls(dirName) {
  // Your implementation here
  // process.stdout.write('received dir:' + dirName + 'for listing\n')
  let fileStat = await fs.stat(dirName);
  if (!fileStat.isDirectory()) {
    // process.stdout.write(dirName + '\n')
    return [dirName]
  }
  process.stdout.write(dirName + '\n')
  const fileNames = await fs.readdir(dirName)
  // process.stdout.write('fileNames received' + fileNames + '\n')
  let lsPromises = []
  for (const fileName of fileNames) {
    const filePath = path.join(dirName, fileName)
    // process.stdout.write('filePath formed' + filePath + '\n')
    fileStat = await fs.stat(filePath)
    // process.stdout.write('fileStat formed' + fileStat + '\n')
    if (fileStat.isDirectory()) {
      let promise = ls(filePath)
      lsPromises.push(promise)
    }
    process.stdout.write(filePath + '\n')
  }
  await Promise.all(lsPromises)
}

async function main() {
  const startTime = process.hrtime()[0]
  await ls(dir)
  const endTime = process.hrtime()[0]
  const totalTime = endTime - startTime
  process.stdout.write('TotalTime=' + totalTime + '\n')
}

main()
