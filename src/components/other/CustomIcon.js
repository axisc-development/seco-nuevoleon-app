import React from 'react';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const CustomIcon = ({name, size, color, isAnotherColorTab}) => {
  if (isAnotherColorTab) {
    return <Ionicons name={name} size={size} color="red" />;
  }
  return <Ionicons name={name} size={size} color={color} />;
};

CustomIcon.propTypes = {
  isAnotherColorTab: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isAnotherColorTab: state.app.isAnotherColorTab,
});

export default connect(mapStateToProps)(CustomIcon);
