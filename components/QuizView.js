import React from 'react';
import { StyleSheet, TextInput, Text,  View, Dimensions} from 'react-native';

import NavHeader from './NavHeader';
import TextButton from './TextButton';
import {green,red,white} from '../utils/colors';

export default class NewDeckView extends React.Component {
  state  = {
    show:false
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
      show:!this.state.show
    });
  }

   // render
  render() {
    const {height,width} = Dimensions.get('window');
    console.log(height,width);
    return (
      <View style={styles.container1}>
        <NavHeader title='Quiz' onPress={this.onNavPress}/>
        <Text style={styles.count}>1/1</Text>
        <View style={styles.container2}>
          <Text style={styles.question}>Wut!</Text>
          {this.state.show  
            ? <TextButton style={styles.answerButton} onPress={this.onAnswer}>...answer...</TextButton>
            : <TextButton style={styles.answerButton} onPress={this.onAnswer}>Show Answer</TextButton>
          }
          <TextButton style={styles.greenButton} onPress={this.onCorrect}>Correct</TextButton>
          <TextButton style={styles.redButton} onPress={this.onIncorrect}>Incorrect</TextButton>
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
