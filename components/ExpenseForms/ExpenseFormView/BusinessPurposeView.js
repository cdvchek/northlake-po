import { View, Text } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function BusinessPurposeView({ businessPurpose }) {

    return (
        <View>
            <Text style={styles.modalSubTitle}>Business Purpose</Text>
            <Text style={styles.modalViewText}>{businessPurpose}</Text>
        </View>
    );
}