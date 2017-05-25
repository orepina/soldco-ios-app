'use strict';
import CookieManager from 'react-native-cookies';
import { apis } from '../apis.js';

class Api {
	constructor(){
		this.api = apis.domain;
	};

	_makeRequest(url, success, error, options){
		var url = this.api + url,
			options = options || {};
		fetch(url, options)
			.then(response => response.json())
			.then(function(data){ 
				console.log('success  ')
				success(data)
			})
			.catch(function(msg){
				console.log('error  ', msg)
				error(msg)
			});
	};

	isAuth(callback){
		CookieManager.getAll((err, res) => {
			callback(res['csrftoken'] && res['sessionid']);
		});
	};

	login(body, success, error){
		this._makeRequest( apis.login, 
			(data) => { (data.status == 'success') ? success(data) : error(data) }, 
			error, 
			{ method: 'POST', body: JSON.stringify(body) });
	};

	logOut(callback){
		CookieManager.clearAll((err, res) => {
			callback();
		});
	};

	getProjects(success, error){
		this._makeRequest(apis.projects, success, error);
	};

	getReserves(project_id, success, error){
		this._makeRequest(project_id + apis.reserves, success, error);
	};

	getBuildings(project_id, success, error){
		this._makeRequest(project_id + apis.buildings, success, error);
	};

	getUsers(project_id, success, error){
		this._makeRequest(project_id + apis.users, success, error);
	};

	getStatuses(project_id, success, error){
		this._makeRequest(apis.statuses, success, error);
	};
}

module.exports = new Api();