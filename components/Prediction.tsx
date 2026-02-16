import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Prediction() {
    const [predictedAlliance, setPredictedAlliance] = useState('red');
    const [wagerAmount, setWagerAmount] = useState(1);

    return (
        <><Text style={styles.wagerInfo}>Match predictions are for fun and have no meaning other than friendly competition.</Text><View style={styles.wagerContainer}>

            <View style={styles.horizontalContainer}>
                <Text style={styles.label}>Winning alliance:</Text>
                <Picker
                    style={[styles.input, { color: predictedAlliance, }]}
                    selectedValue={predictedAlliance}
                    onValueChange={async (value) => {
                        setPredictedAlliance(value);
                        try {
                            await AsyncStorage.setItem('predictedAlliance', value);
                        } catch (e) {
                            console.error('Failed to save predictedAlliance', e);
                        }
                    }}
                >
                    <Picker.Item label="Red" value="red" />
                    <Picker.Item label="Blue" value="blue" />
                </Picker>
            </View>

            <View style={styles.horizontalContainer}>
                <Text style={styles.label}>Wager:</Text>
                <Picker
                    style={styles.input}
                    selectedValue={wagerAmount}
                    onValueChange={async (itemValue) => {
                        setWagerAmount(itemValue);
                        try {
                            await AsyncStorage.setItem('wagerAmount', itemValue.toString());
                        } catch (e) {
                            console.error('Failed to save wagerAmount to storage', e);
                        }
                    }}>
                    <Picker.Item label="$5" value="5" />
                    <Picker.Item label="$4" value="4" />
                    <Picker.Item label="$3" value="3" />
                    <Picker.Item label="$2" value="2" />
                    <Picker.Item label="$1" value="1" />
                </Picker>
            </View>

        </View></>
    );
};

const styles = StyleSheet.create({
    wagerInfo: {
        fontSize: 12,
        width: '90%',
        textAlign: 'center',
        color: 'teal',
        marginTop: 35,
        fontFamily: 'Poppins-SemiBold',
    },
    wagerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 25,
        backgroundColor: '#e6d4c3',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        gap: 10,
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
    },
    label: {
        fontSize: 20,
        width: '33%',
        textAlign: 'right',
        fontWeight: 'bold',
        fontFamily: 'Lexend-Light',
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
        fontFamily: 'Poppins-SemiBold',
    },
});