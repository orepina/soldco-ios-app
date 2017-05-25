'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import MonthFilter from './components/MonthFilter';
import ReservesList from './components/ReservesList';
import SceneState from '../../components/SceneState';

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 64,
		backgroundColor: '#ebeff2',
	}
});

class Project extends Component {
	constructor(props){
		super(props);
	};

	render(){
		return (
			<SceneState
				isLoading={this.props.isReservesLoading || this.props.isFilterLoading}
				isError={this.props.isReservesError}
				reload={()=> { this.props.fetchReserves(this.props.project_id, true) }}>
					<View style={styles.container}>
						<MonthFilter onChange={this.props.onChangeMonthFilter}/>
						<ReservesList 
							reserves={this.props.filtered_reserves}
							dict={{users: this.props.usersDict, states: this.props.statesDict}}
				            refreshing={this.props.isReservesRefreshing}
				            onRefresh={() => { this.props.fetchReserves(this.props.project_id) }}
						/>
					</View>
			</SceneState>
		)
	}
}

module.exports = Project;


