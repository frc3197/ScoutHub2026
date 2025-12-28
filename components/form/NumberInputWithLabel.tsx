import { StyleSheet, Text, TextInput, View } from "react-native";

interface NumberInputWithLabelProps {
    label: string;
    placeholder: string;
    value: string;
    callback: (v: string) => void;
    onBlur?: () => void;
}

export default function NumberInputWithLabel({ label, placeholder, value, callback, onBlur }: NumberInputWithLabelProps) {

    return (
        <View style={styles.horizontalContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text:string) => {
                    callback(text);
                }
                }
                value={value}
                keyboardType="numeric"
                placeholderTextColor='grey'
                placeholder={placeholder}
                onBlur={onBlur ? onBlur : () => {}}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
    },
    label: {
        fontSize: 20,
        width: '33%',
        textAlign: 'right',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        paddingLeft: 10,
        fontSize: 20,
        width: '50%',
        borderRadius: 3,
        borderColor: 'black',
        backgroundColor: '#FFF6EA',
        color: 'black',
    },
});