import { View, Text, Platform } from "react-native";
import { useState, useEffect } from "react";
import Select from "../../Select";
import { styles } from "./ExpenseFormStyles";

export default function ExpenseTypeInput({ expenseType, setExpenseType }) {
    const [selected, setSelected] = useState(expenseType);
    const [options, setOptions] = useState([
        {
            value: "Church Credit Card",
            label: "Church Credit Card"
        },
        {
            value: "Personal Reimbursement",
            label: "Personal Reimbursement"
        },{
            value: "Invoice",
            label: "Invoice"
        }
    ])

    useEffect(() => {
        setExpenseType(selected);
    }, [selected]);

    useEffect(() => {
        setSelected(expenseType);
    }, [expenseType]);

    return (
        <View>
            <Text style={styles.modalSubTitle}>Expense Type</Text>
            <View style={styles.modalInputView}>
                <Select os={Platform.OS} options={options} selected={selected} setSelected={setSelected}/>
            </View>
        </View>
    );
}