import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';
import {Button, Input} from 'react-native-elements';

import {sendMsejrafoToServer} from '../../redux/actions/app.actions';
import ButtonCamera from '../../components/other/ButtonCamera';
import TextButton from '../../components/global/ui/TextButton';

const styles = StyleSheet.create({
  containerApiResult: {
    marginTop: 10,
  },
  danger: {
    textAlign: 'center',
    color: 'red',
  },
});

const UselessTextInput = (props) => (
  <Input
    {...props}
    editable
    // eslint-disable-next-line react-native/no-inline-styles
    inputStyle={{fontSize: 18, color: 'white', padding: 15}}
    // leftIcon={<Ionicons name="pencil" size={24} color="white" />}
  />
);

const SceneNewEvent = ({
  navigation,
  sendMsejrafoToServerAction,
  storedError,
  isFetching,
  token,
}) => {
  // personalizar el headbar de esta pantalla
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          type="clear"
          icon={<Ionicons name="menu-outline" size={20} color="white" />}
          iconRight
          title=""
          onPress={() => navigation.openDrawer()}
          // eslint-disable-next-line react-native/no-inline-styles
          titleStyle={{color: 'white'}}
        />
      ),
      tabBarIcon: () => {
        return <Ionicons name="eye" size={25} />;
      },
    });
  }, [navigation]);

  const [value, onChangeText] = React.useState('');
  // varaibles for the btn img load
  const [imgEvent, setImgEvent] = React.useState({});
  const [imageAllProperties, setImageAllProperties] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  // END varaibles for the btn img load

  const openPhoto = () => {
    const options = {
      title: 'Añade una imágen',
      cancelButtonTitle: 'Cancelar',
      chooseFromLibraryButtonTitle: 'Abrir galería',
      takePhotoButtonTitle: 'Tomar foto',
      durationLimit: 120, // seconds
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
      },
    };

    setLoading(true);

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImgEvent({uri: response.uri});
        setImageAllProperties(response);
      }

      setLoading(false);
    });
  };

  const removeImg = () => {
    setImgEvent({});
    setImageAllProperties({});
  };

  const onPress = () => {
    Alert.alert(
      'Crear evento',
      'Seguro de compartir la siguiente información?',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            sendMsejrafoToServerAction(token, value, imageAllProperties);
            // clean form
            setImgEvent({});
            setImageAllProperties({});
            onChangeText('');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: 'transparent',
            padding: 20,
          }}>
          <UselessTextInput
            multiline
            onChangeText={(text) => onChangeText(text)}
            value={value}
            placeholder="Descripción del evento"
            placeholderTextColor="grey"
          />

          <ButtonCamera
            openPhoto={openPhoto}
            sourceImg={imgEvent}
            loading={loading}
            onClose={removeImg}
          />

          <TextButton
            title="Enviar"
            type="default"
            onPress={onPress}
            enable={value && !isFetching ? true : false}
          />

          {/* api result */}
          <View style={styles.containerApiResult}>
            {isFetching ? <ActivityIndicator /> : null}
            <Text style={styles.danger}>{storedError}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

SceneNewEvent.defaultProps = {
  storedError: '',
  isFetching: false,
};

SceneNewEvent.propTypes = {
  sendMsejrafoToServerAction: PropTypes.func.isRequired,
  storedError: PropTypes.string,
  isFetching: PropTypes.bool,
  token: PropTypes.string.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  storedError: state.api.error,
  isFetching: state.api.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  sendMsejrafoToServerAction: (token, text, image) =>
    dispatch(sendMsejrafoToServer({token, text, image})),
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneNewEvent);
