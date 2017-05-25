'use strict';

import React, { Component } from 'react';
import { ListView, RefreshControl } from 'react-native';
import ReserveRow from './ReserveRow';

class ReservesList extends Component{
  constructor(props){
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(newProps) {
    var reserves = newProps.reserves;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(reserves)
    });
  }

  render(){
    return(
      <ListView
            // https://github.com/facebook/react-native/issues/1831
            // спасает от бага при свайпе назад (если держать на половине, то лист пустой)
            style={{backgroundColor: 'white'}}
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <ReserveRow rowData={rowData} dict={this.props.dict}/>}
            enableEmptySections={true}
            refreshControl={
              <RefreshControl
                    refreshing={this.props.refreshing}
                    onRefresh={this.props.onRefresh}
                  />
                }
          />
       )
  }
}

module.exports = ReservesList;