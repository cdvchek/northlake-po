import { View, Text, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./ExpenseFormStyles";

export default function BusinessPurposeInput({ expenseNumberIndex, expenseNumbers, setExpenseNumbers }) {
    const [businessPurpose, setBusinessPurpose] = useState(null);

    useEffect(() => {
        setBusinessPurpose(expenseNumbers[expenseNumberIndex][2]);
    }, [expenseNumbers]);

    const onChange = (value) => {
        setBusinessPurpose(value);
    }

    const onEndEditing = () => {
        const newExpenseNumbers = expenseNumbers;
        newExpenseNumbers[expenseNumberIndex][2] = businessPurpose;
        setExpenseNumbers(newExpenseNumbers);
        console.log(expenseNumbers);
    }

    return (
        <View>
            <View style={styles.modalSubTitleView}>
                <Text style={styles.modalSubTitle}>Business Purpose (#{expenseNumberIndex + 1})</Text>
                {/* {
                    error &&
                    <Text style={styles.requiredMsg}> - Required</Text>
                } */}
            </View>
            <View style={styles.modalInputViewMultiLine}>
                <TextInput style={styles.modalInput} defaultValue={businessPurpose} value={businessPurpose} multiline={true} onChangeText={(value) => onChange(value)} onEndEditing={() => onEndEditing()} />
            </View>
        </View>
    );
}