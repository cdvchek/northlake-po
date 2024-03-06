import { StyleSheet, Pressable, View, Text, Button, Keyboard, ScrollView, Image } from "react-native";
import { useState, useEffect } from "react";
import { getExpense, getImageUrl, editExpensePhoto, editExpense } from "../../API/expenseApi.js";

import BackButton from "../BackButton.js";
import ExpenseTypeInput from "./ExpenseFormInput/ExpenseTypeInput.js";
import NotMyCardCheckBoxInput from "./ExpenseFormInput/NotMyCardInput.js";
import CreditCardInput from "./ExpenseFormInput/CreditCardInput.js";
import VendorInput from "./ExpenseFormInput/VendorInput.js";
import AddressInput from "./ExpenseFormInput/AddressInput.js";
import AmountInput from "./ExpenseFormInput/AmountInput.js";
import ExpenseDefiners from "./ExpenseFormInput/ExpenseDefiners.js";
import DateInput from "./ExpenseFormInput/DateInput.js";
import RecieptPhotoInput from "./ExpenseFormInput/RecieptPhotoInput.js";
import CameraComp from "../CameraComp.js";

export default function ExpenseFormEdit({ id, modalVisible, setModalVisible, createdExpense, setCreatedExpense }) {

    const [expenseType, setExpenseType] = useState("Church Credit Card");
    const [notMyCard, setNotMyCard] = useState(false);
    const [creditCardHolder, setCreditCardHolder] = useState("");
    const [creditCardHolderErr, setCreditCardHolderErr] = useState(false);
    const [vendor, setVendor] = useState();
    const [vendorErr, setVendorErr] = useState(false);
    const [address, setAddress] = useState();
    const [addressErr, setAddressErr] = useState(false);
    const [amount, setAmount] = useState();
    const [amountErr, setAmountErr] = useState(false);
    const [expenseNumbers, setExpenseNumbers] = useState();
    const [expenseAmountErr, setExpenseAmountErr] = useState(null);
    const [expenseBPErr, setExpenseBPErr] = useState(null);
    // Values for expenseNumbersErr:
    // (-1): Expense Numbers Amounts do not add up to Amount
    // (null): Nothing wrong
    // (>0): Expense Number Amount Input not filled in (the value of the error is the index that is missing)
    const [date, setDate] = useState(() => new Date());
    const [cameraOpen, setCameraOpen] = useState(false);
    const [receiptPhoto, setReceiptPhoto] = useState();
    const [receiptPhotoErr, setReceiptPhotoErr] = useState(false);
    const [viewPicture, setViewPicture] = useState(false);

    // When component loads, fill out expense form
    useEffect(() => {
        onLoad();
    },[]);

    // When the modal opens, get a new url for the photo
    useEffect(() => {
        if (modalVisible) {
            loadImageUrl();
        }
    }, [modalVisible]);

    // Filling out the expense form
    const onLoad = async () => {
        const expenseData = (await getExpense(id)).data;
        setExpenseType(expenseData.expense_type);
        setCreditCardHolder(expenseData.credit_card_holder);
        setVendor(expenseData.vendor);
        setAddress(expenseData.address);
        setAmount(expenseData.amount);
        setDate(new Date(expenseData.date_expense));
        
        const expenseNumbersRaw = [...expenseData.ExpenseDefiners];
        const pulledExpenseNumbers = expenseNumbersRaw.map((expenseNumber) => [expenseNumber.expense_number, expenseNumber.amount, expenseNumber.business_purpose]);

        setExpenseNumbers(pulledExpenseNumbers);
    }

    // Getting a new valid url for the reciept photo
    const loadImageUrl = async () => {
        const imageUrl = (await getImageUrl(id)).data;
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
            if (receiptPhoto.uri) {
                const name = `${Date.now()}`;
    
                const formData = new FormData();
    
                formData.append('expenseType', expenseType);
                formData.append('credit_card_holder', (expenseType === 'Church Credit Card' ? ((notMyCard) ? creditCardHolder : "self") : ''));
                formData.append('image', { uri: receiptPhoto.uri, type: receiptPhoto.type, name: name });
                formData.append('vendor', vendor);
                formData.append('address', address);
                formData.append('amount', amount);
                formData.append('date_expense', date.toISOString());
                formData.append('number_of_expense_numbers', expenseNumbers.length);
    
                for (let i = 0; i < expenseNumbers.length; i++) {
                    const expenseNumber = expenseNumbers[i][0];
                    const expenseNumberAmount = expenseNumbers[i][1];
                    const businessPurpose = expenseNumbers[i][2];
    
                    formData.append(`expense_number_${i}`, expenseNumber);
                    formData.append(`expense_number_amount_${i}`, expenseNumberAmount);
                    formData.append(`business_purpose_${i}`, businessPurpose);
                }
    
                const response = await editExpensePhoto(formData, id);
    
                if (response.status === 200) {
                    setModalVisible(false);
                    setCreatedExpense(!createdExpense);
                } else {
                    // show that the creation was bad and something happened
                }
            // No new photo, just edit the form values
            } else {
                const expenseData = {
                    expenseType,
                    credit_card_holder: (expenseType === 'Church Credit Card' ? ((notMyCard) ? creditCardHolder : "self") : ''),
                    vendor,
                    address,
                    amount,
                    expenseNumbers,
                    date,
                }
                
                const response = await editExpense(expenseData, id);
    
                if (response.status === 200) {
                    setModalVisible(false);
                    setCreatedExpense(!createdExpense);
                } else {
                    // say something bad happened and discard changes
                }
            }
        }
    }

    // Function that checks the validity of the forms inputs and handles error messages if they aren't valid
    const checkInputs = () => {
        let vendorCheck = true;
        let creditCardHolderCheck = true;
        let amountCheck = true;
        let addressCheck = true;
        let expenseNumbersCheck = true;
        let businessPurposesCheck = true;
        let receiptPhotoCheck = true;

        // Checking Vendor
        if (!vendor) {
            vendorCheck = false;
            setVendorErr(true);
        } else setVendorErr(false);

        // Checking Credit Card Holder
        if (expenseType === "Credit Card Holder") {
            if (notMyCard) {
                if (!creditCardHolder) {
                    creditCardHolderCheck = false;
                    setCreditCardHolderErr(true);
                } else setCreditCardHolderErr(false);
            }
        }

        // Checking Address
        if (expenseType === "Personal Reimbursement") {
            if (!address) {
                addressCheck = false;
                setAddressErr(true);
            } else setAddressErr(false);
        }

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
                setExpenseAmountErr(i);
            } else expenseNumbersSum += Number(expenseNumber[1]);

            if (!expenseNumber[2]) {
                businessPurposesCheck = false;
                setExpenseBPErr(i);
            }
        }

        const sumRounded = Math.round(expenseNumbersSum * 100) / 100;

        // Make sure everything adds up
        if (amount != sumRounded) {
            expenseNumbersCheck = false;
            setExpenseAmountErr(-1);
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
        if (vendorCheck && creditCardHolderCheck && addressCheck && amountCheck && expenseNumbersCheck && businessPurposesCheck && receiptPhotoCheck) {
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
                    <ExpenseTypeInput expenseType={expenseType} setExpenseType={setExpenseType} />
                    { expenseType === "Church Credit Card" && <NotMyCardCheckBoxInput notMyCard={notMyCard} setNotMyCard={setNotMyCard} />}
                    { expenseType === "Church Credit Card" && notMyCard && <CreditCardInput creditCardHolder={creditCardHolder} setCreditCardHolder={setCreditCardHolder} error={creditCardHolderErr} />}
                    <VendorInput vendor={vendor} setVendor={setVendor} error={vendorErr} expenseType={expenseType} />
                    { expenseType === "Personal Reimbursement" && <AddressInput address={address} setAddress={setAddress} error={addressErr} />}
                    <AmountInput amount={amount} setAmount={setAmount} error={amountErr} />
                    <ExpenseDefiners expenseNumbers={expenseNumbers} setExpenseNumbers={setExpenseNumbers} amountErr={expenseAmountErr} bpErr={expenseBPErr} />
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