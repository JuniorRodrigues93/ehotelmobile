import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../assets/logo2.png')}
                    style={{ width: '100%' }}
                    resizeMode="contain"
                />
            </View>

            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.Title}>Gestão Hoteleira Simplificada!</Text>
                <Text style={styles.text}>Faça o Login para iniciar.</Text>

                <TouchableOpacity onPress={() => navigation.navigate('Signin')} style={styles.button}>
                    <Text style={styles.textButton}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>

        </View>
    )
}
