/**
 * 植物生长图标 - 传递「状态可改变」的希望
 * 设计规范：🌱 S1 / 🌿 S2 / 🌊 S3 / 🌳 S4 / ✨ 修复中
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../styles/Colors';

const STAGE_ICONS = {
  first: '🌱',
  second: '🌿',
  third: '🌊',
  fourth: '🌳',
};

const STAGE_BG = {
  first: Colors.stage1,
  second: Colors.stage2,
  third: Colors.stage3,
  fourth: Colors.stage4,
};

const PlantIcon = ({ stage, size = 40 }) => {
  const icon = STAGE_ICONS[stage] || '🌱';
  const bg = STAGE_BG[stage] || Colors.stage1;

  return (
    <View style={[styles.iconContainer, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]}>
      <Text style={[styles.icon, { fontSize: size * 0.55 }]}>{icon}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
});

export default PlantIcon;
