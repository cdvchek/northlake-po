import { View, Text, TextInput } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function AddressInput({ address, setAddress, error }) {

    const onChange = (value) => {
        setAddress(value)
    }

    return (
        <View>
            <View style={styles.modalSubTitleView}>
                
                <Text style={styles.modalSubTitle}>Address</Text>
                {
                    error &&
                    <Text style={styles.requiredMsg}> - Required</Text>
                }
            </View>
            <View style={styles.modalInputView}>
                <TextInput defaultValue={address} value={address} style={styles.modalInput} onChangeText={(value) => onChange(value)} />
            </View>
        </View>
    );
}