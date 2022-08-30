import { TouchableOpacity, Image, StyleSheet } from 'react-native'

const ImageBtn = (props) => {

    return (
        <TouchableOpacity
            onPress={() => { props.onPress() }}
        >
            <Image
                style={styles.img}
                source={props.source}
            />
        </TouchableOpacity>

    )

}


const styles = StyleSheet.create({
    img: {
        width: 80,
        height: 80,
    }
})
export default ImageBtn