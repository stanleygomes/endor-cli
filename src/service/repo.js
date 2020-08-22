const nodevader = require('./apps/nodevader')
const juggernaut = require('./apps/juggernaut')

const select = (boilerplate) => {
  switch (boilerplate) {
    case 'NodeJS - Nodevader':
      return nodevader
    case 'React.js - Juggernaut':
      return juggernaut
    default:
      return nodevader
  }
}

module.exports = {
  select
}
