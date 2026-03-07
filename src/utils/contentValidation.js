/**
 * 远程配置 Schema 校验（规范 §3.7）
 * 校验失败回退本地，日志不含用户数据
 */

/**
 * @typedef {Object} SopCard
 * @property {string} id
 * @property {string[]} stage
 * @property {string} slot
 * @property {string} title
 * @property {string} summary
 * @property {string} [script]
 */

/**
 * 类型守卫：单条 SOP 卡片必填字段
 * @param {unknown} c
 * @returns {c is SopCard}
 */
export function isValidSopCard(c) {
  return (
    typeof c === 'object' &&
    c !== null &&
    typeof c.id === 'string' &&
    Array.isArray(c.stage) &&
    typeof c.slot === 'string' &&
    ['morning', 'afternoon', 'evening'].includes(c.slot) &&
    typeof c.title === 'string' &&
    typeof c.summary === 'string'
  );
}

/**
 * 取校验通过的 SOP 列表，否则回退本地
 * @param {unknown[]} remote
 * @param {SopCard[]} local
 * @returns {SopCard[]}
 */
export function getValidSopCards(remote, local) {
  if (!Array.isArray(remote) || remote.some((r) => !isValidSopCard(r))) {
    console.warn('Remote config invalid, fallback to local.');
    return local;
  }
  return remote;
}
