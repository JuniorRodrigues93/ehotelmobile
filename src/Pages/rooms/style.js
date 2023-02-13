import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    apartamento: {
        fontSize: 24,
        padding: 20,
        color: '#38A69D',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#38A69D',
    },

    viewIcon: {
        margin: 20,
        height: 40,
        width: 40,
        backgroundColor: 'red',
    },

    flatList: {
        marginTop: 15,
    },

    listItem: {
        backgroundColor: '#dc3545',
        padding: 25,
        marginTop: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: "center",


    },

    listText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

    iconObservation: {
        position: 'absolute',
        top: 20,
        right: 20,

    },

    loading: {
        padding: 10,
    },

})

export default styles