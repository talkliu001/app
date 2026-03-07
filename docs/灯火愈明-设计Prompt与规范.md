# 「灯火愈明」数据可视化组件 · 视觉设计 Prompt 与规范

> 供 UI 设计师或 AI 绘图工具（Midjourney / DALL·E 3 等）使用，确保质感、光影与交互逻辑符合「光之宇宙」设定。

---

## 一、核心设计理念

- **主题**：生命的发光史 (History of Glowing Life)
- **隐喻**：数据是火焰高度、星光密度与光晕扩散，而非冰冷数字
- **风格关键词**：Ethereal, Warm & Healing, Dark Mode Native, Particle Effects, Glassmorphism, Bioluminescent
- **禁止**：Excel 式柱状图、生硬直角折线、高饱和红绿蓝、纯白背景

---

## 二、AI 绘图提示词（可直接使用）

### 场景一：整体界面概览

```
Mobile app UI design, data visualization screen named "Brightening Lights", dark mode interface, deep midnight blue background (#0F172A). Center stage is a glowing, abstract lantern or a cluster of warm golden stars representing user progress. The light emits soft, volumetric god rays and floating dust particles. Instead of bar charts, use rising flames of varying heights made of gradient orange-to-gold light. Instead of line charts, use a connecting constellation of glowing dots with smooth bezier curves. Soft glassmorphism cards for data details. Ethereal, healing, hopeful atmosphere, high fidelity, Figma style, 8k resolution, UI/UX design award winner. --ar 9:16 --v 6.0 --q 2 --style raw
```

### 场景二：心灯亮度（核心组件）

```
Close-up UI component design, a stylized minimalistic lantern in the center, glowing intensely. The flame inside is animated-looking, transitioning from deep red at the bottom to bright white-gold at the top. Surrounding the lantern is a expanding halo of soft blur light (bloom effect) that changes size based on data values. Background is dark void with subtle floating embers. No text, pure visual representation of "growth through light". Magical, warm, cinematic lighting, octane render, 3D icon style but flat UI compatible. --ar 4:5 --v 6.0 --q 2
```

### 场景三：星河轨迹（时间轴）

```
Data timeline visualization, a horizontal flowing path made of connected glowing stars against a dark navy background. Some stars are bright and large (milestones), some are dim (ordinary days). Consecutive days form a shining constellation line with a neon glow trail. When touching a star, it bursts into a small spark effect. Colors: Warm gold, soft orange, pale yellow. Style: Dreamy, interactive, fluid motion lines, futuristic but organic. High contrast, clear hierarchy. --ar 16:9 --v 6.0 --q 2
```

### 场景四：光色温度（情绪/质量热力)

```
Abstract data heatmap visualization, represented as a field of soft glowing orbs. The color temperature shifts from cool calm blue (stability) to warm vibrant orange (active connection), avoiding harsh reds. The orbs pulse gently. Overlay is a translucent frosted glass panel showing summary numbers in thin, elegant white typography. Atmosphere is serene and meditative. UI design, mobile screen, dark theme. --ar 9:16 --v 6.0 --q 2
```

---

## 三、色彩规范

| 用途 | 色值 | 说明 |
|------|------|------|
| 主底 | #0F172A | Deep Space Blue |
| 渐变层 | #0F172A → #1E293B | 径向 Midnight Gradient |
| 微光（起步） | #FDE68A | Pale Ember |
| 成长（进行中） | #FB923C | Warm Flame |
| 辉煌（里程碑） | #FACC15 + #FFFFFF | Pure Gold + White Hot |
| 稳定（情绪好） | #67E8F9 | Soft Cyan 点缀 |

**光晕**：多层外发光，混合模式 Screen/Add，模糊半径约为元素大小的 50%–100%。

---

## 四、图形与动效规范

- **线条**：平滑贝塞尔曲线，末端渐细消失；禁止折线。
- **节点**：空心光环比或微缩火焰/星星，避免实心圆。
- **卡片**：毛玻璃，背景白/黑约 10% 透明度，Blur 20–40px，1px 渐变边框（上白 20% → 下 0%）。
- **加载**：从左至右依次点亮（墨水晕染/光线扫描）。
- **数值变化**：弹性缓冲（Spring），模拟火焰跳动。
- **点击**：涟漪或粒子炸裂 + 详情浮层。
- **呼吸**：核心灯/星 Scale 1.0↔1.05、透明度变化，周期 3–4s。

---

## 五、交付物清单

- Figma/Sketch 组件库与变体
- Lottie JSON：lamp_breathing.json、star_lighting_up.json、particle_burst.json
- 切图：@2x/@3x 光晕遮罩、粒子贴图
- 设计规范 PDF：色值、模糊参数、动效曲线（Bezier 参数）

---

*使用建议：先用 AI 生成 4–6 张概念图，选出最符合「温暖、希望、不刺眼」的 1–2 张，交 UI 设计师矢量化重绘与动效拆解。*
