/**
 * storageKeys 单元测试
 */
const { KEYS, STORAGE_PREFIX } = require('../storageKeys');

describe('storageKeys', () => {
  it('前缀为 @sparklight_', () => {
    expect(STORAGE_PREFIX).toBe('@sparklight_');
  });
  it('KEYS 含预期 key', () => {
    expect(KEYS.LAST_STAGE).toBe('@sparklight_last_stage');
    expect(KEYS.CRISIS_ACTIVE).toBe('@sparklight_crisis_active');
    expect(KEYS.ONBOARDING_SEEN).toBe('@sparklight_onboarding_done');
  });
  it('DAILY_CHECKLIST 为函数且按日期生成', () => {
    expect(typeof KEYS.DAILY_CHECKLIST).toBe('function');
    expect(KEYS.DAILY_CHECKLIST('2025-03-05')).toBe('@sparklight_checklist_2025-03-05');
  });
});
