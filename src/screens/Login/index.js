import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import { COLOR_DARK_GREEN, COLOR_EQUA_GREEN, COLOR_LITE_GREEN, COLOR_WHITE, BACKGROUND_IMG } from '../../../res/drawable'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = (props) => {
    const [password, setPassowrd] = useState()
    const [email, setEmail] = useState()

    const onLogin = async () => {
        const auth = getAuth();
        try {
            let res = await signInWithEmailAndPassword(auth, email, password)
            alert("You Are Login Successfully")
            props.navigation.navigate('Main',{email : email})
        } catch (error) {
            alert("SomeThing went Wrong")
        }

    }
    const onSignup = () => {
        props.navigation.navigate('Signup')
    }
    const onForgotPassword = () => {
        props.navigation.navigate('ForgotPassword')
    }

    return (
        <View style={styles.container}>
            <Image style={[styles.logo]}
                source={require('../../../assets/erozgar.png')}
            />

            <View style={{ ...styles.card, height: 60, width: '100%' }}>
                <TextInput
                    style={{ padding: 20, color: COLOR_DARK_GREEN }}
                    placeholder={'Email'}
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                />

            </View>

            <View style={{ ...styles.card, height: 60, width: '100%' }}>
                <TextInput
                    style={{ margin: 20, color: COLOR_DARK_GREEN }}
                    placeholder={'Password'}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(t) => setPassowrd(t)}
                />

            </View>

            <TouchableOpacity
                style={[styles.btn, { marginTop: 30 }]}
                onPress={() => onLogin()}
            >
                <Text style={styles.textWrapper}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btn}
                onPress={() => onSignup()}
            >
                <Text style={styles.textWrapper}>SignUp</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.forgotPwd}
                onPress={() => onForgotPassword()}
            >
                <Text style={styles.textWrapper}>Forgot Password</Text>
            </TouchableOpacity>

        </View>


    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
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
        elevation: 4,

    },
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
    textWrapper: {
        color: COLOR_DARK_GREEN,
        fontSize: 16,
        fontWeight: 'bold'
    },
    forgotPwd: {
        alignSelf: 'center'
    },
    logo: {
        height: 200,
        width: 200,
        resizeMode: 'contain',
    }
})

export default Login