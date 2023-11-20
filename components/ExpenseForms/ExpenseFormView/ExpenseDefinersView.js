import { View } from "react-native";

import ExpenseNumbersView from "./ExpenseNumbersView";
import ExpenseNumberAmountView from "./ExpenseNumbersAmountView";

export default function ExpenseDefinersView({ expenseNumbers }) {

    return (
        <View>
            {
                expenseNumbers && expenseNumbers.map((expenseNumber, i) => {
                    return (
                        <View key={i}>
                            <ExpenseNumbersView expenseNumberIndex={i} selection={expenseNumber[0]} />
                            <ExpenseNumberAmountView expenseNumberIndex={i} amount={expenseNumber[1]} />
                        </View>
                    )
                })
            }
        </View>
    );
}