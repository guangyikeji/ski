#!/bin/bash

# 高山滑雪积分系统 - 云服务器部署脚本
echo "🎿 开始部署高山滑雪积分系统..."

# 检查环境
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi

# 创建必要目录
mkdir -p logs
mkdir -p ssl

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查是否安装了PM2
if ! command -v pm2 &> /dev/null; then
    echo "📥 安装 PM2..."
    npm install -g pm2
fi

# 复制环境变量文件
if [ ! -f .env ]; then
    echo "📝 创建环境变量文件..."
    cp .env.example .env
    echo "⚠️  请编辑 .env 文件配置您的环境变量"
fi

# 启动应用
echo "🚀 启动应用..."
pm2 start ecosystem.config.js --env production

# 保存PM2配置
pm2 save
pm2 startup

echo "✅ 部署完成！"
echo "📊 应用状态: pm2 status"
echo "📝 查看日志: pm2 logs alpine-ski-points"
echo "🔄 重启应用: pm2 restart alpine-ski-points"
echo "🛑 停止应用: pm2 stop alpine-ski-points"

# 显示应用地址
echo ""
echo "🌐 应用访问地址:"
echo "   本地: http://localhost:3000"
if [ ! -z "$DOMAIN" ]; then
    echo "   域名: https://$DOMAIN"
fi

echo ""
echo "📋 下一步操作:"
echo "1. 配置域名解析指向服务器IP"
echo "2. 申请SSL证书并放置到 ssl/ 目录"
echo "3. 配置 nginx.conf 中的域名"
echo "4. 启动 Nginx: sudo systemctl start nginx"