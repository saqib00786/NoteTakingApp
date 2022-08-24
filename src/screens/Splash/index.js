import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { BACKGROUND_COLOR } from '../../../res/drawable'


const Splash = () => {
    return (
        <View style={[styles.container]}>
            <Image style={[styles.logo]}
                source={require('../../../assets/erozgar.png')}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR

    },
    logo: {
        height: 150,
        width: 150,
    }
})

export default Splash