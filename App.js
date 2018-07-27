// library module imports
import React from 'react';
import { StyleSheet,  View , StatusBar, Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {FontAwesome} from '@expo/vector-icons';
import {Constants} from 'expo';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

// application local imports
import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import NewDeckView from './components/NewDeckView';
import NewQuestionView from './components/NewQuestionView';
import QuizView from './components/QuizView';
import {white, black, blue} from './utils/colors';
import reducer from './reducers';
import middleware from './middleware';


const Tabs = createBottomTabNavigator (
  {
    DeckListView: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: 'Deck List',
        tabBarIcon: ({tintColor}) => <FontAwesome name='home' size={30} color={tintColor}/>
      }
    },
    NewDeckView : {
      screen: NewDeckView,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({tintColor}) => <FontAwesome name='plus' size={30} color={tintColor}/>
      }
    }, 
  },
  {
    navigationOptions: {
      header:null
    }
  },
  {
  tabBarOptions : {
    //activeTintColor:  purple,
    style: {
      height: 56,
      backgroundColor:  white,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width:0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header:null
    }
  },
  DeckListView : {
    screen:DeckListView,
    navigationOptions: {
      header:null
    }
  },
  DeckView : {
    screen:DeckView,
    headerMode: Platform.ios ? 'float' : 'screen',
    navigationOptions: {
      header:null
    }
  },
  NewDeckView : {
    screen:NewDeckView,
    navigationOptions: {
      header:null
    }
  },
  NewQuestionView : {
    screen:NewQuestionView,
    navigationOptions: {
      header:null
    }
  },
  QuizView : {
    screen:QuizView,
    navigationOptions: {
      header:null
    }
  },
});

function CardStatusBar ({backgroundColor,...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  );
}

// create redux store
const store = createStore(reducer,middleware);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <CardStatusBar backgroundColor={blue} barStyle='light-content'/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
