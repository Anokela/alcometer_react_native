import { View, Text } from 'react-native';
import React from 'react';
import styles from '../styles/Styles';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.author}>
          Author: Aleksi Nokela
      </Text>
    </View>
  );
}
