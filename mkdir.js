#!/usr/bin/env babel-node

require('./helper')
const fs = require('fs').promise
const path = require('path')
require('songbird')
const argv = require('yargs').argv

async function mkdir(dirName) {
  // process.stdout.write('creating directory : ' + dirName.toString() + '\n')
  const fileExists = await fs.exists(dirName)
  if(fileExists) {
    process.stdout.write(dirName + ' already exists\n')
    return
  }
  await fs.mkdir(dirName.toString())

}

async function main() {
  await mkdir(argv._.toString())
}

main()
