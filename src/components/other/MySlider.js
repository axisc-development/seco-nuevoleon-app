import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? 15 : 5,
    paddingBottom: Platform.OS === 'android' ? 15 : 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopColor: '#484545',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  containerValuesSlider: {
    alignSelf: 'center',
  },
  slider: {},
  valuesSlider: {
    color: 'white',
    marginBottom: Platform.OS === 'android' ? 5 : 0,
    fontSize: 11,
  },
});

class MySlider extends PureComponent {
  render() {
    const {
      dateString,
      sliderValue,
      totalMonths,
      onValueChange,
      onSlidingComplete,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.containerValuesSlider}>
          <Text style={styles.valuesSlider}>{dateString}</Text>
        </View>
        <Slider
          maximumTrackTintColor="grey"
          maximumValue={totalMonths}
          minimumTrackTintColor="grey"
          minimumValue={1}
          onSlidingComplete={onSlidingComplete}
          onValueChange={onValueChange}
          step={1}
          style={styles.slider}
          thumbTintColor="white"
          thumbTouchSize={{width: 60, height: 60}}
          value={sliderValue}
        />
      </View>
    );
  }
}

MySlider.propTypes = {
  dateString: PropTypes.string.isRequired,
  sliderValue: PropTypes.number.isRequired,
  totalMonths: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onSlidingComplete: PropTypes.func.isRequired,
};

export default MySlider;
