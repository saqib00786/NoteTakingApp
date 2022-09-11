import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { COLOR_EQUA_GREEN, COLOR_DARK_GREEN, COLOR_WHITE } from '../../../res/drawable'
import AnimatedLottieView from 'lottie-react-native'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = (props) => {

    const [email, setEmail] = useState()

    const onForgotPassword = async () => {
        const auth = getAuth();
        try {
            let res = await sendPasswordResetEmail(auth, email)
            alert("Password Reset Email Sent Successfully")
            props.navigation.goBack()

        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <View style={styles.mainContainer}>
            <AnimatedLottieView
                style={{ width: 200, height: 200 }}
                autoPlay
                source={require('../../../assets/forgot-password.json')}
            />
            <View style={{ ...styles.card, height: 60, width: '100%' }}>
                <TextInput
                    style={{ padding: 20, color: COLOR_DARK_GREEN }}
                    placeholder={'Email'}
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                />

                <TouchableOpacity
                    style={[styles.btn, { marginTop: 30 }]}

                    onPress={() => onForgotPassword()}
                >
                    <Text style={styles.textWrapper}>ForgotPassword</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}



const styles = StyleSheet.create({

    btn: {
        backgroundColor: COLOR_EQUA_GREEN,
        height: 50,
        borderRadius: 100,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        bottom: 0,
        margin: 8
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16
    },
    card: {
        backgroundColor: COLOR_WHITE,
        borderRadius: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    textWrapper: {
        color: COLOR_DARK_GREEN,
        fontSize: 16,
        fontWeight: 'bold'
    },
})

export default ForgotPassword