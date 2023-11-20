import AsyncStorage from '@react-native-async-storage/async-storage';

const storeRToken = async (rtkn) => {
    try {
        await AsyncStorage.setItem('refresh-token', rtkn);
    } catch (err) {
        console.log(err);
    }
}

const storeAToken = async (atkn) => {
    try {
        await AsyncStorage.setItem('access-token', atkn);
    } catch (err) {
        console.log(err);
    }
}

const getRToken = async () => {
    try {
        const value = await AsyncStorage.getItem('refresh-token');
        if (value !== null) {
            return value;
        } else {
            return "Go Login";
        }
    } catch (err) {
        console.log(err);
    }
}

const getAToken = async () => {
    try {
        const value = await AsyncStorage.getItem('access-token');
        if (value !== null) {
            return value;
        } else {
            return "Go Login";
        }
    } catch (err) {
        console.log(err);
    }
}

export default LS = {
    storeRToken,
    storeAToken,
    getRToken,
    getAToken
}