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
  rowHighlight: {
    marginBottom: 10,
    marginLeft: 5, 
    marginRight: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(54, 64, 74, 0.05)',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
  },
  titleContainer:{
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 20,
    color: '#656565',
    fontWeight: "700",
  },
  titleAll: {
    fontSize: 15,
    color: '#656565',
    paddingLeft: 10,
    marginBottom: 2,
  },
  arrow: {   
    backgroundColor: 'transparent'
  },
  numbersContainer: {
    flexDirection: 'row',
  },
  numbers: {
    fontSize: 14,
    color: '#656565',
    paddingRight: 10
  }
});

class ListRow extends Component {
    constructor(props) {
      super(props);
      this.rowData = this.props.rowData;
    };

    goToProject(){
      var ProjectPage = this.props.routes.get('Project', this.rowData.name, {project_id: this.rowData.id});
      this.props.navigator.push(ProjectPage);
      this.props.fetchReserves(this.rowData.id, true);
      this.props.fetchFilter(this.rowData.id);
    }

    render() {
      return (
          <TouchableHighlight style={styles.rowHighlight} underlayColor='#99d9f4' onPress={this.goToProject.bind(this)}>
            <View style={styles.rowContainer}>
              <View style={styles.infoContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{this.rowData.name}</Text>
                  <Text style={styles.titleAll}>({this.rowData.reserves.all.amount})</Text>
                  </View>
                <View style={styles.numbersContainer}>
                  <Text style={styles.numbers}>День: {this.rowData.reserves.today.amount}</Text>
                  <Text style={styles.numbers}>Вчера: {this.rowData.reserves.yesterday.amount}</Text>
                  <Text style={styles.numbers}>Неделя: {this.rowData.reserves.week.amount}</Text>
                  <Text style={styles.numbers}>Месяц: {this.rowData.reserves.month.amount}</Text>
                </View>
              </View>
              <Text style={styles.arrow}> 
                <Icon name="ios-arrow-forward" size={30} color="#656565"/>
              </Text>
            </View>
          </TouchableHighlight>
      )
    }
};


module.exports = ListRow;

