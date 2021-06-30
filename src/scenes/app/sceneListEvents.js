import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import EmptyMsejrafo from '../../components/other/EmptyMsejrafo';
import Detail from '../../components/other/Detail';
import ImageViewer from '../../components/other/ImageViewer';
import Description from '../../components/other/Description';
import ShareButton from '../../components/other/ShareButton';
import Loading from '../../components/other/Loading';

import {
  getMsejrafos,
  shareMsejrafo,
  changeColorTab,
} from '../../redux/actions/app.actions';
import {getPropertiesUser} from '../../redux/actions/user.actions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 5,
  },
  separator: {
    borderColor: 'grey',
    borderWidth: 0.5,
  },
});

const SceneListEvents = ({
  navigation,
  token,
  apiLoading,
  dataMsejrafo,
  dataUser,
  dataCorporationsSelected,
  // functions
  getMsejrafosAction,
  getPropertiesUserAction,
  shareMsejrafoAction,
  changeColorTabAction,
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
          titleStyle={{color: 'white'}}
        />
      ),
    });
  }, [navigation]);

  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    getMsejrafosAction(
      token,
      dataCorporationsSelected.toString().toLowerCase(),
    );
  }, [JSON.stringify(dataMsejrafo), JSON.stringify(dataCorporationsSelected)]);

  React.useEffect(() => {
    getPropertiesUserAction(token);
  }, [JSON.stringify(dataUser)]);

  const makeRequest = () => {
    getMsejrafosAction(
      token,
      dataCorporationsSelected.toString().toLowerCase(),
    );
    getPropertiesUserAction(token);
    changeColorTabAction(false);
  };

  const renderImage = (item) => {
    if (item.image_description.length !== 0) {
      return (
        <ImageViewer
          carousel={false}
          image={item.image_description}
          resizeMode="contain"
          height={DEVICE_WIDTH}
          width={DEVICE_WIDTH - 30}
        />
      );
    }

    return <View />;
  };

  const confirmShare = (pk, level) => {
    shareMsejrafoAction(token, pk, level);
    setTimeout(() => {
      getMsejrafosAction(
        token,
        dataCorporationsSelected.toString().toLowerCase(),
      );
    }, 1000);
  };

  const onPress = (pk, level) => {
    let title = '';
    if (level === 'level02') {
      title = 'Compartir evento al jefe';
    } else {
      title = 'Compartir evento al G.C.O.';
    }

    Alert.alert(
      '¿Está seguro de compartir?',
      title,
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Si', onPress: () => confirmShare(pk, level)},
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Detail
        image={item.image_profile}
        title={item.title}
        subtitle={item.subtitle}
        position={item.position}
      />
      {renderImage(item)}
      <Description description={item.description} date={item.date} />
      <ShareButton
        pk={item.pk}
        share01={item.share01}
        share02={item.share02}
        privilegeShare01={dataUser.share01}
        privilegeShare02={dataUser.share02}
        onPress={onPress}
      />
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true);
    makeRequest();
    setRefreshing(false);
  };

  const renderEmptyComponent = () => <EmptyMsejrafo />;

  return (
    <View
      style={{
        backgroundColor: 'transparent',
      }}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
        ItemSeparatorComponent={({highlighted}) => (
          <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
        )}
        style={styles.scroll}
        data={dataMsejrafo}
        keyExtractor={(item) => item.pk.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
      {apiLoading && <Loading />}
    </View>
  );
};

SceneListEvents.propTypes = {
  token: PropTypes.string.isRequired,
  apiLoading: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  dataMsejrafo: PropTypes.array.isRequired,
  dataUser: PropTypes.shape({}).isRequired,
  dataCorporationsSelected: PropTypes.array.isRequired,
  getMsejrafosAction: PropTypes.func.isRequired,
  getPropertiesUserAction: PropTypes.func.isRequired,
  shareMsejrafoAction: PropTypes.func.isRequired,
  changeColorTabAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  apiLoading: state.api.isFetching,
  dataMsejrafo: state.app.dataMsejrafo,
  dataCorporationsSelected: state.app.dataCorporationsSelected,
  dataUser: state.user.dataUser,
});

const mapDispatchToProps = (dispatch) => ({
  getMsejrafosAction: (token, corporations) =>
    dispatch(getMsejrafos({token, corporations})),
  getPropertiesUserAction: (token) => dispatch(getPropertiesUser({token})),
  shareMsejrafoAction: (token, pk, level) =>
    dispatch(shareMsejrafo({token, pk, level})),
  changeColorTabAction: (value) => dispatch(changeColorTab(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneListEvents);
