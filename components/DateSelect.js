import { View, Text, Pressable, Platform } from "react-native";
import { useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { styles } from "./ExpenseForms/ExpenseFormInput/ExpenseFormStyles";

export default function DateSelect({ date, setDate }) {
    const [os, setOs] = useState(Platform.OS);

    function onChange(event, date) {
        const { type } = event;

        if (type === 'set') {
            setDate(date);
            if (os === "android") {
                setAndroidDateString(getDateStringFromUTC(date.toUTCString()));
            }
        }
    }

    switch (os) {
        case "android": 
        const [androidDateString, setAndroidDateString] = useState('');

        useEffect(() => {
            setAndroidDateString(getDateStringFromUTC(date.toUTCString()));
        }, []);


        const getDateStringFromUTC = (UTCString) => {
            const shortDateString = UTCString.substring(5, 16);
            const dateArr = shortDateString.split(" ");
            
            const newDateString = `${dateArr[1]} ${dateArr[0]}, ${dateArr[2]}`;
            return newDateString;
        }

        const openDatePickerAndroid =() => {
            DateTimePickerAndroid.open({
                value: date,
                onChange,
                mode: 'date',
                is24Hour: true,
            });
        }

            return (
                <>
                    {(Platform.OS === "android") && 
                        <View style={styles.modalInputView}>
                                <Pressable style={styles.openDatePressable} onPress={() => openDatePickerAndroid()}><Text>{androidDateString}</Text></Pressable>
                        </View>
                    }
                </>
            )
    
        default:
            return (
                <>
                    {(Platform.OS === "ios") && 
                        <View style={styles.modalInputViewDatePickerIOS}>
                            <DateTimePicker value={date} onChange={onChange} />
                        </View>
                    }
                </>
            )
    }
}