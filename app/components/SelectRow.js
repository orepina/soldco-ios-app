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
    	backgroundColor: '#fbfbfb',
    	borderBottomWidth: 1,
		borderColor: '#dcdcdc',
		paddingHorizontal: 25,
    	height: 25
	},
	textRow: {
		fontSize: 15,
		color: '#656565',
	},
	checkRow: {
		backgroundColor: 'transparent',
		overflow: 'hidden'
	}
});

class SelectRow extends Component {
	constructor(props) {
		super(props);
		this.state = {selected: !!this.props.rowData.selected};
    };

    toggleItem(){
    	this.setState({ selected: !this.state.selected });
    	this.props.onChange(this.props.rowId, !this.state.selected);
    };

    render(){
    	return (
    		<View>
		    	<TouchableHighlight onPress={this.toggleItem.bind(this)} underlayColor='#fff'>
	    			<View style={styles.selectRow}>
		    			<Text style={styles.textRow}>{this.props.rowData.name}</Text>
		    			{ this.state.selected ? 
				            <Icon name="ios-checkmark" size={30} color="#656565" style={styles.checkRow}/>    
				            : null 
				        }
	    			</View>
				</TouchableHighlight>
	    	</View>
    	)
    }
};

module.exports = SelectRow;