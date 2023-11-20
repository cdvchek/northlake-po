import { StyleSheet, Pressable, View, Text, Button, Keyboard, ScrollView, Image } from "react-native";
import { useState, useEffect } from "react";
import API from "../../API/api.js";
import LS from "../../utils/localstorage.js";

import BackButton from "../BackButton.js";
import VendorInput from "./ExpenseFormInput/VendorInput.js";
import AmountInput from "./ExpenseFormInput/AmountInput.js";
import ReimbursementInput from  "./ExpenseFormInput/ReimbursementInput.js";
import ExpenseDefiners from "./ExpenseFormInput/ExpenseDefiners.js";
import BusinessPurposeInput from "./ExpenseFormInput/BusinessPurposeInput.js";
import DateInput from "./ExpenseFormInput/DateInput.js";
import RecieptPhotoInput from "./ExpenseFormInput/RecieptPhotoInput.js";
import CameraComp from "../CameraComp.js";

export default function ExpenseFormEdit({ id, modalVisible, setModalVisible }) {

    const [vendor, setVendor] = useState();
    const [vendorErr, setVendorErr] = useState(false);
    const [amount, setAmount] = useState();
    const [amountErr, setAmountErr] = useState(false);
    const [reimbursement, setReimbursement] = useState();
    const [expenseNumbers, setExpenseNumbers] = useState();
    const [expenseNumbersErr, setExpenseNumbersErr] = useState(null);
    // Values for expenseNumbersErr:
    // (-1): Expense Numbers Amounts do not add up to Amount
    // (null): Nothing wrong
    // (>0): Expense Number Amount Input not filled in (the value of the error is the index that is missing)
    const [businessPurpose, setBusinessPurpose] = useState();
    const [businessPurposeErr, setBusinessPurposeErr] = useState(false);
    const [date, setDate] = useState(() => new Date());
    const [cameraOpen, setCameraOpen] = useState(false);
    const [receiptPhoto, setReceiptPhoto] = useState();
    const [receiptPhotoErr, setReceiptPhotoErr] = useState(false);
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

    const saveExpense = async () => {

        if (expenseNumbers.length == 1) {
            const fixExpenseNumberAmount = expenseNumbers;
            fixExpenseNumberAmount[0][1] = amount;
            setExpenseNumbers(fixExpenseNumberAmount);
        }

        const allowSave = checkInputs();

        if (allowSave) {
            // New photo (update everything)
            const aTkn = await LS.getAToken();

            if (receiptPhoto.uri) {
                const name = `${Date.now()}`;
    
                const formData = new FormData();
    
                formData.append('image', { uri: receiptPhoto.uri, type: receiptPhoto.type, name: name });
                formData.append('vendor', vendor);
                formData.append('amount', amount);
                formData.append('reimbursement', reimbursement);
                formData.append('business_purpose', businessPurpose);
                formData.append('date_expense', date.toISOString());
                formData.append('number_of_expense_numbers', expenseNumbers.length);
    
                for (let i = 0; i < expenseNumbers.length; i++) {
                    const expenseNumber = expenseNumbers[i][0];
                    const expenseNumberAmount = expenseNumbers[i][1];
    
                    formData.append(`expense_number_${i}`, expenseNumber);
                    formData.append(`expense_number_amount_${i}`, expenseNumberAmount);
                }
    
                const response = await API.editExpensePhoto(aTkn, formData, id);
    
                if (response.status === 200) {
                    setModalVisible(false);
                } else {
                    // show that the creation was bad and something happened
                }
            // No new photo, just edit the form values
            } else {
                const expenseData = {
                    vendor,
                    amount,
                    reimbursement,
                    expenseNumbers,
                    businessPurpose,
                    date,
                }
                
                const response = await API.editExpense(aTkn, expenseData, id);
    
                if (response.status === 200) {
                    setModalVisible(false);
                } else {
                    // say something bad happened and discard changes
                }
            }
        }
    }

    // Function that checks the validity of the forms inputs and handles error messages if they aren't valid
    const checkInputs = () => {
        let vendorCheck = true;
        let amountCheck = true;
        let expenseNumbersCheck = true;
        let businessPurposeCheck = true;
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

        let expenseNumbersSum = 0;

        // Make sure inputs are all filled
        for (let i = 0; i < expenseNumbers.length; i++) {
            const expenseNumber = expenseNumbers[i];
            if (!expenseNumber[1]) {
                expenseNumbersCheck = false;
                setExpenseNumbersErr(i);
            } else expenseNumbersSum += Number(expenseNumber[1]);
        }

        const sumRounded = Math.round(expenseNumbersSum * 100) / 100;

        // Make sure everything adds up
        if (amount != sumRounded) {
            expenseNumbersCheck = false;
            setExpenseNumbersErr(-1);
        }

        // Reset the error value
        if (expenseNumbersErr && expenseNumbersCheck) {
            setExpenseNumbersErr(null);
        }

        // Check Business Purpose
        if (!businessPurpose) {
            businessPurposeCheck = false;
            setBusinessPurposeErr(true);
        } else setBusinessPurposeErr(false);

        // Check Receipt Photo
        if (!receiptPhoto) {
            receiptPhotoCheck = false;
            setReceiptPhotoErr(true);
        } else setReceiptPhotoErr(false);

        // If everything checks out, return true, else, return false
        if (vendorCheck && amountCheck && expenseNumbersCheck && businessPurposeCheck && receiptPhotoCheck) {
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
                    {
                        receiptPhoto.uri ?
                        <Image style={styles.image} resizeMode="contain" source={{uri: receiptPhoto.uri}} />
                        :
                        <Image style={styles.image} resizeMode="contain" src={receiptPhoto} />
                    }
                </View>
            </View>
        )
    } else {
        return (
            <ScrollView>
                <Pressable style={styles.view} onPress={() => Keyboard.dismiss()}>
                    <Text style={styles.formTitle}>Edit Expense</Text>
                    <BackButton onPress={() => setModalVisible(false)} />
                    <VendorInput vendor={vendor} setVendor={setVendor} error={vendorErr} />
                    <AmountInput amount={amount} setAmount={setAmount} error={amountErr} />
                    <ReimbursementInput reimbursement={reimbursement} setReimbursement={setReimbursement} />
                    <ExpenseDefiners expenseNumbers={expenseNumbers} setExpenseNumbers={setExpenseNumbers} error={expenseNumbersErr} />
                    <BusinessPurposeInput businessPurpose={businessPurpose} setBusinessPurpose={setBusinessPurpose} error={businessPurposeErr} />
                    <DateInput date={date} setDate={setDate} />
                    <RecieptPhotoInput setViewPicture={setViewPicture} setCameraOpen={setCameraOpen} receiptPhoto={receiptPhoto} setReceiptPhoto={setReceiptPhoto} error={receiptPhotoErr} />
                    <Button title="Save Expense" onPress={saveExpense} />
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