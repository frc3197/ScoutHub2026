import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LiveDataInsert, supabase } from '../supabase';

const OfflineScreen = () => {

    const router = useRouter();

    const [offlineData, setOfflineData] = useState([]);

    useEffect(() => {
        async function run() {
            setOfflineData(await getOffline());
        }
        run();
    }, []);

    async function getOffline() {
        return JSON.parse(await AsyncStorage.getItem('offline-data-2026') ?? '[]');
    }

    const clearAllData = async () => {
        if (offlineData.length < 1) {
            alert('No data to delete, silly.');
            return;
        }
        if (prompt('Are you sure you want to delete all offline data? Type `yeah` in all lowercase to confirm.') == 'yeah') {
            alert('Deleting all offline date...');
            await AsyncStorage.setItem('offline-data-2026', '[]');
            setOfflineData([]);
        }
    }

    useEffect(() => {
        console.log(offlineData);
    });

    async function attemptUpload(offlineData: LiveDataInsert[], data: LiveDataInsert) {
        const { error } = await supabase.from('Live Data').insert(
            data
        );

        if (error) {
            console.log(error.code);
            alert('ERROR: ' + error.message + (error.code == '23502' ? '. \n\nThis error is likely due to an empty input field, make sure the form is fully filled out. This error likely cannot be fixed, you must delete this data and make sure you are more diligent next time.' : '.\n\nThis error cause is unknown, connection is always a culprit. Report this issue to scout lead.'));
        } else {
            alert('Data submitted successfully! This offlien form will be deleted.');
            attemptDelete(offlineData, data);
        }
    }

    async function attemptDelete(allData: LiveDataInsert[], data: LiveDataInsert) {
        let newData = allData.filter((item) => item.id != data.id);
        await AsyncStorage.setItem('offline-data-2026', JSON.stringify(newData));
        setOfflineData(newData);
    }

    return (
        <View style={styles.pageContainer}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.titleText}>Offline Data</Text>

                <View style={{ display: 'flex', flexDirection: 'column', gap: 15, paddingHorizontal: 10, alignItems: 'center', marginBottom: 25, }}>
                    <Text style={[styles.normalText, { marginBottom: 0, }]}>There have been many reports of the event having terrible WIFI/data connection. Therefore, I am staying up very late to solve this issue. It is currently 23:00. I will let you know the end time :). It is ok because I hear a train. And now it is 23:10.</Text>

                    {offlineData.length < 1 && <Text style={[styles.normalText, { fontSize: 30, }]}>No offline data found. Try refreshing the entire page.</Text>}

                    {
                        offlineData.map((data: LiveDataInsert) => {
                            return <View style={styles.dataContainer}>
                                <Text style={[styles.idText]}>Match {data.match_number}, Team {data.team_number}</Text>
                                <TouchableOpacity style={styles.smallButtonSubmit}
                                    onPress={() => attemptUpload(offlineData, data)}>
                                    <Ionicons name={'cloud-upload-outline'} size={24} color={'white'} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.smallButtonDelete}
                                    onPress={() => { if (confirm('Are you sure you want to delete?')) attemptDelete(offlineData, data) }}>
                                    <Ionicons name={'trash-outline'} size={24} color={'white'} />
                                </TouchableOpacity>
                            </View>
                        })
                    }

                    <TouchableOpacity style={styles.deleteButton}
                        onPress={clearAllData}>
                        <Text style={styles.buttonText}>Clear All Data</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View >
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 0,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    deleteButton: {
        backgroundColor: '#f34121ff',
        borderColor: '#ec8877ff',
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: 50,
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
    },
    dataContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        backgroundColor: '#e6d4c3',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    titleText: {
        fontSize: 35,
        padding: 25,
        paddingBottom: 10,
        textAlign: 'center',
        width: '100%',
        fontFamily: 'Lexend-Light',
    },
    normalText: {
        fontSize: 14,
        padding: 10,
        textAlign: 'center',
        width: '100%',
        fontFamily: 'Poppins-Light',
    },
    idText: {
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
        width: '100%',
        fontFamily: 'Poppins-Light',
    },
    scrollViewContainer: {
        paddingBottom: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 20,
        marginBottom: 50,
    },
    scrollView: {
        width: '100%',
        backgroundColor: '#FFF6EA',
        padding: 0,
    },
    smallButtonSubmit: {
        backgroundColor: '#1f9e2aab',
        borderColor: '#2c2b297c',
        borderWidth: 2,
        paddingHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        width: 45,
        height: 45,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
    },
    smallButtonDelete: {
        backgroundColor: '#9e521fab',
        borderColor: '#2c2b297c',
        borderWidth: 2,
        paddingHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        width: 45,
        height: 45,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
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

export default OfflineScreen;