import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './theme';
import { HomeScreen } from '../screens/tenant/HomeScreen';
import { HouseDetailScreen } from '../screens/tenant/HouseDetailScreen';
import { BookingScreen } from '../screens/tenant/BookingScreen';
import { MyReservationsScreen } from '../screens/tenant/MyReservationsScreen';
import { TenantChatScreen } from '../screens/tenant/TenantChatScreen';
import { TenantProfileScreen } from '../screens/tenant/TenantProfileScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="HouseDetail" component={HouseDetailScreen} />
    <HomeStack.Screen name="Booking" component={BookingScreen} />
  </HomeStack.Navigator>
);

export const TenantNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.tabBarInactive,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'search';
          if (route.name === 'TenantHome') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'MyReservations') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'TenantChat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'TenantProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="TenantHome"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Keşfet' }}
      />
      <Tab.Screen
        name="MyReservations"
        component={MyReservationsScreen}
        options={{ tabBarLabel: 'Rezervasyonlarım' }}
      />
      <Tab.Screen
        name="TenantChat"
        component={TenantChatScreen}
        options={{ tabBarLabel: 'Sohbet' }}
      />
      <Tab.Screen
        name="TenantProfile"
        component={TenantProfileScreen}
        options={{ tabBarLabel: 'Profil' }}
      />
    </Tab.Navigator>
  );
};
