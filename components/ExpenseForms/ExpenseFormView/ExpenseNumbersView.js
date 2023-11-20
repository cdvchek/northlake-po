import { View, Text } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function ExpenseNumberView({ expenseNumberIndex, selection }) {

    return (
        <View>
            <Text style={styles.modalSubTitle}>Expense Number (#{expenseNumberIndex + 1})</Text>
            <Text style={styles.modalViewText}>{selection}</Text>
        </View>
    );
}