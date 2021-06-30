import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    alignSelf: 'center',
    color: 'white',
  },
});

const ButtonLarge = ({text, loading, onPress}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={styles.container}
    onPress={onPress}>
    {loading ? (
      <ActivityIndicator color="grey" />
    ) : (
      <Text style={styles.text}>{text}</Text>
    )}
  </TouchableOpacity>
);

ButtonLarge.propTypes = {
  text: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ButtonLarge;
