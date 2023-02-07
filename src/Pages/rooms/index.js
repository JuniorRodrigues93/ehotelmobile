import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import styles from './style';
import * as Animatable from 'react-native-animatable';

export default function Room() {
    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>


        </Pressable>
    )
}