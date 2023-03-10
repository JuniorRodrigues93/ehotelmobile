import React, { useState } from "react";
import { View, TextInput, Modal, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet } from "react-native";
import signalr from 'react-native-signalr';

{/*IconAnotacao se refere ao ícone de caderneta que fica ao lado dos apartamentos */ }
export default function IconAnotacao(props) {

    const [abrirAnotacao, setAbrirAnotacao] = useState(false)
    const [message, setMessage] = useState('');
    const connection = signalr.hubConnection('http://192.168.50.53:44367');
    const meuHubProxy = connection.createHubProxy('notificationHub');


    //A const a seguir é utilizada para fazer o envio da mensagem através do método SendMessage definido no lado do servidor
    const sendMessage = () => {
        connection.start().done(() => {
            meuHubProxy.invoke('sendMessage', props.uidempresa, message + ' - ' + props.apartamento);
            setMessage("") //Zera o testInput após enviar a mensagem
            setAbrirAnotacao(false) //Fecha o textInput de anotações após enviar a mensagem e retorna pra lista de apartamentos.
            //console.log(message + ' ' + props.apartamento);

        }).fail((error) => {
            console.log('Erro ao conectar ao SignalR: ' + error);
        });
    }


    //A próxima const serve para zerar o input e depois fechar a tela de observação.
    const CancelarObs = () => {
        setMessage("")
        setAbrirAnotacao(false)

    }


    return (
        <SafeAreaView >
            <TouchableOpacity onPress={() => setAbrirAnotacao(true)}>
                <Icon name="clipboard" size={30} color="white" />
            </TouchableOpacity>
            <Modal visible={abrirAnotacao}>
                {/* O próximo SafeAreaView é referente ao campo de observações. */}
                <SafeAreaView>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        style={styles.campoObs}
                        placeholder={'Digite aqui a sua observação!'}
                        value={message}
                        onChangeText={setMessage}
                        textAlignVertical="top"
                    />
                    <View style={styles.viewBotoes}>
                        {/* Botão para enviar a mensagem do textInput para o servidor. */}
                        <TouchableOpacity style={styles.button} onPress={sendMessage}>
                            <Text style={styles.textoBotoes}>Enviar</Text>
                        </TouchableOpacity>

                        {/* Botão para cancelar o envio da mensagem. */}
                        <TouchableOpacity style={styles.buttonCancelar} onPress={CancelarObs}>
                            <Text style={styles.textoBotoes}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>

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
        height: 250,
        padding: 10,
        borderWidth: 2,
        borderColor: '#38A69D',
        borderRadius: 10,
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
