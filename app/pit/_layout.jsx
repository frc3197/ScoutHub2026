import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Stack, router } from "expo-router";
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { PitFormProvider } from './pit-detail-form';

function CustomBackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => router.push("/")}>
      <Ionicons name="chevron-back-circle-outline" size={30} color="white" style={{ marginLeft: 20 }} />
    </TouchableOpacity>
  );
}

export default function RootLayout() {
  return (<PitFormProvider>
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ff8c00',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 20
        },
        headerTitleAlign: 'center',
        headerShown: false,
        contentStyle: {
          paddingHorizontal: 0,
          paddingTop: 0,
          backgroundColor: '#FFF6EA',
        }
      }}
    >

      <Stack.Screen name='index' options={{
        title: 'Hexhound Offseason Scouting',
        animation: 'slide_from_right',
        headerLeft: () => null
      }} />


    </Stack>
  </PitFormProvider>);
};
