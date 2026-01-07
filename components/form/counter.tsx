import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type types = 'good' | 'bad' | 'neutral';

interface CounterProps {
    value: number;
    min?: number;
    max?: number;
    callback: (n: number) => void;
    type: types;
    label: string;
}

export default function Counter({ value, min, max, callback, type, label }: CounterProps) {

    const containerStyles: Record<types, any> = {
        'neutral': styles.neutralContainer,
        'good': styles.goodContainer,
        'bad': styles.badContainer,
    };

    const labelStyles: Record<types, any> = {
        'neutral': styles.neutralContainerLabel,
        'good': styles.goodContainerLabel,
        'bad': styles.badContainerLabel,
    };

    return (
        <View style={[containerStyles[type], styles.baseContainer]}>
            <View style={[styles.horizontalContainer, { justifyContent: 'space-around', flex: 1, }]}>
                <TouchableOpacity onPress={() => {
                    if (min === undefined || value > min) {
                        callback(value - 1);
                    }
                }}>
                    <Ionicons name={'remove-circle-outline'} size={54} color={'#d84123ff'} />
                </TouchableOpacity>
                <View style={styles.horizontalContainerInner}>
                    <Text style={[labelStyles[type], { fontFamily: 'Lexend-Regular', }]}>{label}</Text>
                    <Text style={styles.countContainer}>{value}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    if (max === undefined || value < max) {
                        callback(value + 1);
                    }
                }}>
                    <Ionicons name={'add-circle-outline'} size={54} color={'#47b300ff'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    baseContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 3,
        borderColor: '#0000001e'
    },
    neutralContainer: {
        backgroundColor: '#e6d4c3',
    },
    goodContainer: {
        backgroundColor: '#c6e6c3ff',
    },
    badContainer: {
        backgroundColor: '#f5a9a9',
    },
    goodContainerLabel: {
        fontSize: 32,
    },
    badContainerLabel: {
        fontSize: 32,
    },
    neutralContainerLabel: {
        fontSize: 32,
    },
    countContainer: {
        fontSize: 44,
        fontFamily: 'Poppins-SemiBold',
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 18,
        alignItems: 'center',
    },
    horizontalContainerInner: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
});
