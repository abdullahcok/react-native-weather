import React from 'react';
import { View, StyleSheet } from 'react-native';
import Weather from './src/Weather';

const App = () => {
  return (
    <View style={styles.container}>
      <Weather />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
