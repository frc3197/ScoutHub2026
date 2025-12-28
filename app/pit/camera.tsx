import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EVENT_KEY } from '../EVENT_KEY';
import { supabase } from '../supabase';

const router = useRouter();

const ImageUploadScreen = () => {

  const { team } = useLocalSearchParams();

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isPreview, setIsPreview] = useState(false);

  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const cancelPreview = async () => {
    if (!cameraRef.current)
      return;

    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;

      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
      }
    }
  };

  async function uploadPhoto(team: number) {
    if (!cameraRef.current)
      return;

    try {
      const options = { quality: 0.7, base64: true };
      const imageData = await cameraRef.current.takePictureAsync(options);

      const filePath = `${EVENT_KEY}/team${team}`;

      // Clean base64 string (sometimes includes "data:image/jpeg;base64,")
      const base64Img = imageData.base64?.replace(/^data:image\/\w+;base64,/, '');

      if (!base64Img)
        return;

      // Convert base64 → binary Uint8Array
      const byteCharacters = atob(base64Img);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('robot-images')
        .upload(filePath, byteArray, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (error) throw error;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('robot-images')
        .getPublicUrl(filePath);

      alert('Upload successful!');
      router.replace('./');

      //return publicUrlData.publicUrl;

    } catch (error) {
      alert('ERROR: ' + error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Image for team {team}</Text>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {!isPreview && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onSnap}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>)}
        {isPreview && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={cancelPreview}>
              <Text style={styles.text}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { uploadPhoto(parseInt(String(team))); }}>
              <Text style={styles.text}>Upload</Text>
            </TouchableOpacity>
          </View>)}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    color: 'white',
  },
  titleText: {
    fontSize: 35,
    margin: 25,
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginVertical: 64,
    justifyContent: 'space-around',
  },
  button: {
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 4,
    width: '40%',
    borderRadius: 5,
    backgroundColor: 'rgba(3, 3, 3, 0.5)',
  },
  text: {
    fontSize: 28,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default ImageUploadScreen;