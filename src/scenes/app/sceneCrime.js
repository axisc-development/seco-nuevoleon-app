import React from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Switch from '../../components/other/Switch';

import {getCrimes, setCrimesSelected} from '../../redux/actions/app.actions';

const SceneCrime = ({
  navigation,
  // variables
  token,
  dataCrimes,
  dataCrimesSelected,
  // actions
  getCrimesAction,
  setCrimesSelectedAction,
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
    getCrimesAction(token);
  }, [JSON.stringify(dataCrimes)]);

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
    const clone = dataCrimesSelected.slice(0);
    const indexfound = searchElementIndexInArray(clone, obj.pkey);

    if (indexfound === -1 && obj.value) {
      clone.push(obj.pkey);
    } else {
      clone.splice(indexfound, 1);
    }

    setCrimesSelectedAction(clone);
  };

  const renderEmptyComponent = () => <ActivityIndicator />;

  const renderItem = ({index, item}) => (
    <Switch
      pkey={item.slug}
      index={index}
      text={item.name}
      value={isItOnTheList(dataCrimesSelected, item.slug)}
      onValueChange={onPressSwitch}
      img={item.img}
    />
  );

  return (
    <FlatList
      data={dataCrimes}
      keyExtractor={(item) => item.pk.toString()}
      renderItem={renderItem}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

SceneCrime.propTypes = {
  token: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dataCrimes: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dataCrimesSelected: PropTypes.array.isRequired,
  getCrimesAction: PropTypes.func.isRequired,
  setCrimesSelectedAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  dataCrimes: state.app.dataCrimes,
  dataCrimesSelected: state.app.dataCrimesSelected,
});

const mapDispatchToProps = (dispatch) => ({
  getCrimesAction: (token) => dispatch(getCrimes({token})),
  setCrimesSelectedAction: (clone) => dispatch(setCrimesSelected(clone)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneCrime);
