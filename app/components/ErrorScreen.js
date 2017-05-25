'use strict';

import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
    	justifyContent: 'center',
		backgroundColor: '#ebeff2',
	},
	errorText: {
		marginBottom: 10,
		color: '#656565',
	},
	reloadButton: {
		height: 30,
		// width: 90,
		backgroundColor: '#337ab7',
		borderColor: '#337ab7',
		borderWidth: 1,
		borderRadius: 5,
		justifyContent: 'center'
	},
	reloadText: {
		color: 'white',
		alignSelf: 'center'
	}
})

class ErrorScreen extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<View style={styles.container}>
				<View style={styles.error}>
					<Text style={styles.errorText}>Произошла ошибка</Text>
					<TouchableHighlight style={styles.reloadButton} onPress={() => {this.props.reload()}} underlayColor='#286090'>
						<Text style={styles.reloadText}>Перезагрузить</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}

module.exports = ErrorScreen;