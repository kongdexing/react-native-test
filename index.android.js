/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var ToastAndroid = require('ToastAndroid');
var WelcomeView = require('./WelcomeView');

var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Navigator,
  BackAndroid,
  Component,
} = React;

exports.displayName = (undefined: ?string);
exports.framework = 'React';
exports.title = '<Modal>';
exports.description = 'Component for presenting modal views.';

var demoProject = React.createClass({
  // renderScene:function(router,navigator){
  //   var Component = router.component;
  //   this._navigator = navigator;
  //   return <Component navigator={navigator} router={router} />
  // },

  componentDidMount:function() {
      console.log('index componentDidMount');
      var navigator = this._navigator;

      BackAndroid.addEventListener('hardwareBackPress', function() {
          if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
          } 
          return false;
      });
  },

  componentWillUnmount:function() {
    BackAndroid.removeEventListener('hardwareBackPress');
  },

  render:function(){
      return (
          <Navigator
                initialRoute={{component:WelcomeView}}
                configureScene={()=>Navigator.SceneConfigs.FadeAndroid}
                renderScene={(router,navigator)=>{
                    var Component = router.component;
                    this._navigator = navigator;
                    //... 语法，解析params中全部信息
                    return <Component navigator={navigator} {...router.params}/>
                }} />
        );
   },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('demoProject', function() {return demoProject});
