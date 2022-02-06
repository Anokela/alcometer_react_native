import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
    },
        header: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight:'bold',
        color: 'lightblue',
    },
    field: {
        margin: 10,
    },
    input: {
        marginLeft: 10,
        borderStyle: 'solid',
        borderColor:'black',
        borderRadius: 5,
        borderWidth: 1,
        padding: 3,
    }, 
    text_green: {
        color:'#258e25',
        fontSize: 25,
    },
    text_yellow: {
        color:'orange',
        fontSize: 25,
    },
    text_red: {
        color:'red',
        fontSize: 25,
    },
    text: {
        marginBottom: 10,
    },
    buttonContainer: {
        width: '80%',
        alignSelf: 'center',
    },

  });
