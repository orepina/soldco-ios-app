'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	ListView
} from 'react-native';

import OneSelectRow from './OneSelectRow';

var styles = StyleSheet.create({});

class OneSelect extends Component {
	constructor(props){
		super(props);
		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {dataSource: dataSource.cloneWithRows(this.props.list)};
		this.selected_id = null;
	}

	selectedChange(item, rowId){
		this.props.selected = item;
		this.props.list[rowId].selected = true;
		var new_list = this.props.list.slice();
		this.setState({dataSource: dataSource.cloneWithRows(new_list)});
    };

	render(){
		return (
			<ListView
				scrollEnabled={false}
			 	removeClippedSubviews={false}
            	dataSource={this.state.dataSource}
            	renderRow={(rowData, colId, rowId) => 
            		<OneSelectRow rowData={rowData} onChange={this.selectedChange.bind(this)} rowId={rowId}/>}
            />

		)
	}
};

module.exports = OneSelect;