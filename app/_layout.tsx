import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from "expo-router";
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

SplashScreen.preventAutoHideAsync();

function CustomBackButton() {

  return (
    <TouchableOpacity onPress={() => router.push("/")}>
      <Ionicons name="chevron-back-circle-outline" size={30} color="white" style={{ marginLeft: 20 }} />
    </TouchableOpacity>
  );
}

export default function RootLayout() {
  const navigation = useNavigation();

  const [loadedFonts, error] = useFonts({
    'Lexend-Light': require('@/assets/fonts/Lexend-Light.ttf'),
    'Lexend-Regular': require('@/assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('@/assets/fonts/Lexend-Medium.ttf'),
    'Lexend-SemiBold': require('@/assets/fonts/Lexend-SemiBold.ttf'),
    'Lexend-Bold': require('@/assets/fonts/Lexend-Bold.ttf'),

    'Poppins-Light': require('@/assets/fonts/Poppins-Light.ttf'),
    'Poppins-Thin': require('@/assets/fonts/Poppins-Thin.ttf'),
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),

    'Branding': require('@/assets/fonts/BD_Nippori_05.otf'),
  });

  useEffect(() => {
    async function setUp() {
      if ((loadedFonts) || error) {
        SplashScreen.hideAsync();
      }
    }
    setUp();
  }, [loadedFonts, error]);

  if (!loadedFonts && !error) {
    return null;
  }

  return <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#ff8c00',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 25,
        fontFamily: "Poppins-Medium",
      },
      headerTitleAlign: 'center',
      contentStyle: {
        paddingHorizontal: 0,
        paddingTop: 0,
        backgroundColor: '#FFF6EA',
      }
    }}
  >

    <Stack.Screen name='index' options={{
      title: 'Scout Hub 2026',
      animation: 'slide_from_right',
      headerLeft: () => null
    }} />

    <Stack.Screen name='match' options={{
      title: 'Match Scouting',
      animation: 'slide_from_right',
      headerLeft: () => <CustomBackButton />,
    }} />

    <Stack.Screen name='pit' options={{
      title: 'PPP Scouting',
      animation: 'slide_from_right',
      headerLeft: () => <CustomBackButton />,
    }} />

    <Stack.Screen name='admin' options={{
      title: 'Admin Page',
      animation: 'slide_from_right',
      headerLeft: () => <CustomBackButton />,
    }} />

  </Stack>
};
