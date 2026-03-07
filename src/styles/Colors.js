/**
 * 点亮微光 - 视觉系统（传灯体系 v1.1，规范 §3.0）
 * 品牌色：微光黄 #FFD700、暖橙红 #FF6347、深邃蓝/黑 #0F172A
 */
export const Colors = {
  // 传灯体系品牌色（Logo/Icon/Splash）
  sparkGold: '#FFD700',     // 微光黄 - 初起的希望
  warmCoral: '#FF6347',     // 暖橙红 - 薪火相传的温度
  deepSlate: '#0F172A',     // 深邃蓝/黑 - 背景
  // 兼容旧引用（过渡期）
  sparkOrange: '#FF6347',   // 同 warmCoral
  deepBlack: '#0F172A',     // 同 deepSlate
  highlightYellow: '#FFD700', // 同 sparkGold
  // 页面与功能
  primary: '#FFD700',       // 微光黄
  primaryDark: '#0F172A',   // 深邃蓝/黑，用于次要按钮
  secondary: '#FF6347',     // 暖橙红
  success: '#77DD77',       // 嫩芽绿
  warning: '#FFB347',       // 柔和橙
  danger: '#FF6961',        // 危机红（仅熔断/急救）
  text: '#4A4A4A',
  textSecondary: '#718096',
  background: '#FFFDF9',    // 米白
  neutral: '#E2E8F0',
  border: '#CBD5E0',
  // 阶段色谱（兼容 PlantIcon / StageDetail / BatteryBreath）
  stage1: '#A8E6CF',
  stage2: '#B3E0FF',
  stage3: '#4A90E2',
  stage4: '#2D3748',
};
