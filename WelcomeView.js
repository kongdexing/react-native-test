
//确保javascript安全运行，安全模式
'use strict'

var React = require('react-native');
var MoviesList = require('./MoviesList');
var Thumb = require('./ScrollViewExample');
var NavigationBarSample = require('./navigator/NavigationBarSample');
var NavButton = require('./navigator/NavButton');
var FetchLoginView = require('./FetchLogin');

var{
	StyleSheet,
	View,
  ScrollView,
	Text,
  Navigator,
} = React;

var cssVar = require('cssVar');

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText]}>
        退出
      </Text>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText]}>
        前进
      </Text>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText]}>
        React-Native Example
      </Text>
    );
  },

};

var WelcomeView = React.createClass({
    
    getInitialState:function () {
      return{
        listCount:0
      };
    },

    onPressFeed:function() {
      var _this = this;
      this.props.navigator.push({
        component:MoviesList
      });
    },

    render() {
      return (
        <Navigator
        style={styles.appContainer}
        renderScene={(route, navigator) => (
            <ScrollView style={styles.scene}>
                  <NavButton
                  onPress={this.onPressFeed}
                  texttitle="Tap to go to MoviesList view."/>
 
                  <NavButton
                  onPress={
                        ()=>{
                          this.props.navigator.push({
                            component:Thumb
                          });
                        }}
                  texttitle="Tap to go to ScrollViewExample view."/>

                  <NavButton
                  onPress={
                        ()=>{
                          this.props.navigator.push({
                            component:NavigationBarSample
                          });
                        }}
                  texttitle="Tap to go to NavigationBar view."/>
                  
                <NavButton
                  onPress={()=>{
                          this.props.navigator.push({
                            component:FetchLoginView
                          });
                        }}
                  texttitle="Fetch test"/>

            </ScrollView>
        )}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}/>
        }/>

        );
      
    }
    
});

var styles = StyleSheet.create({
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    paddingTop:30,
  },
  scene: {
    marginTop:60,
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  navBar: {
    marginBottom:0,
    backgroundColor: 'white',
  },
});

module.exports = WelcomeView;