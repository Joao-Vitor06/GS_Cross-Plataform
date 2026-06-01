import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { MissionContext } from '../context/MissionContext';
import SensorCard from '../components/SensorCard';
import AlertBanner from '../components/AlertBanner';

export default function Dashboard() {
  const { missionData, isLoading } = useContext(MissionContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>SINCROZINANDO COM A ÓRBITA...</Text>
      </View>
    );
  }

  const alerts = [];
  if (missionData.energyLevel < 25) alerts.push('SISTEMA DE ENERGIA CRÍTICO');
  if (missionData.oxygenLevel < 30) alerts.push('RESERVA DE OXIGÊNIO EM NÍVEL ALERTA');
  if (missionData.communicationStatus === 'OFFLINE') alerts.push('FALHA NA COMUNICAÇÃO COM A TERRA');
  if (missionData.orbitalStability < 90) alerts.push('DECAIMENTO ORBITAL DETECTADO');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* Alertas Automáticos  */}
      <AlertBanner alerts={alerts} />

      {/* Grid de Sensores */}
      <View style={styles.grid}>
        <SensorCard
          title="REDE ELÉTRICA"
          value={`${missionData.energyLevel}%`}
          subtitle="Baterias de Íons de Lítio"
          isCritical={missionData.energyLevel < 25}
        />

        <SensorCard
          title="SISTEMA VITAL"
          value={`${missionData.oxygenLevel}%`}
          subtitle="Nível de O₂ Interno"
          isCritical={missionData.oxygenLevel < 30}
        />

        <SensorCard
          title="TELEMETRIA COMMS"
          value={missionData.communicationStatus}
          subtitle="Banda S / Antena Principal"
          isCritical={missionData.communicationStatus === 'OFFLINE'}
          isSuccess={missionData.communicationStatus === 'ONLINE'}
        />

        <SensorCard
          title="ESTABILIDADE ORBITAL"
          value={`${missionData.orbitalStability}%`}
          subtitle="Vetor de Trajetória"
          isCritical={missionData.orbitalStability < 90}
        />
      </View>

      {/* Navegação pro Formulário */}
      <Link href="/update" asChild>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>MODIFICAR PARÂMETROS</Text>
        </TouchableOpacity>
      </Link>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f19' },
  contentContainer: { padding: 20 },
  loadingContainer: { flex: 1, backgroundColor: '#0b0f19', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#00ffcc', fontSize: 16, fontWeight: 'bold', letterSpacing: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 15, marginBottom: 25 },
  actionButton: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#00ffcc', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  actionButtonText: { color: '#00ffcc', fontWeight: 'bold', fontSize: 14, letterSpacing: 2 },
});