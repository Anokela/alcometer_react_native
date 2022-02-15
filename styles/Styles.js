import { Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    },
    field: {
        margin: 5,
    }, 
    text_green: {
        color:'#258e25',
        fontSize: 25,
    },
    text_yellow: {
        color:'#ffcc33',
        fontSize: 25,
    },
    text_red: {
        color:'red',
        fontSize: 25,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    result: {
        marginBottom: 10,
        alignItems: 'center',
        
    },
    buttonContainer: {
        alignSelf: 'center',
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
