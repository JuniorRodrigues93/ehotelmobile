import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import styles from './style';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Signin() {
    const navigation = useNavigation();

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Bem-vindo (a)</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite um Email..."
                />

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Sua Senha..."
                />
                <TouchableOpacity onPress={() => navigation.navigate('Room')} style={styles.button}>
                    <Text style={styles.textButton}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se!</Text>
                </TouchableOpacity>
            </Animatable.View>
        </Pressable>
    )
}

{/* <TouchableOpacity onPress={() => navigation.navigate('Signin')} style={styles.button}>
                    <Text style={styles.textButton}>Acessar</Text>
                </TouchableOpacity> */}