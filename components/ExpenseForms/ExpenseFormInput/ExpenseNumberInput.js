import { View, Text, Platform } from "react-native";
import { useState, useEffect } from "react";
import Select from "../../Select";
import { styles } from "./ExpenseFormStyles";

export default function ExpenseNumberInput({ expenseNumberIndex, expenseNumbers, setExpenseNumbers }) {
    const [selected, setSelected] = useState(expenseNumbers[expenseNumberIndex][0]);
    const [options, setOptions] = useState([
        {
            value: "Option 1",
            label: "Option 1"
        },
        {
            value: "Option 2",
            label: "Option 2"
        },{
            value: "Option 3",
            label: "Option 3"
        },{
            value: "Option 4",
            label: "Option 4"
        },
    ])

    useEffect(() => {
        const newExpenseNumbers = [...expenseNumbers];
        newExpenseNumbers[expenseNumberIndex][0] = selected;
        setExpenseNumbers(newExpenseNumbers);
    }, [selected]);

    useEffect(() => {
        setSelected(expenseNumbers[expenseNumberIndex][0]);
    }, [expenseNumbers]);

    return (
        <View>
            <Text style={styles.modalSubTitle}>Expense Number (#{expenseNumberIndex + 1})</Text>
            <View style={styles.modalInputView}>
                <Select os={Platform.OS} options={options} selected={selected} setSelected={setSelected}/>
            </View>
        </View>
    );
}