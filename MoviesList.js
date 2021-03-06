/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var ToastAndroid = require('./module/ToastAndroid');
var SearchPage = require('./SearchPage');

var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  BackAndroid,
  Navigator,
  Component,
} = React;

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 5;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL=API_URL + PARAMS;
//var MOCKED_MOVIES_DATA = [{title:'标题',year:'2015',posters:{thumbnail:'http://i.imgur.com/UePbdph.jpg'}}];

var MoviesList = React.createClass({
    
  getInitialState:function(){
    return {
      dataSource: new ListView.DataSource({
        /*rowHasChanged:(row1,row2)=> row1!==row2,*/
        rowHasChanged:function(row1,row2){
            row1 !== row2;
        },
      }),
      loaded:false,
      myItemOpacity:1,
      showContent:null,
    };
  }, 

  componentDidMount: function() {
    console.log('MoviesList componentDidMount');
    this.fetchData();
  },

  componentWillUnmount:function() {
    BackAndroid.removeEventListener('hardwareBackPress');
  },

  fetchData: function(){
    fetch(REQUEST_URL)
    .then(function(response){
          return response.json();
        })
    .then((responseData)=>{
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(responseData.movies),
        loaded:true,
      });
    }).done();
  },

  render: function() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    if (!this.state.showContent) {
      ToastAndroid.show("加载完成。。",ToastAndroid.SHORT);  
      return(
        // <ListView
        //   dataSource={this.state.dataSource}
        //   renderRow={this.renderMovie}
        //   style={styles.listView}/>
         <View style={styles.container}>
          <Text>
            加载完成。。
          </Text>
        </View>
        );
    } else{
      return(
          <View style={styles.rightContainer}>
                <View style={[{opacity:this.state.myItemOpacity}]}>
                  <Text style={styles.welcome}>我回来了。。。</Text>
                </View>
            </View>
        );
    }
  },

  renderLoadingView:function(){
    ToastAndroid.show("加载电影数据……",ToastAndroid.SHORT);
    return(
      <View style={styles.container}>
        <Text>
          正在加载电影数据……
        </Text>
      </View>
      );
  },

  renderMovie: function(movie) {
    var icon = this.props.active?require('./img/icon_takephoto.png'):require('./img/icon_takevideo.png');
    return (
      <TouchableHighlight onPress = {()=>this._ListitemClick(movie)}>
        <View style={styles.container}>
          <Image
            source={{uri: movie.posters.thumbnail}}
            style={styles.thumbnail}/>
            <View style={styles.rightContainer}>
                <View style={[{opacity:this.state.myItemOpacity}]}>
                  <Text style={styles.welcome}>{movie.title}</Text>
                  <Text style={styles.instructions}>{movie.year}</Text>
                </View>
            </View>
        </View>
      </TouchableHighlight>
    );
  },

  _ListitemClick:function(movie){
      ToastAndroid.show(movie.title+"\n"+movie.year,ToastAndroid.SHORT);
      var _this = this;
      //跳转-传值  
      this.props.navigator.push(
        {component:SearchPage,
         params:
              {
                movieItem:movie.title,
                onShowFinish:function (showtime) {
                              _this.setState({
                                  showContent:showtime
                              })
                            }
              }
            });      
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

module.exports = MoviesList;