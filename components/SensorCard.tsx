import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type SensorCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  isCritical?: boolean;
  isSuccess?: boolean;
};

export default function SensorCard({ title, value, subtitle, isCritical, isSuccess }: SensorCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={[
        styles.cardValue,
        isCritical && styles.textDanger,
        isSuccess && styles.textSuccess
      ]}>
        {value}
      </Text>
      <Text style={styles.cardSub}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#111827', width: '47%', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#1f2937' },
  cardTitle: { color: '#9ca3af', fontSize: 11, fontWeight: 'bold', marginBottom: 8, letterSpacing: 1 },
  cardValue: { color: '#ffffff', fontSize: 26, fontWeight: 'bold' },
  cardSub: { color: '#4b5563', fontSize: 10, marginTop: 5 },
  textDanger: { color: '#ff3366' },
  textSuccess: { color: '#00ffcc' },
});