#!/usr/bin/envnode

const { Command } = require('commander')
const pkg = require('../package.json')
const action = require('./service/action')
const i18n = require('./utils/i18n')

const program = new Command()

program
  .version(pkg.version)
  .command('create')
  .description(i18n.translate('createCall'))
  .action(action.create)
  .parse(process.argv)
