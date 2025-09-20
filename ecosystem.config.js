// PM2 进程管理配置
module.exports = {
  apps: [
    {
      name: 'alpine-ski-points',
      script: 'npm',
      args: 'start',
      cwd: '/app',
      instances: 'max', // 根据CPU核心数启动实例
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      // 日志配置
      log_file: './logs/app.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',

      // 自动重启配置
      watch: false,
      ignore_watch: ['logs', 'node_modules'],
      max_memory_restart: '1G',

      // 进程管理
      min_uptime: '10s',
      max_restarts: 10,

      // 健康检查
      health_check_grace_period: 3000,

      // 环境变量
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ],

  // 部署配置
  deploy: {
    production: {
      user: 'root',
      host: ['your-server-ip'],
      ref: 'origin/main',
      repo: 'https://gitee.com/guangyikeji/ski.git',
      path: '/app',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};