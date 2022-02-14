import React, { useState } from 'react'
import {
  Text,
  View,
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Provider as PaperProvider, TextInput, Button } from 'react-native-paper';
import styles from '../styles/Styles.js';
import RadioButton from './RadioButton.js';
import { bottles, hours, genders } from '../Data/Constants'; // import constants for rendering the options for radiobutton and for bottles and time pickers.
import DropDown from "react-native-paper-dropdown";
import Header from './Header';
import Footer from './Footer';

export default function Alcometer() {
  const [weight, setWeight] = useState('');
  const [bottle, setBottle] = useState(1);
  const [time, setTime] = useState(1);
  const [gender, setGender] = useState('male');
  const [bloodAlcohol, setBloodAlcohol] = useState(null);
  const [showBottlesDropDown, setShowBottlesDropDown] = useState(false);
  const [showTimeDropDown, setShowTimeDropDown] = useState(false);

  // implementing the alert to show when user tries to do calculation without inputting the weight.
  // This way of alertin seems not to work on webview. On could use javascrip alert() instead.
  const showAlert = () => {
    Alert.alert(
      "No weight entered.",
      "Please enter your weight.",
      [
        {
          text: "Ok",
        },
      ]
    );
  }
  // function to calculate the blood alcohol level
  function calculate() {
    if (weight !== '') {
      let result = 0
      let litres = bottle * 0.33
      let grams = litres * 8 * 4.5
      let burning = weight.replace(',', '.') / 10
      let grams_left = grams - burning * time
      if (gender === 'male') {
        result = grams_left / (weight.replace(',', '.') * 0.7)
      } else {
        result = grams_left / (weight.replace(',', '.') * 0.6)
      }
      if (result < 0) {
        result = 0
      }
      setBloodAlcohol(result)
    } else {
      // alert('Please enter your weight!') // This way of alerting works also on webview
      showAlert(); // This way seems not to work on webview but works on mobilephone (expoGo)
      return
    }
  }

  // Function to select style for the result text
  function setResultStyle(data) {
    if (data.toFixed(2) === '0.00') {
      return styles.text_green
    } else if (data.toFixed(2) < '0.5') {
      return styles.text_orange
    } else {
      return styles.text_red
    }
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView>
          <View style={styles.field}>
            <Text style={styles.label}>Weight:</Text>
            <TextInput
              mode='outlined'
              activeOutlineColor='#0080ff'
              onChangeText={text => setWeight(text)}
              placeholder='weight in kilograms'
              keyboardType='numeric'
              value={weight}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Bottles:</Text>
            <DropDown
              mode={"outlined"}
              visible={showBottlesDropDown}
              showDropDown={() => setShowBottlesDropDown(true)}
              onDismiss={() => setShowBottlesDropDown(false)}
              value={bottle}
              setValue={setBottle}
              list={bottles}
              activeColor='#0080ff'
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Time:</Text>
            <DropDown
              mode={"outlined"}
              visible={showTimeDropDown}
              showDropDown={() => setShowTimeDropDown(true)}
              onDismiss={() => setShowTimeDropDown(false)}
              value={time}
              setValue={setTime}
              list={hours}
              activeColor='#0080ff'
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Gender: </Text>
            <RadioButton
              options={genders}
              onPress={value => {
                setGender(value)
              }}
              style={{ backgroundColor: '#0080ff' }}
            />
          </View>
          <View style={styles.field}>
            {bloodAlcohol !== null && (
              <View style={styles.result}>
                <Text style={styles.label}>Calculated blood alcohol: </Text>
                <Text style={setResultStyle(bloodAlcohol)}>
                  {bloodAlcohol.toFixed(2)} ‰
                </Text>
              </View>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              icon='calculator'
              mode='contained'
              color='#0080ff'
              onPress={calculate}
            >Calculate</Button>
          </View>
          <Footer />
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  )
}
