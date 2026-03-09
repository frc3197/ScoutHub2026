// @ts-ignore
import Logo from '@/assets/images/icon.png';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { SpringConfig } from 'react-native-reanimated/lib/typescript/animation/springUtils';

const HomeScreen = () => {

  const router = useRouter();
  const [fontsLoaded] = useFonts({});

  const defaultSpringConfig: SpringConfig = {
    stiffness: 100,
    damping: 12,
    mass: 4,
    overshootClamping: false,
    velocity: 0,
  };

  React.useEffect(() => {
    async function getShowWager() {
      await AsyncStorage.setItem('showWager', 'true');
    }
    getShowWager();
  });

  // Animations & stuff
  const titleOpacity = useSharedValue<number>(0);
  const titleOffset = useSharedValue<number>(-200);
  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateX: titleOffset.value },]
  }));

  const button1Opacity = useSharedValue<number>(0);
  const button1AnimatedStyle = useAnimatedStyle(() => ({
    opacity: button1Opacity.value,
  }));

  const button2Opacity = useSharedValue<number>(0);
  const button2AnimatedStyle = useAnimatedStyle(() => ({
    opacity: button2Opacity.value,
  }));

  const button3Opacity = useSharedValue<number>(0);
  const button3AnimatedStyle = useAnimatedStyle(() => ({
    opacity: button3Opacity.value,
  }));

  const hexhoundScale = useSharedValue<number>(0);
  const hexhoundScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: hexhoundScale.value }]
  }));

  React.useEffect(() => {
    if (fontsLoaded) {
      titleOpacity.value = withSpring(1, defaultSpringConfig);
      titleOffset.value = withSpring(0, defaultSpringConfig);
      hexhoundScale.value = withDelay(350, withSpring(1, defaultSpringConfig));

      button1Opacity.value = withDelay(250, withTiming(1, { duration: 350 }));
      button2Opacity.value = withDelay(500, withTiming(1, { duration: 350 }));
      button3Opacity.value = withDelay(750, withTiming(1, { duration: 350 }));
    }
  }, [fontsLoaded]);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pageContainer}>
        <Animated.Text style={[styles.titleText, titleAnimatedStyle]}>Welcome, scouter!</Animated.Text>

        <Animated.Image source={Logo} style={[styles.logoStyle, hexhoundScaleStyle]}></Animated.Image>


        <Animated.View style={[button1AnimatedStyle, { width: '100%', alignItems: 'center' }]}>
          <TouchableOpacity style={styles.matchButton}
            onPress={() => router.push('/match')}
          >
            <Text style={styles.buttonText}>Match Scout</Text>
          </TouchableOpacity>
        </Animated.View>


        <Animated.View style={[button2AnimatedStyle, { width: '100%', alignItems: 'center' }]}>
          <TouchableOpacity style={styles.pitButton}
            onPress={() => router.push('/pit')}
          >
            <Text style={styles.buttonText}>PPP Scout</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[button3AnimatedStyle, { width: '100%', alignItems: 'center' }]}>
          <View style={styles.smallButtonContainer}>

            <TouchableOpacity style={styles.smallAnalysisButton}
              onPress={() => handlePress('https://nimblevalley.github.io/Scouting2026/')}
            >
              <Ionicons name={'analytics-outline'} size={40} color={'white'} />
            </TouchableOpacity>

            {/*
            <TouchableOpacity style={styles.smallAdminButton}
              onPress={() => router.push('/admin')}
            >
              <Ionicons name={'lock-closed-outline'} size={30} color={'white'} />
            </TouchableOpacity>
            */}

            <TouchableOpacity style={styles.smallAdminButton}
              onPress={() => router.push('/offline')}
            >
              <Ionicons name={'cloud-offline-outline'} size={30} color={'white'} />
            </TouchableOpacity>

          </View>
        </Animated.View>

        <Text style={styles.footer}>Comp: 2026-PLY, Version: 2.0 {'\n'} FRC 3197 & Mason McManus</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: 5,
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#FFF6EA',
  },
  logoStyle: {
    width: 200,
    height: 155,
    margin: 10,
  },
  titleText: {
    fontSize: 35,
    margin: 25,
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Lexend-Light',
  },
  matchButton: {
    backgroundColor: '#F37621',
    borderColor: '#a55722ff',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50,
    marginTop: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
  },
  pitButton: {
    backgroundColor: '#363432',
    borderColor: '#2c2b29ff',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    marginTop: 35,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
  },
  smallButtonContainer: {
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
    marginTop: 35,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallAnalysisButton: {
    backgroundColor: '#f37521ab',
    borderColor: '#9649169c',
    borderWidth: 2,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
    height: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
  },
  smallAdminButton: {
    backgroundColor: '#363432ab',
    borderColor: '#2c2b297c',
    borderWidth: 2,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%',
    height: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  footer: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 13,
    fontFamily: 'Lexend-Light',
  },
});

const handlePress = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    console.log(`Don't know how to open this URL: ${url}`);
    // Optionally, show an alert to the user
    // Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};

export default HomeScreen;