import { View, Text } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function ExpenseNumberAmountView({ expenseNumberIndex, amount }) {

    return (
        <View>
            <Text style={styles.modalSubTitle}>Expense Number Amount (#{expenseNumberIndex + 1})</Text>
            <Text style={styles.modalViewText}>{amount}</Text>
        </View>
    );
}