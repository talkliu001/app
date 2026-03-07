/**
 * 开花庆祝（规范 §3.10）- 无 Lottie 时用 Animated 缩放+透明度
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../styles/Colors';

export default function FlowerCelebration({ onFinish }) {
  const scale = useRef(new Animated.Value(0.3)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let t;
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      t = setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => onFinish?.());
      }, 1500);
    });
    return () => { if (t) clearTimeout(t); };
  }, [scale, opacity, onFinish]);

  return (
    <Animated.View style={[styles.wrap, { opacity, transform: [{ scale }] }]}>
      <View style={styles.flower}>
        <Text style={styles.emoji}>🌸</Text>
      </View>
      <Text style={styles.text}>做得好</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  flower: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: { fontSize: 40 },
  text: { marginTop: 8, fontSize: 16, color: Colors.text },
});
