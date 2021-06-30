import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Divider, Button} from 'react-native-elements';

import murderMafiaIcon from '../../../assets/img/icons/homicidio_cv.png';
import murderIcon from '../../../assets/img/icons/homicidio_sv.png';
import murderWomenICon from '../../../assets/img/icons/feminicidio.png';
import kidnapIcon from '../../../assets/img/icons/secuestro.png';
import extorsionIcon from '../../../assets/img/icons/extorsion.png';
import houseRobberyIcon from '../../../assets/img/icons/casa.png';
import subjects from '../../../assets/img/icons/detencionsujetosmark.png';
import store from '../../../assets/img/icons/negocio_sv.png';
import storeViolent from '../../../assets/img/icons/negocio_cv.png';
import violenciafamiliarIcon from '../../../assets/img/icons/violenciafamiliar.png';
import ImageViewer from '../../components/other/ImageViewer';
import Loading from '../../components/other/Loading';

import {getMarkers} from '../../redux/actions/app.actions';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYXhpc2NkZXYiLCJhIjoiY2tldDVsN202MWpoNDMzcXZlZW1sZTY3eiJ9.ijXx60sGb3_Baiwcl_UJiQ',
);

const styles = StyleSheet.create({
  miniDetail: {
    padding: 10,
    width: '100%',
    shadowRadius: 12,
    shadowOffset: {
      height: 10,
    },
    shadowColor: 'black',
    elevation: 25, // <- specific to android so it handles shadow
    shadowOpacity: 0.3,
    backgroundColor: '#000',
    position: 'absolute',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 0.5,
    top: 0,
  },
  label: {
    color: 'white',
  },
  value: {
    paddingLeft: 5,
    color: '#ddd',
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCard: {
    alignItems: 'center',
    marginTop: 10,
  },
  divider: {
    backgroundColor: 'grey',
    marginVertical: 5,
  },
});

const layerStyles = {
  icon: {
    iconIgnorePlacement: true,
    iconSize: Platform.OS === 'android' ? 0.8 : 1,
    iconOffset: [0, -7],
  },
  polygon: {
    visibility: true,
    fillColor: '#fff',
    fillOutlineColor: '#000',
    fillOpacity: 0.95,
  },
  murder: {
    iconImage: murderIcon,
  },
  murderMafia: {
    iconImage: murderMafiaIcon,
  },
  murderWomen: {
    iconImage: murderWomenICon,
  },
  kidnap: {
    iconImage: kidnapIcon,
  },
  violenciafamiliar: {
    iconImage: violenciafamiliarIcon,
  },
  extorsion: {
    iconImage: extorsionIcon,
  },
  houseRobbery: {
    iconImage: houseRobberyIcon,
  },
  subjects: {
    iconImage: subjects,
  },
  store: {
    iconImage: store,
  },
  storeViolent: {
    iconImage: storeViolent,
  },
};

function Card({info, mode, onPress}) {
  const [showCarousel, setShowCarousel] = React.useState(false);

  const renderImages = (images) => {
    const imagesComponents = images.map((item, index) => (
      <ImageViewer
        key={`image${index}`}
        id={index}
        showThumbnail
        carousel
        enablePreload
        openCarousel={() => setShowCarousel(true)}
        onCloseCarousel={() => setShowCarousel(false)}
        showCarousel={showCarousel}
        image={images}
        resizeMode="cover"
        height={100}
        width={100}
      />
    ));

    return (
      <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
        <Text style={styles.label}>Evidencia Fotográfica:</Text>
        <ScrollView horizontal>{imagesComponents}</ScrollView>
      </View>
    );
  };

  if (mode === 'mini') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.miniDetail}
        onPress={onPress}>
        <View>
          <View style={styles.rowStyle}>
            <Text style={styles.label}>Tipo:</Text>
            <Text style={styles.value}>{info.delito.toUpperCase()}</Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.label}>Folio:</Text>
            <Text style={styles.value}>{info.folio.toUpperCase()}</Text>
          </View>
          <View style={styles.iconCard}>
            <Ionicons
              name="chevron-down-outline"
              size={20}
              style={{color: '#ddd'}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (mode === 'poly') {
    return (
      <View style={styles.miniDetail}>
        <View style={styles.rowStyle}>
          <Text style={styles.label}>Municipio:</Text>
          <Text style={styles.value}>{info.municipality.toUpperCase()}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.label}>Colonia:</Text>
          <Text style={styles.value}>{info.colony.toUpperCase()}</Text>
        </View>
        {info.lost.hasOwnProperty('cv_rv') && (
          <View style={styles.rowStyle}>
            <Text style={styles.label}>Con violencia:</Text>
            <Text style={styles.value}>{info.lost.cv_rv}</Text>
          </View>
        )}
        {info.lost.hasOwnProperty('sv_rv') && (
          <View style={styles.rowStyle}>
            <Text style={styles.label}>Sin violencia:</Text>
            <Text style={styles.value}>{info.lost.sv_rv}</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.miniDetail}
      onPress={onPress}>
      <View style={styles.rowStyle}>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{info.delito.toUpperCase()}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.label}>Folio:</Text>
        <Text style={styles.value}>{info.folio.toUpperCase()}</Text>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.rowStyle}>
        <Text style={styles.label}>Categoria:</Text>
        <Text style={styles.value}>{info._categoria}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{info.fecha}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.label}>Dependencia:</Text>
        <Text style={styles.value}>{info.dependencia}</Text>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.rowStyle}>
        <Text style={styles.label}>Municipio:</Text>
        <Text style={styles.value}>{info.municipio}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.label}>Colonia:</Text>
        <Text style={styles.value}>{info.colonia}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text style={styles.label}>Perdidas:</Text>
        <Text style={styles.value}>{info.perdidas}</Text>
      </View>
      <Divider style={styles.divider} />

      <Text style={styles.label}>Descripcion:</Text>
      <Text style={styles.label}>{info.descripcion.text}</Text>
      <Divider style={styles.divider} />

      {info.descripcion.list_photos.length > 0 &&
        renderImages(info.descripcion.list_photos)}

      <View style={styles.iconCard}>
        <Ionicons name="chevron-up-outline" size={20} style={{color: '#ddd'}} />
      </View>
    </TouchableOpacity>
  );
}

