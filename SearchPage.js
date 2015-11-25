'use strict';

var React = require('react-native');
var ToastAndroid = require('ToastAndroid');

var{
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	Image,
	Component,
	ActivityIndicatorIOS,
  BackAndroid,
} = React;


var Movie = null;

var SearchPage = React.createClass({

  getInitialState:function () {
    // body...
    return{
      movie:null
    };
  },

  componentDidMount:function(){
    this.setState({
      movie:this.props.movieItem
    });

  },

  onBackPress:function(){
      //返回 -传值
      if (this.props.navigator.getCurrentRoutes().length>0) {
        if (this.props.onShowFinish) {
            this.props.onShowFinish("12345");
        }
        this.props.navigator.pop();  
      };
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          {this.state.movie}
        </Text>
          <Text style={styles.description} onPress = {this.onBackPress}>
            Search by place-name, postcode or search near your location.
          </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});

module.exports = SearchPage;