import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Weatherinfo from './componets/WeatherInfo';

const WATHER_API_KEY = '81eda6665a3c88aa8830ddfe6f466bd5';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('metric');

  useEffect(() => {
    load();
  },[]);

  async function load() {
    try {
      
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run the app');
        return
      }
      const location = await Location.getCurrentPositionAsync();

      const {latitude, longitude} = location.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WATHER_API_KEY}`;

      const response = await fetch(weatherUrl);

      const ressult = await response.json();

      if (response.ok) {
        setCurrentWeather(ressult);
      } else {
        setErrorMessage(ressult.message);
      }

    } catch (error) {

      setErrorMessage(error.message);
      
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <Weatherinfo currentWeather={currentWeather}/>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});
