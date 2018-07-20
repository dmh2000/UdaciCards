import React from 'react';
import { StyleSheet, 
         TextInput, 
         Text,  
         View, 
         Dimensions,
        Animated} from 'react-native';

import NavHeader from './NavHeader';
import TextButton from './TextButton';
import {green,red,white} from '../utils/colors';

export default class NewDeckView extends React.Component {

  constructor() {
    super();

    this.state  = {
      showAnswer:false,
    }
  }

  // bind onPress to this via arrow function
  onNavPress = () => {
    this.props.navigation.navigate('DeckView', {deckName:'quiz'});
  }

  onCorrect = () => {
    console.log('correct');

    // update score

    // advance to next question
  }

  // incorrect button
  onIncorrect = () => {
    console.log('incorrect');

    // update score

    // advance to next question
  }

  // toggle show answer
  onAnswer = () => {
    this.setState( {
      showAnswer:!this.state.showAnswer
    });
  }

  display = () => {
    if (this.state.showAnswer) {
      // show answer text
      return (
        <View style={styles.show}>
          <Text style={styles.question}>Yes</Text>
          <TextButton 
            style={styles.answerButton} 
            onPress={this.onAnswer}
            disabled={false}
          >Question</TextButton>
        </View>
      )
    }
    else {
      // show question text
      return (
        <View style={styles.show}>
          <Text style={styles.question}>Wut!</Text>
          <TextButton 
            style={styles.answerButton} 
            onPress={this.onAnswer}
            disabled={false}
            >Answer</TextButton>
        </View>
      )
    }
  }
   // render
  render() {
    const {height,width} = Dimensions.get('window');
    return (
      <View style={styles.container1}>
        <NavHeader title='Quiz' onPress={this.onNavPress}/>
        <Text style={styles.count}>1/1</Text>
        <View style={styles.container2}>
          {this.display()}
          <TextButton
            style={styles.greenButton} 
            onPress={this.onCorrect}
            disabled={false}
            >Correct</TextButton>
          <TextButton 
            style={styles.redButton} 
            onPress={this.onIncorrect}
            disabled={false}
            >Incorrect</TextButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  container2: {
    flex:1,
    backgroundColor: '#fff',
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'center',
  },  
  show: {
    alignItems: 'center',
  }, 
  greenButton: {
    backgroundColor:green,
    color:white,
    width:200
  },
  redButton: {
    backgroundColor:red,
    color:white,
    width:200
  },
  answerButton: {
    color:red,
    paddingTop:2,
    paddingBottom:2    
  },
  question: {
    fontSize:30,
    paddingBottom:20
  },
  count: {
    fontWeight: 'bold'
  }
});
