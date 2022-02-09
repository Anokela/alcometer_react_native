import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/Styles.js';
import RadioButton from './RadioButton.js';
import {bottles, hours, genders } from '../Data/Constants'; // import constants for rendering the options for radiobutton and for bottles and time pickers.  



export default function Alcometer() {
  const [weight, setWeight] = useState('');
  const [bottle, setBottle] = useState(1);
  const [time, setTime] = useState(1);
  const [gender, setGender] = useState('male');
  const [bloodAlcohol, setBloodAlcohol] = useState(null);

  // implementing the alert to show when user tries to do calculation without inputting the weight.
  // This way of alertin seems not to work on webview. On could use javascrip alert() instead.
 /*  const showAlert = () => {
    Alert.alert(
      "No weight entered.",
      "Please enter your weight.",
      [
        {
          text: "Ok",
        },
      ]
    );
  } */

  function calculate() {
    if (weight !== '') {
      let result = 0;
      let litres = bottle * 0.33;
      let grams = litres * 8 * 4.5;
      let burning = weight.replace(',','.') / 10;
      let grams_left = grams - (burning * time);
      if (gender === 'male') {
        result = grams_left / (weight.replace(',','.') * 0.7);
      }
      else {
        result = grams_left / (weight.replace(',','.') * 0.6);
      }
      if (result < 0) {
        result = 0;
      }
      setBloodAlcohol(result);

    } else {
      alert('Please enter your weight!') // works also on webview
      // showAlert(); // This way seems not to work on webview but works on mobilephone (expoGo)
      return; 
    }
  }

function setResultStyle(data) {
  if (data.toFixed(2) === '0.00') {
    return styles.text_green;
  }
  else if (data.toFixed(2) < '0.5') {
    return styles.text_orange;
  }
  else {
    return styles.text_red;
  }
}

  return (
    <View>
        <View style={styles.field}>
          <Text style={styles.label}>Weight:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setWeight(text)}
            placeholder='in kilograms'
            keyboardType='numeric'>
          </TextInput>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Bottles:</Text>
          <Picker style={styles.input}
            onValueChange={(itemValue) => setBottle(itemValue)}
            selectedValue={bottle}
          >
            {bottles.map((bottles, index) => (
              <Picker.Item key={index} label={bottles.label} value={bottles.value} />
            ))
            }
          </Picker>
        </View >
        <View style={styles.field}>
          <Text style={styles.label}>Time:</Text>
          <Picker style={styles.input}
            onValueChange={(itemValue) => setTime(itemValue)}
            selectedValue={time}
          >
            {hours.map((hours, index) => (
              <Picker.Item key={index} label={hours.label} value={hours.value} />
            ))
            }
          </Picker>
        </View >
        <View style={styles.field} >
          <Text style={styles.label}>Gender: </Text>
          <RadioButton 
            options={genders} 
            onPress={(value) => {setGender(value)}} 
            style={{backgroundColor: 'skyblue'}}
          />
        </View>
        <View  style={styles.field}>
          {bloodAlcohol !== null && (
          <View style={styles.result}>
            <Text style={styles.label}>Calculated blood alcohol: </Text>
            <Text style={setResultStyle(bloodAlcohol)}>{bloodAlcohol.toFixed(2)} ‰</Text>
          </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button color="skyblue" onPress={calculate} title='Calculate'></Button>
        </View>
    </View>
  );
}
