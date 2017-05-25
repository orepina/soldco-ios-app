'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ListView,
	RefreshControl
} from 'react-native';

import ListRow from './components/ListRow';
import Api from '../../services/api.js';
import SceneState from '../../components/SceneState';

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 64,
		backgroundColor: '#ebeff2',
	},
	content: {
		paddingTop: 10,
	},
	bottomBar: {
		backgroundColor: '#36404a',
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	bottomBarText: {
		color: 'white',
		fontSize: 20,
		textShadowColor: 'black',
    	textShadowOffset: {width: 0.2, height:  0.2},
	}
});

class Main extends Component {
	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: dataSource.cloneWithRows([]),
		};
	};

	componentDidMount(){
		this.props.fetchProjectsInfo(true);
	};

	componentWillReceiveProps(newProps) {
		var projects = newProps.projectsInfo.projects;
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(projects),
		});
	}

	render() {
		return (<SceneState
					isLoading={this.props.isProjectsLoading}
					isError={this.props.isProjectsError}
					reload={() => { this.props.fetchProjectsInfo(true) }}>
					<View style={styles.container}>
						<ListView
							style={styles.content}
							dataSource={this.state.dataSource}
							renderRow={(rowData) => <ListRow rowData={rowData} {...this.props}/>}
							enableEmptySections={true}
							refreshControl={
								<RefreshControl
						            refreshing={this.props.isProjectsRefreshing}
						            onRefresh={this.props.fetchProjectsInfo}
					        	/>
					        }
						/>
						<View style={styles.bottomBar}>
							<Text style={styles.bottomBarText}>Всего: {this.props.projectsInfo.total.amount}</Text>
						</View>
					</View>
				</SceneState>)
	};
};

module.exports = Main;

