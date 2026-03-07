/**
 * contentValidation 单元测试
 */
const { isValidSopCard, getValidSopCards } = require('../contentValidation');

describe('contentValidation', () => {
  const validCard = {
    id: 's4_morning_01',
    stage: ['S4'],
    slot: 'morning',
    title: '不叫早',
    summary: '允许睡到自然醒',
  };

  describe('isValidSopCard', () => {
    it('合法卡片返回 true', () => {
      expect(isValidSopCard(validCard)).toBe(true);
      expect(isValidSopCard({ ...validCard, slot: 'afternoon' })).toBe(true);
      expect(isValidSopCard({ ...validCard, slot: 'evening' })).toBe(true);
    });
    it('缺必填字段返回 false', () => {
      expect(isValidSopCard({ ...validCard, id: undefined })).toBe(false);
      expect(isValidSopCard({ ...validCard, stage: null })).toBe(false);
      expect(isValidSopCard({ ...validCard, slot: 'invalid' })).toBe(false);
      expect(isValidSopCard({ ...validCard, title: 123 })).toBe(false);
      expect(isValidSopCard({ ...validCard, summary: null })).toBe(false);
    });
    it('非对象返回 false', () => {
      expect(isValidSopCard(null)).toBe(false);
      expect(isValidSopCard(undefined)).toBe(false);
      expect(isValidSopCard('')).toBe(false);
    });
  });

  describe('getValidSopCards', () => {
    const local = [validCard];
    it('全部合法时返回 remote', () => {
      const remote = [validCard, { ...validCard, id: 's2_evening' }];
      expect(getValidSopCards(remote, local)).toEqual(remote);
    });
    it('存在不合法项时回退 local', () => {
      const remote = [validCard, { id: 'x', stage: ['S4'], slot: 'invalid_slot', title: 'x', summary: 'x' }];
      expect(getValidSopCards(remote, local)).toEqual(local);
    });
    it('remote 非数组时回退 local', () => {
      expect(getValidSopCards(null, local)).toEqual(local);
      expect(getValidSopCards({}, local)).toEqual(local);
    });
  });
});
