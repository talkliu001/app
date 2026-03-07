/**
 * 存储清理：90 天 checklist、50 条 history（规范 §3.6）
 * 在 APP 启动或每日首次进入前台执行
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocalDateString } from './dateHelper';
import { KEYS } from './storageKeys';

const CHECKLIST_RETAIN_DAYS = 90;
const HISTORY_RETAIN_COUNT = 50;

export async function runStorageCleanup() {
  const today = getLocalDateString();
  try {
    const lastRun = await AsyncStorage.getItem(KEYS.CLEANUP_LAST_RUN);
    if (lastRun === today) return;
    await AsyncStorage.setItem(KEYS.CLEANUP_LAST_RUN, today);
  } catch (_) {
    return;
  }

  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const prefix = '@sparklight_checklist_';
    const checklistKeys = allKeys.filter((k) => k.startsWith(prefix));
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - CHECKLIST_RETAIN_DAYS);
    const cutoffStr = getLocalDateString(cutoff);
    for (const key of checklistKeys) {
      const dateStr = key.replace(prefix, '');
      if (dateStr.length === 10 && dateStr < cutoffStr) {
        await AsyncStorage.removeItem(key);
      }
    }
  } catch (_) {}

  try {
    const roadmapRaw = await AsyncStorage.getItem(KEYS.ROADMAP_PROGRESS);
    if (roadmapRaw) {
      const roadmap = JSON.parse(roadmapRaw);
      if (Array.isArray(roadmap.history) && roadmap.history.length > HISTORY_RETAIN_COUNT) {
        roadmap.history = roadmap.history.slice(-HISTORY_RETAIN_COUNT);
        await AsyncStorage.setItem(KEYS.ROADMAP_PROGRESS, JSON.stringify(roadmap));
      }
    }
  } catch (_) {}
}
