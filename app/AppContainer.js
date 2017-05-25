'use strict';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './redux/actions';

import PreloadScreen from './components/PreloadScreen';
import AppNavigator from './components/AppNavigator';
import Api from './services/api';

class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = { scene: null };
  }

  componentWillMount(){
    Api.isAuth((isAuth) => { 
      var scene = (isAuth) ? 'Main' : 'Login';
      this.setState({scene: scene});
    });
  }

  render() {
    return (this.state.scene) ? (<AppNavigator scene={this.state.scene} actions={this.props}/>) : (<PreloadScreen/>)
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
