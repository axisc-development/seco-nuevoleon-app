import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Overlay,
  ListItem,
  ButtonGroup,
  Avatar,
} from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Jvectormap from '../../components/other/Jvectormap';
import Table from '../../components/other/Table';
import Chart from '../../components/other/Chart';
import MySlider from '../../components/other/MySlider';
import Loading from '../../components/other/Loading';
import {
  getCrimes,
  getDataCrime,
  updateSelectedDate,
  getMunicipalities,
} from '../../redux/actions/app.actions';

const DEVICE_WIDTH = Dimensions.get('window').width;

const GREY_COLOR = 'grey';
const GOLD_COLOR = '#c6b45a';
const styles = StyleSheet.create({
  containerModal: {
    width: DEVICE_WIDTH - 60,
  },
  container: {
    paddingTop: 20,
    paddingBottom: 75,
  },
  buttonsGroup: {
    borderColor: GREY_COLOR,
    borderTopColor: GREY_COLOR,
    borderBottomColor: GREY_COLOR,
    backgroundColor: 'transparent',
    height: 40,
    marginBottom: 40,
  },
  buttonsGroupText: {
    color: GOLD_COLOR,
    fontSize: 12,
  },
  buttonsGroupSelectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonsGroupSelected: {
    backgroundColor: 'transparent',
  },
  innerBorder: {
    color: GREY_COLOR,
  },
});

function LogoInTitle({name, img}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        style={{width: 25, height: 25, marginHorizontal: 5}}
        source={{uri: img}}
      />
      <Text style={{color: 'white', fontSize: 18}}>{name}</Text>
    </View>
  );
}

const SceneStatistics = (props) => {
  const {
    navigation,
    // my functions
    getCrimesAction,
    getDataCrimeAction,
    updateSelectedDateAction,
    getMunicipalitiesAction,
    // changeMonthYearStringAction,
    // changeSliderValueAction,
    // my variables
    token,
    apiLoading,
    dataCrime, // holy shit valdo... esta hace referencia a la data de API
    dataCrimes, // holy shit valdo...
    listMonthsYearStringPreloaded,
    listMonthsPreloaded,
    listYearsPreloaded,
    selectedCrime,
    monthSelected,
    yearSelected,
    totalMonths,
    monthYearString,
  } = props;

  React.useEffect(() => {
    getCrimesAction(token);
    getMunicipalitiesAction(token);

    if (selectedCrime !== '') {
      const crime = dataCrimes.filter((c) => c.slug === selectedCrime);
      // change the title depending on the crime
      navigation.setOptions({
        headerTitle: () => (
          <LogoInTitle name={crime[0].name} img={crime[0].img} />
        ),
      });
    }
  }, [JSON.stringify(dataCrimes)]);

  // hooks
  let showModal = true;
  if (selectedCrime) {
    showModal = false;
  }
  const [visibleModal, setVisibleModal] = React.useState(showModal);
  const [sliderValue, setSliderValue] = React.useState(totalMonths);

  const [dateString, setDateString] = React.useState(monthYearString);
  const [oneByTwo, setOneByTwo] = React.useState(true);

  const [indexButtonGroup, setIndexButtonGroup] = React.useState(0);
  const toggleModal = React.useCallback(
    () => setVisibleModal((state) => !state),
    [setVisibleModal],
  );
  const toggleChart = React.useCallback(() => setOneByTwo((state) => !state), [
    setOneByTwo,
  ]);

  // personalizar el headbar de esta pantalla
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          type="clear"
          icon={<Ionicons name="menu-outline" size={20} color="white" />}
          iconRight
          title="Delito "
          onPress={toggleModal}
          titleStyle={{color: 'white'}}
        />
      ),
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

  const makeRequestToServer = () => {
    const month = listMonthsPreloaded[sliderValue - 1];
    const year = listYearsPreloaded[sliderValue - 1];
    getDataCrimeAction(selectedCrime, month, year, token);
    updateSelectedDateAction(month, year);
  };

  const onSlidingComplete = () => {
    makeRequestToServer();
    toggleChart();
  };

  const onSliderValueChange = (val) => {
    // se resta uno para que no salga del index de la lista
    setDateString(listMonthsYearStringPreloaded[val - 1]);
    setSliderValue(val);
  };

  const onPressCrime = (name, slug, img) => {
    // change the title depending on the crime
    navigation.setOptions({
      headerTitle: () => <LogoInTitle name={name} img={img} />,
    });
    toggleModal(); // close modal
    getDataCrimeAction(slug, monthSelected, yearSelected, token);
  };

  const updateIndexButtonGroup = (val) => {
    setIndexButtonGroup(val);
  };

  const renderChart = () => {
    if (dataCrime !== undefined && Object.keys(dataCrime).length !== 0) {
      switch (indexButtonGroup) {
        case 0: {
          return <Chart key="zero" options={dataCrime.data.ca} />;
        }
        case 1: {
          return <Chart key="onee" options={dataCrime.data.sixA} />;
        }
        case 2: {
          return <Chart key="twoo" options={dataCrime.data.fourA} />;
        }
        case 3: {
          return <Chart key="three" options={dataCrime.data.oneA} />;
        }
        case 4: {
          return <Chart key="four" options={dataCrime.data.sixM} />;
        }
        case 5: {
          return <Chart key="five" options={dataCrime.data.oneM} />;
        }
        case 6: {
          return (
            <View
              style={{
                overflow: 'hidden',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Chart key="six" options={dataCrime.data.versus} />
              <Chart key="seven" options={dataCrime.data.pie} />
            </View>
          );
        }
        default: {
          return <View />;
        }
      }
    }
    return <View />;
  };

  const renderTable = () => {
    if (dataCrime !== undefined && Object.keys(dataCrime).length !== 0) {
      return <Table data={dataCrime.data.table} />;
    }
    return <View />;
  };

  const renderJvectormap = () => {
    if (dataCrime !== undefined && Object.keys(dataCrime).length !== 0) {
      return <Jvectormap key="vectormap1" data={dataCrime.data.jvectormap} />;
    }
    return <View />;
  };

  const renderMunicipalityChart = () => {
    if (dataCrime !== undefined && Object.keys(dataCrime).length !== 0) {
      return <Chart key="once" options={dataCrime.data.municipality} />;
    }
    return <View />;
  };

  const renderListCrimes = () => {
    if (dataCrimes) {
      const list = dataCrimes.map((elem, i) => (
        <ListItem
          key={i.toString()}
          bottomDivider
          onPress={() => onPressCrime(elem.name, elem.slug, elem.img)}>
          <ListItem.Content>
            <Avatar source={{uri: elem.img_black}} />
            <ListItem.Title> {elem.name} </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="grey" />
        </ListItem>
      ));

      return list;
    }
    return <View />;
  };

  return (
    <View>
      <Overlay isVisible={visibleModal} onBackdropPress={toggleModal}>
        <View style={styles.containerModal}>
          <ScrollView>{renderListCrimes()}</ScrollView>
        </View>
      </Overlay>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => makeRequestToServer()}
          />
        }>
        <View style={styles.container}>
          {renderChart()}
          <ButtonGroup
            onPress={updateIndexButtonGroup}
            selectedIndex={indexButtonGroup}
            buttons={['CA', '6A', '4A', '1A', '6M', '1M', 'COMP']}
            containerStyle={styles.buttonsGroup}
            textStyle={styles.buttonsGroupText}
            selectedTextStyle={styles.buttonsGroupSelectedText}
            selectedButtonStyle={styles.buttonsGroupSelected}
            innerBorderStyle={styles.innerBorder}
            underlayColor="white" // for TouchableHighlight
            containerBorderRadius={15}
          />
          {renderTable()}
          {renderJvectormap()}
          {renderMunicipalityChart()}
        </View>
      </ScrollView>

      <MySlider
        sliderValue={sliderValue}
        totalMonths={totalMonths}
        dateString={dateString}
        onSlidingComplete={onSlidingComplete}
        onValueChange={onSliderValueChange}
      />

      {apiLoading && <Loading />}
    </View>
  );
};

