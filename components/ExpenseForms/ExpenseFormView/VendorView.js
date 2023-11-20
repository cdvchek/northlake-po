import { View, Text } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function VendorView({ vendor }) {
    return (
        <View>
            <Text style={styles.modalSubTitle}>Vendor</Text>
            <Text style={styles.modalViewText}>{vendor}</Text>
        </View>
    );
}