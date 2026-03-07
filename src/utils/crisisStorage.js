/**
 * 危机触发后 24 小时冷却 - 设计书 §9.2.1
 * 仅存时间戳，不存任何选项或身份信息
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@yexue_crisis_triggered_at';
const COOL_DOWN_MS = 24 * 60 * 60 * 1000;

export async function setCrisisTriggeredAt() {
  try {
    await AsyncStorage.setItem(KEY, String(Date.now()));
  } catch (_) {}
}

export async function getCrisisTriggeredAt() {
  try {
    const s = await AsyncStorage.getItem(KEY);
    return s ? parseInt(s, 10) : null;
  } catch (_) {
    return null;
  }
}

/** 是否处于 24 小时冷却期内（冷却期内应禁用「开始检测」） */
export async function isCrisisCooldownActive() {
  const at = await getCrisisTriggeredAt();
  if (!at) return false;
  return Date.now() - at < COOL_DOWN_MS;
}
