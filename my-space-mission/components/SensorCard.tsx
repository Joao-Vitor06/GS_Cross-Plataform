import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SensorCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  isCritical?: boolean;
  isSuccess?: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
};

export default function SensorCard({ title, value, subtitle, isCritical, isSuccess, iconName }: SensorCardProps) {
  // Define a cor baseada no status para pintar o texto e o ícone
  const color = isCritical ? '#ff3366' : isSuccess ? '#00ffcc' : '#ffffff';

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Ionicons name={iconName} size={18} color={color} style={styles.icon} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text 
        style={[styles.cardValue, { color }]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </Text>
      <Text style={styles.cardSub}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#111827', width: '48%', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#1f2937', marginBottom: 15 },  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  icon: { marginRight: 6 },
  cardTitle: { color: '#9ca3af', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  cardValue: { fontSize: 26, fontWeight: 'bold' },
  cardSub: { color: '#4b5563', fontSize: 10, marginTop: 5 },
});