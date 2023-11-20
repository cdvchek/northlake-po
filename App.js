// Functional Imports
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import LS from './utils/localstorage';
import API from './API/api';

// Component Imports
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import PageHandler from './components/PageHandler';
import Navbar from './components/Navbar';



// App Component
export default function App() {

  // DECLARING STATE

  const [viewedPage, setViewedPage] = useState('login'); // Variable that determines which page is rendered
  const [userInfo, setUserInfo] = useState(null); // Variable that holds the user information



  // USE EFFECTS

  // On load
  useEffect(() => {
    handleTokens()
  },[])

  // Handle Tokens Function
  const handleTokens = async () => {
    try {
      // Grabbing refresh token
      const rtkn = await LS.getRToken();
      
      // If the rtkn exists, get a new access token
      if (rtkn !== "Go Login" && rtkn) {
        const response = await API.getAccessToken(rtkn);
        const atkn = response.data.accessToken;
        await LS.storeAToken(atkn);

        const userInfo = response.data.user;
        setUserInfo(userInfo);

        setViewedPage('my-expenses');
      }
    } catch (error) {
      console.log(error);
    }
  }



  // REACT RENDERED COMPONENT

  // If statements for handling conditional page rendering, reason for these if statements is that login and signup do not have the navbar
  // Render Login
  if (viewedPage === 'login') {
    return (
      <Login setUserInfo={setUserInfo} setViewedPage={setViewedPage} />
    )

  // Render Signup
  } else if (viewedPage === 'signup') {
    return (
      <Signup setUserInfo={setUserInfo} setViewedPage={setViewedPage} />
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


// 2:55:19 in the video 