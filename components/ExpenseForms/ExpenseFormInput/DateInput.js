import { View, Text, Platform } from "react-native";
import { styles } from "./ExpenseFormStyles";
import DateSelect from "../../DateSelect";

export default function DateInput({ date, setDate }) {

    return (
        <View>
            <Text style={styles.modalSubTitle}>Transaction Date</Text>
            <DateSelect os={Platform.OS} date={date} setDate={setDate} />
        </View>
    );
}