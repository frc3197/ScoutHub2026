import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { EVENT_KEY } from '../../EVENT_KEY';
import { FeedbackDatabase } from '../../feedbacksupabasetypes';
import { supabaseStatisticFeedback } from '../../supabase';
import { useForm } from '../../util/match-form';

const GeneralScreen = () => {

    const { state, dispatch } = useForm();
    const router = useRouter();

    const [predictedAlliance, setPredictedAlliance] = React.useState('red');
    const [wagerAmount, setWagerAmount] = React.useState(1);
    const [showWager, setShowWager] = React.useState(true);

    const [scoutNames, setScoutNames] = React.useState<FeedbackDatabase['public']['Tables']['members']['Row'][]>([]);

    const [localTeamNumber, setLocalTeamNumber] = React.useState<string>('');

    React.useEffect(() => {
        async function getShowWager() {
            try {
                const show = await AsyncStorage.getItem('showWager');
                console.log(show)
                if (show !== null) {
                    setShowWager(show === 'true');
                }
            } catch (e) {
                alert('Failed to save wagerAmount to storage' + e);
            }
        }
        getShowWager();
    });

    React.useEffect(() => {
        async function getNames() {
            const { data, error } = await supabaseStatisticFeedback.from('members').select();
            setScoutNames(data ?? []);
        }

        getNames();
    }, []);

    const teams = useTeamList('2025wimc');

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>

                <Text style={styles.warningText}>This page is for PRACTICE SCOUTING only!!! DO NOT SCOUT QUALIFICATION OR PRE-SCOUTING MATCHES HERE! To scout those, go to the home page.</Text>

                <View style={styles.horizontalContainer}>
                    <Text style={styles.label}>Scout name:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={state.nameText}
                        onValueChange={(value:string) => {
                            dispatch({ type: 'UPDATE_FIELD', field: 'nameText', value });
                            if (value != 'GUEST') {
                                const parsed = JSON.parse(value);
                                AsyncStorage.setItem('uuid', parsed['id']);
                            } else {
                                AsyncStorage.setItem('uuid', 'GUEST' );
                            }
                            //alert(AsyncStorage.getItem('uuid'))
                        }
                        }>
                        <Picker.Item label="GUEST" value="GUEST" />
                        {
                            [...scoutNames].sort((a, b) => (a['first_name'] ?? '').localeCompare(b['first_name'] ?? '')).map((item, index) => {
                                return <Picker.Item value={JSON.stringify(item)} label={`${item['first_name']} ${item['last_initial']}`} key={index} />
                            })
                        }
                    </Picker>
                </View>

                <View style={styles.horizontalContainer}>
                    <Text style={styles.label}>Team #:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            dispatch({ type: 'UPDATE_FIELD', field: 'teamNumber', value: text });
                            setLocalTeamNumber(text);
                        }
                        }
                        value={state.teamNumber}
                        keyboardType="numeric"
                        placeholderTextColor='grey'
                        placeholder='ex. 9997'
                    />
                </View>

                <Text style={styles.warningText}>Please check the team number! It is impossible to check team numbers in practice scouting, please be careful</Text>

            </View>
        </ScrollView>
    );

    function useTeamList(eventKey = EVENT_KEY):number[] {
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
    },
    warningText: {
        fontSize: 20,
        width: '90%',
        textAlign: 'center',
        color: 'white',
        marginVertical: 15,
        backgroundColor: 'red',
        padding: 10,
    },
    wagerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 25,
        backgroundColor: '#e6d4c3',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        gap: 10,
    },
});

export default GeneralScreen;