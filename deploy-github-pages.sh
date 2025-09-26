#!/bin/bash

# GitHub Pages 便捷部署脚本
# 用于快速更新网站内容

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否在正确的目录
if [ ! -d "alpine-ski-points" ]; then
    log_error "请在项目根目录运行此脚本（应该包含alpine-ski-points目录）"
    exit 1
fi

log_info "开始GitHub Pages部署流程..."

# 检查提交信息参数
if [ $# -eq 0 ]; then
    COMMIT_MSG="chore: 更新GitHub Pages网站内容

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
else
    COMMIT_MSG="$1

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
fi

# 进入项目目录
cd alpine-ski-points

log_info "清理旧的构建文件..."
rm -rf ../docs/*

log_info "构建静态网站..."
DIRECT_DEPLOY=true npm run build

if [ $? -ne 0 ]; then
    log_error "构建失败，请检查代码错误"
    exit 1
fi

cd ..

# 检查docs目录是否有内容
if [ ! -f "docs/index.html" ]; then
    log_error "构建失败：docs目录中没有找到index.html"
    exit 1
fi

log_success "构建完成！生成了 $(find docs -name "*.html" | wc -l) 个HTML页面"

# Git操作
log_info "检查Git状态..."
if ! git diff-index --quiet HEAD --; then
    log_info "发现文件更改，准备提交..."

    # 添加所有更改
    git add .

    # 提交更改
    log_info "提交更改..."
    git commit -m "$COMMIT_MSG"

    # 推送到远程仓库
    log_info "推送到GitHub..."
    if git push github development; then
        log_success "成功推送到GitHub development分支"
    else
        log_warning "推送失败，请检查网络连接或权限"
        exit 1
    fi
else
    log_info "没有文件更改，检查是否需要推送..."

    # 检查是否有未推送的提交
    if [ "$(git rev-list HEAD...github/development --count 2>/dev/null || echo 0)" -gt 0 ]; then
        log_info "发现未推送的提交，推送到远程仓库..."
        if git push github development; then
            log_success "成功推送到GitHub development分支"
        else
            log_warning "推送失败，请检查网络连接或权限"
        fi
    else
        log_info "远程仓库已是最新状态"
    fi
fi

# 显示部署信息
log_info "部署信息:"
echo -e "${BLUE}📱 GitHub仓库:${NC} https://github.com/guangyikeji/ski"
echo -e "${BLUE}🌐 网站地址:${NC} https://guangyikeji.github.io/ski/"
echo -e "${BLUE}⏰ 部署时间:${NC} $(date)"

log_success "GitHub Pages部署完成! ✨"

# 等待几秒钟让GitHub Pages更新
log_info "等待GitHub Pages更新..."
sleep 10

# 测试网站是否可访问
log_info "测试网站访问..."
if curl -s --head https://guangyikeji.github.io/ski/ | head -n 1 | grep -q "200 OK"; then
    log_success "网站访问正常！"
    echo -e "${GREEN}🎉 您可以访问: https://guangyikeji.github.io/ski/${NC}"
else
    log_warning "网站可能还在部署中，请稍等1-2分钟后访问"
fi

log_info "最新提交:"
git log --oneline -1