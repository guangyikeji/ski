#!/bin/bash
# Pandoc安装脚本 - Ubuntu/WSL2

echo "🚀 开始安装Pandoc..."
echo

# 检查是否有sudo权限
if ! sudo -n true 2>/dev/null; then
    echo "❗ 需要sudo权限，请输入密码"
fi

# 更新软件包列表
echo "📦 更新软件包列表..."
sudo apt update

# 安装Pandoc
echo "⚡ 安装Pandoc..."
sudo apt install -y pandoc

# 检查安装是否成功
if command -v pandoc &> /dev/null; then
    echo "✅ Pandoc安装成功！"
    echo "版本信息:"
    pandoc --version | head -n 1
else
    echo "❌ Pandoc安装失败"
    exit 1
fi

# 可选：安装LaTeX支持（用于PDF转换）
echo
read -p "🤔 是否安装LaTeX支持(用于PDF转换)? (y/N): " install_latex
if [[ $install_latex =~ ^[Yy]$ ]]; then
    echo "📖 安装LaTeX组件（可能需要几分钟）..."
    sudo apt install -y texlive-latex-base texlive-fonts-recommended texlive-xetex texlive-lang-chinese
    echo "✅ LaTeX支持安装完成"
fi

echo
echo "🎉 安装完成！现在可以使用以下命令转换文档："
echo
echo "转换为Word文档:"
echo 'pandoc "input.md" -o "output.docx"'
echo
echo "转换为PDF:"
echo 'pandoc "input.md" -o "output.pdf"'
echo
echo "带中文支持的PDF转换:"
echo 'pandoc "input.md" -o "output.pdf" --pdf-engine=xelatex -V CJKmainfont="SimSun"'