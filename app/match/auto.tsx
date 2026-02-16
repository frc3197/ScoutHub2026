import SelectWithLabel from '@/components/form/SelectWithLabel';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Checkbox from '../../components/form/checkbox';
import StackedCounter from '../../components/form/StackedCounter';
import { useForm } from '../../components/match-form';

const AutoScreen = () => {

    const { state, dispatch } = useForm();

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>
                <Text style={styles.title}>AUTONOMOUS MODE</Text>

                <SelectWithLabel label='Starting position:' selectedValue={state.selectedStartPosition} items={['Near', 'Far']} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'selectedStartPosition', value }) }} />


                <StackedCounter value={state.fuelTakenFromNeutralZone} min={0} type='small' label="Fuel taken from NZ:" callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'fuelTakenFromNeutralZone', value }) }}></StackedCounter>


                <Checkbox value={state.autoClimb} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'autoClimb', value }) }} label="L1 Climb:"></Checkbox>

                <SelectWithLabel label='Auto SOS:' itemLabelFormatter={(v: string) => { switch (v) { case '5': return 'Excellent'; case '4': return 'Good'; case '3': return 'Medium'; case '2': return 'Poor'; case '1': return 'Awful/None'; default: return 'n/a'; } }} selectedValue={String(state.autoStrengthOfShooting)} items={['5', '4', '3', '2', '1']} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'autoStrengthOfShooting', value }) }} />

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 5,
        gap: 25,
        alignItems: 'center',
        backgroundColor: '#FFF6EA',
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
});

export default AutoScreen;
