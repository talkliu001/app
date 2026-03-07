/**
 * 点亮微光 - 评估引擎（规范 §3.2）
 * 在现有 scoring 基础上增加危机关键词扫描；仅持久化结果，不存 answers
 */
import { getResultFromAnswers as getResultFromAnswersBase } from './scoring';
import { matchCrisisKeywords, buildOptionTextMap } from './crisisKeywords';
import { trigger as crisisTrigger } from './crisisHandler';
import { QUESTIONS } from '../data/questionBank';

const optionTextMap = buildOptionTextMap(QUESTIONS);

/**
 * 阶段到电量百分比（首页电池用）
 */
export const STAGE_BATTERY = { S1: 80, S2: 50, S3: 30, S4: 5 };

/**
 * 评估入口：先扫危机关键词，再算分；命中危机时触发熔断并仍返回结果
 * @param {Record<string, string>} answers - 题 ID -> 选项 ID（仅内存，不落盘）
 * @returns {{ stage: string, score: number|null, isTransition: boolean, transitionStages?: string[], assessedAt: number, showDrugModule: boolean, showHotline: boolean }}
 */
export function getResultFromAnswers(answers) {
  if (matchCrisisKeywords(answers, optionTextMap)) {
    crisisTrigger().catch(() => {});
  }

  const raw = getResultFromAnswersBase(answers);
  const assessedAt = Date.now();
  return {
    stage: raw.stage,
    score: raw.score ?? 0,
    isTransition: Boolean(raw.transition),
    transitionStages: raw.transitionStages,
    assessedAt,
    showDrugModule: raw.showDrugModule,
    showHotline: raw.showHotline,
  };
}

export { stageToDetailKey } from './scoring';
