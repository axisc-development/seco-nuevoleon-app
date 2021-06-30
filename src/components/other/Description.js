import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BASE_PADDING = 10;
const styles = StyleSheet.create({
  description: {
    paddingVertical: BASE_PADDING / 2,
    textAlign: 'justify',
    color: '#ddd',
  },
  date: {
    paddingVertical: BASE_PADDING / 2,
    fontSize: 10,
    color: '#ddd',
  },
  container: {
    // backgroundColor: 'red',
  },
});

const Description = (props) => (
  <View style={styles.container}>
    <Text style={[styles.date]}>{props.date}</Text>
    <Text style={styles.description}>{props.description}</Text>
  </View>
);

export default Description;
