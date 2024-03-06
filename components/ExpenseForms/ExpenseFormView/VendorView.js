import { View, Text } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function VendorView({ vendor, expenseType }) {
    return (
        <View>
            <Text style={styles.modalSubTitle}>
                {expenseType !== "Personal Reimbursement" ? "Vendor" : "Payee"}
            </Text>
            <Text style={styles.modalViewText}>{vendor}</Text>
        </View>
    );
}