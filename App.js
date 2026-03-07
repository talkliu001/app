/**
 * 点亮微光 / 厌学检测 APP - 主入口
 * 规范 §四：启动时 runStorageCleanup；Onboarding 门控；熔断门控；ThemeProvider
 */
import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

class AppErrorBoundary extends Component {
  state = { error: null, stack: '' };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    const stack = (error && error.stack) || (info && info.componentStack) || '';
    this.setState((s) => ({ ...s, stack: String(stack).slice(0, 500) }));
  }
  render() {
    if (this.state.error) {
      return (
        <ScrollView style={styles.errorContainer} contentContainerStyle={styles.errorContent}>
          <Text style={styles.errorTitle}>加载异常</Text>
          <Text style={styles.errorText}>{String(this.state.error?.message || this.state.error)}</Text>
          {this.state.stack ? (
            <Text style={[styles.errorText, styles.stackText]}>{this.state.stack}</Text>
          ) : null}
        </ScrollView>
      );
    }
    return this.props.children;
  }
}
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import AssessmentScreen from './src/screens/AssessmentScreen';
import StageDetailScreen from './src/screens/StageDetailScreen';
import BreathingGuideScreen from './src/screens/BreathingGuideScreen';
import BrighteningLightsScreen from './src/screens/BrighteningLightsScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import MeltdownLockdownModal from './src/components/MeltdownLockdownModal';
import TabNavigator from './src/navigation/TabNavigator';
import { useCrisisGate } from './src/hooks/useCrisisGate';
import { ThemeProvider } from './src/context/ThemeContext';
import { runStorageCleanup } from './src/utils/storageCleanup';
import { KEYS } from './src/utils/storageKeys';
import { useThemeSchedule } from './src/hooks/useThemeSchedule';

function ThemeScheduleRoot({ children }) {
  useThemeSchedule();
  return children;
}

const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#2D3748',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Assessment"
          component={AssessmentScreen}
          options={{ title: '状态检测' }}
        />
        <Stack.Screen
          name="StageDetail"
          component={StageDetailScreen}
          options={{ title: '行动建议' }}
        />
        <Stack.Screen
          name="BreathingGuide"
          component={BreathingGuideScreen}
          options={{ title: '呼吸练习' }}
        />
        <Stack.Screen
          name="BrighteningLights"
          component={BrighteningLightsScreen}
          options={{
            title: '灯火愈明',
            headerStyle: { backgroundColor: '#0F172A' },
            headerTintColor: '#FFFFFF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const { meltdownVisible, confirmExitMeltdown } = useCrisisGate();
  const [onboardingDone, setOnboardingDone] = useState(null);

  useEffect(() => {
    runStorageCleanup().catch(() => {});
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(KEYS.ONBOARDING_SEEN)
      .then((v) => { setOnboardingDone(v === 'true'); })
      .catch(() => { setOnboardingDone(false); });
  }, []);

  const handleOnboardingFinish = () => {
    setOnboardingDone(true);
    AsyncStorage.setItem(KEYS.ONBOARDING_SEEN, 'true').catch(() => {});
  };

  if (onboardingDone === null) {
    return <View style={{ flex: 1, backgroundColor: '#0F172A' }} />;
  }

  return (
    <AppErrorBoundary>
      <ThemeProvider>
        <ThemeScheduleRoot>
          {meltdownVisible ? (
            <MeltdownLockdownModal visible onConfirmExit={confirmExitMeltdown} />
          ) : onboardingDone ? (
            <MainNavigator />
          ) : (
            <OnboardingScreen onFinish={handleOnboardingFinish} />
          )}
        </ThemeScheduleRoot>
      </ThemeProvider>
    </AppErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorContainer: { flex: 1, backgroundColor: '#0F172A' },
  errorContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: { fontSize: 18, color: '#FF6347', marginBottom: 12, fontWeight: '600' },
  errorText: { fontSize: 14, color: '#FFF', textAlign: 'center' },
  stackText: { fontSize: 11, marginTop: 16, opacity: 0.8 },
});
