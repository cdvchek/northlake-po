import { View, Text, TextInput } from "react-native";
import { styles } from "./ExpenseFormStyles";
import { useState, useEffect } from "react";

export default function ExpenseNumberAmountInput({ expenseNumberIndex, expenseNumbers, setExpenseNumbers }) {
    const [amount, setAmount] = useState(null);

    useEffect(() => {
        setAmount(expenseNumbers[expenseNumberIndex][1]);
    }, [expenseNumbers]);

    const onChange = (value) => {
        setAmount(value);
    }

    const onEndEditing = () => {
        const newExpenseNumbers = expenseNumbers;
        newExpenseNumbers[expenseNumberIndex][1] = amount;
        setExpenseNumbers(newExpenseNumbers);
    }

    return (
        <View>
            <Text style={styles.modalSubTitle}>Expense Number Amount (#{expenseNumberIndex + 1})</Text>
            <View style={styles.modalInputView}>
                <Text style={styles.amountDollarSign}>$</Text>
                <TextInput style={styles.modalInput} defaultValue={amount} inputMode="decimal" keyboardType="decimal-pad" onChangeText={(value) => onChange(value)} onEndEditing={() => onEndEditing()} />
            </View>
        </View>
    );
}