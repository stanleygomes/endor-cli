const nodevader = require('./apps/nodevader')
const juggernaut = require('./apps/juggernaut')

const boilerplates = {
  'NodeJS - Nodevader': nodevader,
  'React.js - Juggernaut': juggernaut
}

const select = (boilerplate) => {
  return boilerplates[boilerplate]
}

const getBoilerplates = () => {
  return Object.keys(boilerplates)
}

module.exports = {
  select,
  getBoilerplates
}
