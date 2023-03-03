import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';


{/*Botão Incial do app*/ }
export default function Welcome() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <View style={styles.containerLogo}>
                {/*Animação da imagem da tela inicial do app*/}
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../assets/Logo.png')}
                    style={{ width: '40%' }}
                    resizeMode="contain"
                />
            </View>

            {/*Animação do texto inferior da tela inicial do app*/}
            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.Title}>eHotel Mobile</Text>
                <Text style={styles.text}>Gestão Hoteleira Simplificada!</Text>

                {/*Botão Acessar*/}
                <TouchableOpacity onPress={() => navigation.navigate('Signin')} style={styles.button}>
                    <Text style={styles.textButton}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>

        </View>
    )
}
