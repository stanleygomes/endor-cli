const { cd, exec } = require('shelljs')
const chalk = require('chalk')
const i18n = require('../utils/i18n')

const clone = (repo, folder) => {
  if (repo == null) {
    throw new Error(i18n.translate('emptyRepositoryUrl'))
  }

  if (folder == null) {
    throw new Error(i18n.translate('emptyFolderName'))
  }

  const cloneCommand = `
    git clone ${repo} ${folder}
  `

  return exec(cloneCommand)
}

const run = (folder, commands) => {
  cd(folder)

  console.log(chalk.green(`We're running some special commands to save time:

    ${commands}
  `))

  return exec(commands)
}

module.exports = {
  clone,
  run
}
