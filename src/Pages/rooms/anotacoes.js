import React, { useState } from "react";
import { View, TextInput, Text, Modal, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet } from "react-native";

export default function IconAnotacao() {

    const [abrirAnotacao, setAbrirAnotacao] = useState(false)

    return (
        <View>
            <TouchableOpacity style={styles.buttonObs} onPress={() => setAbrirAnotacao(true)}>
                <Icon name="clipboard" size={30} color="white" />
            </TouchableOpacity>
            <Modal visible={abrirAnotacao}>
                <View>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        style={styles.campoObs}
                        placeholder={'Digite aqui a sua observação!'}

                    />
                    <Button
                        title="Enviar" onPress={() => setAbrirAnotacao(false)}
                        marginHorizontal='10'
                        color='#38A69D'
                        borderRadius='10'
                        style={styles.buttonEnviar}


                    />
                </View>
            </Modal>
        </View>

    )

}


const styles = StyleSheet.create({
    campoObs: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: '#38A69D',
        borderRadius: 10,
        textAlignVertical: "top",
        paddingTop: 10,
        fontSize: 18,

    },

    buttonEnviar: {
        width: 150,

    },

})


