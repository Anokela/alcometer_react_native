import { View, Text } from 'react-native';
import React from 'react';
import styles from '../styles/Styles';
 

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
          Alcometer
      </Text>
    </View>
  );
}
