import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Pressable, Keyboard, Alert } from 'react-native';
import styles from './style';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Signin() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handerLogin = () => {
        if (username === 'Suporte' && password === 'Suporte23') {
            navigation.navigate('Room')
        } else {
            Alert.alert('Login Inválido!');
            //Alert.alert(`${username.toString()}`);
        };
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Bem-vindo (a)</Text>
            </Animatable.View>

            {/* Campo para informar o usário. */}
            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Usuário</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Informe o usuário..."
                    value={username}
                    onChangeText={setUsername}
                // onChange={setUsername(this.value)}                    
                //onChange={(value) => setUsername(value)}
                />

                {/* Campo para informar a senha. */}
                <Text style={styles.title}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Sua Senha..."
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                //onChange={(value) => setPassword(value)}
                />
                <TouchableOpacity onPress={() => handerLogin()} style={styles.button}>
                    <Text style={styles.textButton}>Acessar</Text>
                </TouchableOpacity>

            </Animatable.View>
        </Pressable>
    )
}

