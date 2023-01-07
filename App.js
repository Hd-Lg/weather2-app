import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  View,
} from 'react-native';

import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const api = {
    key: '4d5f8c91f5c0526b83b60248f7690a77',
    baseUrl: 'http://api.openweathermap.org/data/2.5/',
  };

  const fetchData = useCallback(() => {
    setLoading(true);
    setInput('');

    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(e => console.dir(e))
      .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('./assets/sunset.webp')}
        resizeMode="cover"
        style={styles.image}>
        <View>
          <TextInput
            placeholder="Enter city name..."
            placeholderTextColor={'#000'}
            onChangeText={text => setInput(text)}
            value={input}
            style={styles.textInput}
            onSubmitEditing={fetchData}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={'large'} color={'#000'} />
          </View>
        )}

        {data && (
          <View style={styles.infoView}>
            <Text
              style={
                styles.cityCountryText
              }>{`${data?.name}, ${data?.sys?.country}`}</Text>
            <Text style={styles.dateText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>{`${Math.round(data?.main?.temp)}°C
`}</Text>
            <Text style={styles.minMaxText}>{`Min: ${Math.round(
              data?.main?.temp_min,
            )}°C | Max: ${Math.round(data?.main?.temp_max)}°C

`}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: '#df8e00',
  },
  infoView: {
    alignItems: 'center',
  },
  cityCountryText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: ' bold',
  },
  dateText: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    color: '#fff',
    fontSize: 45,
    marginVertical: 10,
  },
  minMaxText: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
    fontWeight: '500',
  },
});

export default App;
