/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var ToastAndroid = require('ToastAndroid');

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
  renderScene:function(router,navigator){
    var Component = router.component;
    this._navigator = navigator;
    // switch(router.name){
    //     case "welcome":
    //       Component = WelcomeView;
    //       break;
    //     default: //default view
    //       Component = DefaultView;
    //   }
      return <Component navigator={navigator} />
  },

  componentDidMount:function() {
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
                renderScene={this.renderScene} />
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
