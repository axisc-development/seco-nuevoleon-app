import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '600',
    alignSelf: 'center',
    color: '#ddd',
  },
});

function ScSwitch(props) {
  return (
    <View styles={{backgroundColor: 'red'}}>
      <TouchableOpacity
        style={[{...styles.container, backgroundColor: props.section.color}]}
        onPress={() => {
          props.onPress(props.section);
        }}>
        <Text style={styles.text}>{props.section.title.toUpperCase()}</Text>
        {props.section.compressed ? (
          <Ionicons name="caret-up" size={20} color="#ddd" />
        ) : (
          <Ionicons name="caret-down" size={20} color="#ddd" />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default ScSwitch;
