import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/Styles.js';
import RadioButton from './RadioButton.js';
// import constants for rendering the options for radiobutton and for bottles and time pickers. 
import constants from '../Data/Constants';



export default function Alcometer() {
  const [weight, setWeight] = useState('');
  const [bottle, setBottle] = useState(1);
  const [time, setTime] = useState(1);
  const [gender, setGender] = useState('male');
  const [bloodAlcohol, setBloodAlcohol] = useState(0);
  const [showResult, setShowResult] = useState(false);

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
      setShowResult(true);
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
      setBloodAlcohol(result.toFixed(2));

    } else {
      alert('Please enter your weight!') // works also on webview
      // showAlert(); // This way seems not to work on webview but works on mobilephone (expoGo)
      return; 
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
            {constants.bottles.map((bottles, index) => (
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
            {constants.hours.map((hours, index) => (
              <Picker.Item key={index} label={hours.label} value={hours.value} />
            ))
            }
          </Picker>
        </View >
        <View style={styles.field} >
          <Text style={styles.label}>Gender: </Text>
          <RadioButton 
            options={constants.genders} 
            onPress={(value) => {setGender(value)}} 
            style={{backgroundColor: 'skyblue'}}
          />
        </View>
        <View  style={styles.field}>
        {showResult && (
        <View style={styles.result}>
          <Text style={styles.label}>Calculated blood alcohol: </Text>
          
          {bloodAlcohol == 0 ?
          <Text style={styles.text_green}>{bloodAlcohol} ‰</Text> :
          <Text style={bloodAlcohol < 0.5 ? styles.text_yellow : styles.text_red}>{bloodAlcohol} ‰</Text>}
        </View>
        )}
        </View>
        <View style={styles.buttonContainer}>
          <Button color="skyblue" onPress={calculate} title='Calculate'></Button>
        </View>
    </View>
  );
}
