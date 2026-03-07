/**
 * 点亮微光 - 存储 Key 集中映射（规范 §二）
 * 前缀 @sparklight_，包名 com.lightspark.ignite
 */
const STORAGE_PREFIX = '@sparklight_';

export const KEYS = {
  LAST_STAGE: `${STORAGE_PREFIX}last_stage`,
  ASSESSMENT_RESULT: `${STORAGE_PREFIX}last_result`,
  LAST_ASSESSMENT_AT: `${STORAGE_PREFIX}last_assessment_at`,
  ROADMAP_PROGRESS: `${STORAGE_PREFIX}roadmap`,
  DAILY_CHECKLIST: (date) => `${STORAGE_PREFIX}checklist_${date}`,
  CRISIS_TRIGGERED_AT: `${STORAGE_PREFIX}crisis_triggered_at`,
  CRISIS_COUNT: `${STORAGE_PREFIX}crisis_count`,
  CRISIS_ACTIVE: `${STORAGE_PREFIX}crisis_active`,
  ONBOARDING_SEEN: `${STORAGE_PREFIX}onboarding_done`,
  CLEANUP_LAST_RUN: `${STORAGE_PREFIX}cleanup_last_run`,
  GROWTH_TREE: `${STORAGE_PREFIX}growth_tree`,
  THEME: `${STORAGE_PREFIX}theme`,
};

export { STORAGE_PREFIX };
