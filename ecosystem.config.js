module.exports = {
  apps: [
    {
      name: 'arteconew',
      script: 'node_modules/.bin/next',
      args: 'start -H 0.0.0.0 -p 3000',
      cwd: '/var/www/arteconew',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
    },
  ],
}
