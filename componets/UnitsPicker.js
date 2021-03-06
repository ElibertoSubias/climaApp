import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-community/picker'

export default function UnitsPicker({unitSystem, setUnitSystem}) {
    return (
        <View style={styles.unitSystem}>
            <Picker selectedValue={unitSystem} onValueChange={(item) => {setUnitSystem(item)}} mode="dropdown" itemStyle={{fontSize: 12}}>
                <Picker.Item label="C°" value="metric" />
                <Picker.Item label="F°" value="imperial" />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    unitSystem: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: -30,
                left: 10,
            },
            android: {
                top: 50,
                left: 20,
            }
        }),
        width: 100,
        height: 50
    }
})