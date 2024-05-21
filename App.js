import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { Alert, Text, View, TouchableOpacity, TextInput, Image, ScrollView, Animated, Platform, KeyboardAvoidingView, Vibration, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import returnStyles from './styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// NAVIGATION

/////////////

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [componentVisible, setComponentVisible] = useState('none');
  const [city, setCity] = useState('');

  const styles = returnStyles(componentVisible);

  const getWeekDay = (forecastDay) => {
    let date = location.forecast.forecastday[forecastDay].date;
    let year = date.substring(0,4);
    let month = date.substring(6,7)-1;
    let day = date.substring(8,10);
    let dateObj = new Date(year,month,day);
    return dateObj.toDateString().substring(0,3);
  }

  const getGradientColour = (isDay) => {
    let colours = [['rgb(100,140,200)', 'rgb(240,200,180)'],['rgb(30,50,100)', 'rgb(55,115,180)']]
    return (isDay == 1) ? colours[0] : colours[1];
  }
  const formVisible = () => {
    Vibration.vibrate(pattern=100);
    (componentVisible == 'flex')? setComponentVisible('none') : setComponentVisible('flex');
  };
  const handleCityChange = (newCity) => {
    setCity(newCity);
  };
  const addCity = () => {
    Vibration.vibrate(pattern=100);
    (componentVisible == 'flex')? setComponentVisible('none') : setComponentVisible('flex');
    Alert.alert('City added!', city);
    setCity("")
  };

  useEffect(() =>{
    (async() => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted') {
        setErrorMsg("Permission denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=3e899d60db76407e869155530231609&q=${loc.coords.latitude},${loc.coords.longitude}&days=3&aqi=no&alerts=no`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
      .then((json) => {
        setLocation(json);
      })
      .catch((error) => {
        console.log(error);
      });
    })();
  },[]);

  if (errorMsg !== null) {
    return (

      <View style={styles.container}>
        <Text>Error: {errorMsg}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else if (location !== null) {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={[{height: height}, styles.container]}>
        <LinearGradient
        // Background Linear Gradient
        colors={getGradientColour(location.current.is_day)}
        style={styles.background}/>
        <View style={styles.containerCity}>
          <TouchableOpacity style={[styles.plusContainer, styles.addButtonPos, styles.darkenedContainer]} onPress={formVisible}>
            <Text style={[styles.textMedium]}>+</Text>
          </TouchableOpacity>
          <Text style={[styles.textCityName, styles.textMedium]}>{location.location.region}</Text>
          <Text style={styles.textSmall}>{location.location.country}</Text>
          <View style={[styles.viewInputCity]}>
            <TextInput style={[styles.inputCity]} value={city} onChangeText={handleCityChange} onSubmitEditing={addCity} placeholderTextColor="white" placeholder="Type city name.."/>
          </View>
        </View>
        <View style={styles.containerTemperature}>
          <Text style={styles.textLarge}>{Math.round((location.current.temp_c))}°</Text>
          <Text style={styles.textSmall}>{location.current.condition.text}</Text>
          <Text style={styles.textSmall}>{Math.round(location.forecast.forecastday[0].day.maxtemp_c)}° / {Math.round(location.forecast.forecastday[0].day.mintemp_c)}°</Text>
        </View>
        <View style={styles.envelopeContainerThree}>
          <View style={[styles.containerThreeDay, styles.darkenedContainer]}>
            <View>
              <Text style={[ styles.textSmaller]}>3-Day Forecast</Text>
            </View>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
              <Image source={{uri:`https:${location.forecast.forecastday[0].day.condition.icon}`}} style={{ width: 50, height: 50}}/>
              <Text style={[{flex:2}, styles.textSmaller]}>{getWeekDay(0)} {location.forecast.forecastday[0].day.condition.text}</Text>
              <Text style={[{flex:1, alignItems:'flex-end'}, styles.textSmaller]}> {Math.round(location.forecast.forecastday[0].day.mintemp_c)}° / {Math.round(location.forecast.forecastday[0].day.maxtemp_c)}°</Text>
            </View>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
              <Image source={{uri:`https:${location.forecast.forecastday[1].day.condition.icon}`}} style={{ width: 50, height: 50}}/>
              <Text style={[{flex:2}, styles.textSmaller]}>{getWeekDay(1)}  {location.forecast.forecastday[1].day.condition.text}</Text>
              <Text style={[{flex:1, alignItems:'flex-end'}, styles.textSmaller]}> {Math.round(location.forecast.forecastday[1].day.mintemp_c)}° / {Math.round(location.forecast.forecastday[1].day.maxtemp_c)}°</Text>
            </View>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
              <Image source={{uri:`https:${location.forecast.forecastday[2].day.condition.icon}`}} style={{ width: 50, height: 50}}/>
              <Text style={[{flex:2}, styles.textSmaller]}>{getWeekDay(2)}  {location.forecast.forecastday[2].day.condition.text}</Text>
              <Text style={[{flex:1, alignItems:'flex-end'}, styles.textSmaller]}> {Math.round(location.forecast.forecastday[2].day.mintemp_c)}° / {Math.round(location.forecast.forecastday[2].day.maxtemp_c)}°</Text>
            </View>
          </View>
        </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Waiting..</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}
