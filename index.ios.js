/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { Provider as MobXProvider, observer } from 'mobx-react/native';

import ImageCarousel from './components/Carousel';
import { LANDSCAPE, PORTRAIT } from './Constants';
import Store from './Store';

@observer
class ImgurApp extends Component {
    onLayout(event) {
        const { width, height } = event.nativeEvent.layout;
        const orientation = ( width > height ) ? LANDSCAPE : PORTRAIT;

        Store.changeOrientation(orientation);
        Store.updateScreenSize(width, height);
    }

    componentWillMount() {
        Store.fetchImages();
    }

    render() {
        return (
            <MobXProvider store={Store}>
                <View style={styles.container}
                      onLayout={this.onLayout.bind(this)}>
                    <ImageCarousel />
                </View>
            </MobXProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    empty: {
        flex: 1
    }
});

AppRegistry.registerComponent('ImgurApp', () => ImgurApp);
export default ImgurApp;
