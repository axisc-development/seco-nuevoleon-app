import React from 'react';
import {FlatList, View, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Switch from '../../components/other/Switch';

import {
  getMunicipalities,
  setMunicipalitiesSelected,
  setAllMunicipalitiesSelected,
} from '../../redux/actions/app.actions';

const styles = StyleSheet.create({
  container: {
    marginBottom: 60,
  },
});

const SceneCrime = ({
  navigation,
  // variables
  areAllMunicipalitiesSelected,
  dataMunicipalities,
  dataMunicipalitiesSelected,
  token,
  // actions
  getMunicipalitiesAction,
  setAllMunicipalitiesSelectedAction,
  setMunicipalitiesSelectedAction,
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

  React.useEffect(() => {
    getMunicipalitiesAction(token);
  }, [JSON.stringify(dataMunicipalities)]);

  console.log(dataMunicipalities)

  const searchElementIndexInArray = (array, element) => {
    const indexfound = array.findIndex((e) => e === element);
    return indexfound;
  };

  const isItOnTheList = (list, slug) => {
    // buscar en el redux el valor del parametro, si no existe es falso
    const indexfound = searchElementIndexInArray(list, slug);
    if (indexfound !== -1) {
      return true;
    }
    return false;
  };

  const onPressSwitch = (obj) => {
    // (1) Si el valor es true y no existe en la lista: agregarlo.
    // (2) En caso contrario: eliminarlo de la lista

    // list clone para no mutar el props
    // slice: es para no hacer referencia al mismo sector de memoria
    // ... que la lista pasada
    const clone = dataMunicipalitiesSelected.slice(0);
    const indexfound = searchElementIndexInArray(clone, obj.pkey);

    if (indexfound === -1 && obj.value) {
      clone.push(obj.pkey);
    } else {
      clone.splice(indexfound, 1);
      setAllMunicipalitiesSelectedAction(false);
    }

    setMunicipalitiesSelectedAction(clone);
  };

  const renderEmptyComponent = () => <ActivityIndicator />;

  const toggleButtonAll = () => {
    const newValue = !areAllMunicipalitiesSelected;
    setAllMunicipalitiesSelectedAction(newValue);
    // si se cumple la condicion buscar en todo el objeto inicial y
    // mandarlas a la lista de seleccionados
    const clone = [];
    if (newValue) {
      for (let i = 0; i < dataMunicipalities.length; i++) {
        clone.push(dataMunicipalities[i].slug);
      }
    }
    setMunicipalitiesSelectedAction(clone);
  };

  const renderItem = ({index, item}) => (
    <Switch
      pkey={item.slug}
      index={index}
      text={item.name}
      value={isItOnTheList(dataMunicipalitiesSelected, item.slug)}
      onValueChange={onPressSwitch}
    />
  );

  return (
    <View style={styles.container}>
      <Switch
        pkey="all"
        index={-1}
        text="Todos"
        value={areAllMunicipalitiesSelected}
        onValueChange={toggleButtonAll}
      />
      <FlatList
        data={dataMunicipalities}
        keyExtractor={(item) => item.pk.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

SceneCrime.propTypes = {
  token: PropTypes.string.isRequired,
  dataMunicipalities: PropTypes.array.isRequired,
  areAllMunicipalitiesSelected: PropTypes.bool.isRequired,
  dataMunicipalitiesSelected: PropTypes.array.isRequired,
  getMunicipalitiesAction: PropTypes.func.isRequired,
  setMunicipalitiesSelectedAction: PropTypes.func.isRequired,
  setAllMunicipalitiesSelectedAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  dataMunicipalities: state.app.dataMunicipalities,
  areAllMunicipalitiesSelected: state.app.areAllMunicipalitiesSelected,
  dataMunicipalitiesSelected: state.app.dataMunicipalitiesSelected,
});

const mapDispatchToProps = (dispatch) => ({
  getMunicipalitiesAction: (token) => dispatch(getMunicipalities({token})),
  setMunicipalitiesSelectedAction: (clone) =>
    dispatch(setMunicipalitiesSelected(clone)),
  setAllMunicipalitiesSelectedAction: (clone) =>
    dispatch(setAllMunicipalitiesSelected(clone)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneCrime);