SceneStatistics.propTypes = {
  getDataCrimeAction: PropTypes.func.isRequired,
  updateSelectedDateAction: PropTypes.func.isRequired,
  getMunicipalitiesAction: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  listMonthsYearStringPreloaded: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  listMonthsPreloaded: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  listYearsPreloaded: PropTypes.array.isRequired,
  totalMonths: PropTypes.number.isRequired,
  apiLoading: PropTypes.bool.isRequired,
  selectedCrime: PropTypes.string.isRequired,
  monthSelected: PropTypes.number.isRequired,
  yearSelected: PropTypes.number.isRequired,
  monthYearString: PropTypes.string.isRequired,
  dataCrime: PropTypes.shape({}).isRequired,
  getCrimesAction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dataCrimes: PropTypes.array.isRequired,
};

LogoInTitle.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  listMonthsYearStringPreloaded: state.app.listMonthsYearStringPreloaded,
  listMonthsPreloaded: state.app.listMonthsPreloaded,
  listYearsPreloaded: state.app.listYearsPreloaded,
  totalMonths: state.app.totalMonths,
  apiLoading: state.api.isFetching,
  selectedCrime: state.app.selectedCrime,
  dataCrime: state.app.dataCrime,
  dataCrimes: state.app.dataCrimes,
  monthSelected: state.app.monthSelected,
  yearSelected: state.app.yearSelected,
  monthYearString: state.app.monthYearString,
});

const mapDispatchToProps = (dispatch) => ({
  getDataCrimeAction: (crime, month, year, token) =>
    dispatch(getDataCrime(crime, month, year, token)),
  updateSelectedDateAction: (month, year) =>
    dispatch(updateSelectedDate(month, year)),
  getCrimesAction: (token) => dispatch(getCrimes({token})),
  getMunicipalitiesAction: (token) => dispatch(getMunicipalities({token})),
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneStatistics);
