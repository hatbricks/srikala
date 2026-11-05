// PM2 process file. From backend/, run: pm2 reload ecosystem.config.cjs || pm2 start ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: 'ravichandra-api',
      script: 'src/index.js',
      cwd: __dirname,
      // Cluster mode load balances HTTP requests across all CPU cores automatically
      instances: process.env.PM2_INSTANCES || 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      // Automatically restart a worker if it leaks memory beyond 500MB
      max_memory_restart: '500M',
      // Restart on crash, capped at 10 to avoid loop if DB is down
      max_restarts: 10,
      min_uptime: '10s',
      watch: false,
      // Zero-downtime rolling reload configuration
      listen_timeout: 8000,
      kill_timeout: 4000,
    },
  ],
};
