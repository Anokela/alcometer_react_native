import { View, ScrollView } from 'react-native';
import Alcometer from './Components/Alcometer.js';
import Header from './Components/Header';
import Footer from './Components/Footer';
import styles from './styles/Styles';

export default function App() {

  return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <Alcometer />
          <Footer />
        </ScrollView>
      </View>
  );
}

