import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Divider, Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#fff4',
    marginVertical: 5,
  },
  containerBtns: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnShare: {
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  text: {
    color: 'white',
    top: -1,
    fontSize: 16,
    paddingHorizontal: 5,
  },
});

function ShareButtons(props) {
  if (!props.share02 && !props.share01 && props.privilegeShare02) {
    return (
      <View>
        <Divider style={styles.divider} />
        <View style={styles.containerBtns}>
          <Button
            fontSize={12}
            icon={<Ionicons name="share-social" size={14} color="white" />}
            buttonStyle={styles.btnShare}
            title="Jefe"
            titleStyle={styles.text}
            onPress={() => props.onPress(props.pk, 'level02')}
            transparent
          />
        </View>
      </View>
    );
  } else if (props.share02 && !props.share01 && props.privilegeShare01) {
    return (
      <View>
        <Divider style={styles.divider} />
        <View style={styles.containerBtns}>
          <Button
            type="clear"
            titleStyle={styles.text}
            icon={<Ionicons name="share-social" size={14} color="white" />}
            buttonStyle={styles.btnShare}
            title="G.C.O"
            onPress={() => props.onPress(props.pk, 'level01')}
            transparent
          />
        </View>
      </View>
    );
  }

  return <View />;
}

export default ShareButtons;
