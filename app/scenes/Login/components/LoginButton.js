import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableHighlight,
	StyleSheet,
	ActivityIndicator,
} from 'react-native'; 

var styles = StyleSheet.create({
	button: {
		marginTop: 15,
		height: 36,
		width: 90,
		backgroundColor: '#576675',
		borderColor: '#576675',
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 10,
		justifyContent: 'center'
	},
	buttonDisabled: {
		backgroundColor: '#d4dae0',
		borderColor: '#576675',
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	}
});

function buttonDisabled(obj){
	return (!obj.isValid || obj.isLoading);
}

class LoginButton extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<View>
				<TouchableHighlight 
					style={[styles.button, (buttonDisabled(this.props)) ? styles.buttonDisabled : {}]}
					disabled={(buttonDisabled(this.props))} 
					underlayColor='#414d58' 
					onPress={this.props.onPress}>
					{
						(!this.props.isLoading) ? 
							<Text style={styles.buttonText}>Войти</Text> :
							<View><ActivityIndicator size="small"/></View>
					}
				</TouchableHighlight>
			</View>
		)
	}
}

module.exports = LoginButton;

