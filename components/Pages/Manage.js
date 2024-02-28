import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { getAllExpenses } from "../../API/expenseApi";

// import ExpenseModal from "../ExpenseModal";
import ExpenseCard from "../ExpenseCard";

export default function Manage({ userInfo }) {
    const [loadingExpenses, setLoadingExpenses] = useState(true);
    const [expenses, setExpenses] = useState(null);

    const getIDs = async () => {
        const response = await getAllExpenses();
        return response.data;
    }

    const setAllExpenses = async () => {
        const ids = await getIDs();
        setExpenses(ids);
        setLoadingExpenses(false);
    }

    useEffect(() => {
        setAllExpenses();
    }, []);


    return (
        <>
            <View style={styles.appContainer}>
                <View style={styles.header}>
                    <Pressable style={styles.headerFilter}>
                        <Text>VENDOR</Text>
                    </Pressable>
                    <Pressable style={styles.headerFilter}>
                        <Text>AMOUNT</Text>
                    </Pressable>
                    <Pressable style={styles.headerFilterRight}>
                        <Text>DATE</Text>
                    </Pressable>
                </View>
                <View style={styles.expenseCards}>
                {!loadingExpenses && (expenses.length > 0) && expenses.map((expense) => {
                    return (
                        <ExpenseCard key={expense} id={expense} isAdmin={true} />
                    );
                })}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 25,
        backgroundColor: '#eeeeee',
    },
    header: {
        flexDirection: "row",
        height: 50,
    },
    headerFilter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        borderRightColor: 'grey',
        borderRightWidth: 2,
        padding: 8
    },
    headerFilterRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        padding: 8
    },
    expenseCards: {
        flex: 1
    }
});