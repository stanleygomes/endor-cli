const app = {
  name: 'Nodevader',
  description: 'A nodejs boilerplate. Come to the node side 🚀 🌑',
  url: 'https://github.com/stanleygomes/nodevader',
  postInstall: `
    cp .env.template .env
    npm install
  `
}

module.exports = app