const SceneMap = ({
  navigation,
  // variables
  dataCrimesSelected,
  dataDatesSelected,
  dataMarkers,
  dataMunicipalitiesSelected,
  token,
  apiLoading,
  yearSelected,
  // actions
  getMarkersAction,
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
    getMarkersAction(
      token,
      dataCrimesSelected.toString(),
      dataDatesSelected.toString(),
      yearSelected,
      dataMunicipalitiesSelected.toString(),
    );
  }, [
    JSON.stringify(dataCrimesSelected),
    JSON.stringify(dataDatesSelected),
    JSON.stringify(dataMunicipalitiesSelected),
    yearSelected,
  ]);

  const [bounds, setBounds] = React.useState({
    ne: [0, 0],
    sw: [0, 0],
  });
  const [centerCoordinates, setCenterCoordinates] = React.useState([
    -100.316719,
    25.684355,
  ]);

  const [mapZoomLevel, setMapZoomLevel] = React.useState(8.5);
  const [detailMarker, setDetailMarker] = React.useState({});
  const [modeDetail, setModeDetail] = React.useState('close'); // or mini or large

  const onPressCard = (mode) => {
    if (mode === 'mini') {
      setModeDetail('large');
    } else {
      setModeDetail('mini');
    }
  };

  const renderInfoCard = () => {
    if (modeDetail === 'close') {
      return null;
    }

    return (
      <Card
        info={detailMarker}
        mode={modeDetail}
        onPress={() => onPressCard(modeDetail)}
      />
    );
  };

  const findBounds = (points) => {
    const n = points.length;
    if (n === 0) {
      return [];
    }
    const d = points[0].length;
    const lo = points[0].slice();
    const hi = points[0].slice();
    for (let i = 1; i < n; ++i) {
      const p = points[i];
      for (let j = 0; j < d; ++j) {
        const x = p[j];
        lo[j] = Math.min(lo[j], x);
        hi[j] = Math.max(hi[j], x);
      }
    }
    return [lo, hi];
  };

  const flyTo = (event) => {
    const {features, coordinates} = event;
    const marker = features[0];
    const {longitude, latitude} = marker.properties;

    if (marker.geometry.type === 'Polygon') {
      setCenterCoordinates([coordinates.longitude, coordinates.latitude]);
      setDetailMarker(marker.properties);
      setModeDetail('poly');
    } else {
      setCenterCoordinates([longitude, latitude]);
      setDetailMarker(marker.properties);
      setModeDetail('mini');
    }
    setMapZoomLevel(14);
  };

  const opPressMap = () => {
    setModeDetail('close');
  };

  return (
    <View style={{flex: 1}}>
      <MapboxGL.MapView
        style={{flex: 1, width: '100%'}}
        styleURL={MapboxGL.StyleURL.Street}
        showUserLocation
        onPress={opPressMap}>
        <MapboxGL.Camera
          animationMode="flyTo"
          animationDuration={2000}
          bounds={bounds}
          centerCoordinate={centerCoordinates}
          zoomLevel={mapZoomLevel}
        />
        <MapboxGL.ShapeSource
          id="vehicles"
          shape={{
            type: 'FeatureCollection',
            // features: this.props.onlyToday
            //   ? this.props.todaysMarkers
            //   : this.props.markers,
            features: dataMarkers,
          }}
          onPress={flyTo}>
          <MapboxGL.FillLayer
            id="grandTheftAuto"
            filter={['==', 'delito', 'vehiculo']}
            style={{
              fillColor: ['get', 'fillColor'],
              fillOpacity: ['get', 'fillOpacity'],
              fillOutlineColor: ['get', 'fillOutlineColor'],
            }}
            sourceLayerID="felonies"
          />
        </MapboxGL.ShapeSource>
        <MapboxGL.ShapeSource
          id="felonies"
          shape={{
            type: 'FeatureCollection',
            // features: this.props.onlyToday
            //   ? this.props.todaysMarkers
            //   : this.props.markers,
            features: dataMarkers,
          }}
          onPress={flyTo}>
          <MapboxGL.SymbolLayer
            id="murderMafia"
            style={{
              ...layerStyles.icon,
              ...layerStyles.murderMafia,
            }}
            filter={['==', 'categoria', 'hdo']}
          />
          <MapboxGL.SymbolLayer
            id="murder"
            style={{
              ...layerStyles.icon,
              ...layerStyles.murderMafia,
            }}
            filter={['==', 'categoria', 'af']}
          />
          <MapboxGL.SymbolLayer
            id="otherMurder"
            style={{
              ...layerStyles.icon,
              ...layerStyles.murder,
            }}
            filter={['==', 'categoria', 'other_hom']}
          />
          <MapboxGL.SymbolLayer
            id="otherMurder2"
            style={{
              ...layerStyles.icon,
              ...layerStyles.murder,
            }}
            filter={['==', 'categoria', 'ne']}
          />
          <MapboxGL.SymbolLayer
            id="murderWeapon"
            style={{
              ...layerStyles.icon,
              ...layerStyles.murder,
            }}
            filter={['==', 'categoria', 'ab']}
          />
          <MapboxGL.SymbolLayer
            id="murderWomen"
            style={{
              ...layerStyles.icon,
              ...layerStyles.murderWomen,
            }}
            filter={['==', 'categoria', 'fmno']}
          />
          <MapboxGL.SymbolLayer
            id="kidnap"
            style={{
              ...layerStyles.icon,
              ...layerStyles.kidnap,
            }}
            filter={['==', 'delito', 'secuestro']}
          />
          <MapboxGL.SymbolLayer
            id="violenciafamiliar"
            style={{
              ...layerStyles.icon,
              ...layerStyles.violenciafamiliar,
            }}
            filter={['==', 'delito', 'violenciafamiliar']}
          />
          <MapboxGL.SymbolLayer
            id="houseRobbery"
            style={{
              ...layerStyles.icon,
              ...layerStyles.houseRobbery,
            }}
            filter={['==', 'delito', 'casa']}
          />
          <MapboxGL.SymbolLayer
            id="extorsion"
            style={{
              ...layerStyles.icon,
              ...layerStyles.extorsion,
            }}
            filter={['==', 'delito', 'extorsion']}
          />
          <MapboxGL.SymbolLayer
            id="store"
            style={{
              ...layerStyles.icon,
              ...layerStyles.store,
            }}
            filter={['==', 'categoria', 'sv_rn']}
          />
          <MapboxGL.SymbolLayer
            id="storeViolent"
            style={{
              ...layerStyles.icon,
              ...layerStyles.storeViolent,
            }}
            filter={['==', 'categoria', 'cv_rn']}
          />
          <MapboxGL.SymbolLayer
            id="subjects"
            style={{
              ...layerStyles.icon,
              ...layerStyles.subjects,
            }}
            filter={['==', 'delito', 'detencion']}
          />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
      {renderInfoCard()}
      {apiLoading && <Loading />}
    </View>
  );
};

SceneMap.propTypes = {
  token: PropTypes.string.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  apiLoading: PropTypes.bool.isRequired,
  yearSelected: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dataMarkers: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dataCrimesSelected: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dataDatesSelected: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dataMunicipalitiesSelected: PropTypes.array.isRequired,
  getMarkersAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  apiLoading: state.api.isFetching,
  yearSelected: state.app.yearSelected,
  dataCrimesSelected: state.app.dataCrimesSelected,
  dataMarkers: state.app.dataMarkers,
  dataDatesSelected: state.app.dataDatesSelected,
  dataMunicipalitiesSelected: state.app.dataMunicipalitiesSelected,
});

const mapDispatchToProps = (dispatch) => ({
  getMarkersAction: (token, crimes, dates, year, municipalities) =>
    dispatch(
      getMarkers({
        token,
        crimes,
        dates,
        year,
        municipalities,
      }),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneMap);
