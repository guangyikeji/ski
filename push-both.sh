#!/bin/bash

# 双仓库同步推送脚本
# 同时推送到GitHub和Gitee

echo "🚀 开始推送到多个远程仓库..."

# 推送到GitHub (origin)
echo "📤 推送到GitHub..."
if git push origin main; then
    echo "✅ GitHub 推送成功"
else
    echo "❌ GitHub 推送失败"
    exit 1
fi

# 推送到Gitee (需要有效token)
echo "📤 推送到Gitee..."
if git push gitee main; then
    echo "✅ Gitee 推送成功"
else
    echo "⚠️  Gitee 推送失败 - 请检查访问令牌"
    echo "💡 请到 https://gitee.com/profile/personal_access_tokens 更新令牌"
fi

echo "🎉 推送流程完成！"