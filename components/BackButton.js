import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Navbar Component
export default function BackButton({ onPress, style }) {

    return (
        <Pressable style={style} onPress={() => onPress()}>
            <Ionicons name="arrow-back-circle-outline" size={30} />
        </Pressable>
    );
}