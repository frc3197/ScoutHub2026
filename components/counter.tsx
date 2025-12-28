import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useForm } from './match-form';

interface CounterProps {
    value: number;
    min?: number;
    max?: number;
    callback: (n:number) => void;
    type: 'good' | 'bad' | 'neutral';
}

export default function Counter({ value, min, max, callback, type }:CounterProps) {
    const { state, dispatch } = useForm();

    const increment = () => {
        if (!max || value < max) {
            callback(value + 1);
        }
    };

    const decrement = () => {
        if (!min || value > min) {
            callback(value - 1);
        }
    };

    const containerStyles = [styles.coralMakeContainer, styles.coralMissContainer, styles.algaeMakeContainer, styles.algaeMissContainer];
    const labelStyles = [styles.coralMakeContainerLabel, styles.coralMakeContainerLabel, styles.algaeOperationLabel, styles.algaeOperationLabel];

    return (
        <View style={containerStyles[types.indexOf(type)]}>
            <View style={[styles.horizontalContainer, {justifyContent: 'space-around', flex: 1,}]}>
                <TouchableOpacity onPress={decrement}>
                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
                </TouchableOpacity>
                <View style={styles.horizontalContainer}>
                    <Text style={labelStyles[types.indexOf(type)]}>{label}</Text>
                    <Text style={styles.coralMakeContainerCount}>{value}</Text>
                </View>
                <TouchableOpacity onPress={increment}>
                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    coralMakeContainersContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: 280,
        height: '100%',
    },
    coralMakeContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#e6d4c3',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
    },
    coralMissContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#f5a9a9',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
        width: '100%',
        transform: [{ scale: 0.85 }],
        marginTop: 15,
    },
    coralMakeContainerLabel: {
        fontSize: 32,
    },
    coralMakeContainerCount: {
        fontSize: 44,
        fontWeight: 'bold',
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    coralMissContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#f5a9a9',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
        width: '100%',
        transform: [{ scale: 0.85 }],
        marginTop: 15,
    },
    algaeMakeContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e6d4c3',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
        width: '45%',
    },
    algaeMissContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5a9a9',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
        width: '45%',
    },
    algaeOperationLabel: {
        fontSize: 24,
    },
});
