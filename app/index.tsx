// @ts-ignore
import Logo from '@/assets/images/icon.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {

  const router = useRouter();

  React.useEffect(() => {
    async function getShowWager() {
      await AsyncStorage.setItem('showWager', 'true');
    }
    getShowWager();
  });

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Welcome, scouter!</Text>
        <Image source={Logo} style={styles.logoStyle}></Image>


        <TouchableOpacity style={styles.matchButton}
          onPress={() => router.push('/match')}
        >
          <Text style={styles.buttonText}>Match Scout</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.pitButton}
          onPress={() => router.push('/pit')}
        >
          <Text style={styles.buttonText}>PPP Scout</Text>
        </TouchableOpacity>

        <View style={styles.smallButtonContainer}>

          <TouchableOpacity style={styles.smallAnalysisButton}
            onPress={() => handlePress('https://nimblevalley.github.io/ScoutingOffseason2025/')}
          >
            <Ionicons name={'analytics-outline'} size={40} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallAdminButton}
            onPress={() => router.push('/admin')}
          >
            <Ionicons name={'lock-closed-outline'} size={30} color={'white'} />
          </TouchableOpacity>

        </View>

        <Text style={styles.footer}>Comp: Tremont, Version: 1.3</Text>
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
    margin: 20,
  },
  titleText: {
    fontSize: 35,
    margin: 25,
    textAlign: 'center',
    width: '100%',
  },
  matchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
    height: 50,
    marginTop: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  pitButton: {
    backgroundColor: '#63ab3f',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
    marginTop: 35,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
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
    backgroundColor: '#a83232',
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
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  smallAdminButton: {
    backgroundColor: '#7628ad',
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
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 25,
    marginBottom: 25,
  },
});

const handlePress = async (url:string) => {
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