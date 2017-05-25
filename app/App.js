'use strict';

import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import AppContainer from './AppContainer';

import { Provider } from 'react-redux';
import { store } from './redux/configureStore';

StatusBar.setBarStyle('light-content', true);

class App extends Component {
	render(){
		return (
			<Provider store={store}>
				<AppContainer/>
			</Provider>
		)
	}
}

module.exports = App;
