/**
 * initialState 单元测试
 */
const { DEFAULT_APP_STATE, DEFAULT_ROADMAP_PROGRESS } = require('../initialState');

describe('initialState', () => {
  describe('DEFAULT_APP_STATE', () => {
    it('lastStage 为 null', () => {
      expect(DEFAULT_APP_STATE.lastStage).toBeNull();
    });
    it('batteryLevel 为 0', () => {
      expect(DEFAULT_APP_STATE.batteryLevel).toBe(0);
    });
    it('lastAssessmentAt 为 0', () => {
      expect(DEFAULT_APP_STATE.lastAssessmentAt).toBe(0);
    });
  });

  describe('DEFAULT_ROADMAP_PROGRESS', () => {
    it('currentStageId 为 0', () => {
      expect(DEFAULT_ROADMAP_PROGRESS.currentStageId).toBe(0);
    });
    it('completedStages 为空数组', () => {
      expect(DEFAULT_ROADMAP_PROGRESS.completedStages).toEqual([]);
    });
    it('history 为空数组', () => {
      expect(DEFAULT_ROADMAP_PROGRESS.history).toEqual([]);
    });
    it('pseudoRecoveryWarning 为 false', () => {
      expect(DEFAULT_ROADMAP_PROGRESS.pseudoRecoveryWarning).toBe(false);
    });
  });
});
