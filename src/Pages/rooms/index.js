import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './style';
import axios from 'axios';



export default function Room() {
    const baseURL = 'https://api.github.com';
    const perPage = 20;


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadApi();
    }, []);

    async function loadApi() {
        if (loading) return;

        setLoading(true);
        const response = axios.get(`${baseURL}/search/repositories?q=react&per_page=${perPage}&page=${page}`);

        setData([...data, ...(await response).data.items]);

        setPage(page + 1);
        setLoading(false);
    }


    return (
        <View style={styles.container}>
            <Animatable.Text animation="fadeInLeft" delay={500} style={styles.apartamento}>Apartamentos Ocupados</Animatable.Text>

            <FlatList
                style={styles.flatList}
                contentContainerStyle={{ marginHorizontal: 20 }}
                data={data}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <ListItem data={item} />} //Vinculado a function ListItem
                onEndReached={loadApi} //Chama a function loadApi, para recarregar novos dados sempre que chegar ao final da página.
                onEndReachedThreshold={0.1} //Determina em que momento vai ser recarregada a loadApi, nesse caso 0.1 = 10% para terminar a página.
                ListFooterComponent={<FooterList load={loading} />} //Renderizado apenas no final da lista, vai atuar quando estiver em Loading.

            />

        </View>
    )
}

//A função abaixo (ListItem) serve pra listar os dados que serão renderizados na tela pelo renderItem do Flatlist.
function ListItem({ data }) {
    return (
        <TouchableOpacity onPress={alertMessage} style={styles.listItem} >
            <Text style={styles.listText}>{data.full_name}</Text>
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
                    onPress: () => console.log("Liberar",),
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


