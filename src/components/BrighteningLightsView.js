/**
 * 灯火愈明 - 简单数据可视化（降级版）
 * 心灯：渐变圆随亮度变化；星河：一排圆点表示每日打卡
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BG = '#0F172A';
const PALE_EMBER = '#FDE68A';
const WARM_FLAME = '#FB923C';
const PURE_GOLD = '#FACC15';

export default function BrighteningLightsView({
  streakDays = 0,
  completionRate = 0,
  dailyCompletion = [], // 最近 7 天 [true,false,true,...]，true=完成
}) {
  const brightness = Math.min(1, 0.2 + (streakDays / 10) * 0.8);
  const lampOpacity = 0.2 + brightness * 0.6;
  const lampScale = 0.8 + brightness * 0.4;

  const days = dailyCompletion.length >= 7 ? dailyCompletion.slice(-7) : Array(7).fill(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>心灯</Text>
      <View
        style={[
          styles.lamp,
          {
            opacity: lampOpacity,
            transform: [{ scale: lampScale }],
          },
        ]}
      />
      <Text style={styles.hint}>连续打卡 {streakDays} 天 · 完成度 {Math.round(completionRate)}%</Text>

      <Text style={[styles.title, { marginTop: 32 }]}>星河轨迹</Text>
      <View style={styles.starRow}>
        {days.map((done, i) => (
          <View
            key={i}
            style={[
              styles.star,
              done ? styles.starOn : styles.starOff,
            ]}
          />
        ))}
      </View>
      <Text style={styles.hint}>最近 7 天</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG,
    borderRadius: 16,
    padding: 24,
    minHeight: 240,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  lamp: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: PURE_GOLD,
    shadowColor: WARM_FLAME,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 8,
  },
  hint: {
    fontSize: 12,
    color: WARM_FLAME,
    opacity: 0.9,
    marginTop: 8,
  },
  starRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  star: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  starOn: {
    backgroundColor: PALE_EMBER,
    shadowColor: PURE_GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  starOff: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
