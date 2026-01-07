import SelectWithLabel from '@/components/form/SelectWithLabel';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Checkbox from '../../components/form/checkbox';
import Counter from '../../components/form/counter';
import { useForm } from '../../components/match-form';

const TeleScreen = () => {

    const { state, dispatch } = useForm();

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>
                <Text style={styles.title}>TELEOP MODE</Text>

                <SelectWithLabel label='Starting position:' selectedValue={state.selectedStartPosition} items={['Near', 'Far']} callback={(value) => {dispatch({ type: 'UPDATE_FIELD', field: 'selectedStartPosition', value })}} />


                <Counter value={state.autoL4Count} min={0} type='neutral' label="L4:" callback={(value) => {dispatch({ type: 'UPDATE_FIELD', field: 'autoL4Count', value })}}></Counter>


                <Checkbox value={state.leave} callback={(value) => {dispatch({ type: 'UPDATE_FIELD', field: 'leave', value })}} label="Ended off start line:"></Checkbox>

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
        color: '#0046b0ff',
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

export default TeleScreen;