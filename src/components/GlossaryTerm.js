/**
 * 规范 §3.13：点击查词，从 glossary.json 取 term/plainText/academicText
 * 点击后 Modal：默认 plainText，可展开「查看心理学原理」显示 academicText
 */
import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, Modal, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Colors } from '../styles/Colors';

let glossaryList = null;
function getGlossary() {
  if (glossaryList) return glossaryList;
  try {
    const data = require('../assets/content/glossary.json');
    glossaryList = Array.isArray(data?.glossary) ? data.glossary : [];
    return glossaryList;
  } catch (_) {
    glossaryList = [];
    return [];
  }
}

function findEntry(id) {
  return getGlossary().find((e) => e.id === id) || null;
}

export function GlossaryTerm({ id, children }) {
  const [visible, setVisible] = useState(false);
  const [showAcademic, setShowAcademic] = useState(false);
  const entry = useMemo(() => findEntry(id), [id]);

  if (!entry) {
    return <Text style={styles.inline}>{children}</Text>;
  }

  return (
    <>
      <Pressable onPress={() => { setShowAcademic(false); setVisible(true); }} accessibilityLabel={`查看释义：${entry.term}`} accessibilityRole="button">
        <Text style={styles.term}>{children || entry.term}</Text>
      </Pressable>
      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <Pressable style={styles.modalBox} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>{entry.term}</Text>
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={true} contentContainerStyle={{ paddingBottom: 8 }}>
              <Text style={styles.plainText}>{entry.plainText}</Text>
              {entry.academicText && (
                <>
                  <Pressable style={styles.expandRow} onPress={() => setShowAcademic(!showAcademic)} accessibilityLabel={showAcademic ? '收起心理学原理' : '查看心理学原理'}>
                    <Text style={styles.expandLabel}>{showAcademic ? '收起' : '查看心理学原理'}</Text>
                  </Pressable>
                  {showAcademic && <Text style={styles.academicText}>{entry.academicText}</Text>}
                </>
              )}
            </ScrollView>
            <Pressable style={styles.closeBtn} onPress={() => setVisible(false)} accessibilityLabel="关闭">
              <Text style={styles.closeBtnText}>关闭</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  inline: {
    fontSize: 14,
    color: Colors.text,
  },
  term: {
    fontSize: 14,
    color: Colors.primaryDark,
    textDecorationLine: 'underline',
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
    padding: 20,
    width: '100%',
    maxWidth: 360,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  modalScroll: {
    maxHeight: Math.min(420, Dimensions.get('window').height * 0.5),
  },
  plainText: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.text,
    marginBottom: 12,
  },
  expandRow: {
    paddingVertical: 8,
  },
  expandLabel: {
    fontSize: 14,
    color: Colors.primaryDark,
  },
  academicText: {
    fontSize: 13,
    lineHeight: 22,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  closeBtn: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 16,
    color: Colors.primaryDark,
  },
});

/**
 * 将文本中出现的 glossary 概念词渲染为可点击的 GlossaryTerm
 * @param {{ text: string, style?: object }} props
 */
export function GlossaryText({ text, style }) {
  const entries = getGlossary();
  const sorted = [...entries].sort((a, b) => b.term.length - a.term.length);
  const parts = [];
  let remaining = String(text || '');
  let key = 0;

  while (remaining.length > 0) {
    let found = false;
    for (const e of sorted) {
      const idx = remaining.indexOf(e.term);
      if (idx >= 0) {
        if (idx > 0) {
          parts.push(<Text key={key++} style={[styles.inline, style]}>{remaining.slice(0, idx)}</Text>);
        }
        parts.push(<GlossaryTerm key={key++} id={e.id}>{e.term}</GlossaryTerm>);
        remaining = remaining.slice(idx + e.term.length);
        found = true;
        break;
      }
    }
    if (!found) {
      parts.push(<Text key={key++} style={[styles.inline, style]}>{remaining}</Text>);
      break;
    }
  }

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {parts}
    </View>
  );
}

export default GlossaryTerm;
