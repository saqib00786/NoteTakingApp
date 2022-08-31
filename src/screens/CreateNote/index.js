import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { COLOR_DARK_GREEN, COLOR_EQUA_GREEN, COLOR_LITE_GREEN, COLOR_WHITE } from '../../../res/drawable'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreateNote = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    let {noteTitle} = props.route.params

    useEffect(() =>{
        loadUserData()
    },[])

    const loadUserData = async() =>{
        if(noteTitle){
            let description = await AsyncStorage.getItem(noteTitle)
            setTitle(noteTitle)
            setDescription(description)

            console.log(noteTitle)
            console.log(description)
        }
    }


    const onPress = async () => {
        if (title != '' && description != '') {
            try {
                let value = await AsyncStorage.getItem(title)
                if (value && !noteTitle) {
                    alert('Title already Exists')
                } else {
                    await AsyncStorage.setItem(title, description)
                    props.navigation.replace('Main')
                }
            }
            catch (e) {
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
                    value = {title}
                    placeholderTextColor={COLOR_LITE_GREEN}
                    onChangeText={(t) => setTitle(t)}
                />

            </View>

            <View style={{ ...styles.card, height: "60%" }}>
                <TextInput
                    style={{ margin: 20, color: COLOR_DARK_GREEN }}
                    placeholder={'Enter Descriptin here'}
                    value = {description}
                    placeholderTextColor={COLOR_LITE_GREEN}
                    multiline={true}
                    onChangeText={(t) => setDescription(t)}
                />

            </View>

            <TouchableOpacity
                style={styles.btn}
                onPress={() => onPress()}
            >
                <Text style={styles.textWrapper}>{noteTitle ? 'UpdateNote':'Add Note'}</Text>
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