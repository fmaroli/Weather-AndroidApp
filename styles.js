import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const returnStyles = (componentVisible) => {
    return StyleSheet.create({
        container: {
            flex: 1,
          },
          background: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: height,
          },
          viewInputCity: {
            position: 'absolute',
            width: width/1.11,
            top: 20,
            padding: 5,
            backgroundColor: 'grey',
            borderRadius: 15,
            display: componentVisible,
          },
          inputCity: {
            height: 50,
            backgroundColor: 'black',
            color: 'white',
            borderRadius: 15,
            padding: 15,
          },
          addButtonPos: {
            position: 'absolute',
            top: 20,
            left: 20,
          },
          containerCity: {
            alignItems: 'center',
            paddingTop: 20,
          },
          containerTemperature: {
            alignItems: 'center',
            paddingTop: 100,
          },
          envelopeContainerThree: {
            position: 'absolute',
            bottom:0,
            width: width,
          },
          containerThreeDay: {
            flexWrap: 'wrap',
            margin: 20,
            padding: 20,
            borderRadius: 20,
          },
          textSmaller: {
            fontSize: 20,
            color: '#fff',
          },
          textSmall: {
            fontSize: 30,
            color: '#fff',
          },
          textMedium: {
            fontSize: 40,
            fontWeight: 'bold',
            color: '#fff',
          },
          textLarge: {
            fontSize: 120,
            color: '#fff',
          },
          darkenedContainer: {
            backgroundColor: 'rgba(0,0,0,0.1)',
            opacity: 255,
          },
          plusContainer: {
            paddingHorizontal: 10,
            borderRadius: 10,
          },
          textCityName: {
            maxWidth: '90%',
            textAlign: 'center',
          },
    });
};

export default returnStyles;