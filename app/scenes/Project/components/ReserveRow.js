'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

var moment = require('moment');
require('moment/locale/ru');

var styles = StyleSheet.create({
  rowContainer: {
    borderWidth: 1,
    borderColor: 'rgba(54, 64, 74, 0.05)',
  },
  rowHighlight: {
    backgroundColor: '#fff'
  },
  rowHeader: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
  infoLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 15,
    color: '#656565'
  },
  amountText: {
    fontSize: 18,
    fontWeight: '500'
  },
  longText: {
    fontSize: 15,
    color: '#656565',
    width: 280,
    fontWeight: '500'
  },
  detailedColor: {
    backgroundColor: '#efefef'
  },
  detailed: {
    marginBottom: 10
  },
  detailedContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(54, 64, 74, 0.05)',
  }
});

function priceFormat(n){
  return n.toFixed(0).replace(/./g, function(c, i, a) {
      return i && c !== "." && ((a.length - i) % 3 === 0) ? ' ' + c : c;
  }); 
};

class ReserveRow extends Component {
    constructor(props) {
      super(props);
      this.state = { detailed: false};
    };

    showDetailed(){
      var condition = !this.state.detailed;
      this.setState({ detailed: condition });
    };

    render() {
      return (
        <View style={[styles.rowContainer, this.state.detailed ? styles.detailed : null]}>
          <TouchableHighlight style={styles.rowHighlight} underlayColor='#ebeff2' onPress={this.showDetailed.bind(this)}>
            <View style={[styles.rowHeader, this.state.detailed ? styles.detailedColor : null]}>
              <View style={styles.infoLine}>
                <Text style={styles.longText} ellipsizeMode="tail" numberOfLines={1}>{this.props.rowData.client.fio}</Text>
                <Text style={[styles.infoText, styles.amountText]}>{priceFormat(this.props.rowData.amount)}</Text>
              </View>
              <View style={styles.infoLine}>
                <Text style={styles.infoText}>{this.props.rowData.flat.building.adres} {this.props.rowData.flat.building.number}, кв. {this.props.rowData.flat.number}</Text>
                <Text style={styles.infoText}>{(this.props.rowData.reserve_contract_status) ? this.props.rowData.reserve_contract_status.name : ''}</Text>
              </View>
            </View>
          </TouchableHighlight>
          { this.state.detailed ? 
            <View style={[styles.detailedContainer, styles.detailedColor]}>
              <Text style={styles.infoText}>Телефон: {this.props.rowData.client.phone}</Text>
              <Text style={styles.infoText}>Этап: {this.props.dict.states[this.props.rowData.reserve_contract_state]}</Text>
              <Text style={styles.infoText}>Номер контракта: {this.props.rowData.reserve_contract}</Text>
              <Text style={styles.infoText}>Дата контракта: {moment( this.props.rowData.reserve_contract_date).format('DD.MM.YYYY')} </Text>
              <Text style={styles.infoText}>Менеджер: {this.props.dict.users[this.props.rowData.user]}</Text>
              <Text style={styles.infoText}>Клиент: {this.props.rowData.client.fio}</Text>
            </View>
            : null 
          }
        </View>
      )
    }
};

module.exports = ReserveRow;
