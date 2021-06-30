import React, {useCallback} from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {registerPushNotificationToken} from '../../redux/actions/push.actions';
import {getCorporations} from '../../redux/actions/app.actions';

import TouchableWrapper from '../../components/global/layout/TouchableWrapper';
import DefaultPage from '../../components/global/layout/DefaultPage';
import Logo from '../../../assets/logo_splash.png';

const SceneSplash = ({
  // variables
  isUserLoggedIn,
  navigation,
  token,
  infoDeviceWithTokenPN,
  // navigation
  registerPushNotificationTokenAction,
  getCorporationsAction,
}) => {
  let navigationTarget = '';
  if (infoDeviceWithTokenPN) {
    navigationTarget = isUserLoggedIn ? 'App' : 'Login';
  } else {
    navigationTarget = isUserLoggedIn ? 'Home' : 'Login';
  }

  useFocusEffect(
    useCallback(() => {
      const delayedNavigation = setTimeout(() => {
        if (isUserLoggedIn) {
          registerPushNotificationTokenAction(token, infoDeviceWithTokenPN);
          getCorporationsAction(token);
        }
        navigation.navigate(navigationTarget);
      }, 1000);
      return () => clearTimeout(delayedNavigation);
    }, []),
  );

  return (
    <TouchableWrapper handlePress={() => navigation.navigate(navigationTarget)}>
      <DefaultPage>
        <Image
          style={{
            width: 250,
            height: 250,
            top: -50,
            left: -20,
          }}
          source={Logo}
        />
      </DefaultPage>
    </TouchableWrapper>
  );
};

SceneSplash.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  infoDeviceWithTokenPN: PropTypes.shape({}).isRequired,
  registerPushNotificationTokenAction: PropTypes.func.isRequired,
  getCorporationsAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.user.isLoggedIn,
  token: state.user.token,
  infoDeviceWithTokenPN: state.user.infoDeviceWithTokenPN,
});

const mapDispatchToProps = (dispatch) => ({
  registerPushNotificationTokenAction: (token, infoDeviceWithTokenPN) =>
    dispatch(registerPushNotificationToken(token, infoDeviceWithTokenPN)),
  getCorporationsAction: (token) => dispatch(getCorporations({token})),
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneSplash);
