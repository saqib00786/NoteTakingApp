import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { COLOR_DARK_GREEN, COLOR_EQUA_GREEN, COLOR_LITE_GREEN, COLOR_WHITE } from '../../../res/drawable'
import AsyncStorage from '@react-native-async-storage/async-storage'
import App from "../../../api/firebase"
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const CreateNote = (props) => {
    const db = getFirestore(App)
    const auth = getAuth()
    const [progress, setProgress] = useState()
    const { email, title: noteTitle, description: noteDescription } = props.route.params
    const [title, setTitle] = useState(noteTitle)
    const [description, setDescription] = useState(noteDescription)


    useEffect(() => {
        // loadUserData()
    }, [])

    // const loadUserData = async () => {
    //     if (noteTitle) {
    //         let description = await AsyncStorage.getItem(noteTitle)
    //         setTitle(noteTitle)
    //         setDescription(description)
    //         console.log(noteTitle)
    //         console.log(description)
    //     }
    // }


    const onPress = async () => {
        if (title != '' && description != '') {

            try {
                let docRef = await setDoc(doc(db, email, title), {
                    title: title,
                    description: description,
                });

                // await setDoc(doc(db,"Notes",title),{
                //     title,
                //     description
                // })

                props.navigation.goBack()

            }
            catch (e) {
                alert("Data Error")
                console.log(e)
            }
        }
        else {
            alert("Title and Description are empty")
        }
    }

    return (
        <View style={styles.container}>

            <View style={{ ...styles.card, height: 60 }}>
                <TextInput
                    style={{ padding: 20, color: COLOR_DARK_GREEN }}
                    placeholder={'Enter the Title here'}
                    value={title}
                    editable={noteTitle ? false : true}
                    placeholderTextColor={COLOR_LITE_GREEN}
                    onChangeText={(t) => setTitle(t)}
                />

            </View>

            <View style={{ ...styles.card, height: "60%" }}>
                <TextInput
                    style={{ margin: 20, color: COLOR_DARK_GREEN }}
                    placeholder={'Enter Descriptin here'}
                    value={description}
                    placeholderTextColor={COLOR_LITE_GREEN}
                    multiline={true}
                    onChangeText={(t) => setDescription(t)}
                />

            </View>

            <TouchableOpacity
                style={styles.btn}
                onPress={() => onPress()}
            >
                <Text style={styles.textWrapper}>{noteTitle ? 'UpdateNote' : 'Add Note'}</Text>
            </TouchableOpacity>

        </View>


    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        padding: 10
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
        elevation: 3,

    },
    btn: {
        backgroundColor: COLOR_EQUA_GREEN,
        height: 50,
        borderRadius: 100,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        marginBottom: 25
    },
    textWrapper: {
        color: COLOR_DARK_GREEN,
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default CreateNote