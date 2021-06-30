import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20,
  },
  instructions: {
    fontSize: 18,
    color: '#ddd',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
});

function EmptyMsejrafo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No hay eventos</Text>
      <Text style={styles.instructions}>
        {'\u2022 Por favor, pulsa  '}
        <Ionicons size={20} name="ios-options" color="white" />
        {' para añadir corporaciones o municipios a monitorear.'}
      </Text>
      <Text style={styles.instructions}>
        {'\u2022 Las opciones seleccionadas no han compartido nada.'}
      </Text>
    </View>
  );
}

export default EmptyMsejrafo;
