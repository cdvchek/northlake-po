import { View, Text } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function AmountView({ amount }) {
    return (
        <View>
            <Text style={styles.modalSubTitle}>Amount</Text>
            <Text style={styles.modalViewText}>${amount}</Text>
        </View>
    );
}