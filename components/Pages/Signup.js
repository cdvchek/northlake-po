import { StyleSheet, View, Text, Button, TextInput, Pressable, Keyboard } from "react-native";
import { useState } from "react";
import CheckBox from "expo-checkbox";
// import API from "../../API/api";
import { signup, login } from "../../API/userApi";
import LS from "../../utils/localstorage";



// Signup Component
export default function Signup({ setViewedPage, setUserInfo }) {

    // DECLARING STATE

    const [fName, setFName] = useState(''); // First name input value
    const [lName, setLName] = useState(''); // Last name input value
    const [email, setEmail] = useState(''); // Email input value
    const [password, setPassword] = useState(''); // Password input value
    const [isAdmin, setIsAdmin] = useState(false); // Admin checkbox value
    const [adminPassword, setAdminPassword] = useState(''); // Database access key input value
    const [errorMessage, setErrorMessage] = useState(''); // Login error message text value



    // SIGNUP FUNCTION

    // Function runs on press of signup button
    const signupUser = async () => {
        try {

            // Wrapping/preparing data
            const userData = { 
                first_name: fName,
                last_name: lName,
                email: email,
                password: password,
                isAdmin: isAdmin,
                db_access_key: adminPassword,
            }
    
            // Sending prepared data to server for user signup
            const signupResponse = await signup(userData);

            console.log(signupResponse);

            // After signup, log the new user in
            const loginResponse = await login({ email: email, password: password });

            console.log(loginResponse);

            // Declaring tokens
            const atkn = loginResponse.data.accessToken;
            const rtkn = loginResponse.data.refreshToken;

            // Storing tokens on client device
            await LS.storeAToken(atkn.toString());
            await LS.storeRToken(rtkn.toString());

            // After login, set user data for react
            setUserInfo(loginResponse.data.user);

            // Once ready, set the viewed page to "my-expenses"
            setViewedPage("my-expenses");
    
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    }



    // REACT RENDERED COMPONENT

    return (

        // Wrapped by a pressable to dismiss keyboard by tapping away
        <Pressable style={styles.appContainer} onPress={() => Keyboard.dismiss()}>

            {/* TITLE */}
            <Text style={styles.title}>Signup</Text>

            {/* First name input */}
            <View>
                <Text>First Name</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.input} value={fName} onChangeText={(value) => setFName(value)} />
                </View>
            </View>

            {/* Last name input */}
            <View>
                <Text>Last Name</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.input} value={lName} onChangeText={(value) => setLName(value)} />
                </View>
            </View>

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

            {/* Admin checkbox */}
            <View style={styles.checkbox}>
                <CheckBox value={isAdmin} onValueChange={() => setIsAdmin(!isAdmin)} />
                <Text style={styles.checkboxText}>Admin</Text>
            </View>

            {/* If admin checkbox is checked, render a new input for inputting the database access key */}
            { isAdmin && (

                // Database access key input (admin password)
                <View>
                    <Text>Admin Password</Text>
                    <View style={styles.inputView}>
                        <TextInput style={styles.input} secureTextEntry={true} value={adminPassword} onChangeText={(value) => setAdminPassword(value)} />
                    </View>
                </View>
            )}

            {/* Error message text */}
            <Text style={styles.errorMessage}>{errorMessage}</Text>

            {/* Signup button */}
            <Button title="Signup" onPress={signupUser} />

            {/* Button that sends user back to login page */}
            <Pressable style={styles.loginPress} onPress={() => setViewedPage('login')}>
                <Text style={styles.loginText}>Back to Login</Text>
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
        marginTop: 10
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
    checkbox: {
        flexDirection: "row",
        marginBottom: 8,
    },
    checkboxText: {
        flex: 1,
        paddingLeft: 8,
    },
    errorMessage: {
        marginVertical: 10,
        color: "red",
        textAlign: "center",
    },
    loginPress: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
    },
    loginText: {
        textAlign: 'center',
    }
});