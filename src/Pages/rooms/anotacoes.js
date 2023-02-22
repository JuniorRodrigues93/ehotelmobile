import React, { useState, useEffect } from "react";
import { View, TextInput, Modal, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet } from "react-native";
import { HubConnectionBuilder } from "@microsoft/signalr";






export default function IconAnotacao() {

    const [abrirAnotacao, setAbrirAnotacao] = useState(false)
    //const [texto, setTexto] = useState("")


    //Inicio da conexão SignalR
    const [hubConnection, setHubConnection] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const createHubConnection = async () => {
            const hubConnect = new HubConnectionBuilder()
                .withUrl("http://localhost:3333")
                .withAutomaticReconnect()
                .build();

            setHubConnection(hubConnect);
        }

        createHubConnection();
    }, []);

    //A const a seguir é utilizada para fazer o envio da mensagem através do método SendMessage definido no lado do servidor
    const sendMessage = async () => {
        if (hubConnection && message) {
            await hubConnection.invoke('SendMessage', message);
            console.log(message)
            setMessage('');
        }
    }


    // A próxima const serve para enviar a obsevação e depois zerar o input.
    // const EnviarObs = () => {
    //     console.log(texto)
    //     setTexto("")

    // }


    //A próxima const serve para zerar o input e depois fechar a tela de observação.
    const CancelarObs = () => {
        setMessage("")
        setAbrirAnotacao(false)

    }


    return (
        <View>
            <TouchableOpacity onPress={() => setAbrirAnotacao(true)}>
                <Icon name="clipboard" size={30} color="white" />
            </TouchableOpacity>
            <Modal visible={abrirAnotacao}>
                <View>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        style={styles.campoObs}
                        placeholder={'Digite aqui a sua observação!'}
                        value={message}
                        onChangeText={setMessage}


                    />
                    <View style={styles.viewBotoes}>
                        <TouchableOpacity style={styles.button} onPress={sendMessage}>
                            <Text style={styles.textoBotoes}>Enviar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonCancelar} onPress={CancelarObs}>
                            <Text style={styles.textoBotoes}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>

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

    viewBotoes: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "row",
        justifyContent: "center",
    },

    button: {
        height: 40,
        width: 100,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#38A69D',
        fontSize: 18,
        margin: 10,
    },
    buttonCancelar: {
        height: 40,
        width: 100,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#dc3545',
        fontSize: 18,
        margin: 10,
    },

    textoBotoes: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',

    },

})
