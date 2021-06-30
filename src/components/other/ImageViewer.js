import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ImageDescription extends Component {
  state = {
    isModalOpen: false,
    loading: true,
  };

  arrowLeft() {
    if (this.props.carousel) {
      return <Ionicons name={'chevron-back-outline'} size={30} color="white" />;
    }
    return null;
  }

  arrowRight() {
    if (this.props.carousel) {
      return (
        <Ionicons name={'chevron-forward-outline'} size={30} color="white" />
      );
    }
    return null;
  }

  _renderImg() {
    return (
      <Image
        style={[{flex: 1}, this.props.carousel && styles.container]}
        height={this.props.height}
        width={this.props.width}
        resizeMode={this.props.resizeMode}
        source={
          this.props.carousel
            ? {uri: this.props.image[this.props.id]}
            : {uri: this.props.image}
        }
        onLoadStart={() => this.setState({loading: true})}
        onLoad={() => this.setState({loading: false})}
        onLoadEnd={() => this.setState({loading: false})}
      />
    );
  }

  render() {
    let img;
    if (!this.props.carousel) {
      img = [
        {
          width: Dimensions.get('window').width,
          url: this.props.image,
          freeHeight: true,
        },
      ];
    } else {
      img = this.props.image.map((path) => {
        return {
          width: Dimensions.get('window').width,
          url: path,
          freeHeight: true,
        };
      });
    }

    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({isModalOpen: true})}>
          {this.props.loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            this._renderImg()
          )}
        </TouchableOpacity>

        <Modal visible={this.state.isModalOpen} transparent={false}>
          <ImageViewer
            index={this.props.id || 0}
            imageUrls={img}
            onSwipeDown={() => this.setState({isModalOpen: false})}
            enableSwipeDown
            enablePreload={this.props.enablePreload}
            pageAnimateTime={400}
            backgroundColor="black"
            renderArrowLeft={() => this.arrowLeft()}
            renderArrowRight={() => this.arrowRight()}
            menus={() => this.setState({isModalOpen: false})}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
  divider: {
    backgroundColor: '#e5e5e5',
    marginVertical: 10,
  },
});

export default ImageDescription;
