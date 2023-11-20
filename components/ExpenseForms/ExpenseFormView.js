import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { useState, useEffect } from "react";
import API from "../../API/api.js";
import LS from "../../utils/localstorage.js";

import BackButton from "../BackButton.js";
import VendorView from "./ExpenseFormView/VendorView.js";
import AmountView from "./ExpenseFormView/AmountView.js";
import ReimbursementView from "./ExpenseFormView/ReimbursementView.js";
import ExpenseDefinersView from "./ExpenseFormView/ExpenseDefinersView.js";
import BusinessPurposeView from "./ExpenseFormView/BusinessPurposeView.js";
import DateView from "./ExpenseFormView/DateView.js";
import RecieptPhotoView from "./ExpenseFormView/ReceiptPhotoView.js";

export default function ExpenseFormView({ id, modalVisible, setModalVisible }) {

    const [vendor, setVendor] = useState();
    const [amount, setAmount] = useState();
    const [reimbursement, setReimbursement] = useState();
    const [expenseNumbers, setExpenseNumbers] = useState();
    const [businessPurpose, setBusinessPurpose] = useState();
    const [date, setDate] = useState(() => new Date());
    const [receiptPhoto, setReceiptPhoto] = useState();
    const [viewPicture, setViewPicture] = useState(false);

    // When component loads, fill out expense form
    useEffect(() => {
        onLoad();
    },[])

    // When the modal opens, get a new url for the photo
    useEffect(() => {
        if (modalVisible) {
            getImageUrl();
        }
    }, [modalVisible]);

    // Filling out the expense form
    const onLoad = async () => {
        const aTkn = await LS.getAToken();
        const expenseData = (await API.getExpense(aTkn, id)).data;
        setVendor(expenseData.vendor);
        setAmount(expenseData.amount);
        setReimbursement(expenseData.reimbursement);
        setBusinessPurpose(expenseData.business_purpose);
        setDate(new Date(expenseData.date_expense));

        const expenseNumbersRaw = [...expenseData.ExpenseNumbers];
        const pulledExpenseNumbers = expenseNumbersRaw.map((expenseNumber) => [expenseNumber.expense_number, expenseNumber.amount]);

        setExpenseNumbers(pulledExpenseNumbers);
    }

    // Getting a new valid url for the reciept photo
    const getImageUrl = async () => {
        const aTkn = await LS.getAToken();
        const imageUrl = (await API.getImageUrl(aTkn, id)).data;
        setReceiptPhoto(imageUrl.url);
    }

    if (viewPicture) {
        return (
            <View style={styles.pictureView}>
                <BackButton onPress={() => setViewPicture(false)} />
                <View style={styles.image}>
                    <Image style={styles.image} resizeMode="contain" src={receiptPhoto}/>
                </View>
            </View>
        )
    } else {
        return (
            <ScrollView>
                <View style={styles.view}>
                    <Text style={styles.formTitle}>View Expense</Text>
                    <BackButton onPress={() => setModalVisible(false)} />
                    <VendorView vendor={vendor} />
                    <AmountView amount={amount} />
                    <ReimbursementView reimbursement={reimbursement} />
                    <ExpenseDefinersView expenseNumbers={expenseNumbers} />
                    <BusinessPurposeView businessPurpose={businessPurpose} />
                    <DateView date={date} />
                    <RecieptPhotoView setViewPicture={setViewPicture} receiptPhoto={receiptPhoto} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 400,
    },
    formTitle: {
        position: 'absolute',
        top: 63.9,
        left: 20,
        width: '100%',
        textAlign: 'center',
        fontSize: 20
    },
    pictureView: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    image: {
        flex: 1,
    }
});