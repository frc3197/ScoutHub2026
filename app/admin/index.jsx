import { useRouter } from 'expo-router';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { database } from '../firebase';

const AdminScreen = () => {

  const router = useRouter();

  const [isLocked, setIsLocked] = React.useState(true);
  const [passwordText, setPasswordText] = React.useState('');

  const checkPassword = (password) => {
    setIsLocked(password != 'Tylenol');

    if (password != 'Tylenol') {
      alert('Incorrect admin password.');
    }
  }

  const downloadMatchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'scoutingForms'));

      const data = {};
      querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data();
      });

      const jsonString = JSON.stringify(data, null, 2);

      // Trigger download in browser (web only)
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'matches.json';
      a.click();
      URL.revokeObjectURL(url);

      alert('Download started.');
    } catch (error) {
      console.error('Error downloading data:', error);
      alert('Failed to download match data.');
    }
  }

  const resetMatchForms = async () => {
    if (confirm('Are you sure you wish to reset all current match forms?')) {
      try {
        const querySnapshot = await getDocs(collection(database, 'scoutingForms'));

        const deletePromises = querySnapshot.docs.map(docSnap =>
          deleteDoc(doc(database, 'scoutingForms', docSnap.id))
        );

        await Promise.all(deletePromises);
        console.log('All documents in scoutingForms deleted.');
        alert('Database wiped.');
      } catch (error) {
        console.error('Error wiping database:', error);
        alert('Error wiping database.');
      }
    }
  }

  const resetPitScoutForms = async () => {
    if (confirm('Are you sure you wish to reset all pit scout detail forms?')) {
      try {
        const querySnapshot = await getDocs(collection(database, 'pitScout'));

        const deletePromises = querySnapshot.docs.map(docSnap =>
          deleteDoc(doc(database, 'pitScout', docSnap.id))
        );

        await Promise.all(deletePromises);
        console.log('All documents in pitScout deleted.');
        alert('Database wiped.');
      } catch (error) {
        console.error('Error wiping database:', error);
        alert('Error wiping database.');
      }
    }
  }

  const resetRobotImages = async () => {
    if (confirm('Are you sure you wish to reset all robot images? This will not delete the actual images but instead the references and links in the database. You must also delete the images for this to have an effect on the analysis website.')) {
      try {
        const querySnapshot = await getDocs(collection(database, 'robotImages'));

        const deletePromises = querySnapshot.docs.map(docSnap =>
          deleteDoc(doc(database, 'robotImages', docSnap.id))
        );

        await Promise.all(deletePromises);
        console.log('All documents in robotImages deleted.');
        alert('Database wiped.');
      } catch (error) {
        console.error('Error wiping database:', error);
        alert('Error wiping database.');
      }
    }
  }

  const transferMatchForms = () => {

  }

  if (isLocked) {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>This area is password protected.</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) =>
            setPasswordText(text)
          }
          placeholderTextColor='grey'
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.submitButton}
          onPress={() => checkPassword(passwordText)}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.pageContainer}>
        <Text style={styles.titleText}>Admin Links & Actions</Text>

        <TouchableOpacity style={styles.safeButton} onPress={() => openLink('https://supabase.com/dashboard/project/odzsnrjocdmbajksnzpk/editor/25099?schema=public')}>
          <Text style={styles.buttonText}>Open Supabase Match Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://console.firebase.google.com/u/0/project/robotics-3c92c/firestore/databases/-default-/data?fb_gclid=CjwKCAjw1dLDBhBoEiwAQNRiQTtOXBkr8eVc1tyGzvMlPtwAzVMOhxQw42WN_UP762rvm5YmTpmTeBoCjsoQAvD_BwE')}>
          <Text style={styles.buttonText}>Open Firebase Console</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://console.cloudinary.com/app/c-71a61905d412d1bab042c2f6d55ff1/assets/media_library/folders/cc1a5cb5e0090d2c3f48efcd920b97ee02?view_mode=mosaic')}>
          <Text style={styles.buttonText}>Open Cloudinary Images</Text>
        </TouchableOpacity>

        {/*<TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://docs.google.com/spreadsheets/d/1EWIQDsjU5SeCskgb05x_jsoj1mnXXtb6tPan9QkmL5o/edit?gid=0#gid=0')}>
          <Text style={styles.buttonText}>Open Team Spreadsheet</Text>
  </TouchableOpacity>*/}

{/*
        <TouchableOpacity style={styles.dangerButton} onPress={transferMatchForms}>
          <Text style={styles.buttonText}>Transfer Match Forms</Text>
        </TouchableOpacity>
        */}

        <TouchableOpacity style={styles.dangerButton} onPress={resetPitScoutForms}>
          <Text style={styles.buttonText}>Reset Pit Scout Forms</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dangerButton} onPress={resetRobotImages}>
          <Text style={styles.buttonText}>Reset Robot Image References</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: 5,
    alignItems: 'center',
    paddingBottom: 50,
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#FFF6EA',
  },
  titleText: {
    fontSize: 35,
    margin: 25,
    textAlign: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 20,
    width: '50%',
    borderRadius: 3,
    borderColor: 'black',
    backgroundColor: '#FFF6EA',
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
    marginTop: 35,
    marginBottom: 50,
  },
  dangerButton: {
    backgroundColor: '#f02626',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '70%',
    marginTop: 35,
  },
  safeButton: {
    backgroundColor: '#777a72',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '70%',
    marginTop: 35,
  },
  linkButton: {
    backgroundColor: '#2e89ff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '70%',
    marginTop: 35,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const openLink = async (url) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    console.log(`Don't know how to open this URL: ${url}`);
    // Optionally, show an alert to the user
    // Alert.alert(`Don't know how to open this URL: ${url}`);
  }
};

export default AdminScreen;