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
	dropDown: {
		paddingHorizontal: 5,
	},
	dropDownHeader: {
		flexDirection: 'row',
    	justifyContent: 'space-between',
    	alignItems: 'center',
    	paddingHorizontal: 15,
    	paddingVertical: 3,
    	backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderColor: '#c2c2ca'
	},
	dropDownText: {
		fontSize: 18,
		color: '#656565',
		fontWeight: "500",
	},
	dropDownArrow: {
		backgroundColor: 'transparent'
	},
	dropDownList: {
		marginBottom: 5
	}
});

class DropDownView extends Component {
	constructor(props) {
		super(props);
		this.state = {open: false};
	};

	toggleItem(){
		this.setState({open: !this.state.open});
	};

	render() {
		return (
			<View style={styles.dropDown}>
				<TouchableHighlight onPress={this.toggleItem.bind(this)} underlayColor='#fff'>
					<View style={styles.dropDownHeader}>
						<Text style={styles.dropDownText}>{ this.props.header }</Text>
						<Text style={styles.dropDownArrow}>
							{ this.state.open ? 
						    	<Icon name="ios-arrow-up" size={23} color="#656565"/> :
						    	<Icon name="ios-arrow-down" size={23} color="#656565"/>
							}
						</Text>
					</View>
				</TouchableHighlight>
				{ this.state.open ? 
					<View style={styles.dropDownList}>{ this.props.children }</View> : null
				}
			</View>
		)
	}
};

module.exports = DropDownView;

