import { StyleSheet, View, Text, Button } from "react-native";
import { logout } from "../../API/tokenApi";
import LS from "../../utils/localstorage";

export default function Options(props) {
  const { setViewedPage } = props; 
  const logoutUser = async () => {
    const rtkn = await LS.getRToken();
    await logout(rtkn);

    await LS.storeAToken("");
    await LS.storeRToken("");

    setViewedPage('login');
  }

  return (
    <View style={styles.appContainer}>
        <Text>Options</Text>
        <Button title="Log Out" onPress={() => logoutUser()} />
    </View>
  );
}

const styles = StyleSheet.create({
  
});