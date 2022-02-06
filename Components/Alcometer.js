import React, { useState } from 'react';
import { Text, View, TextInput, Button, ScrollView, Alert } from 'react-native';
// import RadioForm from 'react-native-simple-radio-button';
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

  
  /* const genders = [
    { label: 'Male', value: 'male'},
    { label: 'Female', value: 'female'}
  ]; */

  /* const bottles = Array();
  bottles.push({ label: '1 bottle', value: 1 });
  bottles.push({ label: '2 bottles', value: 2 });
  bottles.push({ label: '3 bottles', value: 3 });
  bottles.push({ label: '4 bottles', value: 4 });
  bottles.push({ label: '5 bottles', value: 5 });
  bottles.push({ label: '6 bottles', value: 6 });
  bottles.push({ label: '7 bottles', value: 7 });
  bottles.push({ label: '8 bottles', value: 8 });
  bottles.push({ label: '9 bottles', value: 9 });
  bottles.push({ label: '10 bottles', value: 10 });
  bottles.push({ label: '11 bottles', value: 11 });
  bottles.push({ label: '12 bottles', value: 12 });
  bottles.push({ label: '13 bottles', value: 13 });
  bottles.push({ label: '14 bottles', value: 14 });
  bottles.push({ label: '15 bottles', value: 15 });

  const hours = Array();
  hours.push({ label: '1 hour', value: 1 });
  hours.push({ label: '2 hours', value: 2 });
  hours.push({ label: '3 hours', value: 3 });
  hours.push({ label: '4 hours', value: 4 });
  hours.push({ label: '5 hours', value: 5 });
  hours.push({ label: '6 hours', value: 6 });
  hours.push({ label: '7 hours', value: 7 });
  hours.push({ label: '8 hours', value: 8 });
  hours.push({ label: '9 hours', value: 9 });
  hours.push({ label: '10 hours', value: 10 });
  hours.push({ label: '11 hours', value: 11 });
  hours.push({ label: '12 hours', value: 12 }); */

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
      //alert('Please enter your weight!') // works also on webview
      showAlert(); // This way seems not to work on webview but works on mobilephone (expoGo)
    }
  }
  return (
    <View>
      {/*   <Text style={styles.header}>Alcometer</Text> */}
        <View style={styles.field}>
          <Text style={styles.text}>Weight:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setWeight(text)}
            placeholder='in kilograms'
            keyboardType='numeric'>
          </TextInput>
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Bottles:</Text>
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
          <Text style={styles.text}>Time:</Text>
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
          <Text style={styles.text}>Gender: </Text>
          <RadioButton options={constants.genders} onPress={(value) => {setGender(value)}}></RadioButton>
        </View>
        <View  style={styles.field}>
          <Text style={styles.text}>Calculated blood alcohol: </Text>
        {showResult && (
        <View style={styles.result}>
          
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
