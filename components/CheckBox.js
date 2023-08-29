import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

const CheckBox = ({ options = [], onChange, multiple = false }) => {

    

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
        <View style={styles.container}>

            {options.map((op, index) => (
                <View style={styles.optionContainer}>
                    <TouchableOpacity
                        style={[
                            styles.touchable,
                            {
                                backgroundColor:
                                    selected.findIndex(i => i === op.id) !== -1
                                        ? '#4E54C8'
                                        : '#fff'
                            }
                        ]}
                        onPress={() => toggle(op?.id)}
                    >
                        {selected.findIndex(i => i === op.id) !== -1 ? (
                            <MaterialIcons name="check" color={'#fff'} size={15} />
                        ) : null}
                    </TouchableOpacity>
                    <Text style={styles.optext}>{op?.text}</Text>
                </View>
            ))}

        </View>)
}


const styles = StyleSheet.create({
    container: {
        marginLeft: 12
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7
    },
    touchable: {
        height: 20,
        width: 20,
        borderRadius: 4,
        justifyContent: 'center',
        borderColor: '#4E54C8',
        borderWidth: 2
    },

    optext: {
        marginLeft: 12,
        color: '#555',
        fontSize: 12,
        fontWeight: '600'
    }
})

export default CheckBox
