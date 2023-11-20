import { View, Text, TextInput } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function AmountInput({ amount, setAmount, error }) {
  
    const onChange = (value) => {
        setAmount(value);
    }

    return (
        <View>
            <View style={styles.modalSubTitleView}>
                <Text style={styles.modalSubTitle}>Amount</Text>
                {
                    error &&
                    <Text style={styles.requiredMsg}> - Required</Text>
                }
            </View>
            <View style={styles.modalInputView}>
                <Text style={styles.amountDollarSign}>$</Text>
                <TextInput defaultValue={amount} style={styles.modalInput} inputMode="decimal" keyboardType="decimal-pad" onChangeText={(value) => onChange(value)} />
            </View>
        </View>
    );
}