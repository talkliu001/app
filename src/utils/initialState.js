/**
 * 首次启动与反序列化失败时的默认值（规范 §3.4）
 * lastStage === null 时首页展示「去检测」，不展示电池与今日卡片
 */
export const DEFAULT_APP_STATE = {
  lastStage: null,
  batteryLevel: 0,
  lastAssessmentAt: 0,
};

export const DEFAULT_ROADMAP_PROGRESS = {
  currentStageId: 0,
  completedStages: [],
  history: [],
  pseudoRecoveryWarning: false,
};
