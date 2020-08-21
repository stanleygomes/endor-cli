const welcome = (req, res) => {
  return new Promise((resolve, reject) => {
    const message = {
      message: 'Hello world! 🚀'
    }

    resolve(message)
  })
}

module.exports = {
  welcome
}
