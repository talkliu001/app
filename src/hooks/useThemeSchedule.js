/**
 * 规范 §3.12：22:00 自动切换夜间模式；AppState 回到 active 时根据当前时间更新
 */
import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getThemeByHour } from '../context/ThemeContext';

export function useThemeSchedule() {
  const { setTheme } = useTheme();
  useEffect(() => {
    const update = () => setTheme(getThemeByHour(new Date().getHours()));
    update();
    const sub = AppState.addEventListener('change', () => update());
    const id = setInterval(update, 60 * 1000);
    return () => {
      sub?.remove?.();
      clearInterval(id);
    };
  }, [setTheme]);
}
