import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

interface SelectWithLabelProps {
    label: string;
    selectedValue: string;
    items: string[];
    callback: (v: string) => void;
    itemLabelFormatter?: (v: string) => void;
}

export default function SelectWithLabel({ label, selectedValue, items, callback, itemLabelFormatter }: SelectWithLabelProps) {


    return (
        <View style={styles.horizontalContainer}>
            <Text style={styles.label}>{label}</Text>
            <Picker
                style={styles.input}
                selectedValue={selectedValue}
                onValueChange={(value: string) => {
                    callback(value);
                }
                }>
                {
                    items.map((item, index) => {
                        return <Picker.Item value={String(item)} label={`${itemLabelFormatter ? itemLabelFormatter(item) : item}`} key={index} />
                    })
                }
            </Picker>
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