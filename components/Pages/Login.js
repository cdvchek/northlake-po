import { StyleSheet, View, Text, Button, TextInput, Pressable, Keyboard } from "react-native";
import { useState } from "react";
import API from "../../API/api";



// Login Component
export default function Login({ setUserInfo, setViewedPage }) {



    // DELCARING STATE

    const [email, setEmail] = useState(''); // Email input value
    const [password, setPassword] = useState(''); // Password input value
    const [errorMessage, setErrorMessage] = useState(''); // Error message text value



    // LOGIN FUNCTION

    // Function runs on press of login butotn
    const login = async () => {
        try {

            // Wrapping/preparing data
            const userData = {
                email,
                password,
            }

            // Sending prepared data to server for user login
            const loginResponse = await API.login(userData);

            // After login, set the user data for react
            setUserInfo(loginResponse.data.user);

            // Declaring tokens
            const atkn = loginResponse.data.accessToken;
            const rtkn = loginResponse.data.refreshToken;

            // Storing tokens
            await LS.storeAToken(atkn);
            await LS.storeRToken(rtkn);

            // Once ready, send user to "my-expenses" (home) page
            setViewedPage('my-expenses');

        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    }



    // REACT RENDERED COMPONENT

    return (

        // Pressable wrapped for dismissing keyboard on press
        <Pressable style={styles.appContainer} onPress={() => Keyboard.dismiss()}>

            {/* Title */}
            <Text style={styles.title}>Northlake Expense Management</Text>

            {/* Email input */}
            <View>
                <Text>Email</Text>
                <View style={styles.inputView}>
                    <TextInput keyboardType="email-address" style={styles.input} value={email} onChangeText={(value) => setEmail(value)} />
                </View>
            </View>

            {/* Password input */}
            <View>
                <Text>Password</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={(value) => setPassword(value)} />
                </View>
            </View>

            {/* Error message text */}
            <Text style={styles.errorMessage}>{errorMessage}</Text>

            {/* Login button */}
            <Button title="Login" onPress={login} />

            {/* Go to signup page button */}
            <Pressable style={styles.signupPress} onPress={() => setViewedPage('signup')}>
                <Text style={styles.signupText}>Signup</Text>
            </Pressable>

        </Pressable>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 150,
        marginHorizontal: 15,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        height: '100%',
        fontSize: 16,
    },
    inputView: {
        borderColor: 'grey',
        borderWidth: 1.5,
        borderRadius: 5,
        height: 35,
        paddingHorizontal: 8,
        marginBottom: 8,
        justifyContent: "center",
    },
    errorMessage: {
        marginVertical: 10,
        color: "red",
        textAlign: "center",
    },
    signupPress: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
    },
    signupText: {
        textAlign: 'center',
    },
});