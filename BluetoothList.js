'use strict'
import BluetoothModule from './module/BluetoothModule';
import ToastAndroid from './module/ToastAndroid';

import React,{
	StyleSheet,
	View,
  	ScrollView,
  	ListView,
	Text,
} from 'react-native';

var BluetoothList = React.createClass({

	getInitialState:function(){
		return {
			loadstate:'',
			availableDevices: new ListView.DataSource({
	        /*rowHasChanged:(row1,row2)=> row1!==row2,*/
	        rowHasChanged:function(row1,row2){
	            row1 !== row2;
	        },
	      }),
		}
	},

	componentDidMount: function() {
	  console.log('MoviesList componentDidMount');
	  this.fetchData();
	},

	fetchData: function(){
		BluetoothModule.getBluetoothList((msg) => {
						    console.log(msg);
						    ToastAndroid.show(msg,ToastAndroid.SHORT);
						  },
						  (state,availableDevices) => {
						     this.setState({
						     	loadstate:state,
						     	availableDevices:this.state.availableDevices.cloneWithRows(JSON.parse(availableDevices).devices),
						     });

						  });
  	},

	render(){
		 if (this.state.loadstate===BluetoothModule.STATE_TURNING_ON) {
		      return (
		             <View style={styles.container}>
				        <Text>
				          正在开启蓝牙。。。
				        </Text>
				      </View>
					);
		 } else if (this.state.loadstate===BluetoothModule.STATE_ON) {
		      return (
		             <View style={styles.container}>
				        <Text>
				          正在读取蓝牙信息
				        </Text>
				      </View>
					);
		 }else if (this.state.loadstate===BluetoothModule.STATE_FOUND) {
		 	ToastAndroid.show(this.state.loadstate,ToastAndroid.SHORT);

		      return (
					 <ListView
				          dataSource={this.state.availableDevices}
				          renderRow={this.renderDevice}
				          style={styles.listView}/>
				     );
		 } else{
		 	ToastAndroid.show(this.state.loadstate,ToastAndroid.SHORT);
		 	return (
		 			<View style={styles.container}>
				        <Text>
				          正在读取蓝牙信息
				        </Text>
				      </View>
					);
		 }
	},

	renderDevice: function(device) {
    return (
       
        <View style={styles.container}>
           
            <View style={styles.rightContainer}>
                <View style={[{opacity:this.state.myItemOpacity}]}>
                  <Text style={styles.welcome}>{device.name}</Text>
                  <Text style={styles.instructions}>{device.address}</Text>
                </View>
            </View>
        </View>
      
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 3,
  },
  rightContainer:{
    flex:1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  thumbnail:{
    width:53,
    height:81,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
});

module.exports = BluetoothList;