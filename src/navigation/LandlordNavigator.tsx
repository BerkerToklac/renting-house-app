import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './theme';
import { LandlordDashboardScreen } from '../screens/landlord/LandlordDashboardScreen';
import { MyListingsScreen } from '../screens/landlord/MyListingsScreen';
import { AddListingScreen } from '../screens/landlord/AddListingScreen';
import { DocumentsScreen } from '../screens/landlord/DocumentsScreen';
import { RentalHistoryScreen } from '../screens/landlord/RentalHistoryScreen';
import { LandlordChatScreen } from '../screens/landlord/LandlordChatScreen';
import { LandlordProfileScreen } from '../screens/landlord/LandlordProfileScreen';

const Tab = createBottomTabNavigator();
const ListingsStack = createNativeStackNavigator();

const ListingsNavigator = () => (
  <ListingsStack.Navigator screenOptions={{ headerShown: false }}>
    <ListingsStack.Screen name="MyListings" component={MyListingsScreen} />
    <ListingsStack.Screen name="AddListing" component={AddListingScreen} />
  </ListingsStack.Navigator>
);

export const LandlordNavigator = () => {
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
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'LandlordDashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'ListingsTab') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Documents') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'RentalHistory') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'LandlordChat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'LandlordProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="LandlordDashboard"
        component={LandlordDashboardScreen}
        options={{ tabBarLabel: 'Gösterge' }}
      />
      <Tab.Screen
        name="ListingsTab"
        component={ListingsNavigator}
        options={{ tabBarLabel: 'İlanlarım' }}
      />
      <Tab.Screen
        name="Documents"
        component={DocumentsScreen}
        options={{ tabBarLabel: 'Belgeler' }}
      />
      <Tab.Screen
        name="RentalHistory"
        component={RentalHistoryScreen}
        options={{ tabBarLabel: 'Kiralama' }}
      />
      <Tab.Screen
        name="LandlordChat"
        component={LandlordChatScreen}
        options={{ tabBarLabel: 'Sohbet' }}
      />
      <Tab.Screen
        name="LandlordProfile"
        component={LandlordProfileScreen}
        options={{ tabBarLabel: 'Profil' }}
      />
    </Tab.Navigator>
  );
};
