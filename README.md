# 厌学检测 APP（React Native 示例）

基于《厌学休学：深度解析与行动指南》与「厌学检测」APP 设计方案实现的 React Native 示例，包含首页、阶段检测、阶段详情三块核心流程，严格遵循 UI 规范（主色 #4A90E2 / #50E3C2、阶段色谱、植物图标、无警示色、无障碍）。

## 功能范围

- **首页（心灯导引）**：lastStage 为 null 时「去检测」；有值时能量仪表盘、今日光路（sop 卡片）、急救 FAB、退出应用
- **检测页**：行为问题（1～5 分量表）、进度条、完成即跳转、24h 防抖
- **阶段详情页**：四阶段差异化文案（必须做 / 必须避免 / 家长自我关怀）、睡眠底线话术复制、GlossaryText 可点击查词
- **引导页**：三屏 Onboarding，副标题 GlossaryText 可点击查词
- **点亮阶梯**：五阶段 Roadmap，标题与描述 GlossaryText 可点击查词

## 环境要求

- Node.js 16+
- React Native 0.72 开发环境（Android Studio / Xcode）
- 推荐先使用 [React Native 官方环境文档](https://reactnative.dev/docs/environment-setup) 配置

## 安装与运行

```bash
cd 厌学检测-app
npm install
npx react-native start
```

另开终端：

```bash
npx react-native run-android
# 或
npx react-native run-ios
```

## 项目结构

```
厌学检测-app/
├── App.js                 # 入口与导航
├── package.json
├── src/
│   ├── styles/Colors.js   # 视觉系统色值
│   ├── components/
│   │   ├── PlantIcon.js
│   │   └── GlossaryTerm.js   # GlossaryTerm + GlossaryText 点击查词
│   ├── assets/content/
│   │   └── glossary.json     # 核心概念定义字典 Phase 2（14 项）
│   └── screens/
│       ├── HomeScreen.js
│       ├── AssessmentScreen.js
│       ├── StageDetailScreen.js
│       ├── OnboardingScreen.js
│       └── RoadmapScreen.js
└── README.md
```

## 设计规范落地

| 设计点       | 实现说明 |
|--------------|----------|
| 阶段色谱     | S1～S4 使用 #A8E6CF / #B3E0FF / #4A90E2 / #2D3748 |
| 植物图标     | PlantIcon 按 stage 显示 🌱/🌿/🌊/🌳 |
| 1～2 遍提醒  | 阶段详情内文案与《行动指南》§4.3 一致 |
| 睡眠底线话术 | 第三阶段「必须做」中含完整话术，底部 CTA 可复制到剪贴板 |
| 点击查词     | GlossaryTerm + GlossaryText，StageDetail / Onboarding / Roadmap / HomeScreen 中概念词均可点击查义 |
| 无障碍       | 关键按钮设 accessibilityLabel / accessibilityRole |
| 无警示色     | 仅使用蓝/绿系，无红色 |

## 说明

- 本示例为 **MVP 级核心流程**，复学路径追踪、理论支持库、话术复制等见设计方案文档，可按需扩展。
- 检测逻辑为简化加权（平均分映射阶段），完整规则见《厌学检测-APP设计方案.md》§3.3～3.5。
- 材料引用见同目录《厌学休学-原因分析·状态说明·处理原则.md》。
