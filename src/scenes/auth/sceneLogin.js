import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PushNotification from 'react-native-push-notification';
import {useFocusEffect} from '@react-navigation/native';

import {userLogin, userLogout} from '../../redux/actions/user.actions';
import {
  configurePushNotification,
  unregisterPushNotificationToken,
} from '../../redux/actions/push.actions';
import DefaultPage from '../../components/global/layout/DefaultPage';
import TextButton from '../../components/global/ui/TextButton';
import logo from '../../../assets/logo.png';

const styles = StyleSheet.create({
  containerForm: {
    marginHorizontal: 20,
  },
  input: {
    paddingLeft: 40,
    borderRadius: 20,
    fontSize: 17.5,
    margin: 5,
    height: 40,
  },
  inlineImg: {
    color: 'grey',
    position: 'absolute',
    zIndex: 99,
    left: 10,
    top: 10,
  },
  logo: {
    width: 320,
    height: 320,
  },
  btnEye: {
    position: 'absolute',
    top: 5,
    right: 15,
    padding: 6,
  },
  iconEye: {
    color: 'grey',
  },
  danger: {
    textAlign: 'center',
    color: 'red',
  },
  containerApiResult: {
    marginTop: 10,
  },
});

const SceneLogin = ({
  // variables
  token,
  infoDeviceWithTokenPN,
  storedError,
  isFetching,
  // funtions
  loginUser,
  configurePushNotificationAction,
  unregisterPushNotificationTokenAction,
  logout,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        unregisterPushNotificationTokenAction(token, infoDeviceWithTokenPN);
        logout();
      }
    }, [token]),
  );

  React.useEffect(() => {
    PushNotification.setApplicationIconBadgeNumber(0);
    configurePushNotificationAction();
  }, [JSON.stringify(infoDeviceWithTokenPN)]);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isTextHide, setIsTextHide] = useState(true);

  const toggleTextHide = useCallback(() => setIsTextHide((state) => !state), [
    setIsTextHide,
  ]);

  const onPressSubmit = () => {
    loginUser(user, password);
  };

  return (
    <DefaultPage>
      <View>
        <Image source={logo} style={styles.logo} />
        <View style={styles.containerForm}>
          {/* username */}
          <View>
            <Ionicons style={styles.inlineImg} name="person-circle" size={25} />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setUser(text)}
              placeholder="Usuario"
              placeholderTextColor="grey"
              value={user}
              underlineColorAndroid="transparent"
            />
          </View>
          {/* password */}
          <View>
            <Ionicons style={styles.inlineImg} name="lock-closed" size={25} />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              placeholder="Contraseña"
              placeholderTextColor="grey"
              value={password}
              underlineColorAndroid="transparent"
              secureTextEntry={isTextHide}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnEye}
              onPress={toggleTextHide}>
              {isTextHide ? (
                <Ionicons style={styles.iconEye} name="eye-off" size={25} />
              ) : (
                <Ionicons style={styles.iconEye} name="eye" size={25} />
              )}
            </TouchableOpacity>
          </View>
          {/* submit */}
          <TextButton
            title="ENTRAR"
            type="secondary"
            onPress={() => onPressSubmit()}
            enable={
              // eslint-disable-next-line no-unneeded-ternary
              user && password ? true : false
            }
          />
          {/* api result */}
          <View style={styles.containerApiResult}>
            {isFetching ? <ActivityIndicator /> : null}
            <Text style={styles.danger}>{storedError}</Text>
          </View>
        </View>
      </View>
    </DefaultPage>
  );
};

SceneLogin.defaultProps = {
  storedError: '',
  isFetching: false,
};

SceneLogin.propTypes = {
  token: PropTypes.string.isRequired,
  infoDeviceWithTokenPN: PropTypes.shape({}).isRequired,
  loginUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  storedError: PropTypes.string,
  isFetching: PropTypes.bool,
  configurePushNotificationAction: PropTypes.func.isRequired,
  unregisterPushNotificationTokenAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  storedError: state.api.error,
  token: state.user.token,
  infoDeviceWithTokenPN: state.user.infoDeviceWithTokenPN,
  isFetching: state.api.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user, password) => dispatch(userLogin({user, password})),
  logout: () => dispatch(userLogout()),
  configurePushNotificationAction: () => dispatch(configurePushNotification()),
  unregisterPushNotificationTokenAction: (token, infoDeviceWithTokenPN) =>
    dispatch(unregisterPushNotificationToken(token, infoDeviceWithTokenPN)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneLogin);
