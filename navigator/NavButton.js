'use strict'

var React = require('react-native');

var {
	TouchableHighlight,
	Text,
	PixelRatio,
	StyleSheet,
} = React;

class NavButton extends React.Component {
  render() {
    return (
        <TouchableHighlight
          style={[styles.button]}
          underlayColor="#B5B5B5"
          onPress={this.props.onPress}>
          <Text style={styles.buttonText}>{this.props.texttitle}</Text>
        </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
	button: {
	    backgroundColor: 'white',
	    padding: 15,
	    borderBottomWidth: 1 / PixelRatio.get(),
	    borderBottomColor: '#FDCDCD',
	  },
	buttonText: {
	    fontSize: 17,
	    fontWeight: '500',
	  },
});

module.exports = NavButton;