'use strict';

import React, { Component } from 'react';
import {
	TouchableHighlight,
	Text,
	StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
	navigationTitle: {
	    color: '#f6f8fa',
	    fontSize: 18,
    	paddingTop: 5,
	    textShadowColor: 'black',
    	textShadowOffset: {width: 0.2, height:  0.2},
	}
});

class NavigationBarButton extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<TouchableHighlight onPress={this.props.onPress} underlayColor="transparent">
            	<Text style={styles.navigationTitle}> {this.props.title} </Text>
          	</TouchableHighlight>
		)
	}
}

module.exports = NavigationBarButton;