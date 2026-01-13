module.exports = {
  apps: [
    {
      name: 'arteconew',
      script: 'npm',
      args: 'start:prod',
      cwd: '/var/www/arteconew',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
