import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NavHeader from './NavHeader';
import TextButton from './TextButton';
import {black,white,gray} from '../utils/colors';


export default class DeckView extends React.Component {

  // component state
  state = {
    cards: 0
  }

  // bind onPress to this via arrow function
  onNavPress = () => {
    this.props.navigation.navigate('DeckListView');
  }

  // handle non,singular,plural
  showCards(cards) {
    switch(cards) {
      case 0:
        return 'No Cards';
      case 1:
        return '1 Card';
      default:
        return `${cards.toString()} Cards`;
    }
  }

  // navigate to quiz view
  gotoQuiz = () => {
    const deckName = this.props.navigation.state.params.deckName;    
    this.props.navigation.navigate('QuizView', {deckName:deckName});
  }

  // navigate to add question
  addQuestion = () => {
    this.props.navigation.navigate('NewQuestionView');
  }

  // render
  render() {
    console.log(this.props);
    const deckName = this.props.navigation.state.params.deckName;
    return (
      <View style={styles.container}>
        <NavHeader title='udacicards' onPress={this.onNavPress}/>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.title}>{deckName}</Text>
            <Text style={styles.count}>{this.showCards(this.state.cards)}</Text>
          </View>
          <View style={styles.bottom}>
            <TextButton style={styles.whiteButton} onPress={this.addQuestion}>Add Card</TextButton>
            <TextButton style={styles.blackButton} onPress={this.gotoQuiz}>Start Quiz</TextButton>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  top: {
    paddingTop:50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottom: {
    paddingBottom:50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    color: black
  },
  count: {
    fontSize: 20,
    color:gray
  },
  whiteButton: {
    backgroundColor:white,
    color:black,
    borderWidth:2,
    borderColor:black
  },
  blackButton: {
    backgroundColor:black,
    color:white
  }
});
