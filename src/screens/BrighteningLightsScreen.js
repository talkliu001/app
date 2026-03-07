/**
 * 灯火愈明 - 全屏数据可视化页（降级版）
 * 规范：深色背景 #0F172A，心灯 + 星河轨迹
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BrighteningLightsView from '../components/BrighteningLightsView';
import { useBrighteningLightsData } from '../hooks/useBrighteningLightsData';

const DEEP_BG = '#0F172A';

export default function BrighteningLightsScreen() {
  const { streakDays, completionRate, dailyCompletion } = useBrighteningLightsData();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.screenTitle}>灯火愈明</Text>
      <Text style={styles.screenSubtitle}>流光轨迹 · 高光时刻</Text>
      <BrighteningLightsView
        streakDays={streakDays}
        completionRate={completionRate}
        dailyCompletion={dailyCompletion}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DEEP_BG },
  content: { padding: 24, paddingBottom: 48 },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  screenSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 24,
  },
});
