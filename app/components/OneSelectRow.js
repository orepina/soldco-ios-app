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
	selectRow: {
		flexDirection: 'row',
    	justifyContent: 'space-between',
    	alignItems: 'center',
    	borderBottomWidth: 1,
		borderColor: '#c2c2ca',
		paddingRight: 20,
    	paddingLeft: 20,
	},
	textRow: {
		fontSize: 15,
	},
});


class OneSelectRow extends Component {
	constructor(props) {
		super(props);
    };

	toggleItem(){
    	this.props.onChange(this.props.rowData, this.props.rowId);
    };

    render(){
    	return (
    		<View>
		    	<TouchableHighlight onPress={this.toggleItem.bind(this)} underlayColor='#fff'>
	    			<View style={styles.selectRow}>
		    			<Text style={styles.textRow}>{this.props.rowData.name}</Text>
		    			{ this.props.rowData.selected ? 
				            <Icon name="ios-checkmark" size={20} color="#656565"/>    
				            : null 
				        }
	    			</View>
				</TouchableHighlight>
	    		<View style={styles.separator}></View>
	    	</View>
    	)
    }

};

module.exports = OneSelectRow;