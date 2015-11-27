/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
'use strict';

var React = require('react-native');
var NavButton = require('./NavButton');

var {
  PixelRatio,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} = React;

var cssVar = require('cssVar');

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity> 
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.push(newRandomRoute())}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Next
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title} [{index}]
      </Text>
    );
  },

};

function newRandomRoute() {
  var random = Math.ceil(Math.random() * 1000);
  return {
    title: 'newRoute' + random,
    content:'the content randow ' + random,
  };
}

var NavigationBarSample = React.createClass({

  componentWillMount: function() {
    var navigator = this.props.navigator;

    var callback = (event) => {
      console.log(
        `NavigationBarSample : event ${event.type}`,
        {
          route: JSON.stringify(event.data.route),
          target: event.target,
          type: event.type,
        }
      );
    };

    // Observe focus change events from this component.
    this._listeners = [
       navigator.navigationContext.addListener('willfocus', callback),
       navigator.navigationContext.addListener('didfocus', callback),
    ];
  },

  componentWillUnmount: function() {
    this._listeners && this._listeners.forEach(listener => listener.remove());
  },

  render: function() {
    return (
      <Navigator
        style={styles.appContainer}
        initialRoute={newRandomRoute()}
        configureScene={()=>Navigator.SceneConfigs.FadeAndroid}
        renderScene={(route, navigator) => (
          <ScrollView 
            style={styles.scene}>
            <Text style={styles.messageText}>{route.content}+"  route.content"</Text>
            <NavButton
              onPress={() => {
                // navigator.immediatelyResetRouteStack([
                //  newRandomRoute()
                // ]);
                navigator.push(newRandomRoute());
              }}
              texttitle="Reset w/ 3 scenes"/>
            <NavButton
              onPress={() => {
                navigator.pop();
              }}
              texttitle="BackPress Example"/>
            <NavButton
              onPress={() => {
                this.props.navigator.pop();
              }}
              texttitle="Exit NavigationBar Example"/>
          </ScrollView>
        )}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}/>
        }/>
    );
  },

});

var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  navBar: {
    marginBottom:0,
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: cssVar('fbui-accent-blue'),
  },
  scene: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
});

module.exports = NavigationBarSample;
