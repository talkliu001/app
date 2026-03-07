/**
 * 「点亮微光」数据模型约定（与代码实现规范 §3.1 一致）
 * 无运行时类型检查，仅作开发与 JSDoc 参考。
 *
 * @typedef {'S1'|'S2'|'S3'|'S4'} Stage
 * @typedef {Record<string, string>} AssessmentAnswers
 *
 * @typedef {Object} AssessmentResult
 * @property {Stage} stage
 * @property {number} score
 * @property {boolean} isTransition
 * @property {[Stage, Stage]} [transitionStages]
 * @property {number} assessedAt
 * @property {boolean} [showDrugModule]
 * @property {boolean} [showHotline]
 *
 * @typedef {Object} AppState
 * @property {Stage|null} lastStage
 * @property {number} batteryLevel
 * @property {number} lastAssessmentAt
 *
 * @typedef {Object} RoadmapProgress
 * @property {number} currentStageId
 * @property {number[]} completedStages
 * @property {{ stageId: number, completedAt: number }[]} history
 * @property {boolean} pseudoRecoveryWarning
 *
 * @typedef {Object} DailyChecklist
 * @property {string} date
 * @property {{ morning?: { completed: boolean, timestamp?: number }, afternoon?: { completed: boolean, timestamp?: number }, evening?: { completed: boolean, timestamp?: number } }} tasks
 * @property {'bad'|'ok'|'good'} [mood]
 *
 * @typedef {Object} CrisisState
 * @property {boolean} isActive
 * @property {number|null} triggeredAt
 * @property {number} triggerCount
 */

export const STAGE_IDS = ['S1', 'S2', 'S3', 'S4'];
