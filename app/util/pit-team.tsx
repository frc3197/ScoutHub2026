import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PitTeam({ number, pre, pit, image }:{number:number, pre:boolean, pit:boolean, image:boolean}) {

    const router = useRouter();

    const hasPreScouting = true;

    return (
        <View style={styles.container}>
            <Text style={styles.teamText}>{number}</Text>

            <TouchableOpacity>
                <Text style={[styles.statusText, { backgroundColor: pre ? '#808080' : '#fc566c' }]} onPress={() => { if (!hasPreScouting) alert('No pre-scouting for this event.'); else router.push({ pathname: `../pit/pre`, params: { team: number } }); }}>Pre</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text onPress={() => router.push({ pathname: `../pit/pitdetail`, params: { team: number } })} style={[styles.statusText, { backgroundColor: pit ? '#808080' : '#fc566c' }]}>Pit</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Ionicons onPress={() => router.push({ pathname: `../pit/camera`, params: { team: number } })} style={[styles.cameraIcon, { backgroundColor: image ? '#808080' : '#fc566c' }]} name="camera-outline" size={44} color={'black'} />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e6d4c3',
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
    },
    teamText: {
        fontSize: 35,
        textAlign: 'center',
    },
    statusText: {
        fontSize: 25,
        textAlign: 'center',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 2,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    cameraIcon: {
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 2,
        paddingHorizontal: 20,
    },
});
