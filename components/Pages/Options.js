import { StyleSheet, View, Text, Button } from "react-native";
import API from "../../API/api";
import LS from "../../utils/localstorage";

export default function Options(props) {
  const { setViewedPage } = props; 
  const logout = async () => {
    const rtkn = await LS.getRToken();
    await API.logout(rtkn);

    await LS.storeAToken("");
    await LS.storeRToken("");

    setViewedPage('login');
  }

  return (
    <View style={styles.appContainer}>
        <Text>Options</Text>
        <Button title="Log Out" onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  
});