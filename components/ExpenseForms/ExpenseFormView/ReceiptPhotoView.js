import { Text, Pressable, Image, StyleSheet, View } from "react-native";
import { styles } from "./ExpenseFormStyles";



// RecieptPhoto Component
export default function RecieptPhotoView({ setViewPicture, receiptPhoto }) {

    return (
        <View>
            <Text style={styles.modalSubTitle}>Receipt Photo</Text>
            <Pressable style={newStyles.receiptPhotoContainer} onPress={() => setViewPicture(true)}>
                <Image style={newStyles.imageView} resizeMode="contain" src={receiptPhoto}/>
            </Pressable>
        </View>
    );
}

const newStyles = StyleSheet.create({
    receiptPhotoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageView: {
        height: 180,
        width: 109,
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 10,
    }
});