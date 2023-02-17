import React, { useState, useEffect } from "react";
import { View, TextInput, Modal, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet } from "react-native";
import io from 'socket.io-client';




export default function IconAnotacao() {

    const [abrirAnotacao, setAbrirAnotacao] = useState(false)
    //const [texto, setTexto] = useState("")


    //A próxima const serve para enviar a obsevação e depois zerar o input.
    // const EnviarObs = () => {
    //     console.log(texto)
    //     setTexto("")

    // }

    //A próxima const serve para zerar o input e depois fechar a tela de observação.
    const CancelarObs = () => {
        setTexto("")
        setAbrirAnotacao(false)

    }

    const [webSocket, setWebSocket] = useState();
    const [mensagens, setMensagens] = useState([]);
    const [texto, setTexto] = useState('');

    useEffect(() => {
        const ws = new io('ws://localhost:3333');

        ws.onopen = () => {
            console.log('Conectado ao servidor Web Socket');
        };

        ws.onmessage = event => {
            const mensagem = event.data;
            console.log(`Recebido: ${mensagem}`);
            setMensagens([...mensagens, mensagem]);
        };

        ws.onerror = error => {
            console.error(`Erro no Web Socket: ${error.message}`);
        };

        ws.onclose = event => {
            console.log(`Conexão fechada: ${event.code} - ${event.reason}`);
        };

        setWebSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    function handleEnviar() {
        if (webSocket && webSocket.readyState === io.OPEN) {
            console.log(`Enviando: ${texto}`);
            webSocket.send(texto);
            setTexto('');
        }
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
                        value={texto}
                        onChangeText={setTexto}


                    />
                    <View style={styles.viewBotoes}>
                        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
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
