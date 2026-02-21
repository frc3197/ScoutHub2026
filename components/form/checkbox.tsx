import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CheckboxProps {
    label: string;
    value: boolean;
    callback: (v: boolean) => void;
}

export default function Checkbox({ value, callback, label}:CheckboxProps) {

    const toggle = () => {
        callback(!value);
    };

    return (
        <TouchableOpacity style={[styles.checkbox, {borderColor: value ? '#48b30054' : '#d8412354'}]} onPress={toggle}>
            <Text style={styles.checkboxText}>{label}</Text>
            <Ionicons name={value ? 'checkmark-circle-outline' : 'close-circle-outline'} size={54} color={value ? '#47b300ff' : '#d84123ff'} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e6d4c3',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        gap: 10,
        borderWidth: 4,
        justifyContent: 'center',
        width: 'auto',
        marginHorizontal: 25,
    },
    checkboxText: {
        fontSize: 24,
        fontFamily: 'Lexend-Regular',
    },
});