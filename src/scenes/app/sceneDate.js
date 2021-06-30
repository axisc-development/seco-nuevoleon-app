import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Overlay} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Switch from '../../components/other/Switch';
import {
  setDatesSelected,
  setAllDatesSelected,
  setYearSelected,
} from '../../redux/actions/app.actions';

const styles = StyleSheet.create({
  container: {
    marginBottom: 130,
  },
  btnSelectYear: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
});

const SceneDate = ({
  navigation,
  // variables
  areAllDatesSelected,
  dataDates,
  dataDatesSelected,
  yearSelected,
  yearInitial,
  // actions
  setAllDatesSelectedAction,
  setDatesSelectedAction,
  setYearSelectedAction,
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

  const [visibleModal, setVisibleModal] = React.useState(false);

  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };

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
    const clone = dataDatesSelected.slice(0);
    const indexfound = searchElementIndexInArray(clone, obj.pkey);

    if (indexfound === -1 && obj.value) {
      clone.push(obj.pkey);
    } else {
      clone.splice(indexfound, 1);
      setAllDatesSelectedAction(false);
    }

    setDatesSelectedAction(clone);
  };

  const renderEmptyComponent = () => null;

  const toggleButtonAll = () => {
    const newValue = !areAllDatesSelected;
    setAllDatesSelectedAction(newValue);
    // si se cumple la condicion buscar en todo el objeto inicial y
    // mandarlas a la lista de seleccionados
    const clone = [];
    if (newValue) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < dataDates.length; i++) {
        clone.push(dataDates[i].slug);
      }
    }
    setDatesSelectedAction(clone);
  };

  const renderItem = ({index, item}) => (
    <Switch
      pkey={item.slug}
      index={index}
      text={item.name}
      value={isItOnTheList(dataDatesSelected, item.slug)}
      onValueChange={onPressSwitch}
    />
  );

  const onPressYearSelect = (year) => {
    setYearSelectedAction(year);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Overlay isVisible={visibleModal} onBackdropPress={toggleModal}>
        <View>
          <Button
            buttonStyle={styles.btnSelectYear}
            type="clear"
            title={yearInitial.toString()}
            onPress={() => onPressYearSelect(yearInitial)}
          />
          <Button
            buttonStyle={styles.btnSelectYear}
            type="clear"
            title={(yearInitial - 1).toString()}
            onPress={() => onPressYearSelect(yearInitial - 1)}
          />
          <Button
            buttonStyle={styles.btnSelectYear}
            type="clear"
            title={(yearInitial - 2).toString()}
            onPress={() => onPressYearSelect(yearInitial - 2)}
          />
          <Button
            buttonStyle={styles.btnSelectYear}
            type="clear"
            title={(yearInitial - 3).toString()}
            onPress={() => onPressYearSelect(yearInitial - 3)}
          />
        </View>
      </Overlay>
      <Button
        buttonStyle={{borderColor: 'grey', paddingVertical: 20}}
        type="outline"
        title={`Seleccione un año: ${yearSelected}`}
        titleStyle={{color: '#ddd'}}
        onPress={toggleModal}
      />
      <Switch
        pkey="all"
        index={-1}
        text="Todos"
        value={areAllDatesSelected}
        onValueChange={toggleButtonAll}
      />
      <FlatList
        data={dataDates}
        keyExtractor={(item) => item.pk.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

SceneDate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataDates: PropTypes.array.isRequired,
  areAllDatesSelected: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dataDatesSelected: PropTypes.array.isRequired,
  yearSelected: PropTypes.number.isRequired,
  yearInitial: PropTypes.number.isRequired,
  setDatesSelectedAction: PropTypes.func.isRequired,
  setAllDatesSelectedAction: PropTypes.func.isRequired,
  setYearSelectedAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  dataDates: state.app.dataDates,
  areAllDatesSelected: state.app.areAllDatesSelected,
  dataDatesSelected: state.app.dataDatesSelected,
  yearSelected: state.app.yearSelected,
  yearInitial: state.app.yearInitial,
});

const mapDispatchToProps = (dispatch) => ({
  setDatesSelectedAction: (clone) => dispatch(setDatesSelected(clone)),
  setAllDatesSelectedAction: (clone) => dispatch(setAllDatesSelected(clone)),
  setYearSelectedAction: (year) => dispatch(setYearSelected(year)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneDate);
