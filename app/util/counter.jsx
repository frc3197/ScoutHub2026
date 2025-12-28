import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useForm } from './match-form';

export default function Counter({ field, label, type = 'make' }) {
    const { state, dispatch } = useForm();
    const value = state[field] ?? 0;

    const increment = () => {
        dispatch({ type: 'UPDATE_FIELD', field, value: value + 1 });
    };

    const decrement = () => {
        if (value > 0) {
            dispatch({ type: 'UPDATE_FIELD', field, value: value - 1 });
        }
    };

    const types = ['coral-make', 'coral-miss', 'algae-make', 'algae-miss'];
    const containerStyles = [styles.coralMakeContainer, styles.coralMissContainer, styles.algaeMakeContainer, styles.algaeMissContainer];
    const labelStyles = [styles.coralMakeContainerLabel, styles.coralMakeContainerLabel, styles.algaeOperationLabel, styles.algaeOperationLabel];

    return (
        <View style={containerStyles[types.indexOf(type)]}>
            <View style={styles.horizontalContainer}>
                <Text style={labelStyles[types.indexOf(type)]}>{label}</Text>
                <Text style={styles.coralMakeContainerCount}>{value}</Text>
            </View>
            <View style={styles.horizontalContainer}>
                <TouchableOpacity onPress={increment}>
                    <Ionicons name={'add-circle-outline'} size={54} color={'darkgreen'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={decrement}>
                    <Ionicons name={'remove-circle-outline'} size={54} color={'darkred'} />
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
