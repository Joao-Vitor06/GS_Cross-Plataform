import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MissionProvider } from '../context/MissionContext';

export default function RootLayout() {
  return (
    <MissionProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0b0f19',
          },
          headerTintColor: '#00ffcc',
          headerTitleStyle: {
            fontWeight: 'bold',
            letterSpacing: 2,
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ title: 'PAINEL DE CONTROLE' }} 
        />
        <Stack.Screen 
          name="update" 
          options={{ title: 'OVERRIDE DE SISTEMA', presentation: 'modal' }} 
        />
      </Stack>
    </MissionProvider>
  );
}