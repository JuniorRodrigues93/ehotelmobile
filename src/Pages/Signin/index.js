import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Pressable, Keyboard, Alert } from 'react-native';
import styles from './style';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



{/*Tela de Login do app*/ }
export default function Signin() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    //A próxima const define a ação de Login, puxando as informações da Api.
    const handerLogin = () => {
        axios.get(`http://192.168.50.53:44365/usuario/getuser?email=${username}&senha=${password}`)
            .then((res) => {
                //console.log(res.data[0]);
                if (res.data[0] != undefined) {
                    navigation.navigate('Room', { userLogado: res.data[0] })
                    //setUsername("")
                    setPassword("")
                } else {
                    Alert.alert('Login Inválido!');
                    //console.log('Login Inválido!');
                }
            });
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>
            {/*Animação do texto Bem-vindo*/}
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

                />

                {/* Campo para informar a senha. */}
                <Text style={styles.title}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Sua Senha..."
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry

                />
                <TouchableOpacity onPress={() => handerLogin()} style={styles.button}>
                    <Text style={styles.textButton}>Acessar</Text>
                </TouchableOpacity>

            </Animatable.View>
        </Pressable>
    )
}

