/**
 * 危机熔断：仅写入 triggeredAt、triggerCount、isActive（规范 §3.3）
 * ⛔ 此处绝不写入具体题目、选项或用户输入文本
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS } from './storageKeys';

export async function getStoredCount() {
  try {
    const s = await AsyncStorage.getItem(KEYS.CRISIS_COUNT);
    return s ? parseInt(s, 10) : 0;
  } catch {
    return 0;
  }
}

export async function getCrisisTriggeredAt() {
  try {
    const s = await AsyncStorage.getItem(KEYS.CRISIS_TRIGGERED_AT);
    return s ? parseInt(s, 10) : null;
  } catch {
    return null;
  }
}

export async function isCrisisActive() {
  try {
    const s = await AsyncStorage.getItem(KEYS.CRISIS_ACTIVE);
    return s === 'true';
  } catch {
    return false;
  }
}

/**
 * 触发熔断：仅更新时间戳与计数，不写任何内容
 * 调用方需自行弹出 MeltdownModal（如通过全局状态或回调）
 */
export async function trigger() {
  const now = Date.now();
  const count = await getStoredCount();
  try {
    await AsyncStorage.setItem(KEYS.CRISIS_TRIGGERED_AT, String(now));
    await AsyncStorage.setItem(KEYS.CRISIS_COUNT, String(count + 1));
    await AsyncStorage.setItem(KEYS.CRISIS_ACTIVE, 'true');
  } catch (_) {}
  return { triggeredAt: now, triggerCount: count + 1 };
}

const COOL_DOWN_MS = 24 * 60 * 60 * 1000;

/** 是否处于 24h 冷却期（冷却期内应禁用「开始检测」） */
export async function isCrisisCooldownActive() {
  const at = await getCrisisTriggeredAt();
  if (!at) return false;
  return Date.now() - at < COOL_DOWN_MS;
}

/** 用户二次确认后清除熔断锁定 */
export async function clearCrisisActive() {
  try {
    await AsyncStorage.setItem(KEYS.CRISIS_ACTIVE, 'false');
  } catch (_) {}
}

/**
 * 仅记录触发时间与计数（24h 冷却），不置全屏熔断 isActive
 * 用于 Q11 选「是，我有些担心」等软提示后的冷却，不弹出 MeltdownLockdownModal
 */
export async function recordCrisisCooldownOnly() {
  const now = Date.now();
  const count = await getStoredCount();
  try {
    await AsyncStorage.setItem(KEYS.CRISIS_TRIGGERED_AT, String(now));
    await AsyncStorage.setItem(KEYS.CRISIS_COUNT, String(count + 1));
  } catch (_) {}
}
