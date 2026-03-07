/**
 * 日期与时区策略（规范 §3.5）
 * 所有日期基于设备本地系统时间，不转 UTC
 */

/**
 * 当前本地日期 YYYY-MM-DD，用于 checklist / mood 等 Storage key
 * @param {Date} [date]
 * @returns {string}
 */
export function getLocalDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const ASSESSMENT_DEBOUNCE_MS = 24 * 60 * 60 * 1000;

/**
 * 是否未满 24h 已做过正式评估（用于禁止或提示再次提交）
 * @param {number} lastAssessmentAt
 * @returns {boolean}
 */
export function shouldDebounceAssessment(lastAssessmentAt) {
  if (!lastAssessmentAt) return false;
  return Date.now() - lastAssessmentAt < ASSESSMENT_DEBOUNCE_MS;
}
