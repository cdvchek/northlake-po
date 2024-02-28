import { View, Pressable } from "react-native";
import { useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from "./ExpenseFormStyles";

import ExpenseNumberInput from "./ExpenseNumberInput";
import ExpenseNumberAmountInput from "./ExpenseNumberAmountInput";
import BusinessPurposeInput from "./BusinessPurposeInput";

export default function ExpenseDefiners({ expenseNumbers, setExpenseNumbers, amountErr, bpErr }) {

    useEffect(() => {
        console.log(expenseNumbers);
    }, [expenseNumbers])

    const addNewExpenseNumber = () => {
        const newExpenseNumbers = [...expenseNumbers, ["Option 1", "0", ""]];
        setExpenseNumbers(newExpenseNumbers);
    }

    const removeExpenseNumber = (indexToBeRemoved) => {
        const newExpenseNumbers = [...expenseNumbers];
        newExpenseNumbers.splice(indexToBeRemoved, 1);
        setExpenseNumbers(newExpenseNumbers);
    }

    return (
        <View>
            {
                expenseNumbers && expenseNumbers.map((expenseNumber, i) => {
                    return (
                        <View key={i}>
                            <ExpenseNumberInput expenseNumberIndex={i} expenseNumbers={expenseNumbers} setExpenseNumbers={setExpenseNumbers} />
                            <BusinessPurposeInput expenseNumberIndex={i} expenseNumbers={expenseNumbers} setExpenseNumbers={setExpenseNumbers} />
                            {
                                expenseNumbers.length > 1 &&
                                <ExpenseNumberAmountInput expenseNumberIndex={i} expenseNumbers={expenseNumbers} setExpenseNumbers={setExpenseNumbers} />
                            }
                            {
                                expenseNumbers.length > 1 &&
                                <Pressable onPress={() => removeExpenseNumber(i)} style={styles.removeExpenseNumber}>
                                    <Ionicons name="remove-circle-outline" size={20} color="red" />
                                </Pressable>
                            }
                        </View>
                    )
                })
            }
            <Pressable onPress={addNewExpenseNumber} style={styles.addExpenseNumber} >
                <Ionicons name="add-circle-outline" size={30} />
            </Pressable>
        </View>
    );
}