/**
 * 薪火传心 - 场景化话术与 SOP（传灯体系 §3.3）
 * 传递的火把，借一束光回去照亮孩子的角落
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../styles/Colors';

const SCENES = [
  { key: 'sleep', label: '睡觉难', desc: '到点关灯，睡眠熔断' },
  { key: 'phone', label: '手机控', desc: '先充电再谈规则' },
  { key: 'door', label: '不开门', desc: '门缝传爱，等待信号' },
  { key: 'pain', label: '喊头痛', desc: '相信痛苦，身体照顾' },
  { key: 'anger', label: '发脾气', desc: '物理隔离，呼吸后再谈' },
];

export default function ToolkitScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>薪火传心</Text>
      <Text style={styles.subtitle}>借一束光，回去照亮孩子的角落</Text>
      <View style={styles.grid}>
        {SCENES.map((s) => (
          <View key={s.key} style={styles.card}>
            <Text style={styles.cardTitle}>{s.label}</Text>
            <Text style={styles.cardDesc}>{s.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24, paddingBottom: 48 },
  title: { fontSize: 22, fontWeight: 'bold', color: Colors.text, marginBottom: 8 },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 24 },
  grid: { gap: 12 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.text },
  cardDesc: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
});
