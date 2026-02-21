import NumberInputWithLabel from '@/components/form/NumberInputWithLabel';
import SelectWithLabel from '@/components/form/SelectWithLabel';
import Prediction from '@/components/Prediction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm } from '../../components/match-form';
import { Database } from '../database.types';
import { FeedbackDatabase } from '../feedbacksupabasetypes';
import { EVENT_KEY } from '../misc/EVENT_KEY';
import { supabaseStatisticFeedback } from '../supabase';

const GeneralScreen = () => {

    const { state, dispatch } = useForm();
    const router = useRouter();

    const [scoutNames, setScoutNames] = React.useState<FeedbackDatabase['public']['Tables']['members']['Row'][]>([]);

    const [localTeamNumber, setLocalTeamNumber] = React.useState<string>('');

    React.useEffect(() => {
        async function getNames() {
            const { data, error } = await supabaseStatisticFeedback.from('members').select();
            setScoutNames(data ?? []);
        }

        getNames();
    }, []);

    const teams = useTeamList(EVENT_KEY);

    const nameChangeCallback = (name: string) => {
        dispatch({ type: 'UPDATE_FIELD', field: 'nameText', value: name });
        if (name != 'GUEST') {
            const parsed = JSON.parse(name);
            AsyncStorage.setItem('uuid', parsed['id']);
        } else {
            AsyncStorage.setItem('uuid', 'GUEST');
        }
    }

    const nameLabelFormatter = (item: string) => {
        if (item == 'GUEST')
            return 'GUEST';

        const parsed = JSON.parse(item) as {
            clocked_in: boolean;
            created_at: string;
            email: string | null;
            first_name: string | null;
            id: string;
            last_initial: string | null;
        };
        if (parsed['first_name'] && parsed['last_initial'])
            return parsed['first_name'] + ' ' + parsed['last_initial'];

        return 'UNKNOWN';
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>

                <SelectWithLabel label='Scout name:' selectedValue={state.nameText} itemLabelFormatter={nameLabelFormatter} callback={nameChangeCallback} items={['GUEST', ...[...scoutNames].sort((a, b) => (a['first_name'] ?? '').localeCompare(b['first_name'] ?? '')).map((v, i) => JSON.stringify(v))]} />

                <NumberInputWithLabel label='Match #:' value={state.matchNumber} placeholder='ex. 77' callback={(text: string) => dispatch({ type: 'UPDATE_FIELD', field: 'matchNumber', value: text })} />

                <NumberInputWithLabel label='Team #:' value={state.teamNumber} placeholder='ex. 9997' callback={(text: string) => {
                    dispatch({ type: 'UPDATE_FIELD', field: 'teamNumber', value: text });
                    setLocalTeamNumber(text);
                }} onBlur={() => {
                    if (!teams.includes(parseInt(localTeamNumber))) {
                        alert(`Team ${localTeamNumber} not found at event, please double check that they exist!!!`);
                    }
                }
                } />

                <SelectWithLabel label='Station:' selectedValue={state.selectedStation} callback={(value: string) =>
                    dispatch({ type: 'UPDATE_FIELD', field: 'selectedStation', value: value as Database['public']['Enums']['driverstation'] })
                } items={['B1', 'B2', 'B3', 'R1', 'R2', 'R3']} />

                <Text style={styles.teamNumberWarning}>Please check the team number! An incorrect team leads to BAD DATA and WASTES YOUR TIME!</Text>

                <Prediction />

            </View>
        </ScrollView>
    );

    function useTeamList(eventKey = EVENT_KEY): number[] {
        const [teams, setTeams] = React.useState<number[]>([]);

        React.useEffect(() => {
            const fetchTeams = async () => {
                try {
                    const response = await fetch(
                        `https://www.thebluealliance.com/api/v3/event/${eventKey}/teams/keys`,
                        {
                            headers: {
                                'X-TBA-Auth-Key': 'sBluV8DKQA0hTvJ2ABC9U3VDZunUGUSehxuDPvtNC8SQ3Q5XHvQVt0nm3X7cvP7j',
                            },
                        }
                    );

                    const teamKeys = await response.json(); // ["frc254", "frc1678", ...]
                    const numbersOnly: number[] = (teamKeys as string[])
                        .map((key: string) => parseInt(key.replace("frc", ""), 10))
                        .filter((n: number) => !isNaN(n))
                        .sort((a: number, b: number) => a - b); // Sort numerically

                    setTeams(numbersOnly);
                } catch (error) {
                    console.error("Error fetching TBA team list:", error);
                }
            };

            fetchTeams();
        }, [eventKey]);

        return teams;
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
    teamNumberWarning: {
        fontSize: 20,
        width: '90%',
        textAlign: 'center',
        color: '#F37621',
        marginTop: 35,
        fontFamily: 'Lexend-Regular',
        textDecorationLine: 'underline',
    },
});

export default GeneralScreen;