/**
 * 灯火愈明 - 简单数据汇总
 * 从 checklist 读取最近 7 天打卡、计算 streak、completion
 */
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocalDateString } from '../utils/dateHelper';
import { KEYS } from '../utils/storageKeys';

export function useBrighteningLightsData() {
  const [streakDays, setStreakDays] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  const [dailyCompletion, setDailyCompletion] = useState(Array(7).fill(false));

  useEffect(() => {
    (async () => {
      const today = new Date();
      const days = [];
      let consecutive = 0;
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = KEYS.DAILY_CHECKLIST(getLocalDateString(d));
        const raw = await AsyncStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : null;
        const t = parsed && parsed.tasks;
        const hasData = !!(t && (t.morning?.completed || t.afternoon?.completed || t.evening?.completed));
        days.push(!!hasData);
      }
      for (let i = 6; i >= 0 && days[i]; i--) consecutive++;
      setDailyCompletion(days);
      setStreakDays(consecutive);
      const completed = days.filter(Boolean).length;
      setCompletionRate(days.length ? (completed / 7) * 100 : 0);
    })();
  }, []);

  return { streakDays, completionRate, dailyCompletion };
}
