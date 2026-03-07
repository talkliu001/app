/**
 * 点亮微光 - 主题（日/夜），供 22:00 助眠模式与样式覆盖
 */
import React, { createContext, useContext, useState, useCallback } from 'react';

const ThemeContext = createContext(null);

export function getThemeByHour(hour) {
  return hour >= 22 || hour < 6 ? 'night' : 'day';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getThemeByHour(new Date().getHours()));
  const value = { theme, setTheme };
  return React.createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) return { theme: 'day', setTheme: () => {} };
  return ctx;
}
