'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native'; 

import AuthForm from './components/AuthForm';

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    backgroundColor: '#ebeff2',
    flex: 1,
    justifyContent: 'flex-start',
  },
});


class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <AuthForm navigator={this.props.navigator} routes={this.props.routes}/>
      </View>
    );
  };
};

module.exports = Login;

