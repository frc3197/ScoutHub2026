import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import { useRouter } from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormAction, FormState, useForm } from '../../components/match-form';

import Checkbox from '../../components/form/checkbox';
import { FeedbackDataInsert, LiveDataInsert, supabase, supabaseStatisticFeedback } from '../supabase';

// inside your component
import SelectWithLabel from '@/components/form/SelectWithLabel';
import { EVENT_KEY } from '../misc/EVENT_KEY';
import { Database } from '../supabasetypes';
const router = useRouter();

const ConcludeScreen = () => {

    const [driverSkill, setDriverSkill] = React.useState(3);

    const [commentText, setCommentText] = React.useState('');

    const { state, dispatch } = useForm();

    const [isDisabled, setIsDisabled] = useState(false);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>

                <Checkbox value={state.lostComms} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'lostComms', value }) }} label="Lost Comms?"></Checkbox>

                <Checkbox value={state.disabled} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'disabled', value }) }} label="Disabled/Broke Down?"></Checkbox>

                <SelectWithLabel label='Driver Skill:' itemLabelFormatter={(v:string) => {switch(v) {case '5': return 'Excellent'; case '4': return 'Good'; case '3': return 'Alright'; case '2': return 'Clunky'; case '1': return 'Awful'; default: return 'n/a';}}} selectedValue={String(state.driverSkill)} items={['5', '4', '3', '2', '1']} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'driverSkill', value }) }} />

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
                        submitWager(state);
                        submitForm(state, dispatch);
                    }}
                >
                    <Text style={styles.buttonText}>Submit Form</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );

    async function submitForm(state: FormState, dispatch: React.Dispatch<FormAction>) {
        setIsDisabled(true);

        console.log('Submitting form...');

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

            // Submit to Firestore
            /*
            await setDoc(doc(database, 'scoutingForms', `match${state.matchNumber}_team${state.teamNumber}`), {
                ...state,
                teamNumber: teamMissing ? -1 : state.teamNumber,
                matchNumber: matchMissing ? -1 : state.matchNumber,
                commentText: commentMissing ? `${state.nameText} didn't write a comment :(` : state.commentText,
                park: state.selectedClimb == 'No' ? state.park : false,
                timestamp: new Date(),
                autoPoints: autoPointsCount,
                telePoints: telePointsCount,
                endgamePoints: endgamePointsCount,
                totalPoints: totalPointsCount,
                autoCoral: autoCoralCount,
                teleCoral: teleCoralCount,
                totalCoral: totalCoralCount,
                totalAlgae: totalAlgaeCount,
                totalGamepieces: totalGamepiecesCount,
                nameText: state.nameText == "GUEST" ? "GUEST" : JSON.parse(state.nameText)['first_name'] + ' ' + JSON.parse(state.nameText)['last_initial']
            });*/

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
                match_number: parseInt(state.matchNumber),
                match_type: 'match',
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
            console.error('Error submitting form: ', error);
            alert(error);
            setIsDisabled(false);
        }
    }
}

const submitWager = async (state: FormState) => {
    const formData = new URLSearchParams();
    formData.append('Name', state.nameText);

    // TODO UPDATE THIS OF MAKE IT WORK BETTER
    formData.append('Event', state.nameText);

    formData.append('Match', state.matchNumber);
    formData.append('Wager', await AsyncStorage.getItem('wagerAmount') ?? '0');
    formData.append('Prediction', await AsyncStorage.getItem('predictedAlliance') ?? 'Red');

    const autoPointsCount = ((state.autoL4Count) * 7) + ((state.autoL3Count) * 6) + ((state.autoL2Count) * 4) + ((state.autoL1Count) * 3) + ((state.autoNetCount) * 4) + ((state.autoProcessorCount) * 3) + (state.leave ? 3 : 0);
    const telePointsCount = ((state.teleL4Count) * 5) + ((state.teleL3Count) * 4) + ((state.teleL2Count) * 3) + ((state.teleL1Count) * 2) + ((state.teleNetCount) * 4) + ((state.teleProcessorCount) * 3);

    var endgamePointsCount = 0;
    if (state.selectedClimb == 'No') {
        endgamePointsCount = state.park ? 2 : 0;
    } else {
        endgamePointsCount = state.selectedClimb == 'Deep' ? 12 : 6;
    }

    const totalPointsCount = autoPointsCount + telePointsCount + endgamePointsCount;

    console.log("SJKA")

    try {
        const uuid = await AsyncStorage.getItem('uuid');

        if (uuid == "GUEST")
            return;

        const wagerAmount = await AsyncStorage.getItem('wagerAmount');

        const predictedAlliance = await AsyncStorage.getItem('predictedAlliance');

        if (!uuid) {
            throw new Error('No UUID found in storage');
        }
        if (!wagerAmount) {
            throw new Error('No wager amount found in storage');
        }
        if (!predictedAlliance) {
            throw new Error('No predicted alliance found in storage');
        }
        console.log(state)

        const dataInsert: FeedbackDataInsert = {
            match_number: parseInt(state.matchNumber),
            member_id: uuid,
            first_name: state.nameText == "GUEST" ? "GUEST" : (state.nameText),
            wager: parseInt(wagerAmount),
            total_points: totalPointsCount,
            team_number: parseInt(state.teamNumber),
            prediction: predictedAlliance as ('red' | 'blue'),
            event_key: EVENT_KEY,
        }

        const { error } = await supabaseStatisticFeedback
            .from('matches_predictions')
            .insert(dataInsert)
    } catch (error) {
        console.log('ERROR SUBMITTING PREDICTION:' + error);
        alert(error);
    }
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 15,
        alignItems: 'center',
        backgroundColor: '#FFF6EA',
        gap: 20,
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
        borderWidth: 2,
        borderRadius: 3,
        borderColor: '#0000005d',
        marginLeft: 20,
        fontFamily: 'Lexend-Regular',
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
        fontFamily: 'Poppins-Light',
    },
    submitButton: {
        backgroundColor: '#ff8c00',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        width: 240,
        marginTop: 35,
        marginBottom: 50,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Poppins-Medium',
    },
});

export default ConcludeScreen;