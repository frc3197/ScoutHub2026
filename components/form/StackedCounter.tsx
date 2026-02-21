import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type types = 'good' | 'bad' | 'neutral' | 'small';

interface CounterProps {
    value: number;
    min?: number;
    max?: number;
    callback: (n: number) => void;
    type: types;
    label: string;
}

export default function StackedCounter({ value, min, max, callback, type, label }: CounterProps) {

    const containerStyles: Record<types, any> = {
        'neutral': styles.neutralContainer,
        'small': styles.neutralContainer,
        'good': styles.goodContainer,
        'bad': styles.badContainer,
    };

    const labelStyles: Record<types, any> = {
        'neutral': styles.neutralContainerLabel,
        'good': styles.goodContainerLabel,
        'bad': styles.badContainerLabel,
        'small': styles.smallContainerLabel,
    };

    return (
        <View style={[containerStyles[type], styles.baseContainer]}>
            <View style={[styles.horizontalContainer, { justifyContent: 'space-between', flex: 1, }]}>
                <View style={styles.verticalButtonContainer}>
                    <TouchableOpacity style={styles.decreaseCounterContainer} onPress={() => {
                        if (min !== undefined) {
                            callback(value > min ? value - 1 : min);
                        } else {
                            callback(value - 1);
                        }
                    }}>
                        <Text style={[styles.decreaseCounterText, { fontWeight: '900', }]}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.decreaseCounterContainer} onPress={() => {
                        if (min !== undefined) {
                            callback(value - 4 > min ? value - 5 : min);
                        } else {
                            callback(value - 5);
                        }
                    }}>
                        <Text style={styles.decreaseCounterText}>-5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.decreaseCounterContainer} onPress={() => {
                        if (min !== undefined) {
                            callback(value - 9 > min ? value - 10 : min);
                        } else {
                            callback(value - 10);
                        }
                    }}>
                        <Text style={styles.decreaseCounterText}>-10</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.verticalContainerInner}>
                    <Text style={[labelStyles[type], { fontFamily: 'Lexend-Regular', textAlign: 'center' }]}>{label}</Text>
                    <Text style={styles.countContainer}>{value}</Text>
                </View>
                <View style={styles.verticalButtonContainer}>
                    <TouchableOpacity style={styles.increaseCounterContainer} onPress={() => {
                        if (max === undefined || value < max) {
                            callback(value + 1);
                        }
                    }}>
                        <Text style={[styles.increaseCounterText, { fontWeight: '900', }]}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.increaseCounterContainer} onPress={() => {
                        if (max === undefined || value + 4 < max) {
                            callback(value + 5);
                        }
                    }}>
                        <Text style={styles.increaseCounterText}>+5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.increaseCounterContainer} onPress={() => {
                        if (max === undefined || value + 9 < max) {
                            callback(value + 10);
                        }
                    }}>
                        <Text style={styles.increaseCounterText}>+10</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    baseContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 3,
        borderColor: '#0000001e',
        minWidth: 320,
        maxWidth: '90%',
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
        fontSize: 40,
    },
    smallContainerLabel: {
        fontSize: 26,
        maxWidth: 140,
        textAlign: 'center',
    },
    countContainer: {
        fontSize: 60,
        fontFamily: 'Poppins-SemiBold',
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 18,
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    verticalContainerInner: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verticalButtonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
    },
    decreaseCounterContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#d84123ff',
        shadowColor: '#d84123ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderWidth: 3.5,
        borderRadius: 1000,
        aspectRatio: 1,
        width: 50,
    },
    decreaseCounterText: {
        fontSize: 24,
        color: '#152503ff',
        textAlign: 'center',
        fontFamily: 'Lexend-Light',
    },
    increaseCounterContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#47b300ff',
        shadowColor: '#47b300ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderWidth: 3.5,
        borderRadius: 1000,
        aspectRatio: 1,
        width: 50,
    },
    increaseCounterText: {
        fontSize: 24,
        color: '#152503ff',
        textAlign: 'center',
        fontFamily: 'Lexend-Light',
    },
});
