import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type MissionData = {
  energyLevel: number;
  oxygenLevel: number;
  communicationStatus: 'ONLINE' | 'OFFLINE' | 'CRÍTICO';
  orbitalStability: number;
};

type MissionContextData = {
  missionData: MissionData;
  updateMissionData: (newData: MissionData) => Promise<void>;
  isLoading: boolean;
};

export const MissionContext = createContext<MissionContextData>({} as MissionContextData);

const INITIAL_STATE: MissionData = {
  energyLevel: 85,
  oxygenLevel: 92,
  communicationStatus: 'ONLINE',
  orbitalStability: 98.4,
};

export const MissionProvider = ({ children }: { children: ReactNode }) => {
  const [missionData, setMissionData] = useState<MissionData>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStoredData() {
      try {
        const storedData = await AsyncStorage.getItem('@space_mission_telemetry');
        if (storedData) {
          setMissionData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Erro ao carregar telemetria:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStoredData();
  }, []);

  const updateMissionData = async (newData: MissionData) => {
    try {
      setMissionData(newData);
      await AsyncStorage.setItem('@space_mission_telemetry', JSON.stringify(newData));
    } catch (error) {
      console.error('Erro ao salvar telemetria:', error);
      throw error;
    }
  };

  return (
    <MissionContext.Provider value={{ missionData, updateMissionData, isLoading }}>
      {children}
    </MissionContext.Provider>
  );
};