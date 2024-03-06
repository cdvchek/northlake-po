import { View, Text } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function ExpenseTypeView({ expenseType }) {

    return (
        <View>
            <Text style={styles.modalSubTitle}>Expense Type</Text>
            <Text style={styles.modalViewText}>{expenseType}</Text>
        </View>
    );
}