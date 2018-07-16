import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import NewDeckView from './components/NewDeckView';
import NewQuestionView from './components/NewQuestionView';
import QuizView from './components/QuizView';
import {FontAwesome} from '@expo/vector-icons';

import {white,purple} from './utils/colors';

const Tabs = createBottomTabNavigator (
  {
    DeckListView: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: 'Deck List',
        tabBarIcon: ({tintColor}) => <FontAwesome name='home' size={30} color={tintColor}/>
      }
    },
    DeckView : {
      screen: DeckView,
      navigationOptions: {
        tabBarLabel: 'Deck',
        tabBarIcon: ({tintColor}) => <FontAwesome name='bars' size={30} color={tintColor}/>
      }
    }, 
    NewDeckView : {
      screen: NewDeckView,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({tintColor}) => <FontAwesome name='plus' size={30} color={tintColor}/>
      }
    }, 
    NewQuestionView : {
      screen: NewQuestionView,
      navigationOptions: {
        tabBarLabel: 'New Question',
        tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
      }
    }, 
    QuizView : {
      screen: QuizView,
      navigationOptions: {
        tabBarLabel: 'Quiz',
        tabBarIcon: ({tintColor}) => <FontAwesome name='question' size={30} color={tintColor}/>
      }
    }
  },
  {
    navigationOptions: {
      header:null
    }
  },
  {
  tabBarOptions : {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
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

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <MainNavigator/>
      </View>

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
