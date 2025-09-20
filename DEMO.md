# 🎿 高山滑雪积分系统 - 免费试用指南

## 🌟 四种免费试用方案

### 🏆 **方案一：Vercel云部署（最推荐）**

**一键部署，获得永久链接：**
```bash
npm run share:vercel
```

**特点：**
- ✅ **完全免费** - 个人项目无限制
- ✅ **永久链接** - 分享后永远有效
- ✅ **全球访问** - CDN加速，速度快
- ✅ **自动更新** - 代码更新自动部署
- ✅ **专业域名** - 例如 `alpine-ski-points.vercel.app`

### 🔗 **方案二：内网穿透（即时分享）**

**快速分享本地项目：**
```bash
npm run share:ngrok
```

**特点：**
- ✅ **即时生效** - 30秒获得分享链接
- ✅ **实时预览** - 修改代码立即看到效果
- ✅ **完全控制** - 数据保留在本地

### 🇨🇳 **方案三：cpolar（国内优化）**

**国内网络优化的内网穿透：**
```bash
# 1. 注册 https://www.cpolar.com
# 2. 下载客户端
# 3. 运行：cpolar http 3000
```

### 🏠 **方案四：局域网分享**

**同网络用户访问：**
```bash
npm run dev
# 然后分享：http://你的IP:3000
```

## ⚡ 一键演示工具

**智能选择最佳方案：**
```bash
npm run demo
```

系统会引导你选择最适合的分享方式！

## 📊 方案对比

| 方案 | 设置时间 | 链接有效期 | 访问速度 | 适用场景 |
|------|----------|------------|----------|----------|
| **Vercel** | 5分钟 | 永久 | 全球快速 | 对外展示 |
| **ngrok** | 30秒 | 临时 | 中等 | 快速演示 |
| **cpolar** | 2分钟 | 临时/固定 | 国内快 | 国内用户 |
| **局域网** | 即时 | 本地网络 | 最快 | 内部测试 |

## 🚀 立即开始

### 最简单方式（推荐新手）：
```bash
# 1. 运行演示工具
npm run demo

# 2. 选择 "1" (Vercel云部署)
# 3. 按提示登录Vercel
# 4. 获得永久分享链接！
```

### 最快方式（技术用户）：
```bash
# 直接Vercel部署
npm run share:vercel
```

## 📋 分享链接示例

部署成功后，你会获得类似这样的链接：

- **Vercel**: `https://alpine-ski-points.vercel.app`
- **ngrok**: `https://abc123.ngrok.io`
- **cpolar**: `https://yourname.cpolar.cn`

## 🛠️ 故障排除

### 问题1：Vercel登录失败
```bash
# 解决方案：手动登录
vercel login
```

### 问题2：ngrok需要注册
```bash
# 1. 访问 https://ngrok.com/signup
# 2. 获取authtoken
# 3. 运行：ngrok config add-authtoken <token>
```

### 问题3：3000端口被占用
```bash
# 检查端口占用
lsof -i :3000
# 或使用其他端口
npm run dev -- --port 3001
```

## 💡 使用技巧

1. **Vercel部署**：适合长期展示，分享给客户
2. **ngrok穿透**：适合临时演示，开发调试
3. **局域网分享**：适合团队内部测试
4. **移动端测试**：所有方案都支持手机访问

## 📞 技术支持

如遇问题，可参考：
- Vercel文档：https://vercel.com/docs
- ngrok文档：https://ngrok.com/docs
- cpolar文档：https://www.cpolar.com/docs

---

选择任一方案，5分钟内让全世界用户都能试用你的高山滑雪积分系统！🎿