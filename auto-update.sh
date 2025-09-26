#!/bin/bash

# 自动更新脚本 - 用于在修改完成后自动推送到develop分支
# 使用方法: ./auto-update.sh "提交信息"

set -e  # 遇到错误立即退出

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

# 检查参数
if [ $# -eq 0 ]; then
    COMMIT_MSG="feat: 自动更新代码修改

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
else
    COMMIT_MSG="$1

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
fi

log_info "开始自动更新流程..."

# 检查是否在git仓库中
if [ ! -d ".git" ]; then
    log_error "当前目录不是git仓库!"
    exit 1
fi

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
log_info "当前分支: $CURRENT_BRANCH"

# 检查是否有未提交的更改
if ! git diff-index --quiet HEAD --; then
    log_info "发现未提交的更改，准备提交..."

    # 显示状态
    log_info "Git状态:"
    git status --short

    # 添加所有更改
    log_info "添加所有更改到暂存区..."
    git add .

    # 提交更改
    log_info "提交更改..."
    git commit -m "$COMMIT_MSG"
    log_success "代码已提交到本地仓库"

    # 推送到远程仓库
    log_info "推送到远程仓库..."

    # 推送到GitHub
    if git remote | grep -q "github"; then
        log_info "推送到GitHub..."
        if git push github "$CURRENT_BRANCH"; then
            log_success "成功推送到GitHub $CURRENT_BRANCH"
        else
            log_warning "推送到GitHub失败，可能需要检查网络连接或权限"
        fi
    elif git remote | grep -q "origin"; then
        log_info "推送到GitHub origin..."
        if git push origin "$CURRENT_BRANCH"; then
            log_success "成功推送到GitHub origin/$CURRENT_BRANCH"
        else
            log_warning "推送到GitHub失败，可能需要检查网络连接或权限"
        fi
    fi

    # 推送到Gitee
    if git remote | grep -q "gitee"; then
        log_info "推送到Gitee..."
        if git push gitee "$CURRENT_BRANCH"; then
            log_success "成功推送到Gitee $CURRENT_BRANCH"
        else
            log_warning "推送到Gitee失败，可能需要检查网络连接或权限"
        fi
    fi

else
    log_info "没有发现未提交的更改"

    # 检查是否需要推送
    if [ "$(git rev-list HEAD...origin/$CURRENT_BRANCH --count 2>/dev/null || echo 0)" -gt 0 ]; then
        log_info "本地有未推送的提交，推送到远程仓库..."

        # 推送到GitHub
        if git remote | grep -q "github"; then
            log_info "推送到GitHub..."
            if git push github "$CURRENT_BRANCH"; then
                log_success "成功推送到GitHub $CURRENT_BRANCH"
            else
                log_warning "推送到GitHub失败"
            fi
        elif git remote | grep -q "origin"; then
            log_info "推送到GitHub origin..."
            if git push origin "$CURRENT_BRANCH"; then
                log_success "成功推送到GitHub origin/$CURRENT_BRANCH"
            else
                log_warning "推送到GitHub失败"
            fi
        fi

        # 推送到Gitee
        if git remote | grep -q "gitee"; then
            log_info "推送到Gitee..."
            if git push gitee "$CURRENT_BRANCH"; then
                log_success "成功推送到Gitee $CURRENT_BRANCH"
            else
                log_warning "推送到Gitee失败"
            fi
        fi
    else
        log_info "远程仓库已是最新状态"
    fi
fi

# 显示远程仓库链接
log_info "远程仓库链接:"
if git remote | grep -q "github"; then
    GITHUB_URL=$(git remote get-url github)
    log_info "📱 GitHub: $GITHUB_URL"
elif git remote | grep -q "origin"; then
    GITHUB_URL=$(git remote get-url origin)
    log_info "📱 GitHub: $GITHUB_URL"
fi

if git remote | grep -q "gitee"; then
    GITEE_URL=$(git remote get-url gitee)
    log_info "🔗 Gitee: $GITEE_URL"
fi

log_success "自动更新完成! ✨"

# 显示最新提交信息
log_info "最新提交:"
git log --oneline -1