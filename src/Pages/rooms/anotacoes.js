import React, { useState } from "react";
import { View, TextInput, Modal, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet } from "react-native";
// import { HubConnectionBuilder } from "@microsoft/signalr";
import signalr from 'react-native-signalr';



export default function IconAnotacao() {

    const [abrirAnotacao, setAbrirAnotacao] = useState(false)
    const [message, setMessage] = useState('');
    const connection = signalr.hubConnection('http://192.168.50.53:44373');
    const meuHubProxy = connection.createHubProxy('meuHub');
    // const [hubConnection, setHubConnection] = useState(null);

    connection.start()
        .done(() => {
            console.log('Conectado ao SignalR');
            meuHubProxy.invoke('SendMessage', 'Olá do React Native!');
        })
        .fail((error) => {
            console.log('Erro ao conectar ao SignalR: ' + error);
        });

    meuHubProxy.on('SendMessage', (mensagem) => {
        console.log('Nova mensagem recebida: ' + mensagem);
    });



    //A const a seguir é utilizada para fazer o envio da mensagem através do método SendMessage definido no lado do servidor
    const sendMessage = async () => {
        if (connection && message) {
            await meuHubProxy.invoke('SendMessage', message);
            console.log(message)
            setMessage('');
        }
    }



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



//A estilização a seguir é referente apenas ao Return dentro do arquivo anotações, a estilização referente ao arquivo Index foi
//feita dentro do arquivo Style.
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
