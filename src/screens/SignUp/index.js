import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import { COLOR_DARK_GREEN, COLOR_EQUA_GREEN, COLOR_LITE_GREEN, COLOR_WHITE, BACKGROUND_IMG } from '../../../res/drawable'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { } from 'firebase/firestore'
import { collection, addDoc, doc, setDoc, getFirestore } from "firebase/firestore";
import App from '../../../api/firebase'
import { COLLECTION_USER } from '../../../res/strings';


const SignUp = (props) => {
    const db = getFirestore(App)
    const [password, setPassowrd] = useState()
    const [email, setEmail] = useState()

    const onLogin = () => {
        props.navigation.goBack()
    }
    const onSignup = async () => {
        const auth = getAuth();
        if (email.includes('@') && password) {
            try {
                await addDoc(collection(db, email));

                let res = await createUserWithEmailAndPassword(auth, email, password)
                alert("User Create Sucessfully")

                props.navigation.goBack()
            } catch (error) {
                alert("SomeThing went Wrong")
            }

        } else {
            alert("Kindly enter email and password")
        }

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
                    style={{ padding: 20, color: COLOR_DARK_GREEN, borderColor: 'gray', borderWidth: 0.7, borderRadius: 20 }}
                    placeholder={'Email'}
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                />

            </View>

            <View style={{ ...styles.card, height: 60, width: '100%' }}>
                <TextInput
                    style={{ padding: 20, color: COLOR_DARK_GREEN, borderColor: 'gray', borderWidth: 0.7, borderRadius: 20 }}
                    placeholder={'Password'}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(t) => setPassowrd(t)}
                />

            </View>


            <TouchableOpacity
                style={[styles.btn, { marginTop: 30 }]}

                onPress={() => onSignup()}
            >
                <Text style={styles.textWrapper}>SignUp</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.forgotPwd, { marginTop: 20, marginBottom: 8 }]}
                onPress={() => onLogin()}
            >
                <Text style={styles.textWrapper}>Already Have Account</Text>
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
        margin: 8,
        borderColor : COLOR_DARK_GREEN,
        borderWidth : 0.5,
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

export default SignUp