
//确保javascript安全运行，安全模式
'use strict'
var React = require('react-native');
var MoviesList = require('./MoviesList');

var{
	StyleSheet,
	View,
	Text,
} = React;

var WelcomeView = React.createClass({
    onPressFeed() {
      this.props.navigator.push({component:MoviesList});
    },

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this.onPressFeed} >
                    This is welcome view.Tap to go to feed view.
                </Text>
            </View>
        );
    }
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

module.exports = WelcomeView;