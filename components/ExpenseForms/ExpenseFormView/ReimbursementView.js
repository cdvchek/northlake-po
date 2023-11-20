import { View, Text } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function ReimbursementView({ reimbursement }) {

    return (
        <View>
            <Text style={styles.modalSubTitle}>Reimbursement</Text>
            {
                reimbursement ?
                <Text style={styles.modalViewText}>Yes, being reimbursed.</Text>
                :
                <Text style={styles.modalViewText}>No, not being reimbursed.</Text>
            }
        </View>
    );
}