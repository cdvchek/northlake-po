import { View, Text, TextInput } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function BusinessPurposeInput({ businessPurpose, setBusinessPurpose, error }) {

    const onChange = (value) => {
        setBusinessPurpose(value);
    }

    return (
        <View>
            <View style={styles.modalSubTitleView}>
                <Text style={styles.modalSubTitle}>Business Purpose</Text>
                {
                    error &&
                    <Text style={styles.requiredMsg}> - Required</Text>
                }
            </View>
            <View style={styles.modalInputViewMultiLine}>
                <TextInput style={styles.modalInput} defaultValue={businessPurpose} value={businessPurpose} multiline={true} onChangeText={(value) => onChange(value)} />
            </View>
        </View>
    );
}