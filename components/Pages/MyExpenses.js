import { StyleSheet, View, Text, Button, Pressable, AppState } from "react-native";
import { useEffect, useState } from "react";

import ExpenseModal from "../ExpenseModal/ExpenseModal";
import ExpenseCard from "../ExpenseCard";
import LS from "../../utils/localstorage";
import { getMyExpenses } from "../../API/expenseApi";
import { checkAccessToken, getAccessToken } from "../../API/tokenApi";

export default function MyExpenses(props) {
    const { userInfo, setVeiwedPage } = props;

    const [modalVisible, setModalVisible] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [loadingExpenses, setLoadingExpenses] = useState(true);
    const [createdExpense, setCreatedExpense] = useState(false);
    const [aState, setAppState] = useState(AppState.currentState);

    const getIDs = async () => {
        const response = await getMyExpenses();
        return response.data;
    }

    const setUserExpenses = async () => {
        const ids = await getIDs();
        setExpenses(ids);
        setLoadingExpenses(false);
    }

    useEffect(() => {
        setUserExpenses();
        async function checkAToken() {
            const tokenCheckResponse = await checkAccessToken();
            if (tokenCheckResponse.status !== 200) {
                // Get a new access token
                const rtkn = await LS.getRToken();
                const response = await getAccessToken(rtkn);
                if (response.status = 200) {
                    const newATkn = response.data.accessToken;
                    await LS.storeAToken(newATkn);
                } else {
                    setVeiwedPage('login');
                }
            }
        }
        
        const appStateListener = AppState.addEventListener('change',
            nextAppState => {
                console.log('Next AppState is: ', nextAppState);
                if (nextAppState === 'active') {
                    checkAToken();
                }
                setAppState(nextAppState);
            }
        );
        return () => {
            appStateListener?.remove();
        };
    }, []);

    useEffect(() => {
        setUserExpenses();
    },[createdExpense])

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
                        <ExpenseCard key={expense} id={expense} createdExpense={createdExpense} setCreatedExpense={setCreatedExpense} />
                    );
                })}
                </View>
                <Button title="Create Expense" onPress={() => setModalVisible(true)}/>
            </View>
            <ExpenseModal modalVisible={modalVisible} setModalVisible={setModalVisible} createdExpense={createdExpense} setCreatedExpense={setCreatedExpense} formType="enter" />
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