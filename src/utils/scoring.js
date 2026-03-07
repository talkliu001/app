/**
 * 阶段判定 - 方案 B（设计书 §3.6）
 * Q8_A3（已休学）→ S4；否则加权总分 1～5，S1: 4.2-5, S2: 3-4.19, S3: 1.8-2.99, S4: 1.0-1.79
 */
import { QUESTION_ORDER, WEIGHTS, getOptionScore } from '../data/questionBank';

export const STAGE_IDS = ['S1', 'S2', 'S3', 'S4'];
const THRESHOLDS = [
  { stage: 'S1', min: 4.2, max: 5.0 },
  { stage: 'S2', min: 3.0, max: 4.19 },
  { stage: 'S3', min: 1.8, max: 2.99 },
  { stage: 'S4', min: 1.0, max: 1.79 },
];

/** 过渡区半宽（设计书 §3.6 方案 B：±0.15） */
const TRANSITION_MARGIN = 0.15;

/**
 * @param {Record<string, string>} answers - 题 ID -> 选项 ID
 * @returns {{ stage: string, score: number | null, showDrugModule: boolean, showHotline: boolean, transition?: boolean, transitionStages?: [string, string] }}
 */
export function getResultFromAnswers(answers) {
  const showDrugModule = answers.Q10 === 'Q10_A2';
  const showHotline = answers.Q11 === 'Q11_A2';

  if (answers.Q8 === 'Q8_A3') {
    return { stage: 'S4', score: null, showDrugModule, showHotline };
  }

  let weightedSum = 0;
  let totalWeight = 0;
  for (const qid of ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7']) {
    const oid = answers[qid];
    const w = WEIGHTS[qid];
    if (!oid || w == null) continue;
    const s = getOptionScore(oid);
    if (s != null) {
      weightedSum += s * w;
      totalWeight += w;
    }
  }
  const score = totalWeight > 0 ? weightedSum / totalWeight : null;
  if (score == null) {
    return { stage: 'S2', score: null, showDrugModule, showHotline };
  }

  const transitionInfo = getTransitionInfo(score);
  if (transitionInfo) {
    return {
      stage: transitionInfo.stage,
      score,
      showDrugModule,
      showHotline,
      transition: true,
      transitionStages: transitionInfo.transitionStages,
    };
  }

  for (const { stage, min, max } of THRESHOLDS) {
    if (score >= min && score <= max) return { stage, score, showDrugModule, showHotline };
  }
  if (score > 4.19) return { stage: 'S1', score, showDrugModule, showHotline };
  if (score > 2.99) return { stage: 'S2', score, showDrugModule, showHotline };
  if (score > 1.79) return { stage: 'S3', score, showDrugModule, showHotline };
  return { stage: 'S4', score, showDrugModule, showHotline };
}

/** 阈值边界（两阶段交界）及对应过渡区与主展示阶段 */
const BOUNDARIES = [
  { bound: 4.2, stageA: 'S2', stageB: 'S1' },
  { bound: 3.0, stageA: 'S3', stageB: 'S2' },
  { bound: 1.8, stageA: 'S4', stageB: 'S3' },
];

function getTransitionInfo(score) {
  for (const { bound, stageA, stageB } of BOUNDARIES) {
    if (score >= bound - TRANSITION_MARGIN && score <= bound + TRANSITION_MARGIN) {
      return {
        stage: stageA,
        transitionStages: [stageA, stageB],
      };
    }
  }
  return null;
}

/** 映射到 StageDetail 使用的 key：first/second/third/fourth */
export function stageToDetailKey(stage) {
  const map = { S1: 'first', S2: 'second', S3: 'third', S4: 'fourth' };
  return map[stage] || 'third';
}
