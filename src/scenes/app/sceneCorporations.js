import React from 'react';
import {
  View,
  SectionList,
  RefreshControl,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Switch from '../../components/other/Switch';
import SectionHeader from '../../components/other/SectionHeader';
import Loading from '../../components/other/Loading';

import {
  getCorporations,
  compressSectionCorporation,
  setCorporationsSelected,
} from '../../redux/actions/app.actions';

const styles = StyleSheet.create({
  container: {},
});

const SceneCorporations = ({
  navigation,
  token,
  dataCorporations,
  dataCorporationsSelected,
  getCorporationsAction,
  compressSectionCorporationAction,
  setCorporationsSelectedAction,
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
  const [makeRequest, setMakeRequest] = React.useState(true);

  React.useEffect(() => {
    if (makeRequest) {
      getCorporationsAction(token);
    }
  }, [JSON.stringify(dataCorporations)]);

  const searchElementIndexInArray = (array, element) => {
    const found = array.findIndex((e) => e === element);
    return found;
  };

  const inCoporationsSelected = (slug) => {
    // buscar en el redux el valor del parametro, si no existe es falso
    const found = searchElementIndexInArray(dataCorporationsSelected, slug);
    if (found !== -1) {
      return true;
    }
    return false;
  };

  const onPressSwitchCorporation = (obj) => {
    // (1) Si el valor es true y no existe en la lista: agregarlo.
    // (2) En caso contrario: eliminarlo de la lista

    // list clone para no mutar el props
    // slice: es para NO hacer referencia al mismo sector de memoria
    const clone = dataCorporationsSelected.slice(0);
    const found = searchElementIndexInArray(clone, obj.pkey);

    if (found === -1 && obj.value) {
      // 1
      clone.push(obj.pkey);
    } else {
      // 2
      clone.splice(found, 1);
    }

    setCorporationsSelectedAction(token, clone);
  };

  const renderItem = ({index, item, section}) => {
    if (!section.compressed) {
      return (
        <Switch
          pkey={item.slug}
          index={index}
          text={item.title}
          section={section}
          value={inCoporationsSelected(item.slug)}
          onValueChange={onPressSwitchCorporation}
        />
      );
    }

    return <View />;
  };

  const renderEmptyComponent = () => <Loading />;

  const onPressSectionHeader = (section) => {
    // NOTA: tenemos que recorrer la lista con la que se alimenta el
    // SectionList hasta encontrar el section que llega por parametro
    // y dentro del elemento hacer un toggle del valor compress
    const found = searchElementIndexInArray(dataCorporations, section);

    // se hace un clone para no mutar el objecto del props
    const clone = JSON.parse(JSON.stringify(dataCorporations));

    // cambiar al nuevo valor
    clone[found].compressed = !clone[found].compressed;
    // cambiar el valor local para que no caiga en un ciclo
    compressSectionCorporationAction(clone);
    setMakeRequest(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setMakeRequest(true);
    getCorporationsAction(token);
    setRefreshing(false);
  };

  const renderSectionHeader = ({section}) => (
    <SectionHeader section={section} onPress={onPressSectionHeader} />
  );

  return (
    <ScrollView
      style={styles.containerScroll}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="white"
        />
      }>
      <View style={styles.container}>
        <SectionList
          sections={dataCorporations}
          renderItem={(obj) => renderItem(obj)}
          renderSectionHeader={(obj) => renderSectionHeader(obj)}
          keyExtractor={(item, index) => item + index}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </ScrollView>
  );
};

SceneCorporations.propTypes = {
  token: PropTypes.string.isRequired,
  apiLoading: PropTypes.bool.isRequired,
  dataCorporations: PropTypes.array.isRequired,
  dataCorporationsSelected: PropTypes.array.isRequired,
  getCorporationsAction: PropTypes.func.isRequired,
  compressSectionCorporationAction: PropTypes.func.isRequired,
  setCorporationsSelectedAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  apiLoading: state.api.isFetching,
  dataCorporations: state.app.dataCorporations,
  dataCorporationsSelected: state.app.dataCorporationsSelected,
});

const mapDispatchToProps = (dispatch) => ({
  getCorporationsAction: (token) => dispatch(getCorporations({token})),
  compressSectionCorporationAction: (clone) =>
    dispatch(compressSectionCorporation(clone)),
  setCorporationsSelectedAction: (token, clone) =>
    dispatch(setCorporationsSelected(token, clone)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneCorporations);
