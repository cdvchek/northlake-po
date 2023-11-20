import { StyleSheet, Pressable, Button, Text, Modal, View, Platform } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";


export default function Select({ options, selected, setSelected }) {    
    const [optionsState, setOptionsState] = useState(options);
    switch (Platform.OS) {
        case "ios":
            const [modalVisible, setModalVisible] = useState(false);

            const openPicker = () => {
                setModalVisible(true);
            }

            const closePicker = () => {
                setModalVisible(false);
            }

            const checkToClosePicker = (e) => {
                if(e.target["_children"].length > 0) {
                    closePicker();
                }
            }

            return (
                <>
                    <Pressable style={styles.identify} onPress={() => openPicker()}>
                        <Text>{selected}</Text>
                    </Pressable>
                    {modalVisible && 
                        <Modal animationType="fade" transparent={true} visible={modalVisible}>
                            <Pressable style={styles.iosPickerModal} onPress={(e) => checkToClosePicker(e)}>
                                <View style={styles.pickerContainer}>
                                    <Picker style={styles.picker} selectedValue={selected} onValueChange={(itemValue) => {
                                        setSelected(itemValue);
                                    }}>
                                        {optionsState.map((option, i) => {
                                            return <Picker.Item key={i} label={option.label} value={option.value} />
                                        })}
                                    </Picker>
                                    <View style={styles.pickerButton}>
                                        <Button title="Ok" onPress={() => closePicker()} />
                                    </View>
                                </View>
                            </Pressable>
                        </Modal>
                    }
                </>
            );
    
        case "android":
            return (
                <Picker selectedValue={selected} onValueChange={(itemValue) => setSelected(itemValue)}>
                    {optionsState.map((option, i) => {
                        return <Picker.Item key={i} label={option.label} value={option.value} />
                    })}
                </Picker>
            );
        
        default:
            return (
                <View>
                    <Text>Platform Operating System Not Supported</Text>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    iosPickerModal: {
        height: "100%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerContainer: {
        width: '90%',
        height: 320,
        paddingTop: 30,
        paddingHorizontal: 30,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'black',
        shadowRadius: 30,
        shadowOpacity: 0.6,
    },
    picker: {
        width: '100%',
        flex: 1,
        backgroundColor: 'white',
    },
    pickerButton: {
        marginTop: 15,
    },
});