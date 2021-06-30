import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 20;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  img: {
    height: 200,
    borderRadius: 10,
    width: DEVICE_WIDTH - MARGIN * 2,
  },
  containerButtons: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  btn: {
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    top: -5,
    color: 'white',
  },
  icon: {
    alignSelf: 'center',
    color: 'white',
  },
  containerCloseBtn: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  iconCloseBtn: {
    color: 'red',
    fontSize: 40,
  },
});

function Close({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.containerCloseBtn}>
      <Ionicons style={styles.iconCloseBtn} name="ios-close" />
    </TouchableOpacity>
  );
}

const ButtonCamera = ({openPhoto, sourceImg, loading, onClose}) => {
  const renderLoading = () => {
    if (loading) {
      return (
        <View>
          <Text style={styles.text}>Cargardando foto...</Text>
          <ActivityIndicator color="grey" />
        </View>
      );
    }
    return <View />;
  };

  const renderImage = () => {
    if (Object.keys(sourceImg).length !== 0) {
      return (
        <View>
          <Image style={styles.img} source={sourceImg} />
          <Close onPress={onClose} />
        </View>
      );
    }
    return <View />;
  };

  return (
    <View style={styles.container}>
      {renderLoading()}
      {renderImage()}

      <View style={styles.containerButtons}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          onPress={openPhoto}>
          <Ionicons style={styles.icon} name="ios-camera" size={35} />
          <Text style={styles.text}>Cargar Foto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ButtonCamera.propTypes = {
  sourceImg: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  openPhoto: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

Close.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default ButtonCamera;
