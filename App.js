import { View, ScrollView } from 'react-native-web';
import Alcometer from './Components/Alcometer.js';
import Header  from './Components/Header';
import Footer from './Components/Footer';
import styles from './styles/Styles';


export default function App() {

  return (
    <View style={styles.container}>
      <ScrollView >
        <Header />
        <Alcometer />
        <Footer />
      </ScrollView>
    </View>
  );
}

