import React, {Component} from 'react';
import {View, Dimensions, Platform} from 'react-native';
import {WebView} from 'react-native-webview';

// const TableHTML =
//   Platform.OS === 'ios'
//     ? require('./table.html')
//     : { uri: 'file:///android_asset/table.html' };

import TableHTMLIos from './table.html';

const TableHTMLAndroid = {uri: 'file:///android_asset/table.html'};

const generateOnMessageFunction = (data) =>
  `(function() {
    window.WebViewBridge.onMessage(${JSON.stringify(data)});
  })()`;

class Table extends Component {
  componentDidUpdate() {
    this.postMessageTest(this.props.data);
  }

  postMessageTest(data) {
    this.webref.injectJavaScript(generateOnMessageFunction(data));
  }

  getFile() {
    if (Platform.OS === 'ios') {
      return TableHTMLIos;
    }
    return TableHTMLAndroid;
  }

  render() {
    return (
      <View
        style={{
          height: 150,
          width: Dimensions.get('window').width,
        }}>
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

export default Table;
