import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import { useRouter } from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormAction, FormState, useForm } from '../../util/match-form';

import { Database } from '@/app/supabasetypes';
import { LiveDataInsert, supabase } from '../../supabase';
import Checkbox from '../../util/checkbox';

// inside your component
const router = useRouter();

const ConcludeScreen = () => {

    const [driverSkill, setDriverSkill] = React.useState(3);

    const [commentText, setCommentText] = React.useState('');

    const { state, dispatch } = useForm();

    const [isDisabled, setIsDisabled] = useState(false);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>

                <Text style={styles.warningText}>This page is for PRE SCOUTING only!!! DO NOT SCOUT QUALIFICATION OR PRACTICE MATCHES HERE! To scout those, go to the home page.</Text>

                <Checkbox field="lostComms" label="Lost comms?"></Checkbox>

                <Checkbox field="disabled" label="Disabled/broke down?"></Checkbox>

                <View style={[styles.horizontalContainer, { width: '90%', marginTop: 15, }]}>
                    <Text style={styles.label}>Driver rating:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={state.driverSkill}
                        onValueChange={(value) =>
                            dispatch({ type: 'UPDATE_FIELD', field: 'driverSkill', value })
                        }>
                        <Picker.Item label='Excellent' value='5' />
                        <Picker.Item label='Good' value='4' />
                        <Picker.Item label='Alright' value='3' />
                        <Picker.Item label='Clunky' value='2' />
                        <Picker.Item label='Awful' value='1' />
                    </Picker>
                </View>

                <Text style={styles.warningText}>Final comments are the basis of pre-scouting and are very important, describe as many aspects of robot as possible.</Text>

                <View style={styles.verticalContainer}>
                    <Text style={styles.commentLabel}>Final Comments:</Text>
                    <TextInput
                        style={styles.commentInput}
                        onChangeText={(text) =>
                            dispatch({ type: 'UPDATE_FIELD', field: 'commentText', value: text })
                        }
                        value={state.commentText}
                        placeholderTextColor='grey'
                        placeholder='Please write a useful comment for alliance considerations, not just `slow at L2 good climb.`'
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <TouchableOpacity style={styles.submitButton}
                    onPress={() => {
                        submitForm(state, dispatch);
                    }}
                    disabled={isDisabled}
                >
                    <Text style={styles.buttonText}>Submit Form</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
    async function submitForm(state: FormState, dispatch: React.Dispatch<FormAction>) {
        setIsDisabled(true);
        console.log('Submitting form...');

        console.log(state)
    
        try {
            const teamMissing = !state.teamNumber?.trim();
            const matchMissing = !state.matchNumber?.trim();
            const commentMissing = !state.commentText?.trim();
    
            const autoPointsCount = (state.autoL4Count * 7) + (state.autoL3Count * 6) + (state.autoL2Count * 4) + (state.autoL1Count * 3) + (state.autoNetCount * 4) + (state.autoProcessorCount * 3) + (state.leave ? 3 : 0);
            const telePointsCount = (state.teleL4Count * 5) + (state.teleL3Count * 4) + (state.teleL2Count * 3) + (state.teleL1Count * 2) + (state.teleNetCount * 4) + (state.teleProcessorCount * 3);
    
            var endgamePointsCount = 0;
            if (state.selectedClimb == 'No') {
                endgamePointsCount = state.park ? 2 : 0;
            } else {
                endgamePointsCount = state.selectedClimb == 'Deep' ? 12 : 6;
            }
    
            const totalPointsCount = autoPointsCount + telePointsCount + endgamePointsCount;
    
            const autoCoralCount = (state.autoL4Count) + (state.autoL3Count) + (state.autoL2Count) + (state.autoL1Count);
            const teleCoralCount = (state.teleL4Count) + (state.teleL3Count) + (state.teleL2Count) + (state.teleL1Count);
            const totalCoralCount = autoCoralCount + teleCoralCount;
            const totalAlgaeCount = (state.autoNetCount) + (state.autoProcessorCount) + (state.teleNetCount) + (state.teleProcessorCount);
            const totalGamepiecesCount = totalCoralCount + totalAlgaeCount;
    
            var endgameType: Database['public']['Enums']['endgametypereefscape'] = 'Nothing';
            if (state.park) {
                endgameType = 'Park';
            }
            if (state.selectedClimb == 'Deep') {
                endgameType = 'Deep'
            }
    
            const scoutName =
                state.nameText === "GUEST"
                    ? "GUEST"
                    : (() => {
                        try {
                            const parsed = JSON.parse(state.nameText);
                            return `${parsed.first_name} ${parsed.last_initial}`;
                        } catch {
                            return "Unknown";
                        }
                    })();
    
            const dataInsert: LiveDataInsert = {
                scout_name: scoutName,
                auto_l1: state.autoL1Count,
                auto_l2: state.autoL2Count,
                auto_l3: state.autoL3Count,
                auto_l4: state.autoL4Count,
                auto_made_net: state.autoNetCount,
                auto_made_processor: state.autoProcessorCount,
                auto_missed_coral: state.autoMissCoralCount,
                auto_missed_net: state.autoMissNetCount,
                auto_mobility: state.leave,
                auto_points: autoPointsCount,
                auto_start_position: state.selectedStartPosition,
                comments: state.commentText,
                disabled: state.disabled,
                driver_rating: state.driverSkill,
                driver_station: state.selectedStation,
                endgame_points: endgamePointsCount,
                endgame_type: endgameType,
                lost_comms: state.lostComms,
                match_number: (Math.round(Math.random() * 50000)),
                match_type: 'pre',
                team_number: parseInt(state.teamNumber),
                tele_l1: state.teleL1Count,
                tele_l2: state.teleL2Count,
                tele_l3: state.teleL3Count,
                tele_l4: state.teleL4Count,
                tele_made_net: state.teleNetCount,
                tele_missed_coral: state.teleMissCoralCount,
                tele_missed_net: state.teleMissNetCount,
                tele_points: telePointsCount,
                tele_processor: state.teleProcessorCount,
                total_algae: totalAlgaeCount,
                total_coral: totalCoralCount,
                total_gamepieces: totalGamepiecesCount,
                total_points: totalPointsCount,
            };
    
            const { error } = await supabase.from('Live Data').insert(
                dataInsert
            );
    
            if (error) {
                alert('ERROR: ' + error.message + (error.code == '23502' ? '. \n\nThis error is likely due to an empty input field, make sure the form is fully filled out.' : '.\n\nThis error cause is unknown, connection is always a culprit. Report this issue to scout lead.'));
                setIsDisabled(false);
            } else {
                setIsDisabled(false);
                alert('Data submitted successfully! A new form will begin now.');
    
    
                await AsyncStorage.setItem('showWager', 'true');
    
                const savedName = state.nameText;
                const savedStation = state.selectedStation;
                const currentMatch = parseInt(state.matchNumber) || 0;
    
                dispatch({ type: 'RESET_FORM' });
                dispatch({ type: 'UPDATE_FIELD', field: 'nameText', value: savedName });
                dispatch({ type: 'UPDATE_FIELD', field: 'selectedStation', value: savedStation });
                dispatch({
                    type: 'UPDATE_FIELD',
                    field: 'matchNumber',
                    value: (currentMatch + 1).toString(),
                });
    
                router.replace('./');
            }
        } catch (error) {
            console.error('Error submitting data: ', error);
            alert(error);
            setIsDisabled(false);
        }
    }
}


