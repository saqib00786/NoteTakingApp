import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground, FlatList, RefreshControl ,ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ADD_BTN_IMG, BACKGROUND_COLOR, BACKGROUND_IMG, COLOR_DARK_GREEN, COLOR_EQUA_GREEN, COLOR_GREEN, COLOR_LITE_GREEN, DELETE_ICON } from '../../../res/drawable'
import ImageBtn from '../../components/ImageBtn'
import { useEffect, useState } from 'react'

const Main = (props) => {
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
        loadAllNotes()
    }, [])

    const loadAllNotes = async () => {
        try {
            let Keys = await AsyncStorage.getAllKeys()
            //const items = JSON.parse(await AsyncStorage.multiGet(Keys))
            const items = await AsyncStorage.multiGet(Keys)
            setData(items)
            setRefreshing(false)
        } catch (e) {
            console.log(e)
        }
    }


    const onRemoveItem = async (title) => {
        try {
            await AsyncStorage.removeItem(title)
        } catch (e) {
            console.log(e)
        }
    }




    return (
        <View style={[styles.container]}>
            {refreshing ? <ActivityIndicator /> : null}
            <FlatList
                style={styles.flatListContainer}
                numColumns={3}
                data={data}
                renderItem={({ item }) => {
                    var title = item[0]
                    var description = item[1]
                    return (

                        <TouchableOpacity style={styles.noteCard}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleWrapper}>{title}</Text>
                            </View>

                            <Text numberOfLines={6} style={styles.descriptionContainer}> {description}</Text>

                            <TouchableOpacity
                                onPress={() => onRemoveItem(title)}
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
                        onRefresh={loadAllNotes}

                    />
                }
            />

            <View style={styles.AddBtnContainer}>
                <ImageBtn
                    source={ADD_BTN_IMG}
                    onPress={() => props.navigation.navigate('CreateNote')}
                />
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8
    },
    flatListContainer: {
        flex: 1,
        width: '100%'
    },
    AddBtnContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: 25,
        marginBottom: 25,
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
        backgroundColor: COLOR_EQUA_GREEN
    },
    titleWrapper: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLOR_DARK_GREEN,
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