#!/bin/bash
# Markdown文档转换脚本

echo "📄 Markdown文档转换工具"
echo "========================="

# 检查Pandoc是否已安装
if ! command -v pandoc &> /dev/null; then
    echo "❌ Pandoc未安装，请先运行 ./install-pandoc.sh"
    exit 1
fi

# 源文件
SOURCE_MD="中国高山滑雪赛事积分规则v1.1_完整版含公式.md"
COMPARISON_MD="FIS标准与中国优化对照表.md"

# 检查源文件是否存在
if [ ! -f "$SOURCE_MD" ]; then
    echo "❌ 找不到源文件: $SOURCE_MD"
    echo "📁 当前目录文件列表:"
    ls -la *.md 2>/dev/null || echo "当前目录没有MD文件"
    exit 1
fi

echo "📁 找到源文件: $SOURCE_MD"
echo

# 转换为DOCX
echo "🔄 转换为Word文档..."
pandoc "$SOURCE_MD" -o "中国高山滑雪赛事积分规则v1.1.docx" \
    --reference-doc=/dev/null \
    --metadata title="中国高山滑雪赛事积分规则v1.1" \
    --metadata author="技术团队-光一科技" \
    --metadata date="$(date '+%Y年%m月%d日')"

if [ $? -eq 0 ]; then
    echo "✅ Word文档转换成功: 中国高山滑雪赛事积分规则v1.1.docx"
else
    echo "❌ Word文档转换失败"
fi

# 转换对照表为DOCX
if [ -f "$COMPARISON_MD" ]; then
    echo "🔄 转换对照表为Word文档..."
    pandoc "$COMPARISON_MD" -o "FIS标准与中国优化对照表.docx" \
        --metadata title="FIS标准与中国优化对照表" \
        --metadata author="技术团队-光一科技"

    if [ $? -eq 0 ]; then
        echo "✅ 对照表Word文档转换成功: FIS标准与中国优化对照表.docx"
    fi
fi

# 转换为PDF (需要LaTeX支持)
echo
read -p "🤔 是否转换为PDF? (需要LaTeX支持) (y/N): " convert_pdf
if [[ $convert_pdf =~ ^[Yy]$ ]]; then
    echo "🔄 转换为PDF..."

    # 检查是否有xelatex
    if command -v xelatex &> /dev/null; then
        pandoc "$SOURCE_MD" -o "中国高山滑雪赛事积分规则v1.1.pdf" \
            --pdf-engine=xelatex \
            -V CJKmainfont="SimSun" \
            -V geometry:margin=2cm \
            --metadata title="中国高山滑雪赛事积分规则v1.1" \
            --metadata author="技术团队-光一科技"

        if [ $? -eq 0 ]; then
            echo "✅ PDF转换成功: 中国高山滑雪赛事积分规则v1.1.pdf"
        else
            echo "❌ PDF转换失败，可能需要安装中文字体支持"
        fi
    else
        echo "❌ 未找到xelatex，请先安装LaTeX支持"
        echo "运行: sudo apt install texlive-xetex texlive-lang-chinese"
    fi
fi

echo
echo "🎉 转换完成！生成的文件:"
ls -la *.docx *.pdf 2>/dev/null | grep -E "\.(docx|pdf)$" || echo "没有找到转换后的文件"

echo
echo "💡 提示: 如果Word打开有格式问题，可以尝试："
echo "1. 在Word中选择'开发工具' → '文档模板' → '加载'"
echo "2. 或者直接复制内容到新的Word文档中"