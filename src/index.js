const express = require('./express')

express.app.listen(express.config.port, () => console.log(`Running on port ${express.config.port}. Started at: ${express.time}`))
