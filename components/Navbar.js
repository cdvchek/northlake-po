import { StyleSheet, View, Pressable, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Navbar Component
export default function Navbar({ userInfo, setViewedPage }) {

    // REACT RENDERED COMPONENT

    return (

        // View wraps component
        <View style={styles.navbarContainer}>

            {/* My Expenses Page */}
            <Pressable onPress={() => setViewedPage('my-expenses')} style={styles.navbarItem}>
                <Ionicons name="file-tray-full-outline" size={32} />
            </Pressable>

            {/* If user is admin, render the button to go to the admin page */}
            {
                userInfo.isAdmin &&
                <Pressable onPress={() => setViewedPage('manage')} style={styles.navbarItem}>
                    <Ionicons name='analytics-outline' size={32} />
                </Pressable>
            }

            {/* Options Page */}
            <Pressable onPress={() => setViewedPage('options')} style={styles.navbarItem}>
                <Ionicons name='options-outline' size={32} />
            </Pressable>
            
        </View>
    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        ...Platform.select({
            ios: {
                height: 80,
            },
            android: {
                height: 65,
            },
            default: {
                height: 80,
            },
        }),
        flexDirection: 'row',
        backgroundColor: '#dddddd'
    },
    navbarItem: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 15
    },
});