const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 5,
        alignItems: 'center',
        backgroundColor: '#FFF6EA',
    },
    scrollView: {
        width: '100%',
        backgroundColor: '#FFF6EA',
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
        backgroundColor: '#e6d4c3',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        gap: 10,
    },
    checkboxText: {
        fontSize: 24
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
    warningText: {
        fontSize: 20,
        width: '90%',
        textAlign: 'center',
        color: 'white',
        marginVertical: 15,
        backgroundColor: 'teal',
        padding: 10,
    },
    label: {
        fontSize: 20,
        width: '33%',
        textAlign: 'right',
        fontWeight: 'bold',
    },
    verticalContainer: {
        marginTop: 25,
        width: '95%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    commentLabel: {
        fontSize: 20,
        width: 'auto',
        textAlign: 'left',
        fontWeight: 'bold',
        position: 'absolute',
        zIndex: 5,
        backgroundColor: '#FFF6EA',
        padding: 5,
        borderWidth: 1,
        //width: '50%',
        borderRadius: 3,
        borderColor: 'black',
        marginLeft: 20,
    },
    commentInput: {
        height: 200,
        margin: 12,
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        paddingTop: 25,
        fontSize: 20,
        width: '93.5%',
        borderRadius: 3,
        borderColor: 'black',
        backgroundColor: '#FFF6EA',
        color: 'black',
        marginBottom: 20,
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
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ConcludeScreen;