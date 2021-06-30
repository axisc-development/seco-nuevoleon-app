import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {navigationRef} from './RootNavigation';
import SceneSplash from '../scenes/auth/sceneSplash';
import SceneLogin from '../scenes/auth/sceneLogin';

import SceneStatistics from '../scenes/app/sceneStatistics';
import SceneNewEvent from '../scenes/app/sceneNewEvent';
import SceneListEvents from '../scenes/app/sceneListEvents';
import SceneCorporations from '../scenes/app/sceneCorporations';

import SceneMap from '../scenes/app/sceneMap';
import SceneCrime from '../scenes/app/sceneCrime';
import SceneMunicipality from '../scenes/app/sceneMunicipality';
import SceneDate from '../scenes/app/sceneDate';
import CustomIcon from '../components/other/CustomIcon';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: '#fff',
    background: '#131313',
    card: '#000',
    text: '#fff',
    border: '#484545',
    notification: '#fff',
  },
};

function ChartStackScreen() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Gráficas" component={SceneStatistics} />
    </Stack.Navigator>
  );
}

function NewEventScreen() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Nuevo evento" component={SceneNewEvent} />
    </Stack.Navigator>
  );
}

function ListEventsScreen() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Eventos relevantes" component={SceneListEvents} />
    </Stack.Navigator>
  );
}

function CorporationsScreen() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Corporaciones" component={SceneCorporations} />
    </Stack.Navigator>
  );
}

function MapScreen() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Mapa" component={SceneMap} />
    </Stack.Navigator>
  );
}

function CrimeScreen() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Delitos" component={SceneCrime} />
    </Stack.Navigator>
  );
}

function MunicipalityScreen() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Municipios" component={SceneMunicipality} />
    </Stack.Navigator>
  );
}

function DateScreen() {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Fecha" component={SceneDate} />
    </Stack.Navigator>
  );
}

function MapBottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          // iconos de tab-bottom-nav
          if (route.name === 'Crimen') {
            iconName = focused ? 'skull' : 'skull-outline';
          } else if (route.name === 'Municipality') {
            iconName = focused ? 'flag' : 'flag-outline';
          } else if (route.name === 'Date') {
            iconName = focused ? 'today' : 'today-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'location' : 'location-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        labelStyle: {
          top: -3,
          fontSize: 11,
        },
        tabStyle: {
          top: -2,
        },
      }}>
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Ver',
        }}
      />
      <Tab.Screen
        name="Crimen"
        component={CrimeScreen}
        options={{
          tabBarLabel: 'Delitos',
        }}
      />
      <Tab.Screen
        name="Municipality"
        component={MunicipalityScreen}
        options={{
          tabBarLabel: 'Municipios',
        }}
      />
      <Tab.Screen
        name="Date"
        component={DateScreen}
        options={{
          tabBarLabel: 'Fechas',
        }}
      />
    </Tab.Navigator>
  );
}

function MainBottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          // iconos de tab-bottom-nav
          if (route.name === 'Graph') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'NewEvent') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'mail-open' : 'mail-outline';
            return <CustomIcon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Options') {
            iconName = focused ? 'options' : 'options-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        labelStyle: {
          top: -3,
          fontSize: 11,
        },
        tabStyle: {
          top: -2,
        },
      }}>
      <Tab.Screen
        name="Graph"
        component={ChartStackScreen}
        options={{
          tabBarLabel: 'Gráficas',
        }}
      />
      <Tab.Screen
        name="NewEvent"
        component={NewEventScreen}
        options={{
          tabBarLabel: 'Nuevo',
        }}
      />
      <Tab.Screen
        name="Events"
        component={ListEventsScreen}
        options={{
          tabBarLabel: 'Eventos',
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapBottomTabNavigator}
        options={{
          tabBarLabel: 'Mapa',
        }}
      />
      <Tab.Screen
        name="Options"
        component={CorporationsScreen}
        options={{
          tabBarLabel: 'Opciones',
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={MainBottomTabNavigator} />
      <Drawer.Screen name="Cerrar sesión" component={SceneLogin} />
    </Drawer.Navigator>
  );
}

const Navigation = ({isUserLoggedIn}) => (
  <SafeAreaProvider>
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        {isUserLoggedIn ? (
          // App Tab
          <>
            <Stack.Screen name="SplashApp" component={SceneSplash} />
            <Stack.Screen name="App" component={DrawerNavigator} />
          </>
        ) : (
          // Auth Stack
          <>
            <Stack.Screen name="Splash" component={SceneSplash} />
            <Stack.Screen name="Login" component={SceneLogin} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

Navigation.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Navigation);
