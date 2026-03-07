/**
 * dateHelper 单元测试
 */
const { getLocalDateString, shouldDebounceAssessment } = require('../dateHelper');

describe('dateHelper', () => {
  describe('getLocalDateString', () => {
    it('返回 YYYY-MM-DD 格式', () => {
      const d = new Date(2025, 2, 5); // 2025-03-05
      expect(getLocalDateString(d)).toBe('2025-03-05');
    });
    it('月日补零', () => {
      expect(getLocalDateString(new Date(2025, 0, 1))).toBe('2025-01-01');
      expect(getLocalDateString(new Date(2025, 8, 9))).toBe('2025-09-09');
    });
    it('不传参时使用当前日期', () => {
      const s = getLocalDateString();
      expect(/^\d{4}-\d{2}-\d{2}$/.test(s)).toBe(true);
    });
  });

  describe('shouldDebounceAssessment', () => {
    it('lastAssessmentAt 为 0 或未传时返回 false', () => {
      expect(shouldDebounceAssessment(0)).toBe(false);
      expect(shouldDebounceAssessment(null)).toBe(false);
      expect(shouldDebounceAssessment(undefined)).toBe(false);
    });
    it('24h 内返回 true', () => {
      const now = Date.now();
      expect(shouldDebounceAssessment(now)).toBe(true);
      expect(shouldDebounceAssessment(now - 1000)).toBe(true);
      expect(shouldDebounceAssessment(now - 23 * 60 * 60 * 1000)).toBe(true);
    });
    it('超过 24h 返回 false', () => {
      const now = Date.now();
      expect(shouldDebounceAssessment(now - 25 * 60 * 60 * 1000)).toBe(false);
      expect(shouldDebounceAssessment(now - 48 * 60 * 60 * 1000)).toBe(false);
    });
  });
});
