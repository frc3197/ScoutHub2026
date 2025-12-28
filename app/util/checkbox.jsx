import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useForm } from './match-form';

export default function Checkbox({ field, label}) {
    const { state, dispatch } = useForm();
    const value = state[field] ?? false;

    const toggle = () => {
        dispatch({ type: 'UPDATE_FIELD', field, value: !value });
    };

    return (
        <TouchableOpacity style={styles.checkbox} onPress={toggle}>
            <Text style={styles.checkboxText}>{label}</Text>
            <Ionicons name={value ? 'checkmark-circle-outline' : 'close-circle-outline'} size={54} color={value ? 'green' : 'red'} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
        backgroundColor: '#e6d4c3',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        gap: 10,
    },
    checkboxText: {
        fontSize: 24,
    },
});