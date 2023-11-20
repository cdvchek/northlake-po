// I AM REMAKING THE EXPENSE MODAL TO BE MORE CONCISE BUT ALSO FUNCTIONAL
import { StyleSheet, Modal } from "react-native";

import ExpenseFormEnter from "../ExpenseForms/ExpenseFormEnter";
import ExpenseFormEdit from "../ExpenseForms/ExpenseFormEdit";
import ExpenseFormView from "../ExpenseForms/ExpenseFormView";

export default function ExpenseModal({ expenseId, modalVisible, setModalVisible, createdExpense, setCreatedExpense, formType }) {

    switch (formType) {
        case "enter":
            return (
                <Modal animationType="slide" transparent={false} visible={modalVisible} style={styles.modal}>
                    <ExpenseFormEnter setModalVisible={setModalVisible} createdExpense={createdExpense} setCreatedExpense={setCreatedExpense} />
                </Modal>
            )

        case "edit":
            return (
                <Modal animationType="slide" transparent={false} visible={modalVisible} style={styles.modal}>
                    <ExpenseFormEdit id={expenseId} modalVisible={modalVisible} setModalVisible={setModalVisible} />
                </Modal>
            )

        case "view":
            return (
                <Modal animationType="slide" transparent={false} visible={modalVisible} style={styles.modal}>
                    <ExpenseFormView id={expenseId} modalVisible={modalVisible} setModalVisible={setModalVisible} />
                </Modal>
            )
    
        default:
            return (
                <Modal animationType="slide" transparent={false} visible={modalVisible} style={styles.modal}>
                    <ExpenseFormEnter setModalVisible={setModalVisible} />
                </Modal>
            )
    }    
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
    }
});