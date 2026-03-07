/**
 * 点亮微光 - utils 统一导出
 * 建议在 App 挂载时调用 runStorageCleanup()
 */
export { KEYS, STORAGE_PREFIX } from './storageKeys';
export { DEFAULT_APP_STATE, DEFAULT_ROADMAP_PROGRESS } from './initialState';
export { getLocalDateString, shouldDebounceAssessment } from './dateHelper';
export { CRISIS_KEYWORDS, matchCrisisKeywords, buildOptionTextMap } from './crisisKeywords';
export { trigger, clearCrisisActive, recordCrisisCooldownOnly, isCrisisActive, getCrisisTriggeredAt, isCrisisCooldownActive } from './crisisHandler';
export { runStorageCleanup } from './storageCleanup';
export { isValidSopCard, getValidSopCards } from './contentValidation';
export { getResultFromAnswers, STAGE_BATTERY, stageToDetailKey } from './scoringEngine';
