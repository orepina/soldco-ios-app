import React, { Component } from 'react';
import {
	Text,
	View,
	TextInput,
	StyleSheet
} from 'react-native'; 

import Api from '../../../services/api.js';
import LoginButton from './LoginButton.js';

var styles = StyleSheet.create({
  form: {
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 36,
    padding: 4,
    paddingLeft: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#c2c2ca',
    borderRadius: 5,
    color: '#656565',
    backgroundColor: 'white',
    margin: 10
  }
});

class AuthForm extends Component {
		constructor(props){
			super(props);
			this.state = { 
				username: '', password: '',
				isLoading: false,
				isError: false,
				isValid: true
			};
		};

		goToMainPage(){
			var MainPage = this.props.routes.get('Main')
			this.props.navigator.resetTo(MainPage) 
		};

		_notEmpty(srt){
			return (srt.trim().length > 0);
		}

		validate(username, password){
			var isValid = this._notEmpty(username) && this._notEmpty(password);
			this.setState({isValid: isValid});
		};

		login(){
			var body = { username: this.state.username, password: this.state.password };
			this.setState({isLoading: true, isError: false})
			Api.login(body,
				(data) => {
					this.setState({isLoading: false, isError: false})
					this.goToMainPage();
				},
				(error) => {
					this.setState({isLoading: false, isError: true})
				});
		};

		render() {
			return (
				<View style={styles.form}>
					<TextInput
						style={styles.input}
						placeholder="Имя пользователя"
						onChangeText={(username) => { this.setState({username}); this.validate(username, this.state.password)}}
						value={this.state.username}
					/>
					<TextInput
						style={styles.input}
						placeholder="Пароль"
						secureTextEntry={true}
						onChangeText={(password) => { this.setState({password}); this.validate(this.state.username, password)}}
						value={this.state.password}
					/>
					<LoginButton 
						onPress={this.login.bind(this)}
						isValid={this.state.isValid} 
						isLoading={this.state.isLoading}
					/>
					{ this.state.isError ? <Text>Неправильный логин или пароль</Text> : null }
				</View>
			);
		}
};

module.exports = AuthForm;

