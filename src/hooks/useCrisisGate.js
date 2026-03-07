/**
 * 点亮微光 - 熔断门控（规范 §四）
 * 熔断时仅展示 MeltdownLockdownModal，解除后恢复正常导航
 */
import { useState, useEffect, useCallback } from 'react';
import { AppState } from 'react-native';
import { isCrisisActive, clearCrisisActive } from '../utils/crisisHandler';

/**
 * @returns {{ meltdownVisible: boolean, confirmExitMeltdown: () => Promise<void> }}
 */
export function useCrisisGate() {
  const [meltdownVisible, setMeltdownVisible] = useState(false);

  const refresh = useCallback(async () => {
    const active = await isCrisisActive();
    setMeltdownVisible(active);
  }, []);

  useEffect(() => {
    refresh();
    const sub = AppState.addEventListener('change', () => {
      if (AppState.currentState === 'active') refresh();
    });
    return () => sub?.remove?.();
  }, [refresh]);

  const confirmExitMeltdown = useCallback(async () => {
    await clearCrisisActive();
    setMeltdownVisible(false);
  }, []);

  return { meltdownVisible, confirmExitMeltdown, refresh };
}
