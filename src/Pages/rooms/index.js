import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, SafeAreaView, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './style';
import axios from 'axios';
import IconAnotacao from './anotacoes';
import { useNavigation } from '@react-navigation/native';
import signalr from 'react-native-signalr';


export default function Room({ route, props }) {
    const userlogado = route.params.userLogado;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const AnimatableIcon = Animatable.createAnimatableComponent(Icon);
    const navigation = useNavigation();




    //O useEffect a seguir tem a função de puxar as informações dos apartamentos de acordo com o usuário logado.
    useEffect(() => {
        axios.get(`http://192.168.50.53:44365/apartamento/getapartamentos?empresa=${userlogado.UIDEmpresa}`)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })

        if (loading) return;
        setLoading(true);
        setLoading(false);
    }, []);

    //A função a seguir é utilizada para fazer o envio da mensagem através do método SendMessage definido no lado do servidor
    function sendMessage(props) {
        const connection = signalr.hubConnection('http://192.168.50.53:44308');
        const meuHubProxy = connection.createHubProxy('chatHub');
        connection.start().done(() => {
            meuHubProxy.invoke('sendMessage', 'User', 'Liberar' + props.apartamento);
            setMessage("")
            console.log('Liberar' + props.apartamento);

        }).fail((error) => {
            console.log('Erro ao conectar ao SignalR: ' + error);
        });
    }



    //A função abaixo (ListItem) serve pra listar os dados que serão renderizados na tela pelo renderItem do Flatlist.
    function ListItem({ data }) {
        console.log(data)
        return (
            <TouchableOpacity onPress={() => alertMessage(data.Apartamento)} style={styles.listItem} >
                <Text style={styles.listText}>{data.Apartamento} - {data.Categoria}</Text>
                <View style={styles.iconObservation}>
                    <IconAnotacao apartamento={data.Apartamento} categoria={data.Categoria} />
                </View>
            </TouchableOpacity>
        )
    }



    //A função abaixo (alertMessage) serve para criar o alerta que será exibido ao clicar no apartamento. 
    //Essa função é utilizada na função anterior (ListItem).
    const alertMessage = () => {
        Alert.alert("Conferência do apartamento.", "Por favor, confira se está tudo ok antes de fazer a Liberação!",
            [{
                text: "Liberar",
                onPress: () => Alert.alert("Confirma a liberação desse apartamento?", "Essa ação não poderá ser desfeita!",
                    [{
                        text: "Liberar",
                        onPress: () => sendMessage(data),
                        style: 'default',
                    },
                    {
                        text: "Cancelar",
                        onDismiss: () => (""),
                        style: 'destructive',
                    },
                    ]),
            },
            {
                text: "Cancelar",
                onDismiss: () => (""),
                style: 'cancel',
            },
            ],
        )
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewLogout}>
                <Animatable.Text animation="fadeInLeft" delay={500} style={styles.apartamento}>Apartamentos Ocupados
                </Animatable.Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <AnimatableIcon
                        animation="fadeInRight"
                        delay={600}
                        name="logout"
                        size={40}
                        color="#38A69D" />
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.flatList}
                contentContainerStyle={{ marginHorizontal: 20 }}
                data={data}
                renderItem={({ item }) => <ListItem data={item} />}
                ListFooterComponent={<FooterList load={loading} />} //Renderizado apenas no final da lista, vai atuar quando estiver em Loading.
            />
        </SafeAreaView>
    )
}


//A função abaixo serve para mostrar a animação de carregamento ao scrollar a flalist até o final 
//de acordo com as definições do ListFooterComponent da FlatList. 
function FooterList({ load }) {
    if (!load) return null;
    return (
        <View style={styles.loading}>
            <ActivityIndicator size={25} color="#121212" />
        </View>
    )
}


