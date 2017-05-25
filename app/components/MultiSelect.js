'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	ListView
} from 'react-native';

import SelectRow from './SelectRow.js';

var styles = StyleSheet.create({
	
});

class MultiSelect extends Component {
	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {dataSource: dataSource.cloneWithRows(this.props.list)};
    };

    selectedChange(index, selected){
    	this.props.list[index].selected = selected;
    };

    render() {
		return (
			<ListView
				scrollEnabled={false}
			 	removeClippedSubviews={false}
            	dataSource={this.state.dataSource}
            	enableEmptySections={true}
            	renderRow={(rowData, colId, rowId) => <SelectRow rowData={rowData} onChange={this.selectedChange.bind(this)} rowId={rowId}/>}
            />
		)
	};
};

module.exports = MultiSelect;
