import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from "./ExpenseFormStyles";



// RecieptPhoto Component
export default function RecieptPhotoInput({ setViewPicture, setCameraOpen, receiptPhoto, setReceiptPhoto, error }) {

    // DECLARING STATE

    const [pictureDelete, setPictureDelete] = useState(false); // Variable that determines if the delete picture portion is rendered



    // REACT RENDERED COMPONENT
    return (

        // Wrapped in a fragment
        <>
            {/* Title */}
            <View style={styles.modalSubTitleView}>
                <Text style={styles.modalSubTitle}>Receipt Photo</Text>
                {
                    error &&
                    <Text style={styles.requiredMsg}> - Required</Text>
                }
            </View>

            {/* Content */}
            <View style={newStyles.pictureContainer} >

                {/* If receiptPhoto is true, show the taein photo and the delete button or the delete picture portion */}
                {/* If receiptPhoto is false, show the take picture (camera) button */}
                {
                    !receiptPhoto ?
                    <View style={newStyles.pictureButtons}>

                        {/* Take Picture Button to open camera */}
                        <Pressable onPress={() => setCameraOpen(true)}>
                            <Ionicons name="camera-outline" size={42} />
                        </Pressable>
                    </View>
                    :
                    // Content for showing the final picture or the delete picture portion
                    <View style={newStyles.pictures} >
                        {
                            !pictureDelete ?

                            // Show the final picture (photo already taken)
                            <Pressable style={newStyles.receiptPhotoContainer} onPress={() => setViewPicture(true)}>
                                
                                {/* Picture that was taken */}
                                {
                                    receiptPhoto.uri ?
                                        
                                    <Image style={newStyles.imageView} resizeMode="contain" source={{uri: receiptPhoto.uri}}/>
                                    :
                                    <Image style={newStyles.imageView} resizeMode="contain" src={receiptPhoto}/>
                                }

                                {/* Delete picture button */}
                                <Pressable onPress={() => setPictureDelete(true)}>
                                    <Ionicons name="trash-outline" size={35} color='red' />
                                </Pressable>

                            </Pressable>
                            :

                            // Show the delete picture portion
                            <View style={newStyles.pictureDelete}>

                                {/* Double prompt for user experience */}
                                <Text>Are you sure you want to delete this picture?</Text>

                                {/* Cancel and confirm buttons */}
                                <View style={newStyles.deleteButtons}>

                                    {/* Cancel button */}
                                    <Pressable onPress={() => setPictureDelete(false)}>
                                        <Ionicons name="close-circle-outline" size={30} color="black" />    
                                    </Pressable>

                                    {/* Confirm button */}
                                    <Pressable onPress={() => {
                                        setReceiptPhoto(null);
                                        setPictureDelete(false);
                                    }}>
                                        <Ionicons name="trash-outline" size={30} color="red" />    
                                    </Pressable> 

                                </View>
                            </View>
                        }
                    </View>
                }
            </View>
        </>
    );
}

const newStyles = StyleSheet.create({
    pictureContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    pictureButtons: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 22
    },
    pictureDelete: {
        paddingRight: 10,
    },
    deleteButtons: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly',
    },
    pictures: {
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        height: 200,
        width: 180,
        paddingLeft: 18,
        paddingRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    },
    pressableImageFull: {
        flex: 1,
    }
});