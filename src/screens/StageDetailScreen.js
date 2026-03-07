/**
 * 阶段详情页 - 设计书 §4.2.1、附录 G；支持药物边界、过渡期提示、话术复制
 */
import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Colors } from '../styles/Colors';
import PlantIcon from '../components/PlantIcon';
import { GlossaryText } from '../components/GlossaryTerm';

const SLEEP_SCRIPT =
  '到了约定时间，你必须睡觉。作业写没写完是你和老师的事，妈妈只对你的身体健康负责。现在立刻关灯睡觉。';

const STAGE_NAMES = { S1: '正常上学', S2: '被动学习', S3: '在校躺平', S4: '在家躺平' };

const STAGE_CONFIG = {
  first: {
    title: '第一阶段：正常上学',
    desc: '孩子主动性强，视上学为理所应当',
    headerBg: Colors.stage1,
    keyPoint: '恰当提醒（1～2 遍）',
    mustDo: '✅ 用 1～2 遍提醒，尊重孩子暂时不能独立完成\n✅ 训练其逐步自己安排时间',
    mustAvoid: '❌ 催促超过 2 遍（易滑向被动学习）',
  },
  second: {
    title: '第二阶段：被动学习',
    desc: '孩子仍上学，但写作业、起床拖拉',
    headerBg: Colors.stage2,
    keyPoint: '停止唠叨',
    mustDo: '✅ 停止超过 2 遍的提醒\n✅ 优先修复关系与睡眠底线，而非继续催作业',
    mustAvoid: '❌ 换学校/老师（外因无效）\n❌ 催「写完作业再睡」',
  },
  third: {
    title: '第三阶段：在校躺平',
    desc: '不写作业、编理由请假、躯体不适（如胃痛）',
    headerBg: Colors.stage3,
    keyPoint: '分水岭！挽救的最后窗口',
    mustDo: '✅ 优先恢复能量：「妈妈看到你胃不舒服，我们先吃点粥好吗？」\n✅ 停止冲突：别问「为什么不去学校」，改说「妈妈在等你」\n✅ 睡眠底线：到点必须睡，作业写没写完是你和老师的事，妈妈只对健康负责',
    mustAvoid: '❌ 换学校/老师\n❌ 催促「写完作业再睡」\n❌ 说「你就是懒」',
  },
  fourth: {
    title: '第四阶段：在家躺平',
    desc: '已不去学校，可能关门、黑白颠倒',
    headerBg: Colors.stage4,
    keyPoint: '按点亮阶梯五阶段长期修复',
    mustDo: '✅ 信任修复 → 生活重启 → 思维松绑 → 点亮微光 → 小步尝试（校门口→半日→全日）\n✅ 内因主导，不单靠换学校',
    mustAvoid: '❌ 单点换学校/老师\n❌ 急于送医用药（神经症阶段优先能量与关系）',
  },
};

const DRUG_BOUNDARY_TEXT = `1. 在出现躯体化反应（如胃疼、呕吐、一说上学就不适等）的阶段，应优先通过恢复能量、提供安全感、减少指责来帮助孩子，不要急于推向精神科用药。

2. 药物可能带来嗜睡、胃口剧变、反应变慢、成绩下降等副作用，且无法单独解决认知和关系的根源问题。

3. 若孩子已在服药，切勿擅自停药，需在专业医生或可靠方案指导下逐步调整或减停。

4. 何时寻求医疗介入：若孩子出现持续两周以上的重度失眠、食欲骤降、极度绝望或自伤行为，请立即前往正规医院精神科/心理科就诊。本 APP 仅为家庭教育辅助工具，不能替代专业医疗诊断。

5. 本结果不替代医疗与心理评估。若您对用药或诊断有疑问，建议与主治医生或心理咨询师沟通。`;

const StageDetailScreen = ({ route, navigation }) => {
  const {
    stage,
    showDrugModule,
    showHotline,
    transition,
    transitionStages,
  } = route.params || {
    stage: 'third',
    showDrugModule: false,
    showHotline: false,
    transition: false,
    transitionStages: null,
  };
  const config = STAGE_CONFIG[stage] || STAGE_CONFIG.third;

  const copySleepScript = () => {
    Clipboard.setString(SLEEP_SCRIPT);
    Alert.alert('已复制', '睡眠底线话术已复制到剪贴板');
  };

  const transitionLabel =
    transition &&
    transitionStages &&
    transitionStages.length >= 2
      ? `${STAGE_NAMES[transitionStages[0]]} 与 ${STAGE_NAMES[transitionStages[1]]}`
      : '';

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: config.headerBg }]}>
          <PlantIcon stage={stage} size={48} />
          <Text style={styles.headerTitle}>{config.title}</Text>
          <Text style={styles.headerDesc}>{config.desc}</Text>
          <Text style={styles.keyPoint}>{config.keyPoint}</Text>
        </View>

        {transition && transitionLabel ? (
          <View style={styles.transitionBanner}>
            <Text style={styles.transitionText}>
              您的孩子可能正处于「{transitionLabel}」过渡的关键期。建议同时参考两阶段的建议，重点关注当前阶段。
            </Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>【为什么是这个阶段？】</Text>
          <GlossaryText
            text="能量消耗与认知偏差（如「努力无效」「只能接受自己好」）叠加；身体症状常是情绪压力的信号。"
            style={styles.sectionText}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>【家长必须做】</Text>
          <GlossaryText text={config.mustDo} style={styles.sectionText} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>【家长必须避免】</Text>
          <GlossaryText text={config.mustAvoid} style={styles.sectionText} />
        </View>

        {showDrugModule && (
          <View style={[styles.section, styles.drugBlock]}>
            <Text style={styles.sectionTitle}>【关于药物与专业支持】</Text>
            <Text style={styles.sectionText}>{DRUG_BOUNDARY_TEXT}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>【家长自我关怀】</Text>
          <GlossaryText
            text="🌿 1 分钟正念：深呼吸 4 秒 → 屏息 2 秒 → 呼气 6 秒（重复 3 次）"
            style={styles.sectionText}
          />
        </View>

        <Pressable style={styles.cta} onPress={copySleepScript} accessibilityLabel="复制睡眠底线话术到剪贴板" accessibilityRole="button">
          <Text style={styles.ctaText}>一键复制：睡眠底线话术</Text>
        </Pressable>

        {showHotline && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>若您担心孩子安全</Text>
            <Text style={styles.sectionText}>请尽快寻求专业心理或医疗帮助。</Text>
          </View>
        )}

        <Text style={styles.disclaimer}>此结果仅用于理解状态与指导行动，不用于评判孩子。</Text>

        <Pressable style={styles.secondaryCta} onPress={() => navigation.navigate('Assessment')} accessibilityLabel="再测一次">
          <Text style={styles.secondaryCtaText}>再测一次</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
    textAlign: 'center',
  },
  headerDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 6,
    textAlign: 'center',
  },
  keyPoint: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 8,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  cta: {
    margin: 20,
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
  },
  drugBlock: {
    backgroundColor: Colors.neutral,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
  },
  transitionBanner: {
    marginHorizontal: 20,
    marginTop: 12,
    padding: 14,
    backgroundColor: Colors.stage2,
    borderRadius: 10,
  },
  transitionText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.text,
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    margin: 20,
    marginBottom: 16,
  },
  secondaryCta: {
    marginHorizontal: 20,
    marginBottom: 32,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryCtaText: {
    fontSize: 15,
    color: Colors.primaryDark,
  },
});

export default StageDetailScreen;
