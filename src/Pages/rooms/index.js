import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity, SafeAreaView, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5'
import styles from './style';
import axios from 'axios';




export default function Room({ route }) {
    const userlogado = route.params.userLogado;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);



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

    return (
        <SafeAreaView style={styles.container}>
            <Animatable.Text animation="fadeInLeft" delay={500} style={styles.apartamento}>Apartamentos Ocupados
            </Animatable.Text>

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


//A função abaixo (ListItem) serve pra listar os dados que serão renderizados na tela pelo renderItem do Flatlist.
function ListItem({ data }) {
    console.log(data)
    return (
        <TouchableOpacity onPress={alertMessage} style={styles.listItem} >
            <Text style={styles.listText}>{data.Apartamento} - {data.Categoria}</Text>
            <TouchableOpacity onPress={Note} style={styles.iconObservation}>
                <Icon name="clipboard" size={30} color="white"
                />
            </TouchableOpacity>
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

const Note = () => {
    const [isNoteVisible, setNoteVisibility] = useState(false);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
                onPress={() => setNoteVisibility(!isNoteVisible)}
            />
            {isNoteVisible && (
                <TextInput
                    style={{
                        height: 40,
                        width: 200,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginTop: 10,
                    }}
                    placeholder="Take a note..."
                />
            )}
        </View>
    );
};





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