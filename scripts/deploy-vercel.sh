#!/bin/bash

echo "🚀 开始部署到Vercel..."

# 检查是否安装了Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📥 安装Vercel CLI..."
    npm install -g vercel
fi

# 检查是否已登录
echo "🔐 检查Vercel登录状态..."
if ! vercel whoami &> /dev/null; then
    echo "请先登录Vercel："
    vercel login
fi

# 构建和部署
echo "🔨 构建项目..."
npm run build

echo "🌐 部署到Vercel..."
vercel --prod

echo "✅ 部署完成！"
echo ""
echo "📋 接下来的操作："
echo "1. 复制Vercel提供的URL地址"
echo "2. 分享给其他用户试用"
echo "3. 每次git push后会自动更新"
echo ""
echo "🔗 管理面板: https://vercel.com/dashboard"