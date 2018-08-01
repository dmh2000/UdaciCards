import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import NavHeader from './NavHeader';
import TextButton from './TextButton';
import {black,white,gray} from '../utils/colors';
import {getDecks} from '../actions';

class DeckView extends React.Component {

  // component state
  state = {
    disableStart:true
  }

  // bind onPress to this via arrow function
  onNavPress = () => {
    this.props.navigation.navigate('DeckListView');
  }

  // handle non,singular,plural
  showQuestions(questions) {
    switch(questions) {
      case 0:
        return 'No Cards';
      case 1:
        return '1 Card';
      default:
        return `${questions.toString()} Cards`;
    }
  }

  // navigate to quiz view
  gotoQuiz = () => {
    const deckName = this.props.navigation.state.params.deckName;   
    const count    = this.props.decks[deckName].questions.length; 
    const score    = 0;
    this.props.navigation.navigate('QuizView', {deckName, count, score});
  }

  // navigate to add question
  addQuestion = () => {
    const deckName = this.props.navigation.state.params.deckName;       
    this.props.navigation.navigate('NewQuestionView',{deckName:deckName});
  }

  componentDidMount() {
  }

  // render
  render() {
    const deckName = this.props.navigation.state.params.deckName;
    const deck = this.props.decks[deckName];
    const disableSubmit = deck.questions.length === 0;

    return (
      <View style={styles.container}>
        <NavHeader title='udacicards' onPress={this.onNavPress}/>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.title}>{deckName}</Text>
            <Text style={styles.count}>{this.showQuestions(deck.questions.length)}</Text>
          </View>
          <View style={styles.bottom}>
            <TextButton style={styles.whiteButton} onPress={this.addQuestion}>Add Card</TextButton>
            <TextButton 
              style={styles.blackButton}
              onPress={this.gotoQuiz}
              disabled={disableSubmit}
              >Start Quiz
            </TextButton>
          </View>
        </View>
      </View>
    );
  }
}

// connect to redux
function mapStateToProps(state) {
  return {
    ...state
  }
}

// export connected view
export default connect(mapStateToProps)(DeckView);

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
