import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { AdminNavigator } from './AdminNavigator';
import { LandlordNavigator } from './LandlordNavigator';
import { TenantNavigator } from './TenantNavigator';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from './theme';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : user.role === 'admin' ? (
          <Stack.Screen name="AdminRoot" component={AdminNavigator} />
        ) : user.role === 'landlord' ? (
          <Stack.Screen name="LandlordRoot" component={LandlordNavigator} />
        ) : (
          <Stack.Screen name="TenantRoot" component={TenantNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
