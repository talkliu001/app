/**
 * 自伤/伤人危机弹窗 - 设计书 §9.2.1
 * 选 Q11_A2 后立即展示；推荐 24h 内禁用「开始检测」
 */
import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../styles/Colors';

export default function CrisisModal({ visible, onAck }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>请优先关注孩子安全</Text>
          <Text style={styles.para}>
            检测到孩子可能存在安全风险。此刻，孩子的生命安全比任何检测结果都重要。
          </Text>
          <Text style={styles.list}>① 请立即移除家中可能的危险物品（刀具、药品、绳索等）。</Text>
          <Text style={styles.list}>② 不要让孩子独处，保持温和陪伴。</Text>
          <Text style={styles.list}>③ 请尽快寻求专业心理或医疗帮助。</Text>
          <Text style={styles.foot}>
            本 APP 不会记录您的具体选择细节以保护隐私，但强烈建议您联系专业人士。
          </Text>
          <Pressable style={styles.ackButton} onPress={onAck} accessibilityLabel="我已知晓，继续">
            <Text style={styles.ackText}>我已知晓，继续</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  box: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 360,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  para: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  list: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.text,
    marginBottom: 6,
  },
  foot: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  ackButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  ackText: {
    fontSize: 15,
    color: Colors.primaryDark,
    fontWeight: '500',
  },
});
