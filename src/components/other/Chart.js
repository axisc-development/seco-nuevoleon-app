import React, {PureComponent} from 'react';
import {View, Dimensions} from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native';
import PropTypes from 'prop-types';

const styles = {
  container: {
    height: 420,
    marginBottom: 10,
  },
  containerHigthcart: {
    justifyContent: 'center',
    height: 420,
    margin: 0,
    padding: 0,
    spacing: [0, 0, 0, 0],
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  fullWidth: {
    width: Dimensions.get('window').width,
  },
  webviewStyles: {
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width,
  },
};

export default class Chart extends PureComponent {
  render() {
    const {options} = this.props;
    return (
      <View style={[styles.container, styles.fullWidth]}>
        <HighchartsReactNative
          useCDN
          useSSL // <- this seems to make things work on android (prod.)
          webviewStyles={styles.webviewStyles}
          styles={styles.containerHigthcart}
          options={options}
        />
      </View>
    );
  }
}

Chart.propTypes = {
  options: PropTypes.shape({}).isRequired,
};
