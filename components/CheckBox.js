import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

const CheckBox = ({ options = [], onChange, multiple = false, left }) => {
    const [selected, setSelected] = useState([]);

    function toggle(id) {
        let index = selected.findIndex(i => i === id)
        let arrSelecteds = [...selected];

        if (index !== -1) {
            arrSelecteds.splice(index, 1)
        } else {
            multiple ? arrSelecteds.push(id) : (arrSelecteds = [id]);
        }
        setSelected(arrSelecteds)
    }

    useEffect(() => onChange(selected), [selected]);

    return (
        <View style={[styles.container, { marginLeft: left }]}>
            {options.map((op, index) => (
                <View key={op.id} style={styles.optionContainer}>
                    <TouchableWithoutFeedback onPress={() => toggle(op?.id)}>
                        <View style={[
                            styles.touchable,
                            {
                                backgroundColor:
                                    selected.findIndex(i => i === op.id) !== -1
                                        ? '#4E54C8'
                                        : '#fff'
                            }
                        ]}>
                            {selected.findIndex(i => i === op.id) !== -1 ? (
                                <MaterialIcons name="check" color={'#fff'} size={15} />
                            ) : null}
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => toggle(op?.id)}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.optext}>{op?.text}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginLeft: -16,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
    },
    touchable: {
        height: 20,
        width: 20,
        borderRadius: 4,
        justifyContent: 'center',
        borderColor: '#4E54C8',
        borderWidth: 2,
    },
    labelContainer: {
        marginLeft: 12,
    },
    optext: {
        color: '#555',
        fontSize: 12,
        fontWeight: '600',
    },
});

export default CheckBox;
