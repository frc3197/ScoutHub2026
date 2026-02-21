import NumberInputWithLabel from '@/components/form/NumberInputWithLabel';
import SelectWithLabel from '@/components/form/SelectWithLabel';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm } from '../../components/match-form';

const TeleScreen = () => {

    const { state, dispatch } = useForm();

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>
                <Text style={styles.title}>ENDGAME</Text>

                <View style={[styles.verticalContainer, { borderWidth: state.climbType != 'None' ? 2 : 0, borderRadius: 20, borderColor: '#0000007e' }]}>
                    <SelectWithLabel label='Climb outcome' selectedValue={String(state.climbType)} items={['None', 'Failed', 'L1', 'L2', 'L3']} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'climbType', value }) }} />

                    {state.climbType != 'None' &&
                        <><SelectWithLabel label='Climb location' selectedValue={String(state.teleClimbLocation)} items={['Outpost side', 'Center', 'Depot side']} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'teleClimbLocation', value }); }} /><NumberInputWithLabel label='Climb time:' value={state.teleClimbTime} placeholder='ex. 21' callback={(text: string) => dispatch({ type: 'UPDATE_FIELD', field: 'teleClimbTime', value: text })} /></>

                    }
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 5,
        gap: 35,
        alignItems: 'center',
        backgroundColor: '#FFF6EA',
        paddingBottom: 15,
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
        color: 'rgb(152, 0, 176)',
        fontFamily: 'Branding',
        marginTop: 25,
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    fuelImage: {
        width: 100,
        aspectRatio: 1,
    },
    verticalContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        width: '95%',
        marginBottom: 25,
    }
});

export default TeleScreen;