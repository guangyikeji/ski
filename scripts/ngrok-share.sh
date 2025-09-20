#!/bin/bash

echo "🔗 启动内网穿透分享..."

# 检查ngrok是否安装
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok未安装"
    echo "请访问 https://ngrok.com/download 下载安装"
    echo ""
    echo "💡 或者使用cpolar国内版："
    echo "1. 访问 https://www.cpolar.com"
    echo "2. 注册并下载客户端"
    echo "3. 运行: cpolar http 3000"
    exit 1
fi

# 检查是否已有ngrok配置
if ! ngrok config check &> /dev/null; then
    echo "🔐 请先配置ngrok authtoken："
    echo "1. 访问 https://dashboard.ngrok.com/get-started/your-authtoken"
    echo "2. 复制token并运行: ngrok config add-authtoken <your-token>"
    exit 1
fi

# 启动本地开发服务器
echo "🚀 启动本地开发服务器..."
npm run dev &
LOCAL_PID=$!

# 等待服务器启动
echo "⏰ 等待服务器启动..."
sleep 5

# 检查本地服务器是否运行
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ 本地服务器启动失败"
    kill $LOCAL_PID 2>/dev/null
    exit 1
fi

echo "✅ 本地服务器运行中..."
echo "🌐 启动ngrok隧道..."

# 启动ngrok
ngrok http 3000 &
NGROK_PID=$!

echo ""
echo "✅ 分享设置完成！"
echo ""
echo "📋 使用说明："
echo "1. ngrok会自动打开浏览器显示公网地址"
echo "2. 复制https://开头的地址分享给用户"
echo "3. 按Ctrl+C停止分享"
echo ""
echo "⚠️  注意事项："
echo "- 免费版每次启动URL会变化"
echo "- 分享链接在你的电脑关机后失效"
echo "- 建议升级到付费版获得固定域名"

# 清理函数
cleanup() {
    echo ""
    echo "🛑 停止分享..."
    kill $NGROK_PID 2>/dev/null
    kill $LOCAL_PID 2>/dev/null
    echo "✅ 已停止所有服务"
    exit 0
}

# 捕获Ctrl+C信号
trap cleanup SIGINT SIGTERM

# 保持脚本运行
wait