import SelectWithLabel from '@/components/form/SelectWithLabel';
import { useAudioPlayer } from 'expo-audio';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Checkbox from '../../../components/form/checkbox';
import StackedCounter from '../../../components/form/StackedCounter';
import { useForm } from '../../../components/match-form';

const bzzBzzBzz = require('@/assets/sounds/bzzbzzbzz.wav');
const woah = require('@/assets/sounds/woowooaa.wav');

const TeleScreen = () => {

    const { state, dispatch } = useForm();

    const bzzPlayer = useAudioPlayer(bzzBzzBzz);
    const woahPlayer = useAudioPlayer(woah);

    const [funColorSwitch, setFunColorSwitch] = useState(0);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.pageContainer}>
                <Text style={styles.title}>TELEOP MODE</Text>

                <View style={styles.verticalContainer}>
                    <StackedCounter value={state.teleShotsMade} min={0} type='neutral' label="Shots made:" callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'teleShotsMade', value }) }}></StackedCounter>
                    <TouchableOpacity onPress={() => {
                        setFunColorSwitch(funColorSwitch == 1 ? 0 : 1);
                    }} style={[styles.horizontalContainer, { filter: `invert(${funColorSwitch})` }]}>
                        <Image style={styles.fuelImage} source={require('@/assets/images/fuel.png')} />
                        <Image style={styles.fuelImage} source={require('@/assets/images/fuel.png')} />
                        <Image style={styles.fuelImage} source={require('@/assets/images/fuel.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.verticalContainer}>
                    <StackedCounter value={state.teleFuelPassed} min={0} type='neutral' label="Fuel passed:" callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'teleFuelPassed', value }) }}></StackedCounter>
                    <TouchableOpacity onPress={() => {
                        bzzPlayer.seekTo(0);
                        bzzPlayer.play();
                    }} style={[styles.horizontalContainer, { filter: `invert(${funColorSwitch})` }]}>
                        <Image style={styles.fuelImage} source={require('@/assets/images/magic-pass.png')} />
                        <Image style={styles.fuelImage} source={require('@/assets/images/pass-bg.png')} />
                        <Image style={styles.fuelImage} source={require('@/assets/images/magic-pass.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.verticalContainer}>
                    <StackedCounter value={state.teleFuelDozed} min={0} type='neutral' label="Fuel pushed:" callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'teleFuelDozed', value }) }}></StackedCounter>
                    <TouchableOpacity onPress={() => {
                        woahPlayer.seekTo(0);
                        woahPlayer.play();
                    }} style={[styles.horizontalContainer, { filter: `invert(${funColorSwitch})` }]}>
                        <Image style={styles.fuelImage} source={require('@/assets/images/dozer-bg.png')} />
                        <Image style={styles.fuelImage} source={require('@/assets/images/dozer-bg.png')} />
                        <Image style={styles.fuelImage} source={require('@/assets/images/dozer-bg.png')} />
                    </TouchableOpacity>
                </View>


                <View style={[styles.verticalContainer, { borderWidth: state.playedDefense ? 2 : 0, borderRadius: 20, paddingTop: 15, borderColor: '#0000007e' }]}>
                    <Checkbox value={state.playedDefense} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'playedDefense', value }) }} label="Played defense?"></Checkbox>

                    {state.playedDefense &&

                        <><SelectWithLabel label='Defense quality' itemLabelFormatter={(v: string) => { switch (v) { case '5': return 'Lights-out'; case '4': return 'Good'; case '3': return 'Average'; case '2': return 'Poor'; case '1': return 'Awful'; default: return 'n/a'; } }} selectedValue={String(state.defenseStrength)} items={['5', '4', '3', '2', '1']} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'defenseStrength', value }); }} /><Text style={{ fontSize: 18, marginHorizontal: 15, textAlign: 'center', }}>Where do they commonly defend? Select all that apply:</Text><View style={[styles.verticalContainer, { gap: 10 }]}>
                            <Checkbox value={state.defendBumpTrench} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'defendBumpTrench', value }); }} label="Trench or Bump"></Checkbox>
                            <Checkbox value={state.defendAllianceZone} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'defendAllianceZone', value }); }} label="Alliance Zone"></Checkbox>
                            <Checkbox value={state.defendNeutral} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'defendNeutral', value }); }} label="Neutral Zone"></Checkbox>
                        </View></>

                    }
                </View>

                <Checkbox value={state.incurredPenalties} callback={(value) => { dispatch({ type: 'UPDATE_FIELD', field: 'incurredPenalties', value }) }} label="Committed fouls?"></Checkbox>

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
        paddingBottom: 70,
        paddingHorizontal: 5,
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
        width: '100%',
        marginBottom: 25,
    }
});

export default TeleScreen;