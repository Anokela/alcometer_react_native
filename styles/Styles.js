import { Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    },
    field: {
        margin: 10,
    },
    input: {
        marginLeft: 10,
        marginRight: 10,
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
    text_orange: {
        color:'orange',
        fontSize: 25,
    },
    text_red: {
        color:'red',
        fontSize: 25,
    },
    label: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    result: {
        marginLeft: 20,
    },
    buttonContainer: {
        width: '80%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    header: {
        marginBottom: 15,
        backgroundColor: '#0080ff',
        flexDirection: 'row',
      },
      footer: {
        marginTop: 20,
        backgroundColor: '#0080ff',
        flexDirection: 'row',
        paddingBottom: 35,
      },
      title: {
        color: '#fff',
        fontWeight: 'bold',
        flex: 1,
        fontSize: 23,
        textAlign: 'center',
        margin: 10,
      },
      author: {
        color: '#fff',
        fontWeight: 'bold',
        flex: 1,
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
      },

  });
