/**
 * 题目定稿文案 - 与设计书附录 F 一致
 * 顺序：Q8 → Q1～Q7 → Q10 → Q11（敏感题置后）
 */
export const QUESTION_ORDER = ['Q8', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q10', 'Q11'];

/** 权重：仅 Q1～Q7 参与加权，方案 B */
export const WEIGHTS = {
  Q1: 0.25, Q2: 0.20, Q3: 0.15, Q4: 0.15, Q5: 0.10, Q6: 0.08, Q7: 0.07,
};

/** 方案 B：5=最好，总分越高越倾向 S1。选项 ID 到分数 1～5 的映射（Q1～Q7） */
const OPTION_SCORE = {
  Q1_A1: 5, Q1_A2: 4, Q1_A3: 3, Q1_A4: 2, Q1_A5: 1,
  Q2_A1: 1, Q2_A2: 2, Q2_A3: 3, Q2_A4: 4, Q2_A5: 5,
  Q3_A1: 5, Q3_A2: 4, Q3_A3: 3, Q3_A4: 2, Q3_A5: 1,
  Q4_A1: 1, Q4_A2: 2, Q4_A3: 3, Q4_A4: 4,
  Q5_A1: 1, Q5_A2: 2, Q5_A3: 3, Q5_A4: 4, Q5_A5: 5,
  Q6_A1: 1, Q6_A2: 2, Q6_A3: 3, Q6_A4: 4, Q6_A5: 5,
  Q7_A1: 1, Q7_A2: 2, Q7_A3: 3, Q7_A4: 4, Q7_A5: 5,
};

export function getOptionScore(optionId) {
  return OPTION_SCORE[optionId] ?? null;
}

export const QUESTIONS = {
  Q8: {
    id: 'Q8',
    title: '孩子最近是否还在上学？（包括每天去、或偶尔请假但仍算在学）',
    options: [
      { id: 'Q8_A1', text: '是，基本每天去' },
      { id: 'Q8_A2', text: '是，但经常请假' },
      { id: 'Q8_A3', text: '否，已休学或长期在家' },
    ],
  },
  Q1: {
    id: 'Q1',
    title: '放学后，孩子大约多久内会开始写作业或学习？',
    options: [
      { id: 'Q1_A1', text: '一小时内自己就会开始' },
      { id: 'Q1_A2', text: '一两个小时内，提醒一两次就会动' },
      { id: 'Q1_A3', text: '经常拖到很晚，要提醒好几遍' },
      { id: 'Q1_A4', text: '经常不写或提醒也没用' },
      { id: 'Q1_A5', text: '几乎不写作业' },
    ],
  },
  Q2: {
    id: 'Q2',
    title: '孩子是否出现过身体上的不适，而医院检查没有明确问题？（例如一说上学就胃痛、头痛、失眠、呕吐等）',
    options: [
      { id: 'Q2_A1', text: '没有' },
      { id: 'Q2_A2', text: '偶尔有过' },
      { id: 'Q2_A3', text: '有时会有' },
      { id: 'Q2_A4', text: '经常有' },
      { id: 'Q2_A5', text: '持续或很严重' },
    ],
  },
  Q3: {
    id: 'Q3',
    title: '孩子最近会主动跟您聊学校、朋友或日常的事吗？',
    options: [
      { id: 'Q3_A1', text: '几乎每天都会说一点' },
      { id: 'Q3_A2', text: '经常会说' },
      { id: 'Q3_A3', text: '偶尔会说' },
      { id: 'Q3_A4', text: '很少说' },
      { id: 'Q3_A5', text: '几乎不说、问也不答' },
    ],
  },
  Q4: {
    id: 'Q4',
    title: '当您想跟孩子说话或进他（她）房间时，房门平时是怎样的？',
    options: [
      { id: 'Q4_A1', text: '经常开着或虚掩' },
      { id: 'Q4_A2', text: '有时会关' },
      { id: 'Q4_A3', text: '经常关着' },
      { id: 'Q4_A4', text: '经常反锁' },
    ],
  },
  Q5: {
    id: 'Q5',
    title: '孩子是否说过「上学没用」「不想读书」之类的话？',
    options: [
      { id: 'Q5_A1', text: '从没说过' },
      { id: 'Q5_A2', text: '偶尔说过' },
      { id: 'Q5_A3', text: '有时会说' },
      { id: 'Q5_A4', text: '经常说' },
      { id: 'Q5_A5', text: '总是这样说' },
    ],
  },
  Q6: {
    id: 'Q6',
    title: '孩子是否经常到点不睡觉、熬夜或拒绝按时睡？',
    options: [
      { id: 'Q6_A1', text: '几乎没有' },
      { id: 'Q6_A2', text: '很少' },
      { id: 'Q6_A3', text: '偶尔' },
      { id: 'Q6_A4', text: '经常' },
      { id: 'Q6_A5', text: '几乎每天如此' },
    ],
  },
  Q7: {
    id: 'Q7',
    title: '最近一个月，孩子有没有通过编理由请假、装病等方式逃避上学？',
    options: [
      { id: 'Q7_A1', text: '没有' },
      { id: 'Q7_A2', text: '有过 1 次' },
      { id: 'Q7_A3', text: '2～3 次' },
      { id: 'Q7_A4', text: '4～5 次' },
      { id: 'Q7_A5', text: '很多次' },
    ],
  },
  Q10: {
    id: 'Q10',
    title: '孩子是否已被诊断抑郁、焦虑、双相或正在服用相关药物？',
    options: [
      { id: 'Q10_A1', text: '否' },
      { id: 'Q10_A2', text: '是' },
    ],
  },
  Q11: {
    id: 'Q11',
    title: '您是否担心孩子有自伤或伤害他人的想法或行为？',
    options: [
      { id: 'Q11_A1', text: '否' },
      { id: 'Q11_A2', text: '是，我有些担心' },
    ],
  },
};
