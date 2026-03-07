/**
 * 引导页 - 规范 §四 启动页三屏文案（技术方案 §10.2.C）
 */
import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Colors } from '../styles/Colors';
import { GlossaryText } from '../components/GlossaryTerm';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PAGES = [
  {
    key: 'p1',
    title: '孩子心里还有一束微光',
    subtitle: '只是暂时被风雨吹得摇曳不定，它从未熄灭。',
    button: '下一步',
  },
  {
    key: 'p2',
    title: '你不必完美，只需在场',
    subtitle: '你的每一次温和坚定，都是在为它挡风添柴。',
    button: '下一步',
  },
  {
    key: 'p3',
    title: '点亮微光，传心致远',
    subtitle: '从今天的一个小行动开始，陪孩子慢慢走出来。',
    button: '开始点亮',
  },
];

const OnboardingScreen = ({ onFinish }) => {
  const [index, setIndex] = useState(0);
  const listRef = useRef(null);

  const onNext = () => {
    const isLastPage = index >= PAGES.length - 1 || PAGES[index].button === '开始点亮';
    if (!isLastPage) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
      setIndex(index + 1);
    } else {
      onFinish?.();
    }
  };

  const onScroll = (e) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (i >= 0 && i !== index) setIndex(i);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.placeholder} />
      <Text style={styles.title}>{item.title}</Text>
      <GlossaryText text={item.subtitle} style={styles.subtitle} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.slogan}>看见微光，就是看见希望</Text>
      <FlatList
        ref={listRef}
        data={PAGES}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        onScrollToIndexFailed={() => {}}
      />
      <View style={styles.footer}>
        <View style={styles.dots}>
          {PAGES.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <Pressable
          style={styles.button}
          onPress={onNext}
          accessibilityLabel={PAGES[index].button}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{PAGES[index].button}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  slogan: {
    marginTop: 48,
    fontSize: 14,
    color: Colors.primaryDark,
    textAlign: 'center',
    letterSpacing: 1,
    opacity: 0.9,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 120,
    height: 120,
    marginBottom: 40,
    borderRadius: 60,
    backgroundColor: 'rgba(244, 208, 168, 0.4)',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default OnboardingScreen;
