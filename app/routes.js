'use strict';

import React from 'react';
import { Text, TouchableHighlight, ActivityIndicator } from 'react-native';
import NavigationBarButton from './components/AppNavigator/NavigationBarButton';

import CookieManager from 'react-native-cookies';

import Main from './scenes/Main';
import Login from './scenes/Login';
import Project from './scenes/Project';
import Filter from './scenes/Filter';
import Api from './services/api';


var Routes = function(){ 
	var Pages = {
		'Login': {
			title: 'Авторизация', 
			component: Login
		},
		'Main': { 
			title: 'Солд', 
			component: Main, 
			rightButtonTitle: 'Выйти',
			onRightButtonPress: function(navigator, actions){ 
				logOut(navigator);
			}
		},
		'Project': { 
			component: Project,
			rightButtonTitle: 'Фильтр',
			onRightButtonPress: function(navigator, actions){  
				actions.setFilter();
				navigator.push(Pages['Filter']);
			},
			rightButtonComponent: function(navigator, actions){
				return (actions.isFilterLoading) ?
					(<ActivityIndicator size="small" style={{paddingTop: 10, paddingRight: 15}}/>) :
					(actions.isFilterError) ? 
					(<NavigationBarButton 
						onPress={() => {actions.fetchFilter(actions.project_id)}}
						title={'Ошибка'} />) :
	                (<NavigationBarButton 
	                	onPress={() => this.onRightButtonPress(navigator, actions)}
	                	title={this.rightButtonTitle} />)
			}
		},
		'Filter': { 
			title: 'Фильтр',
			component: Filter,
			leftButtonTitle: 'Отмена',
			rightButtonTitle: 'Применить',
			type: 'Modal',
			onRightButtonPress: (navigator, actions) => { 
				navigator.pop();
				actions.applyFilter(actions.filter);
			}
		}
	};

	function logOut(navigator){
		Api.logOut(() => { navigator.resetTo(Pages['Login']) });
	};

	return {
		get: function(name, title, passProps, rightButtonTitle){
			var page = Pages[name];
			if (title)
				page['title'] = title;
			if (passProps)
				page['passProps'] = passProps;
			if (rightButtonTitle)
				page['rightButtonTitle'] = rightButtonTitle;
			return page;
		},
		set: function(name, type, value){
			Pages[name][type] = value;
		}
	};

}

module.exports = Routes();