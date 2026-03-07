/**
 * 底部四 Tab（传灯体系 v1.1）：心灯导引、点亮阶梯、薪火传心、星星之火
 */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import RoadmapScreen from '../screens/RoadmapScreen';
import ToolkitScreen from '../screens/ToolkitScreen';
import ParentHarborScreen from '../screens/ParentHarborScreen';
import { Colors } from '../styles/Colors';

const Tab = createBottomTabNavigator();

function TabIcon({ label, focused }) {
  return <Text style={{ fontSize: 20, color: focused ? Colors.sparkGold : Colors.textSecondary }}>{label}</Text>;
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#2D3748',
        headerShadowVisible: false,
        tabBarActiveTintColor: Colors.sparkGold,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: { backgroundColor: '#FFF' },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          title: '心灯导引',
          headerTitle: '',
          tabBarLabel: '心灯导引',
          tabBarIcon: ({ focused }) => <TabIcon label="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Roadmap"
        component={RoadmapScreen}
        options={{
          title: '点亮阶梯',
          tabBarLabel: '点亮阶梯',
          tabBarIcon: ({ focused }) => <TabIcon label="🗺️" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Toolkit"
        component={ToolkitScreen}
        options={{
          title: '薪火传心',
          tabBarLabel: '薪火传心',
          tabBarIcon: ({ focused }) => <TabIcon label="🛠️" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ParentHarbor"
        component={ParentHarborScreen}
        options={{
          title: '星星之火',
          tabBarLabel: '星星之火',
          tabBarIcon: ({ focused }) => <TabIcon label="🔥" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
