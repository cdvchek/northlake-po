import { View, Text } from "react-native";
import CheckBox from "expo-checkbox";
import { styles } from "./ExpenseFormStyles";

export default function ReimbursementInput({ reimbursement, setReimbursement }) {

    const handleReimbursement = () => {
        setReimbursement(!reimbursement);
    }

    return (
        <View style={styles.checkBoxView}>
            <CheckBox value={reimbursement} onValueChange={() => handleReimbursement()} />
            <Text style={styles.checkBoxText}>I need to be reimbursed.</Text>
        </View>
    );
}