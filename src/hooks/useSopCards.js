/**
 * 按 stage + 当前时段筛选今日 SOP 卡片（规范 §3.14）
 * stage 为 null 时返回 []，首页不展示今日卡片
 */
import { useMemo } from 'react';

function getSlot() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}

let cachedCards = null;
function getDefaultCards() {
  if (cachedCards) return cachedCards;
  try {
    cachedCards = require('../assets/content/sop_cards.json');
    return Array.isArray(cachedCards) ? cachedCards : [];
  } catch (_) {
    cachedCards = [];
    return [];
  }
}

/**
 * @param {string|null} stage - 'S1'|'S2'|'S3'|'S4'|null
 * @param {Array<{ stage: string[], slot: string }>} [cards] - 可选，不传则从 sop_cards.json 加载
 * @returns {Array}
 */
export function useSopCards(stage, cards) {
  const list = useMemo(() => cards ?? getDefaultCards(), [cards]);
  return useMemo(() => {
    if (stage === null || stage === undefined) return [];
    if (!Array.isArray(list)) return [];
    const slot = getSlot();
    return list.filter((c) => {
      if (!c || !Array.isArray(c.stage)) return false;
      return c.stage.includes(stage) && c.slot === slot;
    });
  }, [stage, list]);
}
