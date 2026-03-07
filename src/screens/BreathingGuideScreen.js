/**
 * 4-7-8 呼吸引导全屏（设计方案 §3.1 情绪急救、规范 §3.10）
 * 吸气 4s → 屏息 7s → 呼气 8s，无拨号、无音频依赖
 */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Colors } from '../styles/Colors';

const PHASES = [
  { key: 'in', label: '吸气', duration: 4, hint: '用鼻子慢慢吸气' },
  { key: 'hold', label: '屏息', duration: 7, hint: '保持' },
  { key: 'out', label: '呼气', duration: 8, hint: '用嘴慢慢呼气' },
];

export default function BreathingGuideScreen({ navigation }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].duration);
  const [running, setRunning] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const phase = PHASES[phaseIndex];

  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) {
      const next = (phaseIndex + 1) % PHASES.length;
      setPhaseIndex(next);
      setSecondsLeft(PHASES[next].duration);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, secondsLeft, phaseIndex]);

  useEffect(() => {
    if (!running) return;
    const isIn = phase.key === 'in';
    const isOut = phase.key === 'out';
    if (isIn) {
      Animated.timing(scaleAnim, { toValue: 1.15, duration: 4000, useNativeDriver: true }).start();
    } else if (isOut) {
      Animated.timing(scaleAnim, { toValue: 0.92, duration: 8000, useNativeDriver: true }).start();
    } else {
      scaleAnim.setValue(1.15);
    }
  }, [running, phase.key]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>4-7-8 呼吸法</Text>
      <Text style={styles.subtitle}>缓解紧张，先稳下来</Text>

      <Animated.View style={[styles.circleWrap, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.circle}>
          <Text style={styles.phaseLabel}>{phase.label}</Text>
          {running && <Text style={styles.seconds}>{secondsLeft}</Text>}
        </View>
      </Animated.View>

      <Text style={styles.hint}>{phase.hint}</Text>

      <Pressable
        style={styles.button}
        onPress={() => setRunning(!running)}
        accessibilityLabel={running ? '暂停' : '开始'}
      >
        <Text style={styles.buttonText}>{running ? '暂停' : '开始'}</Text>
      </Pressable>

      <Text style={styles.cognitive}>
        默念：「这是他（她）的问题，不是我的失败。」「他（她）在求救，不是在攻击我。」「慢就是快。」
      </Text>

      <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnText}>返回</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: Colors.text, marginBottom: 8 },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 32 },
  circleWrap: { marginVertical: 24 },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseLabel: { fontSize: 24, fontWeight: '600', color: Colors.text },
  seconds: { fontSize: 36, fontWeight: 'bold', color: Colors.primaryDark, marginTop: 4 },
  hint: { fontSize: 14, color: Colors.textSecondary, marginTop: 16 },
  button: {
    marginTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    backgroundColor: Colors.sparkOrange,
  },
  buttonText: { fontSize: 17, fontWeight: '600', color: Colors.text },
  cognitive: {
    marginTop: 32,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  backBtn: { marginTop: 24 },
  backBtnText: { fontSize: 16, color: Colors.primaryDark },
});
