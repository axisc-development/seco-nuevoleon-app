import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  baseButton: {
    marginTop: 10,
    borderRadius: 25,
    padding: 12,
    overflow: 'hidden',
  },
  baseText: {
    fontSize: 15,
    textAlign: 'center',
    letterSpacing: 1,
  },
  defaultButton: {
    backgroundColor: '#ccc',
    borderColor: '#666',
  },
  defaultText: {
    color: '#000',
  },
  primaryButton: {
    backgroundColor: '#ff7100',
    borderColor: '#ad5f00',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: 'grey',
    borderColor: '#157fff',
  },
  secondaryText: {
    color: '#fff',
  },
  successButton: {
    backgroundColor: 'green',
    borderColor: 'darkgreen',
  },
  successText: {
    color: '#fff',
  },
  warningButton: {
    backgroundColor: 'red',
    borderColor: 'darkred',
  },
  warningText: {
    color: '#fff',
  },
  disabledtrue: {
    opacity: 0.4,
  },
});

const TextButton = ({title, onPress, type, enable}) => (
  <TouchableOpacity onPress={() => onPress()} disabled={!enable}>
    <View
      style={{
        ...styles.baseButton,
        ...styles[`${type}Button`],
        ...styles[`disabled${!enable}`],
      }}>
      <Text style={{...styles.baseText, ...styles[`${type}Text`]}}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

TextButton.defaultProps = {
  onPress: undefined,
  type: 'default',
  enable: false,
};

TextButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  type: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'success',
    'warning',
  ]),
  enable: PropTypes.bool,
};

export default TextButton;
