import { View, Text } from "react-native";
import { styles } from "./ExpenseFormStyles";

export default function AddressView({ address }) {
    return (
        <View>
            <Text style={styles.modalSubTitle}>Address</Text>
            <Text style={styles.modalViewText}>{address}</Text>
        </View>
    );
}