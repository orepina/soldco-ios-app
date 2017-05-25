'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

var styles = StyleSheet.create({
  monthFilter: {
    flexDirection: 'row',
    height: 35,
    backgroundColor: '#c9d1e2',
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  monthTitle: {
    alignItems: 'center',  
    flex: 2
  },
  monthTitleText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#424141',
    textShadowColor: 'white',
    textShadowOffset: {width: 0.2, height:  0.2},
  },
  monthButton: {
    flex: 1
  },
  monthButtonRight: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingRight: 20,
    alignItems: 'center', 
  },
  monthButtonLeft: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center', 
  },
});

var moment = require('moment');
require('moment/locale/ru');

class MonthFilter extends Component {

    constructor(props) {
      super(props);
      this.day = moment();
      this.state = this._setDate();
    };

    _setDate(){
      return {
        month: this.day.month(this.day.month()).format("MMMM"),
        year: this.day.year()
      }
    };

    setPrevious(){
      this.day.add(-1, 'months'); 
      this.setState(this._setDate());
      this.props.onChange(this.day)
    };

    setNext(){
      this.day.add(1, 'months'); 
      this.setState(this._setDate());
      this.props.onChange(this.day)
    };

    render() {
      return (
        <View style={styles.monthFilter}>
          <TouchableHighlight style={[styles.monthButton, styles.monthButtonLeft]} underlayColor='transparent' onPress={this.setPrevious.bind(this)}>
            <Text>
              <Icon name="ios-arrow-back" size={25} color="#656565"/>
            </Text>
          </TouchableHighlight>
          <View style={styles.monthTitle}>
            <Text style={styles.monthTitleText}>{this.state.month} {this.state.year}</Text>
          </View>
          <TouchableHighlight style={[styles.monthButton, styles.monthButtonRight]} underlayColor='transparent' onPress={this.setNext.bind(this)}>
            <Text>
              <Icon name="ios-arrow-forward" size={25} color="#656565"/>
            </Text>    
          </TouchableHighlight>      
        </View>
      )
    };
};

module.exports = MonthFilter;