import { View, Text } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function DateView({ date }) {

    return (
        <View>
            <Text style={styles.modalSubTitle}>Transaction Date</Text>
            <Text style={styles.modalViewText}>{date.toISOString().substring(0,10)}</Text>
        </View>
    );
}