import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

import myHtmlFileIos from './jvectormap.html';

const myHtmlFileAndroid = {uri: 'file:///android_asset/jvectormap.html'};

const generateOnMessageFunction = (data) =>
  `(function() {
    window.WebViewBridge.onMessage(${JSON.stringify(data)});
  })()`;

export default class App extends React.Component {
  componentDidUpdate() {
    this.postMessageTest(this.props.data);
  }

  postMessageTest(data) {
    this.webref.injectJavaScript(generateOnMessageFunction(data));
  }

  getFile() {
    if (Platform.OS === 'ios') {
      return myHtmlFileIos;
    }
    return myHtmlFileAndroid;
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={(r) => (this.webref = r)}
          source={this.getFile()}
          onMessage={(event) => {
            console.log(event.nativeEvent.data);
          }}
          onLoadEnd={() => {
            this.postMessageTest(this.props.data);
          }}
          originWhitelist={['*']}
          javaScriptEnabled
          scrollEnabled={false}
          domStorageEnabled
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 300,
    width: Dimensions.get('window').width,
    marginBottom: 15,
  },
});
