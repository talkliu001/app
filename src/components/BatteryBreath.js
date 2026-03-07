/**
 * 电池呼吸（规范 §3.9）- 使用 RN Animated，按阶段颜色与电量渲染
 * level: 0|5|30|50|80，color: 阶段色
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const DURATION = 2000;

export default function BatteryBreath({ level = 0, color = '#A8E6CF' }) {
  const opacity = useRef(new Animated.Value(0.85)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(opacity, { toValue: 1, duration: DURATION, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1.02, duration: DURATION, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0.85, duration: DURATION, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: DURATION, useNativeDriver: true }),
        ]),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [opacity, scale]);

  const widthPct = Math.min(100, Math.max(0, level));

  return (
    <Animated.View style={[styles.wrap, { opacity, transform: [{ scale }] }]}>
      <View style={[styles.track, { backgroundColor: 'rgba(0,0,0,0.08)' }]}>
        <Animated.View style={[styles.fill, { width: `${widthPct}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.label}>{level}%</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  track: {
    width: 120,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 14,
  },
  label: { fontSize: 12, marginTop: 4, color: '#4A4A4A' },
});
