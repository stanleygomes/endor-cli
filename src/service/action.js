const inquirer = require('inquirer')
const chalk = require('chalk')
const exec = require('./exec')
const repoService = require('./repo')

const questions = [
  {
    type: 'list',
    name: 'repository',
    message: 'Choose your starter boilerplate:',
    choices: repoService.getBoilerplates()
  },
  {
    type: 'input',
    name: 'folder',
    message: 'Name your app folder:'
  }
]

const create = () => {
  inquirer
    .prompt(questions)
    .then(({ repository, folder }) => {
      const repoInfo = repoService.select(repository)

      exec.clone(repoInfo.url, folder)
      exec.run(folder, repoInfo.postInstall)

      console.log(chalk.green(`🚀 Great. Now, you're up and ready to go!

      `))
    }).catch((e) => {
      console.error(chalk.red(e.message))
    }).finally(() => {
      console.log('Bye!')
    })
}

module.exports = {
  create
}
