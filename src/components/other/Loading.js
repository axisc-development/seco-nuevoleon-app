import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const styles = StyleSheet.create({
  container4Picker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: 'black',
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: 'black',
    zIndex: 2,
  },
});

function Loading(props) {
  if (props.justDimm) {
    return <View style={styles.container} />;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator color="white" size={props.size || 'large'} />
    </View>
  );
}

export default Loading;
