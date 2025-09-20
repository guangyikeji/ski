#!/bin/bash

echo "🎿 高山滑雪积分系统 - 快速演示"
echo "=================================="

# 显示菜单
echo "请选择分享方式："
echo "1. Vercel云部署 (推荐) - 获得永久链接"
echo "2. 直接启动本地服务器 - 快速查看效果"
echo ""

read -p "请输入选项 (1-2): " choice

case $choice in
    1)
        echo ""
        echo "🚀 选择：Vercel云部署"
        echo "优势：永久链接、全球访问、自动更新"
        echo ""

        # 检查是否安装了Vercel CLI
        if ! command -v vercel &> /dev/null; then
            echo "📥 安装Vercel CLI..."
            npm install -g vercel
        fi

        # 检查是否已登录
        echo "🔐 检查Vercel登录状态..."
        if ! vercel whoami &> /dev/null; then
            echo "请登录Vercel (会打开浏览器):"
            vercel login
        fi

        echo "🔨 部署到Vercel..."
        vercel --prod

        echo ""
        echo "✅ 部署完成！"
        echo "📋 你的分享链接已生成，复制分享给用户即可"
        echo "🔗 管理面板: https://vercel.com/dashboard"
        ;;

    2)
        echo ""
        echo "🚀 选择：本地服务器"
        echo "优势：即时查看、快速测试"
        echo ""

        # 获取本机IP
        if command -v hostname &> /dev/null; then
            LOCAL_IP=$(hostname -I 2>/dev/null | awk '{print $1}')
        else
            LOCAL_IP="localhost"
        fi

        echo "🌐 启动本地服务器..."
        echo "📍 本地访问: http://localhost:3000"
        if [ "$LOCAL_IP" != "localhost" ]; then
            echo "🌐 局域网访问: http://$LOCAL_IP:3000"
        fi
        echo ""
        echo "📋 使用说明："
        echo "- 浏览器会自动打开应用"
        echo "- 按 Ctrl+C 停止服务器"
        echo "- 分享局域网地址给同网络用户"
        echo ""

        npm run dev
        ;;

    *)
        echo "❌ 无效选项，请重新运行脚本"
        exit 1
        ;;
esac