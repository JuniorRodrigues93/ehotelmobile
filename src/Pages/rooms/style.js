import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    viewLogout: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ef8a32',
    },

    apartamento: {
        fontSize: 24,
        padding: 20,
        color: '#ef8a32',
        fontWeight: 'bold',
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
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25,
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
        top: 12,
        right: 20,
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,

    },

    loading: {
        padding: 10,
    },

})

export default styles