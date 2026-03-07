/**
 * crisisKeywords 单元测试
 */
const {
  CRISIS_KEYWORDS,
  matchCrisisKeywords,
  buildOptionTextMap,
} = require('../crisisKeywords');

describe('crisisKeywords', () => {
  it('CRISIS_KEYWORDS 包含预期关键词', () => {
    expect(CRISIS_KEYWORDS).toContain('想死');
    expect(CRISIS_KEYWORDS).toContain('割手');
    expect(CRISIS_KEYWORDS).toContain('活着没意思');
    expect(CRISIS_KEYWORDS.length).toBeGreaterThanOrEqual(8);
  });

  describe('matchCrisisKeywords', () => {
    it('无匹配时返回 false', () => {
      expect(matchCrisisKeywords({ Q1: 'Q1_A1' }, { Q1_A1: '一小时内自己就会开始' })).toBe(false);
      expect(matchCrisisKeywords({})).toBe(false);
    });
    it('选项文案含关键词时返回 true', () => {
      expect(matchCrisisKeywords({ Q11: 'Q11_A2' }, { Q11_A2: '是，我有些担心' })).toBe(false);
      expect(
        matchCrisisKeywords({ QX: 'OX' }, { OX: '孩子说过活着没意思' })
      ).toBe(true);
      expect(matchCrisisKeywords({ QX: 'OX' }, { OX: '有割手行为' })).toBe(true);
    });
    it('无 optionTextMap 时按空串匹配，不命中', () => {
      expect(matchCrisisKeywords({ Q1: 'Q1_A1' })).toBe(false);
    });
  });

  describe('buildOptionTextMap', () => {
    it('从 questions 构建 optionId -> text', () => {
      const questions = {
        Q8: {
          options: [
            { id: 'Q8_A1', text: '是，基本每天去' },
            { id: 'Q8_A3', text: '否，已休学或长期在家' },
          ],
        },
      };
      const map = buildOptionTextMap(questions);
      expect(map.Q8_A1).toBe('是，基本每天去');
      expect(map.Q8_A3).toBe('否，已休学或长期在家');
    });
    it('空 questions 返回空对象', () => {
      expect(buildOptionTextMap({})).toEqual({});
    });
  });
});
