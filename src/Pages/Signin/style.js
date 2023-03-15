import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ef8a32',

    },

    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',

    },

    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',

    },

    containerForm: {
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },

    title: {
        fontSize: 20,
        marginTop: 28,
    },

    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },

    button: {
        backgroundColor: "#ef8a32",
        width: "100%",
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    textButton: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },

})

export default styles