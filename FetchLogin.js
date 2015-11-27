'use strict'

var React = require('react-native');
var ToastAndroid = require('./ToastAndroid');
var StringUtil = require('./utils/StringUtil');

var {
	StyleSheet,
	View,
	TextInput,
	TouchableHighlight,
	Text,
} = React;

var FetchLoginView = React.createClass({

	getInitialState(){
		return ({
			name:null,
			pwd:null,
		});
	},

	render(){
		return(
			<View style = {styles.container}>
				<View style={styles.flowRight}>
				  <Text style={[styles.buttonText,{color:'black'}]}>账号：</Text>

				  <TextInput
				    style={styles.searchInput}
				    onChangeText={(text) => this.setState({name:text})}
				    underlineColorAndroid = 'black'
				    textAlign = 'start'
				    keyboardType = 'default'
				    autoFocus = {true}
				    placeholder='请输入用户名'/>
				   
				</View>
				<View style={styles.flowRight}>
				  <Text style={[styles.buttonText,{color:'black'}]}>密码：</Text>

				  <TextInput
				    style={styles.searchInput}
				    onChangeText={(text) => this.setState({pwd:text})}
				    secureTextEntry = {true}
				    placeholder='请输入密码'/>
				   
				</View>
				<TouchableHighlight style={[styles.button,{marginTop:10}]}
				    underlayColor='#99d9f4'
				    onPress = {()=>{this.login()}}>
				  <Text style={styles.buttonText}>登录</Text>
				</TouchableHighlight>
			</View>
		);
	},

	login:function(){
		var _name = StringUtil.strTrim(this.state.name);
		var _pwd = StringUtil.strTrim(this.state.pwd);
		
		if (_name.length==0||_pwd.length==0) {
			ToastAndroid.show("请将信息输入完整",ToastAndroid.SHORT);
			return;
		} else {
			//ToastAndroid.show("name "+_name+"\n pwd "+_pwd,ToastAndroid.SHORT);

			fetch('http://192.168.0.60:8888/login',{
				  method: 'POST',
				  headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json',
				  },
				  body: JSON.stringify({
				    username: _name,
				    userpwd: _pwd,
				  })
				}).then((response) => response.text())
				  .then((responseText) => {
				    console.log(responseText);
				    ToastAndroid.show("response "+responseText,ToastAndroid.SHORT);
				  })
				  .catch((error) => {
				    console.warn(error);
				    ToastAndroid.show("error "+error,ToastAndroid.SHORT);
				  });
		}
	},

});

var styles = StyleSheet.create({
	container: {
	  flexDirection: 'column',
	  padding:20,
  	},

	flowRight: {
	  flexDirection: 'row',
	  marginTop:10,
	  borderWidth: 1,
	  borderColor: '#48BBEC',
	},
	buttonText: {
	  fontSize: 18,
	  color: 'white',
	  alignSelf: 'center'
	},
	button: {
	  height: 36,
	  flex: 1,
	  flexDirection: 'row',
	  backgroundColor: '#48BBEC',
	  borderColor: '#48BBEC',
	  borderWidth: 1,
	  borderRadius: 8,
	  marginBottom: 10,
	  alignSelf: 'stretch',
	  justifyContent: 'center'
	},
	searchInput: {
	  height: 36,
	  padding: 4,
	  marginRight: 5,
	  alignSelf: 'stretch',
	  flex: 1,
	  fontSize: 18,
	  borderWidth: 1,
	  borderColor: '#48BBEC',
	  borderRadius: 8,
	  color: '#48BBEC'
	}
});

module.exports = FetchLoginView;