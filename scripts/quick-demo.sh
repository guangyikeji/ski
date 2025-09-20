#!/bin/bash

echo "🎿 高山滑雪积分系统 - 快速演示"
echo "=================================="

# 显示菜单
echo "请选择分享方式："
echo "1. Vercel云部署 (推荐) - 获得永久链接"
echo "2. ngrok内网穿透 - 即时分享本地项目"
echo "3. cpolar内网穿透 - 国内优化版本"
echo "4. 本地网络分享 - 局域网内访问"
echo ""

read -p "请输入选项 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 选择：Vercel云部署"
        echo "优势：永久链接、全球访问、自动更新"
        echo ""

        if ! command -v vercel &> /dev/null; then
            echo "📥 安装Vercel CLI..."
            npm install -g vercel
        fi

        echo "🔐 登录Vercel (会打开浏览器)..."
        vercel login

        echo "🔨 构建并部署..."
        vercel --prod

        echo "✅ 部署完成！"
        echo "📋 你的分享链接已生成，复制分享给用户即可"
        ;;

    2)
        echo ""
        echo "🔗 选择：ngrok内网穿透"
        echo "优势：即时分享、实时预览"
        echo ""

        if ! command -v ngrok &> /dev/null; then
            echo "❌ ngrok未安装"
            echo "请访问 https://ngrok.com/download 下载"
            exit 1
        fi

        ./scripts/ngrok-share.sh
        ;;

    3)
        echo ""
        echo "🔗 选择：cpolar内网穿透"
        echo "优势：国内优化、稳定快速"
        echo ""

        if ! command -v cpolar &> /dev/null; then
            echo "📥 请先安装cpolar："
            echo "1. 访问 https://www.cpolar.com"
            echo "2. 注册并下载客户端"
            echo "3. 重新运行此脚本"
            exit 1
        fi

        echo "🚀 启动本地服务器..."
        npm run dev &
        LOCAL_PID=$!

        sleep 3
        echo "🌐 启动cpolar隧道..."
        cpolar http 3000
        ;;

    4)
        echo ""
        echo "🏠 选择：本地网络分享"
        echo "优势：局域网内快速访问"
        echo ""

        # 获取本机IP
        LOCAL_IP=$(hostname -I | awk '{print $1}')

        echo "🚀 启动本地服务器..."
        echo "📍 本地访问: http://localhost:3000"
        echo "🌐 局域网访问: http://$LOCAL_IP:3000"
        echo ""
        echo "📋 分享给同网络用户："
        echo "   电脑: http://$LOCAL_IP:3000"
        echo "   手机: 连接同一WiFi，访问上述地址"
        echo ""
        echo "⚠️  确保防火墙允许3000端口访问"

        npm run dev
        ;;

    *)
        echo "❌ 无效选项，请重新运行脚本"
        exit 1
        ;;
esac