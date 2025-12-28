import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

interface LoadingScreenProps {
  loaded: boolean;
}

export default function LoadingScreen({ loaded }: LoadingScreenProps) {
  const opacity = useSharedValue(1);
  const rotation = useSharedValue(0);
  const textOpacity = useSharedValue(0.5);

  useEffect(() => {
    // Rotation animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );

    // Text pulse animation
    textOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 600, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  useEffect(() => {
    if (loaded) {
      opacity.value = withTiming(0, { duration: 400 });
    }
  }, [loaded]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  if (loaded && opacity.value === 0) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, containerStyle]} pointerEvents={loaded ? 'none' : 'auto'}>
      <Animated.View style={[styles.spinner, spinnerStyle]}>
        <View style={styles.spinnerRing} />
      </Animated.View>
      
      <Animated.Text style={[styles.text, textStyle]}>
        Loading
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    marginTop: 25,
  },
  spinner: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  spinnerRing: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#ff6b00',
    borderRightColor: '#ff6b00',
  },
  text: {
    fontSize: 18,
    color: '#ff6b00',
    fontWeight: '600',
    letterSpacing: 1,
    fontFamily: 'Poppins-Medium',
  },
});