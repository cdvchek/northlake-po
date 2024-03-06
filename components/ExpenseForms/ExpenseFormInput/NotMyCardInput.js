import { View, Text } from "react-native";
import CheckBox from "expo-checkbox";
import { styles } from "./ExpenseFormStyles";

export default function NotMyCardCheckBoxInput({ notMyCard, setNotMyCard }) {

    const handleNotMyCard = () => {
        setNotMyCard(!notMyCard);
    }

    return (
        <View style={styles.checkBoxView}>
            <CheckBox value={notMyCard} onValueChange={() => handleNotMyCard()} />
            <Text style={styles.checkBoxText}>Not My Card.</Text>
        </View>
    );
}