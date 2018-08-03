import React from 'react';
import {connect} from 'react-redux';

import { StyleSheet, 
         TextInput, 
         Text,  
         View, 
         Dimensions,
        Animated} from 'react-native';

import NavHeader from './NavHeader';
import TextButton from './TextButton';
import {green,red,white,black} from '../utils/colors';

class QuizView extends React.Component {

  constructor() {
    super();

    this.state  = {
      showAnswer:false,
      index: -1,
      count: 0,
      correct: 0,
      done: false,
    }
  }

  // bind onPress to this via arrow function
  onNavPress = () => {
    const done  = this.state.done;
    const title = this.state.deck.title;

    if (done) {
      // done, go to home page
      this.props.navigation.navigate('DeckListView', {deckName:'home'});
    }
    else {
      // not done, go back to quiz
      this.props.navigation.navigate('DeckView', {deckName:title});
    }
  }

  onCorrect = () => {
    console.log('correct');

    // get state params
    const correct = this.state.correct + 1;
    const index   = this.state.index + 1;
    const count   = this.state.count;
    const done    = index === count;

    // update state and advance to next question
    this.setState({correct,index,done});
  }

  // incorrect button
  onIncorrect = () => {
    console.log('incorrect');

    // get state params
    const index   = this.state.index + 1;
    const count   = this.state.count;
    const done    = index === count;

    // update state and advance to next question
    this.setState({index,done});
  }

  // toggle show answer
  onAnswer = () => {
    this.setState( {
      showAnswer:!this.state.showAnswer
    });
  }

  /**
   * show buttons
   */
  buttons = () => {
    return (
    <View>
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
    )
  }
  
  /**
   * display questions, answers and buttons
   */
  display = (question,answer) => {
    if (this.state.showAnswer) {
      // show answer text
      return (
        <View>
          <View style={styles.show}>
            <Text style={styles.question}>{answer}</Text>
            <TextButton 
              style={styles.answerButton} 
              onPress={this.onAnswer}
              disabled={false}
            >Question</TextButton>
          </View>
          {this.buttons()}
        </View>
      )
    }
    else {
      // show question text
      return (
        <View>
          <View style={styles.show}>
            <Text style={styles.question}>{question}</Text>
            <TextButton 
              style={styles.answerButton} 
              onPress={this.onAnswer}
              disabled={false}
              >Answer</TextButton>
          </View>
          {this.buttons()}
        </View>
        )
    }
  }
  
  onPressGotoHome = () => {
    this.props.navigation.navigate('DeckListView');
  }

  onPressBackToQuiz = () => {
    const title = this.state.deck.title;
    this.props.navigation.navigate('DeckView', {deckName:title});
  }

  summary = (count,correct) => {
    console.log('summary',this.state);
    return (
      <View style={styles.container2}>
        <Text style={styles.summary}>You got {this.state.correct} of {this.state.count} correct.</Text>
        <TextButton 
          style={styles.whiteButton} 
          onPress={this.onPressGotoHome}
          disabled={false}
          >
          Home
        </TextButton>        
        <TextButton 
          style={styles.whiteButton} 
          onPress={this.onPressBackToQuiz}
          disabled={false}
          >
          Repeat The Quiz
        </TextButton>        
      </View>
    );
  }

  componentDidMount() {

    // get initial deck parameters
    const deckName  = this.props.navigation.state.params.deckName;
    const deck      = this.props.decks[deckName];
    const count     = deck.questions.length;
    const index     = 0; // question index
    const correct   = 0; // number correct
    this.setState({deck, index, count, correct})
  }

   // render
  render() {
    const {height,width} = Dimensions.get('window');
    console.log('quizview' ,this.props);
    console.log('quizstate', this.state);

    // wait for mount and deck update
    if (!this.state.hasOwnProperty('deck')||(this.state.deck === null)) {
      return (
        <View>
        </View>
      )
    }

    // extract the relevant parameters
    const title     = this.state.deck.title;
    const questions = this.state.deck.questions;  // array of questions
    const index     = this.state.index;           // current question index
    const count     = this.state.count;           // total number of questions
    const correct   = this.state.correct;         // number answered correctly
    const done      = this.state.done;

    // get next question tunil 
    let question;
    let answer;
    let nav;
    if (!done) {
      question  = questions[index].question;  // question text
      answer    = questions[index].answer;    // answer text
      nav       = 'Quiz';
    }
    else {
      // indicates no more questions
      question = answer = null;
      nav = 'Home';
    }

    return (
      <View style={styles.container1}>
        <NavHeader title={nav} onPress={this.onNavPress}/>
        
        {
          // show count or nothing if no more questions
          (!done) 
          ? <Text style={styles.count}>{index + 1}/{questions.length} : {title} </Text>
          : null
        }
        
        <View style={styles.container2}>
        {
          // show questions or summary
          (done) 
          ? this.summary(count,correct)
          : this.display(question, answer)
        }

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
export default connect(mapStateToProps)(QuizView);

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
  },
  summary : {
    fontSize: 30,
    marginBottom:20
  },
  whiteButton: {
    backgroundColor:white,
    color:black,
    borderWidth:2,
    borderColor:black,
    paddingTop: 10,
    width:200
  },
});
