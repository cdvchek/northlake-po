import { View, Text, TextInput } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function CreditCardInput({ creditCardHolder, setCreditCardHolder, error }) {

    const onChange = (value) => {
        setCreditCardHolder(value)
    }

    return (
        <View>
            <View style={styles.modalSubTitleView}>
                
                <Text style={styles.modalSubTitle}>Credit Card Holder</Text>
                {
                    error &&
                    <Text style={styles.requiredMsg}> - Required</Text>
                }
            </View>
            <View style={styles.modalInputView}>
                <TextInput defaultValue={creditCardHolder} value={creditCardHolder} style={styles.modalInput} onChangeText={(value) => onChange(value)} />
            </View>
        </View>
    );
}