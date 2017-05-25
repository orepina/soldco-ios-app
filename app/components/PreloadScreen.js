'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';


var styles = StyleSheet.create({
	container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#ebeff2',
    justifyContent: 'center',
  }
})

class PreloadScreen extends Component {
	render() {
    return (
    	<View style={styles.container}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
}

module.exports = PreloadScreen;