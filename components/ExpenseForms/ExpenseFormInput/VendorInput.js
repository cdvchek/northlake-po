import { View, Text, TextInput } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function VendorInput({ vendor, setVendor, error, expenseType }) {

    const onChange = (value) => {
        setVendor(value)
    }

    return (
        <View>
            <View style={styles.modalSubTitleView}>
                
                <Text style={styles.modalSubTitle}>
                    { expenseType !== "Personal Reimbursement" ? "Vendor" : "Payee"}
                </Text>
                {
                    error &&
                    <Text style={styles.requiredMsg}> - Required</Text>
                }
            </View>
            <View style={styles.modalInputView}>
                <TextInput defaultValue={vendor} value={vendor} style={styles.modalInput} onChangeText={(value) => onChange(value)} />
            </View>
        </View>
    );
}