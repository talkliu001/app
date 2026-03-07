/**
 * 点亮微光 - 危机熔断全屏锁定（规范 §3.8）
 * 解除需勾选认知文案，确认解除后调用 onConfirmExit（clearCrisisActive）
 * 无拨号、无电话号码
 */
import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../styles/Colors';

export default function MeltdownLockdownModal({ visible, onConfirmExit }) {
  const [checked, setChecked] = useState(false);

  const handleConfirm = () => {
    if (!checked) return;
    setChecked(false);
    onConfirmExit?.();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.fullScreen}>
        <View style={styles.card}>
          <Text style={styles.title}>检测到高危信号</Text>
          <Text style={styles.lead}>当前首要任务是医疗介入。</Text>
          <Text style={styles.para}>
            请尽快寻求专业心理或医疗帮助。可前往附近医院精神科/心理科，或通过正规渠道预约心理咨询。
          </Text>
          <Text style={styles.para}>本应用不提供拨号功能，仅作安全提醒与行动建议。</Text>

          <Pressable
            style={styles.checkRow}
            onPress={() => setChecked((c) => !c)}
            accessibilityLabel="我已知晓若孩子再次出现危险行为，我将立即前往医院"
            accessibilityState={{ checked }}
          >
            <Text style={styles.checkbox}>{checked ? '☑' : '☐'}</Text>
            <Text style={styles.checkLabel}>
              我已知晓：若孩子再次出现危险行为，我将立即前往医院或联系专业人士。
            </Text>
          </Pressable>

          <Pressable
            style={[styles.confirmBtn, !checked && styles.confirmBtnDisabled]}
            onPress={handleConfirm}
            disabled={!checked}
            accessibilityLabel="确认解除"
          >
            <Text style={styles.confirmBtnText}>确认解除</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: 'rgba(180, 40, 40, 0.97)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 360,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.danger || '#B82828',
    marginBottom: 8,
    textAlign: 'center',
  },
  lead: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  para: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    marginBottom: 20,
  },
  checkbox: {
    fontSize: 20,
    marginRight: 10,
  },
  checkLabel: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
  },
  confirmBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.primary || '#F4D0A8',
    alignItems: 'center',
  },
  confirmBtnDisabled: {
    opacity: 0.5,
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
});
