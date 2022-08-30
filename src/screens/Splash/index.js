import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { BACKGROUND_COLOR } from '../../../res/drawable'


const Splash = (props) => {

    setTimeout(() => {
        props.navigation.replace('Main')
    },3000)

    return (
        <View style={[styles.container]}>
        <AnimatedLottieView
        style={{position : 'absolute',width : '100%',height : '100%',zIndex : -1}}
        autoPlay
        source={require('../../../assets/SplashScreen.json')}
        />

            <Image style={[styles.logo]}
                source={require('../../../assets/erozgar.png')}
            />

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width : '100%',
        alignItems : 'center',
        justifyContent :'center',
        backgroundColor: BACKGROUND_COLOR

    },
    logo: {
        height: 200,
        width: 200,
        resizeMode: 'contain',
    }
})

export default Splash