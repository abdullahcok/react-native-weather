import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  const fetchWeather = async () => {
    try {
      if (!city) {
        setError('Please enter a city name.');
        return;
      }

      setLoading(true);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=26d244327e5c3010cad4fd2225c13e77`
      );

      const temperatureInCelsius = kelvinToCelsius(response.data.main.temp);

      setWeather({ ...response.data, main: { ...response.data.main, temp: temperatureInCelsius } });
      setError(null);
    } catch (error) {
      setError('Error fetching weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        onChangeText={(text) => setCity(text)}
        value={city}
      />
     
      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Temperature: {weather.main?.temp}°C</Text>
          <Text style={styles.weatherText}>Weather: {weather.weather[0]?.description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#007BFF',
  },
  errorText: {
    marginTop: 10,
    color: 'red',
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#007BFF',
  },
});

export default Weather
