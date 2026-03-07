/**
 * 阶段检测 - 一题一屏，顺序 Q8→Q1～Q7→Q10→Q11；Q11 选「是」弹危机弹窗
 * 设计书附录 F + 方案 B 计分
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../styles/Colors';
import PlantIcon from '../components/PlantIcon';
import CrisisModal from '../components/CrisisModal';
import { QUESTION_ORDER, QUESTIONS } from '../data/questionBank';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getResultFromAnswers, stageToDetailKey } from '../utils/scoringEngine';
import { recordCrisisCooldownOnly } from '../utils/crisisHandler';
import { KEYS } from '../utils/storageKeys';

const AssessmentScreen = ({ navigation }) => {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [crisisVisible, setCrisisVisible] = useState(false);

  const qid = QUESTION_ORDER[step];
  const q = QUESTIONS[qid];
  const total = QUESTION_ORDER.length;

  const setAnswer = (optionId) => {
    const next = { ...answers, [qid]: optionId };
    setAnswers(next);
    if (qid === 'Q11' && optionId === 'Q11_A2') {
      setCrisisVisible(true);
      return;
    }
    if (step < total - 1) setStep(step + 1);
    else submit(next);
  };

  const submit = async (finalAnswers = answers) => {
    const res = getResultFromAnswers(finalAnswers);
    const payload = {
      stage: res.stage,
      score: res.score,
      isTransition: !!res.transition,
      transitionStages: res.transitionStages || null,
      assessedAt: res.assessedAt,
      showDrugModule: !!res.showDrugModule,
      showHotline: !!res.showHotline,
    };
    try {
      await AsyncStorage.setItem(KEYS.LAST_STAGE, res.stage);
      await AsyncStorage.setItem(KEYS.ASSESSMENT_RESULT, JSON.stringify(payload));
      await AsyncStorage.setItem(KEYS.LAST_ASSESSMENT_AT, String(res.assessedAt));
    } catch (_) {}
    navigation.navigate('StageDetail', {
      stage: stageToDetailKey(res.stage),
      stageId: res.stage,
      showDrugModule: !!res.showDrugModule,
      showHotline: !!res.showHotline,
      transition: !!res.transition,
      transitionStages: res.transitionStages || null,
    });
  };

  const goPrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const currentAnswer = answers[qid];
  const canNext = currentAnswer != null;
  const isLast = step === total - 1;

  const handleCrisisAck = async () => {
    setCrisisVisible(false);
    await recordCrisisCooldownOnly();
    submit({ ...answers, Q11: 'Q11_A2' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressWrap}>
        <View style={[styles.progressBar, { width: `${((step + 1) / total) * 100}%` }]} />
        <Text style={styles.progressText}>第 {step + 1}/{total} 题</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.questionRow}>
          <PlantIcon stage="first" size={40} />
          <Text style={styles.question}>{q.title}</Text>
        </View>
        <View style={styles.options}>
          {q.options.map((opt) => (
            <Pressable
              key={opt.id}
              style={[styles.option, currentAnswer === opt.id && styles.optionSelected]}
              onPress={() => setAnswer(opt.id)}
              accessibilityLabel={opt.text}
              accessibilityState={{ selected: currentAnswer === opt.id }}
              accessibilityRole="radio"
            >
              <Text style={[styles.optionText, currentAnswer === opt.id && styles.optionTextSelected]}>
                {opt.text}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {step > 0 && (
          <Pressable style={styles.secondaryBtn} onPress={goPrev} accessibilityLabel="上一题">
            <Text style={styles.secondaryBtnText}>上一题</Text>
          </Pressable>
        )}
        {isLast && canNext && qid !== 'Q11' && (
          <Pressable style={styles.button} onPress={() => submit()} accessibilityLabel="查看专属行动建议">
            <Text style={styles.buttonText}>查看专属行动建议</Text>
          </Pressable>
        )}
      </View>

      <CrisisModal visible={crisisVisible} onAck={handleCrisisAck} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  progressWrap: {
    height: 6,
    backgroundColor: Colors.neutral,
    borderRadius: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  question: {
    fontSize: 17,
    color: Colors.text,
    marginLeft: 12,
    flex: 1,
    lineHeight: 26,
  },
  options: {
    gap: 12,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.stage1,
  },
  optionText: {
    fontSize: 15,
    color: Colors.text,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: Colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    gap: 12,
  },
  secondaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  secondaryBtnText: {
    fontSize: 15,
    color: Colors.primaryDark,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default AssessmentScreen;
