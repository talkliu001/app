/**
 * 启动页 - 降级版：静态深色背景 + Slogan，2.5s 后淡出
 * 规范：背景 #0F172A，Slogan「看见微光，就是看见希望」
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const DURATION_MS = 2500;

export default function SplashScreen({ onFinish }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const t = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onFinish?.());
    }, DURATION_MS);
    return () => clearTimeout(t);
  }, [opacity, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.glow} />
      <Text style={styles.title}>点亮微光</Text>
      <Text style={styles.slogan}>看见微光，就是看见希望</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FDE68A',
    opacity: 0.3,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  slogan: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 2,
  },
});
