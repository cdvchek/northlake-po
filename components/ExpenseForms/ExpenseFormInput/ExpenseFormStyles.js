import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalSubTitleView: {
        flexDirection: "row",
    },
    modalSubTitle: {
        marginVertical: 6,
    },
    requiredMsg: {
        marginVertical: 6,
        color: "red",
    },
    modalInput: {
        height: '100%',
        fontSize: 16,
        marginLeft: 5
    },
    modalInputView: {
        borderColor: 'grey',
        borderWidth: 1.5,
        borderRadius: 5,
        height: 35,
        paddingHorizontal: 8,
        marginBottom: 8,
        justifyContent: "center",
    },
    modalInputViewMultiLine: {
        borderColor: 'grey',
        borderWidth: 1.5,
        borderRadius: 5,
        height: 100,
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    modalInputViewDatePickerIOS: {
        height: 45,
        marginBottom: 8,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    checkBoxView: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    checkBoxText: {
        marginLeft: 8,
    },
    amountDollarSign: {
        position: 'absolute',
        left: 3,
        fontSize: 15,
    },
    removeExpenseNumber: {
        position: 'absolute',
        top: 3.45,
        right: 0,
    },
    addExpenseNumber: {
        alignItems: 'center',
    }
})