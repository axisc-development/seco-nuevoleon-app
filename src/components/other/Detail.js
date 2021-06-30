import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

const BASE_PADDING = 10;
const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: BASE_PADDING,
    alignContent: 'flex-start',
  },
  containerUser: {
    marginHorizontal: BASE_PADDING / 2,
    justifyContent: 'center',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 4,
    paddingLeft: 5,
  },
  imgProfile: {
    flex: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: 'white',
  },
  subtitle: {
    fontSize: 11,
    color: '#ddd',
    marginVertical: 5,
  },
  position: {
    fontWeight: '200',
    fontSize: 10,
    color: '#ddd',
  },
});

function render(text, style) {
  if (text) {
    return <Text style={style}>{text}</Text>;
  }
  return <View />;
}

function Detail(props) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.left}>
          <Image
            style={styles.imgProfile}
            resizeMode="contain"
            source={{uri: props.image}}
          />
        </View>
        <View style={[styles.right, styles.containerUser]}>
          <Text style={styles.title}>{props.title}</Text>
          {render(props.subtitle, styles.subtitle)}
          {render(props.position, styles.position)}
        </View>
      </View>
    </View>
  );
}

export default Detail;
