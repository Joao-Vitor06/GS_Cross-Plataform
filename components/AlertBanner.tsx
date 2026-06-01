import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type AlertBannerProps = {
  alerts: string[];
};

export default function AlertBanner({ alerts }: AlertBannerProps) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <View style={styles.alertWrapper}>
      {alerts.map((alert, index) => (
        <Text key={index} style={styles.alertText}>⚠️ {alert}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  alertWrapper: { backgroundColor: 'rgba(255, 51, 102, 0.1)', borderWidth: 1, borderColor: '#ff3366', padding: 15, borderRadius: 8, marginBottom: 20, gap: 5 },
  alertText: { color: '#ff3366', fontWeight: 'bold', fontSize: 13, letterSpacing: 1 },
});