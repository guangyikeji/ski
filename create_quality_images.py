#!/usr/bin/env python3
"""
创建高质量的滑雪主题图片 - 简洁版
"""
from PIL import Image, ImageDraw, ImageEnhance
import random
import os

def create_alpine_background(width=1200, height=800, filename="alpine-skiing-bg.jpg"):
    """创建高质量的高山滑雪背景"""
    img = Image.new('RGB', (width, height), color='#E6F3FF')  # 浅蓝天空
    draw = ImageDraw.Draw(img)

    # 远山背景 - 渐变效果
    for i in range(3):
        gray_val = 180 - i * 30
        mountain_color = (gray_val, gray_val, gray_val + 20)

        # 山峰轮廓
        points = [
            (0, height * (0.6 + i * 0.05)),
            (width * 0.2, height * (0.3 - i * 0.02)),
            (width * 0.4, height * (0.35 - i * 0.02)),
            (width * 0.6, height * (0.25 - i * 0.02)),
            (width * 0.8, height * (0.4 - i * 0.02)),
            (width, height * (0.5 + i * 0.05)),
            (width, height),
            (0, height)
        ]
        draw.polygon(points, fill=mountain_color)

    # 雪峰
    snow_peaks = [
        (width * 0.2, height * 0.3),
        (width * 0.6, height * 0.25),
        (width * 0.8, height * 0.4)
    ]
    for peak in snow_peaks:
        snow_points = [
            peak,
            (peak[0] - 30, peak[1] + 40),
            (peak[0] + 30, peak[1] + 40)
        ]
        draw.polygon(snow_points, fill='#FFFFFF')

    img.save(f"public/images/{filename}", quality=90)

def create_ski_action(width=800, height=600, filename="ski-action.jpg"):
    """创建滑雪动作图片"""
    img = Image.new('RGB', (width, height), color='#B8E6FF')  # 明亮天空蓝
    draw = ImageDraw.Draw(img)

    # 雪道
    slope_points = [
        (0, height * 0.4),
        (width, height * 0.7),
        (width, height),
        (0, height)
    ]
    draw.polygon(slope_points, fill='#FFFFFF')

    # 滑雪轨迹 - 动感曲线
    for i in range(20):
        x = i * (width / 19)
        y = height * 0.5 + 30 * (1 if i % 4 < 2 else -1) * (i / 20)
        if i > 0:
            prev_x = (i-1) * (width / 19)
            prev_y = height * 0.5 + 30 * (1 if (i-1) % 4 < 2 else -1) * ((i-1) / 20)
            draw.line([(prev_x, prev_y), (x, y)], fill='#4169E1', width=3)

    # 雪花效果
    for _ in range(15):
        x = random.randint(0, width)
        y = random.randint(0, int(height * 0.7))
        draw.ellipse([x-2, y-2, x+2, y+2], fill='#FFFFFF')

    img.save(f"public/images/{filename}", quality=90)

def create_mountain_view(width=1000, height=600, filename="ski-mountain-view.jpg"):
    """创建雪山全景"""
    img = Image.new('RGB', (width, height), color='#E0F6FF')  # 清晨天空色
    draw = ImageDraw.Draw(img)

    # 主山脉
    main_mountain = [
        (0, height * 0.5),
        (width * 0.15, height * 0.2),
        (width * 0.3, height * 0.3),
        (width * 0.5, height * 0.15),
        (width * 0.7, height * 0.25),
        (width * 0.85, height * 0.35),
        (width, height * 0.45),
        (width, height),
        (0, height)
    ]
    draw.polygon(main_mountain, fill='#A0A0A0')

    # 雪线
    snow_line = [
        (width * 0.15, height * 0.2),
        (width * 0.25, height * 0.22),
        (width * 0.35, height * 0.28),
        (width * 0.5, height * 0.15),
        (width * 0.65, height * 0.18),
        (width * 0.7, height * 0.25),
        (width * 0.8, height * 0.27),
        (width * 0.85, height * 0.35)
    ]

    # 简化的雪覆盖
    for i in range(0, len(snow_line)-1, 2):
        if i+1 < len(snow_line):
            x1, y1 = snow_line[i]
            x2, y2 = snow_line[i+1]
            # 雪覆盖区域
            snow_area = [
                (x1, y1),
                (x2, y2),
                (x2, 0),
                (x1, 0)
            ]
            draw.polygon(snow_area, fill='#FFFFFF')

    img.save(f"public/images/{filename}", quality=90)

def create_simple_snow_scene(width=600, height=400, filename="alpine-snow.jpg"):
    """创建简洁雪景"""
    img = Image.new('RGB', (width, height), color='#F0F8FF')  # 雪白背景
    draw = ImageDraw.Draw(img)

    # 简单的山丘
    hill1 = [
        (0, height * 0.6),
        (width * 0.4, height * 0.3),
        (width * 0.8, height * 0.5),
        (width, height * 0.4),
        (width, height),
        (0, height)
    ]
    draw.polygon(hill1, fill='#E8E8E8')

    # 前景雪丘
    hill2 = [
        (0, height * 0.8),
        (width * 0.6, height * 0.6),
        (width, height * 0.75),
        (width, height),
        (0, height)
    ]
    draw.polygon(hill2, fill='#FFFFFF')

    img.save(f"public/images/{filename}", quality=90)

def create_resort_view(width=900, height=600, filename="ski-resort-view.jpg"):
    """创建滑雪场景观"""
    img = Image.new('RGB', (width, height), color='#87CEEB')  # 天空蓝
    draw = ImageDraw.Draw(img)

    # 背景山脉
    bg_mountain = [
        (0, height * 0.4),
        (width * 0.3, height * 0.2),
        (width * 0.7, height * 0.3),
        (width, height * 0.35),
        (width, height),
        (0, height)
    ]
    draw.polygon(bg_mountain, fill='#B0B0B0')

    # 滑雪道
    for i in range(3):
        x_start = width * (0.2 + i * 0.3)
        slope = [
            (x_start, height * 0.25),
            (x_start + 50, height * 0.25),
            (x_start + 80, height * 0.8),
            (x_start + 30, height * 0.8)
        ]
        draw.polygon(slope, fill='#FFFFFF')

    # 山顶缆车站
    station = [width * 0.4, height * 0.2, width * 0.6, height * 0.25]
    draw.rectangle(station, fill='#8B4513')

    img.save(f"public/images/{filename}", quality=90)

if __name__ == "__main__":
    # 确保目录存在
    os.makedirs("public/images", exist_ok=True)

    print("创建高质量滑雪图片:")

    create_alpine_background(1200, 800, "alpine-skiing-bg.jpg")
    print("  ✅ alpine-skiing-bg.jpg (高山背景)")

    create_ski_action(800, 600, "ski-action-1.jpg")
    print("  ✅ ski-action-1.jpg (滑雪动作)")

    create_mountain_view(1000, 600, "ski-mountain-view.jpg")
    print("  ✅ ski-mountain-view.jpg (雪山全景)")

    create_simple_snow_scene(600, 400, "alpine-snow.jpg")
    print("  ✅ alpine-snow.jpg (简洁雪景)")

    create_resort_view(900, 600, "ski-resort-view.jpg")
    print("  ✅ ski-resort-view.jpg (滑雪场)")

    # 复制一些用于不同场景
    import shutil
    shutil.copy("public/images/alpine-skiing-bg.jpg", "public/images/skiing-1.jpg")
    shutil.copy("public/images/ski-action-1.jpg", "public/images/skiing-2.jpg")

    print("  ✅ skiing-1.jpg & skiing-2.jpg (复制变体)")

    print("\n🎿 高质量图片创建完成！")