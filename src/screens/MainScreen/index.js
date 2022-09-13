import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ADD_BTN_IMG, BACKGROUND_COLOR, BACKGROUND_IMG, COLOR_DARK_GREEN, COLOR_EQUA_GREEN, COLOR_GREEN, COLOR_LITE_GREEN, COLOR_WHITE, DELETE_ICON } from '../../../res/drawable'
import ImageBtn from '../../components/ImageBtn'
import { useEffect, useState } from 'react'
import App from '../../../api/firebase'
import AnimatedLottieView from 'lottie-react-native'
import { getFirestore, collection, getDocs, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";

const Main = (props) => {
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(true);
    const { email } = props.route.params
    const db = getFirestore(App)
    let Keys = []


   

    const LoadData = async () => {
        // const querySnapshot = await getDocs(collection(db, email));
        // querySnapshot.forEach((doc) => {
        //     console.log(doc.id)
        //     Keys.push(doc.data())
        // });
        // setData(Keys)
        // setRefreshing(false)
        const q = query(collection(db, email))
        try {
            // let Keys = []

            const subscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    Keys.push(doc.data());
                });
                setData(Keys)
                Keys = []
            });
        } catch (error) {
            console.log(error.message)
        }

        setRefreshing(false)
        setLoading(false)
        return () => subscribe
    }

    useEffect(() => {
        LoadData()
        onRemoveItem()
    }, [])

    const onRemoveItem = async (title) => {
        await deleteDoc(doc(db, email, title))
    }

    // const loadAllNotes = async () => {
    //     try {
    //         let Keys = await AsyncStorage.getAllKeys()
    //         //const items = JSON.parse(await AsyncStorage.multiGet(Keys))
    //         const items = await AsyncStorage.multiGet(Keys)
    //         setData(items)
    //         setRefreshing(false)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


    // const onRemoveItem = async (noteTitle) => {
    //     try {
    //         await AsyncStorage.removeItem(noteTitle)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }




    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.container]}>
                {refreshing ? <ActivityIndicator /> : null}
                <FlatList
                    style={styles.flatListContainer}
                    numColumns={3}
                    data={data}
                    renderItem={({ item }) => {
                        return (

                            <TouchableOpacity
                                onPress={() => { props.navigation.navigate('CreateNote', { title: item.title, description: item.description, email }) }}
                                style={styles.noteCard}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.titleWrapper}>{item.title}</Text>
                                </View>

                                <Text numberOfLines={6} style={styles.descriptionContainer}> {item.description}</Text>

                                <TouchableOpacity
                                    onPress={() => onRemoveItem(item.title)}
                                    style={styles.delBtnContainer}>
                                    <Image
                                        source={DELETE_ICON}
                                        style={{ width: 30, height: 30 }}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing}
                            onRefresh={LoadData}

                        />
                    }
                />

                <View style={styles.AddBtnContainer}>
                    <ImageBtn
                        source={ADD_BTN_IMG}
                        onPress={() => props.navigation.navigate('CreateNote', { title: null, description: null, email })}
                    />
                </View>
            </View>
            <View style={{ flex: .1, alignSelf: 'center' }}>

            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },
    flatListContainer: {
        flex: 1,
        width: '100%'
    },
    AddBtnContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: 12,
        marginBottom: 8,
    },
    noteCard: {
        backgroundColor: 'white',
        width: 110,
        height: 140,
        margin: 6,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
    },
    titleContainer: {
        height: 24,
        backgroundColor: COLOR_GREEN,
        borderTopLeftRadius: 8,
        borderTopEndRadius: 8
    },
    titleWrapper: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLOR_WHITE,
        padding: 4
    },
    descriptionContainer: {
        fontSize: 12,
        color: COLOR_DARK_GREEN,
        padding: 4
    },
    delBtnContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        margin: 2
    }
})
export default Main