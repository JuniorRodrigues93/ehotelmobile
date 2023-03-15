import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ef8a32',
    },

    containerLogo: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ef8a32',
        height: 200,
        width: '100%',
    },

    containerForm: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },

    Title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
    },

    text: {
        color: '#a1a1a1',
        fontSize: 15,
    },

    button: {
        position: 'absolute',
        backgroundColor: '#ef8a32',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
    },

    textButton: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
})

export default styles