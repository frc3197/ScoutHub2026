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

                <SelectWithLabel label='Driver Skill:' itemLabelFormatter={(v: string) => { switch (v) { case '5': return 'Excellent'; case '4': return 'Good'; case '3': return 'Alright'; case '2': return 'Clunky'; case '1': return 'Awful'; default: return 'n/a'; } }} selectedValue={String(state.driverSkill)} items={['5', '4', '3', '2', '1']} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'driverSkill', value }) }} />

                <SelectWithLabel label='Throughput Speed:' itemLabelFormatter={(v: string) => { switch (v) { case '5': return 'Instant'; case '4': return 'Fast'; case '3': return 'Alright'; case '2': return 'Slow'; case '1': return 'Awful'; default: return 'n/a'; } }} selectedValue={String(state.tioiRating)} items={['5', '4', '3', '2', '1']} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'tioiRating', value }) }} />

                <SelectWithLabel label='TIOI/Intake rating:' itemLabelFormatter={(v: string) => { switch (v) { case '5': return 'Excellent'; case '4': return 'Slurping'; case '3': return 'Alright'; case '2': return 'Poor'; case '1': return 'Awful'; default: return 'n/a'; } }} selectedValue={String(state.throughputSpeed)} items={['5', '4', '3', '2', '1']} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'throughputSpeed', value }) }} />

                <View style={styles.verticalContainer}>
                    <Text style={styles.commentLabel}>Team's strategies:</Text>
                    <TextInput
                        style={styles.strategyInput}
                        onChangeText={(text) =>
                            dispatch({ type: 'UPDATE_FIELD', field: 'strategyText', value: text })
                        }
                        value={state.strategyText}
                        placeholderTextColor='grey'
                        placeholder='Write about any strategies we could use or intercept... consider active vs inactive...'
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <View style={styles.verticalContainer}>
                    <Text style={styles.commentLabel}>Final Comments:</Text>
                    <TextInput
                        style={styles.commentInput}
                        onChangeText={(text) =>
                            dispatch({ type: 'UPDATE_FIELD', field: 'commentText', value: text })
                        }
                        value={state.commentText}
                        placeholderTextColor='grey'
                        placeholder='Think about how this team could contribute with us toward winning a match...'
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

            var telePointsCount = (state.teleShotsMade) + (0.5 * state.teleFuelPassed) + (0.15 * state.teleFuelPassed);

            if (state.incurredPenalties)
                telePointsCount -= 7;

            var endgamePointsCount = 0;
            switch (state.climbType) {
                case 'Failed':
                    break;
                case 'None':
                    break;
                case 'L1':
                    endgamePointsCount = 10;
                    break;
                case 'L2':
                    endgamePointsCount = 20;
                    break;
                case 'L3':
                    endgamePointsCount = 30;
                    break;
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

            const ID = state.matchNumber + '-' + state.teamNumber;

            const dataInsert: LiveDataInsert = {
                scout_name: scoutName,
                auto_climb: state.autoClimb,
                auto_climb_position: state.autoClimb ? state.autoClimbLocation : null,
                auto_depot: state.autoDepot,
                auto_fuel_taken_NZ: state.fuelTakenFromNeutralZone,
                auto_issues: state.autoIssues.length > 3 ? state.autoIssues : null,
                auto_outpost: state.autoOutpost,
                auto_sos: state.autoStrengthOfShooting,
                auto_start_position: state.selectedStartPosition,
                climb_type: state.climbType,
                comments: state.commentText.length > 5 ? state.commentText : scoutName + " didn't write a comment 😡.",
                defend_AZ: state.playedDefense && state.defendAllianceZone,
                defend_bump_trench: state.playedDefense && state.defendBumpTrench,
                defend_NZ: state.playedDefense && state.defendNeutral,
                defense_strength: state.playedDefense ? state.defenseStrength : null,
                disabled: state.disabled,
                driver_rating: state.driverSkill,
                driver_station: state.selectedStation,
                endgame_points: endgamePointsCount,
                id: ID,
                incurred_penalties: state.incurredPenalties,
                lost_comms: state.lostComms,
                match_number: parseInt(state.matchNumber),
                match_type: 'match',
                played_defense: state.playedDefense,
                strategies: state.strategyText,
                team_number: parseInt(state.teamNumber),
                tele_fuel_dozed: state.teleFuelDozed,
                tele_fuel_impacted: state.teleFuelDozed + state.teleFuelPassed + state.teleShotsMade,
                tele_fuel_passed: state.teleFuelPassed,
                tele_fuel_scored: state.teleShotsMade,
                tele_points: telePointsCount,
                throughput_speed: state.throughputSpeed,
                tioi_rating: state.tioiRating,
                shot_locations: state.shotLocations,
                how_defendable: state.howDefendable,
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
            tele_fuel: state.teleShotsMade + state.teleFuelDozed + state.teleFuelPassed,
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
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#0000007e',
        marginLeft: 20,
        fontFamily: 'Lexend-Regular',
    },
    commentInput: {
        height: 200,
        margin: 12,
        marginTop: 20,
        borderWidth: 2,
        padding: 10,
        paddingTop: 25,
        fontSize: 20,
        width: '93.5%',
        borderRadius: 10,
        borderColor: '#0000007e',
        backgroundColor: '#FFF6EA',
        color: 'black',
        marginBottom: 20,
        fontFamily: 'Poppins-Light',
    },
    strategyInput: {
        height: 130,
        margin: 12,
        marginTop: 20,
        borderWidth: 2,
        padding: 10,
        paddingTop: 25,
        fontSize: 20,
        width: '93.5%',
        borderRadius: 10,
        borderColor: '#0000007e',
        backgroundColor: '#FFF6EA',
        color: 'black',
        marginBottom: 0,
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