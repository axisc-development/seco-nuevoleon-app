import React from 'react';
import {Text, View, Switch, StyleSheet, Image} from 'react-native';
import {Divider} from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 15,
    paddingVertical: 8,
  },
  text: {
    alignSelf: 'center',
    color: '#ddd',
  },
  switch: {
    transform: [{scaleX: 1}, {scaleY: 1}],
  },
});

const design = {
  trackColor: {
    true: 'green',
    false: 'grey',
  },
};

const renderImage = (img) => {
  if (img) {
    return <Image style={{width: 25, height: 25}} source={{uri: img}} />;
  }
  return null;
};

function ScSwitch({index, img, pkey, text, value, section, onValueChange}) {
  return (
    <View>
      {index !== 0 && <Divider style={{backgroundColor: '#fff4'}} />}
      <View style={styles.container}>
        {renderImage(img)}
        <Text key={pkey} style={styles.text}>
          {text}
        </Text>
        <Switch
          value={value}
          onValueChange={
            section
              ? (value) =>
                  onValueChange({
                    pkey,
                    value,
                    section,
                  })
              : (value) =>
                  onValueChange({
                    pkey,
                    value,
                  })
          }
          trackColor={design.trackColor}
          style={styles.switch}
        />
      </View>
      {index === -1 && <Divider style={{backgroundColor: 'grey'}} />}
    </View>
  );
}

export default ScSwitch;
