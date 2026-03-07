/**
 * 心灯导引 - 传灯体系 §3.1：lastStage===null 时「去检测」；有值时为心灯仪表盘 + 今日光路
 * 设计书 §5.4 使用说明 + 免责勾选；§9.2.1 危机后 24h 冷却；双按返回退出
 */
import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, BackHandler, Alert, ScrollView, Platform, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../styles/Colors';
import PlantIcon from '../components/PlantIcon';
import BatteryBreath from '../components/BatteryBreath';
import GlossaryTerm, { GlossaryText } from '../components/GlossaryTerm';
import { isCrisisCooldownActive } from '../utils/crisisHandler';
import { KEYS } from '../utils/storageKeys';
import { useSopCards } from '../hooks/useSopCards';
import { STAGE_BATTERY } from '../utils/scoringEngine';
import { shouldDebounceAssessment } from '../utils/dateHelper';

const DOUBLE_BACK_INTERVAL_MS = 2000;
const STAGE_NAMES = { S1: '正常上学', S2: '被动学习', S3: '在校躺平', S4: '在家躺平' };

const HomeScreen = ({ navigation }) => {
  const [disclaimerVisible, setDisclaimerVisible] = useState(false);
  const [ackChecked, setAckChecked] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [lastStage, setLastStage] = useState(null);
  const lastBackTime = useRef(0);

  const loadLastStage = () => {
    AsyncStorage.getItem(KEYS.LAST_STAGE).then((v) => {
      if (v === 'S1' || v === 'S2' || v === 'S3' || v === 'S4') setLastStage(v);
      else setLastStage(null);
    });
  };

  useFocusEffect(React.useCallback(() => { loadLastStage(); }, []));
  useFocusEffect(
    React.useCallback(() => {
      let cancelled = false;
      isCrisisCooldownActive().then((active) => {
        if (!cancelled) setCooldownActive(active);
      });
      return () => { cancelled = true; };
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBack = () => {
        const now = Date.now();
        if (now - lastBackTime.current < DOUBLE_BACK_INTERVAL_MS) {
          if (typeof BackHandler.exitApp === 'function') BackHandler.exitApp();
          return true;
        }
        lastBackTime.current = now;
        if (Platform.OS === 'android' && ToastAndroid) {
          ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        } else {
          Alert.alert('提示', '再按一次退出应用', [{ text: '确定' }]);
        }
        return true;
      };
      const sub = BackHandler.addEventListener('hardwareBackPress', onBack);
      return () => sub.remove();
    }, [])
  );

  const startAssessment = () => {
    if (cooldownActive) return;
    setDisclaimerVisible(true);
  };

  const goToAssessment = () => {
    if (!ackChecked) return;
    setDisclaimerVisible(false);
    AsyncStorage.getItem(KEYS.LAST_ASSESSMENT_AT).then((v) => {
      const ts = Number(v) || 0;
      if (shouldDebounceAssessment(ts)) {
        Alert.alert(
          '提示',
          '建议明天再测一次，结果会更稳定。是否仍要重新检测？',
          [
            { text: '取消' },
            { text: '仍要检测', onPress: () => navigation.navigate('Assessment') },
          ]
        );
      } else {
        navigation.navigate('Assessment');
      }
    });
  };

  const todayCards = useSopCards(lastStage);
  const stageToPlant = { S1: 'first', S2: 'second', S3: 'third', S4: 'fourth' };
  const plantStage = lastStage ? stageToPlant[lastStage] : 'first';
  const batteryLevel = lastStage ? (STAGE_BATTERY[lastStage] ?? 0) : 0;
  const batteryColorMap = { S1: Colors.stage1, S2: Colors.stage2, S3: Colors.stage3, S4: Colors.stage4 };
  const batteryColor = lastStage ? (batteryColorMap[lastStage] || Colors.primary) : Colors.stage1;

  if (lastStage !== null) {
    return (
      <View style={styles.wrapper}>
        <ScrollView style={styles.containerScroll} contentContainerStyle={styles.containerScrollContent}>
          <View style={styles.dashboard}>
            <View style={styles.plantContainer}>
            <PlantIcon stage={plantStage} size={64} />
            <Text style={styles.plantText}>{STAGE_NAMES[lastStage]}</Text>
          </View>
          <BatteryBreath level={batteryLevel} color={batteryColor} />
          <Text style={styles.title}>心灯导引</Text>
          <Text style={styles.subtitle}>路在脚下，光在心中。今日心灯约 {batteryLevel}%</Text>
            {todayCards.length > 0 && (
              <View style={styles.cardsSection}>
                <Text style={styles.cardsSectionTitle}>今日光路</Text>
                {todayCards.map((card) => (
                  <View key={card.id} style={styles.card}>
                    <Text style={styles.cardTitle}>{card.title}</Text>
                    <GlossaryText text={card.summary} style={styles.cardSummary} />
                    {Array.isArray(card.conceptIds) && card.conceptIds.length > 0 && (
                      <View style={styles.conceptRow}>
                        {card.conceptIds.map((cid) => (
                          <GlossaryTerm key={cid} id={cid} />
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
            <Pressable
              style={[styles.button, cooldownActive && styles.buttonDisabled]}
              onPress={startAssessment}
              disabled={cooldownActive}
              accessibilityLabel={cooldownActive ? '24 小时内暂不开放' : '再次检测'}
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>{cooldownActive ? '请先确保孩子安全' : '再次检测'}</Text>
            </Pressable>
            {cooldownActive && (
              <Text style={styles.cooldownHint}>24 小时内暂不开放检测。</Text>
            )}
            <Pressable
              style={styles.exitLink}
              onPress={() => {
                Alert.alert('退出应用', '确定要退出吗？', [
                  { text: '取消', style: 'cancel' },
                  { text: '退出', style: 'destructive', onPress: () => BackHandler.exitApp() },
                ]);
              }}
              accessibilityLabel="退出应用"
            >
              <Text style={styles.exitLinkText}>退出应用</Text>
            </Pressable>
          </View>
        </ScrollView>
        <Pressable
          style={styles.fab}
          onPress={() => navigation.navigate('BreathingGuide')}
          accessibilityLabel="情绪急救，4-7-8 呼吸练习"
        >
          <Text style={styles.fabText}>呼吸</Text>
        </Pressable>
        <Modal visible={disclaimerVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>使用说明</Text>
              <Text style={styles.modalPara}>本工具约 2～3 分钟，通过几道题帮助您了解孩子当前更接近哪种状态。</Text>
              <Text style={styles.modalPara}>本工具不能替代专业诊断与治疗。检测结果仅在您设备内计算。</Text>
              <Pressable style={styles.checkRow} onPress={() => setAckChecked(!ackChecked)} accessibilityLabel="已知晓免责说明" accessibilityState={{ checked: ackChecked }}>
                <Text style={styles.checkbox}>{ackChecked ? '☑' : '☐'}</Text>
                <Text style={styles.checkLabel}>我已阅读并理解上述说明。</Text>
              </Pressable>
              <Pressable style={[styles.modalBtn, !ackChecked && styles.modalBtnDisabled]} onPress={goToAssessment} disabled={!ackChecked} accessibilityLabel="开始答题">
                <Text style={styles.modalBtnText}>开始答题</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantContainer}>
        <PlantIcon stage="first" size={64} />
        <Text style={styles.plantText}>状态可改变</Text>
      </View>

      <Text style={styles.title}>3 分钟，看清孩子状态</Text>
      <Text style={styles.subtitle}>孩子的状态需要被看见，而不是被标签</Text>

      <Pressable
        style={[styles.button, cooldownActive && styles.buttonDisabled]}
        onPress={startAssessment}
        disabled={cooldownActive}
        accessibilityLabel={cooldownActive ? '请先确保孩子安全，24 小时内暂不开放检测' : '开始检测，约 3 分钟了解孩子当前状态'}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>
          {cooldownActive ? '请先确保孩子安全' : '开始检测'}
        </Text>
      </Pressable>
      {cooldownActive && (
        <Text style={styles.cooldownHint}>24 小时内暂不开放检测，请优先寻求专业帮助。</Text>
      )}

      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('BreathingGuide')}
        accessibilityLabel="情绪急救，4-7-8 呼吸练习"
      >
        <Text style={styles.secondaryButtonText}>情绪急救 · 呼吸练习</Text>
      </Pressable>

      <Text style={styles.footer}>检测结果仅用于行动建议，不存储数据</Text>

      <Pressable
        style={styles.exitLink}
        onPress={() => {
          Alert.alert('退出应用', '确定要退出吗？', [
            { text: '取消', style: 'cancel' },
            { text: '退出', style: 'destructive', onPress: () => BackHandler.exitApp() },
          ]);
        }}
        accessibilityLabel="退出应用"
      >
        <Text style={styles.exitLinkText}>退出应用</Text>
      </Pressable>

      <Modal visible={disclaimerVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>使用说明</Text>
            <Text style={styles.modalPara}>
              本工具约 2～3 分钟，通过几道题帮助您了解孩子当前更接近哪种状态，并给出对应行动建议。
            </Text>
            <Text style={styles.modalPara}>
              本工具不能替代专业诊断与治疗。若孩子有自伤、伤人倾向或严重躯体/情绪问题，请及时就医或寻求专业心理帮助。
            </Text>
            <Text style={styles.modalPara}>检测结果仅在您设备内计算，不存储个人敏感信息。</Text>
            <Pressable style={styles.checkRow} onPress={() => setAckChecked(!ackChecked)} accessibilityLabel="已知晓免责说明" accessibilityState={{ checked: ackChecked }}>
              <Text style={styles.checkbox}>{ackChecked ? '☑' : '☐'}</Text>
              <Text style={styles.checkLabel}>我已阅读并理解上述说明。本结果仅用于理解状态与指导行动，不用于评判孩子，也不能替代专业评估与治疗。</Text>
            </Pressable>
            <Pressable style={[styles.modalBtn, !ackChecked && styles.modalBtnDisabled]} onPress={goToAssessment} disabled={!ackChecked} accessibilityLabel="开始答题">
              <Text style={styles.modalBtnText}>开始答题</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.background,
  },
  wrapper: { flex: 1, backgroundColor: Colors.background },
  containerScroll: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: { fontSize: 14, fontWeight: '600', color: '#FFF' },
  containerScrollContent: {
    padding: 24,
    paddingBottom: 48,
  },
  dashboard: {
    alignItems: 'center',
  },
  cardsSection: {
    width: '100%',
    maxWidth: 320,
    marginTop: 16,
    marginBottom: 24,
  },
  cardsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  cardSummary: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  conceptRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  plantContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  plantText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    width: '100%',
    maxWidth: 320,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
  },
  buttonDisabled: {
    backgroundColor: Colors.border,
    opacity: 0.9,
  },
  cooldownHint: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  secondaryButtonText: {
    fontSize: 15,
    color: Colors.primaryDark,
  },
  footer: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  exitLink: {
    marginTop: 24,
    paddingVertical: 8,
    alignItems: 'center',
  },
  exitLinkText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalBox: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 360,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  modalPara: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 16,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 8,
  },
  checkLabel: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
    lineHeight: 20,
  },
  modalBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  modalBtnDisabled: {
    opacity: 0.5,
  },
  modalBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default HomeScreen;
