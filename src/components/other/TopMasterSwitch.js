import React from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderColor: 'transparent',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  text: {
    fontWeight: 'bold',
    color: '#ddd',
    fontSize: 16,
  },
  switch: {
    transform: [{scaleX: 1}, {scaleY: 1}],
  },
});

const design = {
  trackColor: {
    true: 'green',
    false: '#ddd',
  },
};

const TopMasterSwitch = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>Activar todos</Text>
    <Switch
      value={props.value}
      trackColor={design.trackColor}
      onValueChange={(value) => props.onValueChange(value)}
      style={styles.switch}
    />
  </View>
);

export default TopMasterSwitch;
