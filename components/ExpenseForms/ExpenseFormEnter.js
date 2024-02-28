import { StyleSheet, Pressable, View, Text, Button, Keyboard, ScrollView, Image } from "react-native";
import { useState } from "react";
import { createExpense } from "../../API/expenseApi.js";

import BackButton from "../BackButton.js";
import VendorInput from "./ExpenseFormInput/VendorInput.js";
import AmountInput from "./ExpenseFormInput/AmountInput.js";
import ExpenseDefiners from "./ExpenseFormInput/ExpenseDefiners.js";
import DateInput from "./ExpenseFormInput/DateInput.js";
import RecieptPhotoInput from "./ExpenseFormInput/RecieptPhotoInput.js";
import CameraComp from "../CameraComp.js";
import ExpenseTypeInput from "./ExpenseFormInput/ExpenseTypeInput.js";

export default function ExpenseFormEnter({ setModalVisible, createdExpense, setCreatedExpense }) {

    const [expenseType, setExpenseType] = useState("Church Credit Card");
    const [vendor, setVendor] = useState();
    const [vendorErr, setVendorErr] = useState(false);
    const [amount, setAmount] = useState();
    const [amountErr, setAmountErr] = useState(false);
    const [expenseNumbers, setExpenseNumbers] = useState([['Option 1', null, ""]]);
    const [expenseAmountErr, setExpenseAmountErr] = useState(null);
    const [expenseBPErr, setExpenseBPErr] = useState(null);
    // Values for expenseNumbersErr:
    // (-1): Expense Numbers Amounts do not add up to Amount
    // (null): Nothing wrong
    // (>0): Expense Number Amount Input not filled in (the value of the error is the index that is missing)
    const [date, setDate] = useState(() => new Date());
    const [cameraOpen, setCameraOpen] = useState(false);
    const [receiptPhoto, setReceiptPhoto] = useState(null);
    const [receiptPhotoErr, setReceiptPhotoErr] = useState(false);
    const [viewPicture, setViewPicture] = useState(false);

    const sendExpense = async () => {
        const allowCreate = checkInputs();

        if (allowCreate) {
            const name = `${Date.now()}`;

            const formData = new FormData();

            formData.append('expenseType', expenseType);
            formData.append('image', { uri: receiptPhoto.uri, type: receiptPhoto.type, name: name });
            formData.append('vendor', vendor);
            formData.append('amount', amount);
            formData.append('date_expense', date.toISOString());
            formData.append('number_of_expense_numbers', expenseNumbers.length);

            for (let i = 0; i < expenseNumbers.length; i++) {
                const expenseNumber = expenseNumbers[i][0];
                // If there is only 1 expense number, the expense number amount is equal to the overall amount
                const expenseNumberAmount = (expenseNumbers.length > 1) ? expenseNumbers[i][1] : amount;
                const businessPurpose = expenseNumbers[i][2];

                formData.append(`expense_number_${i}`, expenseNumber);
                formData.append(`expense_number_amount_${i}`, expenseNumberAmount);
                formData.append(`business_purpose_${i}`, businessPurpose);
            }

            const response = await createExpense(formData);
            
            if (response.status === 200) {
                setModalVisible(false);
                setCreatedExpense(!createdExpense);
            } else {
                // show that the creation was bad and something happened
            }
        }
    }

    // Function that checks the validity of the forms inputs and handles error messages if they aren't valid
    const checkInputs = () => {
        let vendorCheck = true;
        let amountCheck = true;
        let expenseNumbersCheck = true;
        let businessPurposesCheck = true;
        let receiptPhotoCheck = true;

        // Checking Vendor
        if (!vendor) {
            vendorCheck = false;
            setVendorErr(true);
        } else setVendorErr(false);

        // Checking Amount
        if (!amount) {
            amountCheck = false;
            setAmountErr(true);
        } else setAmountErr(false);

        // If more than one expense number
        if (expenseNumbers.length > 1) {
            let expenseNumbersSum = 0;

            // Make sure inputs are all filled
            for (let i = 0; i < expenseNumbers.length; i++) {
                const expenseNumber = expenseNumbers[i];
                if (!expenseNumber[1]) {
                    expenseNumbersCheck = false;
                    setExpenseAmountErr(i);
                } else expenseNumbersSum += Number(expenseNumber[1]);

                if (!expenseNumber[2]) {
                    businessPurposesCheck = false;
                    setExpenseBPErr(i);
                }
            }

            // Make sure everything adds up
            if (amount != expenseNumbersSum) {
                expenseNumbersCheck = false;
                setExpenseAmountErr(-1);
            }
        }

        // Reset the amounterr value
        if (expenseAmountErr && expenseNumbersCheck) {
            setExpenseAmountErr(null);
        }

        // Reset the bperr value
        if (expenseBPErr && expenseNumbersCheck) {
            setExpenseBPErr(null);
        }

        // Check Receipt Photo
        if (!receiptPhoto) {
            receiptPhotoCheck = false;
            setReceiptPhotoErr(true);
        } else setReceiptPhotoErr(false);

        // If everything checks out, return true, else, return false
        if (vendorCheck && amountCheck && expenseNumbersCheck && businessPurposesCheck && receiptPhotoCheck) {
            return true;
        } else return false;
    }

    if (cameraOpen) {
        return (
            <CameraComp setCameraOpen={setCameraOpen} setReceiptPhoto={setReceiptPhoto} />
        );
    } else if (viewPicture) {
        return (
            <View style={styles.pictureView}>
                <BackButton onPress={() => setViewPicture(false)} />
                <View style={styles.image}>
                    <Image style={styles.image} resizeMode="contain" source={{uri: receiptPhoto.uri}}/>
                </View>
            </View>
        )
    } else {
        return (
            <ScrollView>
                <Pressable style={styles.view} onPress={() => Keyboard.dismiss()}>
                    <Text style={styles.formTitle}>Submit Expense</Text>
                    <BackButton onPress={() => setModalVisible(false)} />
                    <ExpenseTypeInput expenseType={expenseType} setExpenseType={setExpenseType} />
                    <VendorInput vendor={vendor} setVendor={setVendor} error={vendorErr} />
                    <AmountInput amount={amount} setAmount={setAmount} error={amountErr} />
                    <ExpenseDefiners expenseNumbers={expenseNumbers} setExpenseNumbers={setExpenseNumbers} amountErr={expenseAmountErr} bpErr={expenseBPErr} />
                    <DateInput date={date} setDate={setDate} />
                    <RecieptPhotoInput setViewPicture={setViewPicture} setCameraOpen={setCameraOpen} receiptPhoto={receiptPhoto} setReceiptPhoto={setReceiptPhoto} error={receiptPhotoErr} />
                    <Button title="Create Expense" onPress={sendExpense} />
                </Pressable>
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