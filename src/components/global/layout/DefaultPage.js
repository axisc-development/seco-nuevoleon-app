import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroller: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const DefaultPage = ({children}) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroller}>
          {children}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

DefaultPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultPage;
