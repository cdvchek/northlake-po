import { StyleSheet, Pressable, View, Text } from "react-native";
import { useEffect, useState } from "react";
import API from "../API/api";
import LS from "../utils/localstorage";
import ExpenseModal from "./ExpenseModal/ExpenseModal";

export default function ExpenseCard({ id }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [vendor, setVendor] = useState(null);
    const [amount, setAmount] = useState(null);
    const [approved, setApproved] = useState(null);
    const [shownDate, setShownDate] = useState(null);

    useEffect(() => {
        setExpenseData(id);
    },[])

    const setExpenseData = async (id) => {
        try {
            const atkn = await LS.getAToken()
            const expenseData = (await API.getExpense(atkn, id)).data;

            console.log(expenseData);

            const dateSubstring = expenseData.date_expense.substring(0,10);
            const dateArr = dateSubstring.split('-');

            const dateYear = dateArr[0];
            const dateMonth = dateArr[1];
            const dateDay = dateArr[2];

            setShownDate(`${dateMonth}/${dateDay}/${dateYear}`);
            
            setVendor(expenseData.vendor);
            setAmount(expenseData.amount);
            setApproved(expenseData.approved);

        } catch (error) {
            console.log(error);
        }
    }

    const openExpense = () => {
        setModalVisible(true);
    }

    return (
        <>
            <Pressable onPress={() => openExpense()} style={styles.expenseContainer}>
                <View style={styles.identifier}>
                    <Text>{vendor}</Text>
                </View>
                <View style={styles.identifier}>
                    <Text>${amount}</Text>
                </View>
                <View style={styles.identifier}>
                    <Text>{shownDate}</Text>
                </View>
            </Pressable>
            {
                (approved) ?
                <ExpenseModal expenseId={id} modalVisible={modalVisible} setModalVisible={setModalVisible} formType="view" />
                :
                <ExpenseModal expenseId={id} modalVisible={modalVisible} setModalVisible={setModalVisible} formType="edit" />
            }
        </>
    );
}

const styles = StyleSheet.create({
    expenseContainer: {
        height: 70,
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        alignItems: 'center',
    },
    identifier: {
        flex: 1,
        alignItems: 'center'
    }
});