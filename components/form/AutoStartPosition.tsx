import { Database } from '@/app/database.types';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import RedStart from '@/assets/images/red-start.png';

interface params {
    value: Database['public']['Enums']['autostartpositionsrebuilt'],
    callback: (v: Database['public']['Enums']['autostartpositionsrebuilt']) => void
}

const AutoStartPosition = ({ value, callback }: params) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} resizeMode="cover" source={RedStart}></Image>
            <View style={styles.startPositionButtonCotnainer}>
                <TouchableOpacity onPress={() => callback('depot-trench')} style={value == 'depot-trench' ? styles.startPositionButtonSelected : styles.startPositionButton}></TouchableOpacity>
                <TouchableOpacity onPress={() => callback('depot-bump')} style={value == 'depot-bump' ? styles.startPositionButtonSelected : styles.startPositionButton}></TouchableOpacity>
                <TouchableOpacity onPress={() => callback('center-hub')} style={value == 'center-hub' ? styles.startPositionButtonSelected : styles.startPositionButton}></TouchableOpacity>
                <TouchableOpacity onPress={() => callback('outpost-bump')} style={value == 'outpost-bump' ? styles.startPositionButtonSelected : styles.startPositionButton}></TouchableOpacity>
                <TouchableOpacity onPress={() => callback('outpost-trench')} style={value == 'outpost-trench' ? styles.startPositionButtonSelected : styles.startPositionButton}></TouchableOpacity>
            </View>
        </View>
    )
}

export default AutoStartPosition;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        backgroundColor: 'green',
    },
    startPositionButtonCotnainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        top: 30,
        width: 300,
    },
    startPositionButton: {
        flex: 1,
        height: 50,
        backgroundColor: 'black',
        opacity: 0.4,
        zIndex: 20,
        borderWidth: 3,
        borderColor: 'orange',
    },
    startPositionButtonSelected: {
        flex: 1,
        height: 50,
        backgroundColor: 'green',
        opacity: 0.56,
        zIndex: 20,
        borderWidth: 0,
    },
});