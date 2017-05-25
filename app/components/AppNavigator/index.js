'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight,
} from 'react-native';

import NavigationBarButton from './NavigationBarButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Routes from '../../routes.js';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    overflow: 'visible'
  },
  navigationBar: {
    flex: 1,
    backgroundColor: '#36404a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navigationTitle: {
    color: '#fff',
    fontSize: 18,
    paddingTop: 5,
    textShadowColor: 'black',
    textShadowOffset: {width: 0.2, height:  0.2},
  }
});


class AppNavigator extends Component {
  constructor(props){
    super(props);
  };

  renderScene(route, navigator){
    return <route.component style={styles.scene} navigator={navigator} routes={Routes} route={route} {...route.passProps} {...this.props.actions}/>;
  };

  configureScene(route, routeStack){
    return (route.type === 'Modal') ?
      Navigator.SceneConfigs.FloatFromBottom : Navigator.SceneConfigs.PushFromRight;
  };

  navigationBar =
    <Navigator.NavigationBar
     routeMapper = {{
      Title: (route, navigator, index, navState) => { 
        return (<Text style={styles.navigationTitle}>{route.title}</Text>); 
      },
      RightButton: (route, navigator, index, navState) => { 
        return (route.rightButtonComponent) ?
          route.rightButtonComponent(navigator, this.props.actions) : (route.onRightButtonPress) ?
            <NavigationBarButton 
              onPress={() => route.onRightButtonPress(navigator, this.props.actions)}
              title={route.rightButtonTitle}/>
            : null;
      },
      LeftButton: (route, navigator, index, navState) => {
        var title = route.leftButtonTitle || 'Назад';
        if (index > 0){
          return (
            <NavigationBarButton
              onPress={() => { 
                if (index > 0) navigator.pop();
                if (route.onLeftButtonPress) route.onLeftButtonPress(navigator, this.props.actions);
              }}
              title={title} />)
        } 
        else { return null };
      }
     }}
     style={styles.navigationBar}
    />


  render() {
    return (
      <Navigator
        initialRoute={ Routes.get(this.props.scene) }
        renderScene={ this.renderScene.bind(this) }
        navigationBar={ this.navigationBar }
        style={ styles.container }
        sceneStyle={ styles.container }
        configureScene={ this.configureScene }
      />)
    }
  
};

module.exports = AppNavigator;
