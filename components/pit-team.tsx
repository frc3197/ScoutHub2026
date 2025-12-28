import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PitTeam({ number, pre, pit, image }: { number: number, pre: boolean, pit: boolean, image: boolean }) {

    const router = useRouter();

    const hasPreScouting = true;

    const completeColor = '#577969ff';

    return (
        <View style={styles.container}>
            <Text style={[styles.teamText, {color: (pre && pit && image) ? '#1ec729' : 'black'}]}>{number}</Text>

            <TouchableOpacity style={[styles.statusContaier, { backgroundColor: pre ? completeColor : '#fc566c' }]}>
                <Text style={[styles.statusText]} onPress={() => { if (!hasPreScouting) alert('No pre-scouting for this event.'); else router.push({ pathname: `../pit/pre`, params: { team: number } }); }}>Pre</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.statusContaier, { backgroundColor: pit ? completeColor : '#fc566c' }]}>
                <Text onPress={() => router.push({ pathname: `../pit/pitdetail`, params: { team: number } })} style={[styles.statusText]}>Pit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.statusContaier, { backgroundColor: image ? completeColor : '#fc566c' }]}>
                <Ionicons onPress={() => router.push({ pathname: `../pit/camera`, params: { team: number } })} style={[styles.cameraIcon]} name="camera-outline" size={44} color={'black'} />
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
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 2,
    },
    teamText: {
        fontSize: 35,
        textAlign: 'center',
        fontFamily: 'Lexend-Regular',
    },
    statusText: {
        fontSize: 25,
        textAlign: 'center',
        paddingHorizontal: 15,
        fontFamily: 'Poppins-Regular',
    },
    statusContaier: {
        borderColor: '#00000080',
        borderRadius: 5,
        borderWidth: 2,
        margin: 0,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraIcon: {
        paddingHorizontal: 15,
        flex: 1,
    },
});
