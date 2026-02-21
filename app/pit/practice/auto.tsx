import SelectWithLabel from '@/components/form/SelectWithLabel';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Checkbox from '../../../components/form/checkbox';
import StackedCounter from '../../../components/form/StackedCounter';
import { useForm } from '../../../components/match-form';

const AutoScreen = () => {

    const { state, dispatch } = useForm();

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>
                <Text style={styles.title}>AUTONOMOUS MODE</Text>

                <SelectWithLabel label='Starting position:' selectedValue={state.selectedStartPosition} items={[
                    "center-hub",
                    "outpost-bump",
                    "outpost-trench",
                    "depot-bump",
                    "depot-trench"
                ]} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'selectedStartPosition', value }) }} />


                <StackedCounter value={state.fuelTakenFromNeutralZone} min={0} type='small' label="Fuel taken from NZ:" callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'fuelTakenFromNeutralZone', value }) }}></StackedCounter>


                <View style={{ borderWidth: state.autoClimb ? 2 : 0, borderRadius: 20, borderColor: '#0000007e', paddingTop: 15, width: '100%' }}>
                    <Checkbox value={state.autoClimb} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'autoClimb', value }) }} label="L1 Climb:"></Checkbox>

                    {state.autoClimb &&
                        <SelectWithLabel label='Climb location:' selectedValue={state.autoClimbLocation} items={['center', 'outpost', 'depot']} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'autoClimbLocation', value }) }} />
                    }
                </View>

                <Checkbox value={state.autoDepot} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'autoDepot', value }) }} label="Used depot?"></Checkbox>
                <Checkbox value={state.autoOutpost} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'autoOutpost', value }) }} label="Used outpost?"></Checkbox>

                <SelectWithLabel label='Auto SOS:' itemLabelFormatter={(v: string) => { switch (v) { case '5': return 'Excellent'; case '4': return 'Good'; case '3': return 'Medium'; case '2': return 'Poor'; case '1': return 'Awful/None'; default: return 'n/a'; } }} selectedValue={String(state.autoStrengthOfShooting)} items={['5', '4', '3', '2', '1']} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'autoStrengthOfShooting', value }) }} />

                <View style={styles.verticalContainer}>
                    <Text style={styles.commentLabel}>Team's strategies:</Text>
                    <TextInput
                        style={styles.issuesInput}
                        onChangeText={(text) =>
                            dispatch({ type: 'UPDATE_FIELD', field: 'autoIssues', value: text })
                        }
                        value={state.autoIssues}
                        placeholderTextColor='grey'
                        placeholder='Any auto issues (ie stuck on bump)? This can be left blank.'
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 5,
        paddingHorizontal: 5,
        gap: 25,
        alignItems: 'center',
        backgroundColor: '#FFF6EA',
        paddingBottom: 50,
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
        color: '#b00c00',
        fontFamily: 'Branding',
        marginTop: 25,
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    issuesInput: {
        height: 110,
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
});

export default AutoScreen;
