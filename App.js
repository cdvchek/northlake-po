// Functional Imports
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import LS from './utils/localstorage';
import { getAccessToken } from './API/tokenApi';

// Component Imports
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import PageHandler from './components/PageHandler';
import Navbar from './components/Navbar';
import ErrorModal from './components/ErrorModal';

// App Component
export default function App() {

  	// DECLARING STATE
  	const [viewedPage, setViewedPage] = useState('login'); // Variable that determines which page is rendered
  	const [userInfo, setUserInfo] = useState(null); // Variable that holds the user information
	const [isModalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

  	// USE EFFECTS
  	// On load
  	useEffect(() => {
    	handleTokens()
  	},[])

  	// Handle Tokens Function
  	const handleTokens = async () => {
    	try {
      		const rtkn = await LS.getRToken();
      		if (rtkn !== "Go Login" && rtkn) {
        		const response = await getAccessToken(rtkn);
        		const atkn = response.data.accessToken;
        		await LS.storeAToken(atkn);

        		const userInfo = response.data.user;
        		setUserInfo(userInfo);
        		setViewedPage('my-expenses');
      		}
    	} catch (error) {
      		console.log(error); // For debugging
      		setModalMessage("Failed to authenticate. Please try logging in again.");
  			setModalVisible(true);
    	}
  	}

  	// REACT RENDERED COMPONENT
  	// If statements for handling conditional page rendering, reason for these if statements is that login and signup do not have the navbar
  	// Render Login
  	if (viewedPage === 'login') {
    	return (
			<>
				<Login setUserInfo={setUserInfo} setViewedPage={setViewedPage} />
				<ErrorModal visible={isModalVisible} message={modalMessage} onClose={() => setModalVisible(false)} />
			</>
    	)
  	// Render Signup
  	} else if (viewedPage === 'signup') {
    	return (
			<>
      			<Signup setUserInfo={setUserInfo} setViewedPage={setViewedPage} />
				<ErrorModal visible={isModalVisible} message={modalMessage} onClose={() => setModalVisible(false)} />
			</>
    	)
  	// Render Page Handler with Navbar
  	} else {
    	return (
      		<View style={styles.appContainer}>
        		<PageHandler userInfo={userInfo} viewedPage={viewedPage} setViewedPage={setViewedPage} />
        		<Navbar userInfo={userInfo} setViewedPage={setViewedPage} />
      		</View>
    	);
  	}
}

const styles = StyleSheet.create({
  	appContainer: {
    	flex: 1,
    	justifyContent: 'flex-end',
    	backgroundColor: '#fff',
  	},
  	pageContainer: {
    	paddingTop: 50,
  	}
});
