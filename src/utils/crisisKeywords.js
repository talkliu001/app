/**
 * 危机关键词表（规范 §3.3）
 * 仅导出列表，不包含任何用户数据；严禁与题目答案一起存储
 */
export const CRISIS_KEYWORDS = [
  '想死', '割手', '活着没意思', '打人', '砸东西', '威胁', '幻觉', '妄想', '绝食', '不吃不喝',
];

/**
 * 根据选项 ID 映射到选项文案后匹配关键词（用于检测题）
 * @param {Record<string, string>} answers - 题 ID -> 选项 ID
 * @param {Record<string, string>} [optionTextMap] - 选项 ID -> 选项文案（如从 questionBank 构建）
 * @returns {boolean}
 */
export function matchCrisisKeywords(answers, optionTextMap = {}) {
  if (!answers || typeof answers !== 'object') return false;
  const map = optionTextMap ?? {};
  for (const oid of Object.values(answers)) {
    const text = (typeof map[oid] === 'string' ? map[oid] : '') || '';
    if (text && CRISIS_KEYWORDS.some((kw) => (typeof kw === 'string' && text.includes(kw)))) return true;
  }
  return false;
}

/**
 * 从题目数据构建 optionId -> text 映射，供 matchCrisisKeywords 使用
 * @param {Record<string, { options: { id: string, text: string }[] }>} questions
 * @returns {Record<string, string>}
 */
export function buildOptionTextMap(questions) {
  const map = {};
  for (const q of Object.values(questions)) {
    for (const opt of q.options || []) {
      map[opt.id] = opt.text || '';
    }
  }
  return map;
}
