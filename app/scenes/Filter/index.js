'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView
} from 'react-native';
 
import MultiSelect from '../../components/MultiSelect';
import DropDownView from '../../components/DropDownView';


var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 64,
		backgroundColor: '#ebeff2',
	},
	content: {
		paddingTop: 10
	},
});

class Filter extends Component {
	constructor(props) {
		super(props);
    };

	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.content}>
					<DropDownView header={'Здания'}><MultiSelect list={this.props.filter.buildings}/></DropDownView>
					<DropDownView header={'Этап продажи'}><MultiSelect list={this.props.filter.states}/></DropDownView>
					<DropDownView header={'Тип резерва'}><MultiSelect list={this.props.filter.reserve_types}/></DropDownView>
					<DropDownView header={'Менеджер'}><MultiSelect list={this.props.filter.users}/></DropDownView>
				</ScrollView>
			</View>
		)
	}
};

module.exports = Filter;
