/**
 * 点亮阶梯 - 复学路径五阶段（传灯体系 §3.2）
 * 发光的台阶，完成即照亮该段；未完成处隐没黑暗中
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../styles/Colors';
import { GlossaryText } from '../components/GlossaryTerm';

const STAGES = [
  { id: 1, name: '信任修复', desc: '真诚道歉，本学期不谈学习' },
  { id: 2, name: '生活重启', desc: '固定三餐，逐步调作息' },
  { id: 3, name: '思维松绑', desc: '帮孩子把死胡同想通' },
  { id: 4, name: '点亮微光', desc: '支持兴趣，微小成功目标' },
  { id: 5, name: '小步尝试', desc: '校门口→半日→全日' },
];

export default function RoadmapScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>点亮阶梯</Text>
      <Text style={styles.subtitle}>每完成一步，前路就被照亮一程</Text>
      {STAGES.map((s) => (
        <View key={s.id} style={styles.card}>
          <GlossaryText text={`${s.id}. ${s.name}`} style={styles.cardTitle} />
          <GlossaryText text={s.desc} style={styles.cardDesc} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24, paddingBottom: 48 },
  title: { fontSize: 22, fontWeight: 'bold', color: Colors.text, marginBottom: 8 },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 24 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.text },
  cardDesc: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
});
