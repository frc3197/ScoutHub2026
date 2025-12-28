// @ts-ignore
// @ts-ignore
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Checkbox from '../../components/checkbox';
import Counter from '../../components/counter';
import { useForm } from '../../components/match-form';
import { Database } from '../supabasetypes';

const AutoScreen = () => {

    const { state, dispatch } = useForm();

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>
                <Text style={styles.title}>AUTONOMOUS MODE</Text>

                <View style={[styles.horizontalContainer, { width: '90%', marginTop: 15, }]}>
                    <Text style={styles.label}>Starting position:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={state.selectedStartPosition}
                        onValueChange={(value: Database['public']['Enums']['autostartpositionsreefscape']) =>
                            dispatch({ type: 'UPDATE_FIELD', field: 'selectedStartPosition', value })
                        }>
                        <Picker.Item label="Far" value="Far" />
                        <Picker.Item label="Center" value="Center" />
                        <Picker.Item label="Processor" value="Processor" />
                    </Picker>
                </View>

                <Counter field="autoL4Count" label="L4:" type="coral-make"></Counter>

                {/* MISS */}
                <Counter field="autoMissCoralCount" label="Missed coral:" type="coral-miss"></Counter>

                <View style={styles.algaeContainer}>


                    <View style={styles.netContainer}>
                        <Counter field="autoNetCount" label="Made Net:" type="algae-make"></Counter>

                        <Counter field="autoMissNetCount" label="Missed Net:" type="algae-miss"></Counter>
                    </View>



                </View>


                <Checkbox field="leave" label="Ended off start line:"></Checkbox>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 5,
        alignItems: 'center',
        backgroundColor: '#FFF6EA',
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
    label: {
        fontSize: 20,
        width: '33%',
        textAlign: 'right',
        fontWeight: 'bold',
    },
    scrollView: {
        width: '100%',
        backgroundColor: '#FFF6EA',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#b00c00'
    },
    reefContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        height: 330,
        gap: 10,
    },
    reefImage: {
        width: 75,
        height: 300
    },
    reefOperationsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: 280,
        height: '100%'
    },
    reefOperation: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#e6d4c3',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15
    },
    missContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#f5a9a9',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
        width: '100%',
        transform: [{ scale: 0.85 }],
        marginTop: 15,
    },
    reefOperationLabel: {
        fontSize: 32
    },
    reefOperationCount: {
        fontSize: 44,
        fontWeight: 'bold'
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    algaeContainer: {
        backgroundColor: '#58C0A7',
        marginTop: 10,
        width: '95%',
        padding: 10,
        borderRadius: 5,
        gap: 10,
    },
    algaeOperation: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e6d4c3',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
        width: '45%'
    },
    algaeOperationLabel: {
        fontSize: 24
    },
    netContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    algaeImage: {
        width: '100%',
        height: '100%',
    },
});

export default AutoScreen;
