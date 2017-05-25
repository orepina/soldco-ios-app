import * as types from './types';
import Api from '../../services/api';

var moment = require('moment');
require('moment/locale/ru');

var store = {
	reserves: [],
	filter: {},
	day: null,
};

export function isReservesLoadingSet(isLoading){
	return {
		type: types.IS_RESERVES_LOADING,
		isLoading: isLoading
	}
};

export function isReservesRefreshingSet(isLoading){
	return {
		type: types.IS_RESERVES_REFRESHING,
		isLoading: isLoading
	}
};

export function isReservesErrorSet(isError){
	return {
		type: types.IS_RESERVES_ERROR,
		isError: isError
	}
};

export function isFilterLoadingSet(isLoading){
	return {
		type: types.IS_FILTER_LOADING,
		isLoading: isLoading
	}
};

export function setFilteredReserves(data){
	return {
		type: types.SET_FILTERED_RESERVES,
		filtered_reserves: data
	}
};

function _filterReservesByMonth(array, day){
	var day = day;
	return array.filter(function(obj){
		return (obj.date && day.month() == moment(obj.date).month() && day.year() == moment(obj.date).year());
	});
};

function _setReserves(data){
	store.reserves = data;
};

export function onChangeMonthFilter(day = moment()){
	store.day = day;
	return {
		type: types.ON_CHANGE_MONTH_FILTER,
		reserves: _filterReservesByMonth(_filterReserves(store.reserves, store.filter), store.day)
	}
};

function _isLoading(isInitial){
	return (isInitial) ? isReservesLoadingSet : isReservesRefreshingSet;
};

export function fetchReserves(project_id, isInitial){
	return (dispatch) => {
		var isLoading = _isLoading(isInitial)
		dispatch(isLoading(true));
		dispatch(isReservesErrorSet(false));
		Api.getReserves(project_id, 
			(data) => { 
				dispatch(isLoading(false));
				_setReserves(data);
				dispatch(onChangeMonthFilter());
			}, 
			(error) => {
				dispatch(isReservesErrorSet(true));
				dispatch(isLoading(false));
			}
		);
	}
};

export function setFilter(filter){
	store.filter = filter || store.filter;
	return {
		type: types.SET_FILTER,
		filter: JSON.parse(JSON.stringify(store.filter))
	}
};

export function isFilterErrorSet(isError){
	return {
		type: types.IS_FILTER_ERROR,
		isError: isError
	}
};

function _filterReserves(reserves, filter){
	console.log('_filterReserves')
	function getByMultiSelect(array){
	  return (array) ? array.filter((b) => b.selected).map((b) => b.id) : [];
	}

	function checkId(ids, id){
	  return (ids.length == 0 || ids.indexOf(id) > -1);
	}

	var users = getByMultiSelect(filter.users),
		buildings = getByMultiSelect(filter.buildings),
	    states = getByMultiSelect(filter.states),
	    reserve_types = getByMultiSelect(filter.reserve_types);

	return filtered = reserves.filter(function(reserve){
	 	return checkId(buildings, reserve.flat.building.id) &&
	    	checkId(users, reserve.user) &&
	    	checkId(states, reserve.reserve_contract_state) &&
	    	checkId(reserve_types, (reserve.reserve_contract_status) ? reserve.reserve_contract_status.id : null);
	})
};


export function applyFilter(filter){
	store.filter = filter;
	return (dispatch) => {
		dispatch(onChangeMonthFilter(store.day));
	}
};

function _initFilter(dispatch){
	function isFilterResolved(filter){
		return (filter['buildings'] && filter['users'] && filter['states']);
	};

	var filter = {},
		dispatch = dispatch;
	return function(type, list){
		filter[type] = list;
		if (isFilterResolved(filter)){
			dispatch(setFilter(filter));
			dispatch(isFilterLoadingSet(false));
			dispatch(isFilterErrorSet(false));
		};
	}
};

export function fetchFilter(project_id){
	return (dispatch) => {

		function initBuildings(buildings){
			return buildings.map((b) => { b.name = b.adres+', '+b.number; return b });
		};

		function initGroups(groups){
			return groups.filter((g) => g.id == 2)[0].statuses;
		};

		function initUsers(users){
			return users.map((u) => {u.name = u.first_name+' '+u.last_name; return u });
		};

		function onError(error){
			dispatch(isFilterErrorSet(true));
			dispatch(isFilterLoadingSet(false));
		};

		console.log('fetchFilter')
		dispatch(isFilterLoadingSet(true));
		dispatch(isFilterErrorSet(false));
		var _setFilter = _initFilter(dispatch);
		Api.getBuildings(project_id, 
			(data) => { _setFilter('buildings', initBuildings(data)) }, 
			(error) => { onError(error) }
		);
		Api.getUsers(project_id, 
			(data) => {
				var users = initUsers(data);
				_setFilter('users', users); 
				dispatch(setUsersDict(users)); 
			}, 
			(error) => { onError(error) }
		);
		Api.getStatuses(project_id, 
			(data) => {
				_setFilter('reserve_types', initGroups(data['groups']));
				_setFilter('states', data['states']);
				dispatch(setStatesDict(data['states'])); 
			}, 
			(error) => { onError(error) }
		);
	}
};

function _toDict(array){
	var dict = {};
	array.forEach((obj) => {
		dict[obj.id] = obj.name;
	})
	return dict;
};

export function setUsersDict(users){
	return {
		dict: _toDict(users),
		type: types.SET_USERS_DICT
	}
};

export function setStatesDict(states){
	return {
		dict: _toDict(states),
		type: types.SET_STATES_DICT
	}
}