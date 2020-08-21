const ecosystemConfig = {
  apps: [{
    name: 'app',
    script: 'src/index.js',
    instances: 1,
    autorestart: true,
    max_memory_restart: '500M',
    error_file: 'logs/error.log',
    out_file: 'logs/out.log',
    time: true,
    env: {
      PORT: 3000,
      NODE_ENV: 'development'
    },
    env_production: {
      PORT: 80,
      NODE_ENV: 'production'
    }
  }]
}

module.exports = ecosystemConfig
