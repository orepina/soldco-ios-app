'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';

import ErrorScreen from './ErrorScreen';
import PreloadScreen from'./PreloadScreen';

class SceneState extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (this.props.isLoading) ? 
			(<PreloadScreen/>) : 
			(this.props.isError) ?
				(<ErrorScreen reload={this.props.reload}/>) : 
				(<View style={{flex: 1}}>{this.props.children}</View>) 
	}
}

module.exports = SceneState;