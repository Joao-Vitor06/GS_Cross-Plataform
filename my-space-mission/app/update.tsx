import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MissionContext } from '../context/MissionContext';

export default function UpdateMission() {
  const router = useRouter();
  const { missionData, updateMissionData } = useContext(MissionContext);

  const [energy, setEnergy] = useState(missionData.energyLevel.toString());
  const [oxygen, setOxygen] = useState(missionData.oxygenLevel.toString());
  const [comms, setComms] = useState(missionData.communicationStatus);
  const [stability, setStability] = useState(missionData.orbitalStability.toString());

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let localErrors: { [key: string]: string } = {};
    let isValid = true;

    const energyNum = parseFloat(energy);
    if (!energy.trim()) {
      localErrors.energy = 'Campo obrigatório';
      isValid = false;
    } else if (isNaN(energyNum) || energyNum < 0 || energyNum > 100) {
      localErrors.energy = 'Insira um valor percentual entre 0 e 100';
      isValid = false;
    }

    const oxygenNum = parseFloat(oxygen);
    if (!oxygen.trim()) {
      localErrors.oxygen = 'Campo obrigatório';
      isValid = false;
    } else if (isNaN(oxygenNum) || oxygenNum < 0 || oxygenNum > 100) {
      localErrors.oxygen = 'Insira um valor percentual entre 0 e 100';
      isValid = false;
    }

    const upperComms = comms.trim().toUpperCase();
    if (!comms.trim()) {
      localErrors.comms = 'Campo obrigatório';
      isValid = false;
    } else if (upperComms !== 'ONLINE' && upperComms !== 'OFFLINE' && upperComms !== 'CRÍTICO') {
      localErrors.comms = 'Use estritamente: ONLINE, OFFLINE ou CRÍTICO';
      isValid = false;
    }

    const stabilityNum = parseFloat(stability);
    if (!stability.trim()) {
      localErrors.stability = 'Campo obrigatório';
      isValid = false;
    } else if (isNaN(stabilityNum) || stabilityNum < 0 || stabilityNum > 100) {
      localErrors.stability = 'Insira um valor de estabilidade entre 0 e 100';
      isValid = false;
    }

    setErrors(localErrors);
    return isValid;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) return;

    try {
      await updateMissionData({
        energyLevel: Math.round(parseFloat(energy)),
        oxygenLevel: Math.round(parseFloat(oxygen)),
        communicationStatus: comms.trim().toUpperCase() as 'ONLINE' | 'OFFLINE' | 'CRÍTICO',
        orbitalStability: parseFloat(stability),
      });

      router.back();
      
    } catch (e) {
      alert('Erro Crítico: Não foi possível persistir as atualizações.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.instructions}>Insira os novos parâmetros de órbita. O sistema recusará valores fora das margens nominais de segurança física da nave.</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>NÍVEL DE CORRENTE DA REDE (%)</Text>
        <TextInput
          style={[styles.input, errors.energy ? styles.inputError : null]}
          value={energy}
          onChangeText={setEnergy}
          keyboardType="numeric"
          placeholder="Ex: 85"
          placeholderTextColor="#4b5563"
        />
        {errors.energy && <Text style={styles.errorText}>{errors.energy}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>SUPRIMENTO DE O₂ COMPRIMIDO (%)</Text>
        <TextInput
          style={[styles.input, errors.oxygen ? styles.inputError : null]}
          value={oxygen}
          onChangeText={setOxygen}
          keyboardType="numeric"
          placeholder="Ex: 90"
          placeholderTextColor="#4b5563"
        />
        {errors.oxygen && <Text style={styles.errorText}>{errors.oxygen}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>ESTADO DO LINK RF (ONLINE, OFFLINE, CRÍTICO)</Text>
        <TextInput
          style={[styles.input, errors.comms ? styles.inputError : null]}
          value={comms}
          onChangeText={setComms}
          autoCapitalize="characters"
          placeholder="ONLINE"
          placeholderTextColor="#4b5563"
        />
        {errors.comms && <Text style={styles.errorText}>{errors.comms}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>MÉTRICA DE TRAJETÓRIA ORBITAL (%)</Text>
        <TextInput
          style={[styles.input, errors.stability ? styles.inputError : null]}
          value={stability}
          onChangeText={setStability}
          keyboardType="numeric"
          placeholder="Ex: 99.2"
          placeholderTextColor="#4b5563"
                />
        {errors.stability && <Text style={styles.errorText}>{errors.stability}</Text>}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>GRAVAR PARÂMETROS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f19' },
  contentContainer: { padding: 20 },
  instructions: { color: '#9ca3af', fontSize: 13, lineHeight: 18, marginBottom: 25 },
  inputGroup: { marginBottom: 20 },
  label: { color: '#00ffcc', fontSize: 11, fontWeight: 'bold', marginBottom: 8, letterSpacing: 1 },
  input: { backgroundColor: '#111827', color: '#ffffff', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1f2937', fontSize: 16 },
  inputError: { borderColor: '#ff3366' },
  errorText: { color: '#ff3366', fontSize: 12, marginTop: 6, fontWeight: '500' },
  saveButton: { backgroundColor: '#00ffcc', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  saveButtonText: { color: '#0b0f19', fontWeight: 'bold', fontSize: 15, letterSpacing: 1.5 },
});