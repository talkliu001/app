/**
 * 星星之火 - 灯火愈明 & 社区（传灯体系 §3.4、§3.5）
 * 你并不孤单，这里有万千星火与你同在
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Colors } from '../styles/Colors';

export default function ParentHarborScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>星星之火</Text>
      <Text style={styles.subtitle}>聚星星之火，成燎原之势</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>情绪急救</Text>
        <Text style={styles.cardDesc}>情绪激动时：离开现场 → 4-7-8 呼吸 → 认知咒语 → 寻求支持</Text>
        <Text style={styles.link} onPress={() => navigation.navigate('BreathingGuide')}>进入呼吸练习</Text>
      </View>
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('BrighteningLights')}
        accessibilityLabel="查看灯火愈明"
      >
        <Text style={styles.cardTitle}>灯火愈明</Text>
        <Text style={styles.cardDesc}>每完成「忍住唠叨」或「真诚道歉」，心灯亮一层</Text>
        <Text style={styles.link}>查看流光轨迹</Text>
      </Pressable>
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
    borderLeftColor: Colors.success,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.text },
  cardDesc: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  link: { fontSize: 14, color: Colors.primaryDark, marginTop: 8 },
});
