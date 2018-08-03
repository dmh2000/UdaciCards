import React from 'react';
import {connect} from 'react-redux';

import { StyleSheet, TextInput, Text,  View, Dimensions} from 'react-native';

import NavHeader from './NavHeader';
import TextButton from './TextButton';
import {black,white,gray} from '../utils/colors';
import {addCardToDeck} from '../actions';

class NewQuestionView extends React.Component {

  // object state
  state = {
    question:"",
    answer:""
  }

  // bind onPress to this via arrow function
  onNavPress = () => {
    this.props.navigation.navigate('DeckView');
  }

  onSubmit = () => {
    const deckName = this.props.navigation.state.params.deckName;
    // clear text
    this.setState({question:"",answer:""});

    // create new question
    this.props.dispatch(addCardToDeck(deckName,this.state.question,this.state.answer))

    // navigate to individual deck view
    this.props.navigation.navigate('DeckView', {deckName:deckName});
  }

  // render
  render() {
    const {height,width} = Dimensions.get('window');
    const disable = (this.state.question.length === 0)||(this.state.answer.length === 0);
    return (
      <View style={styles.container1}>
        <NavHeader title='Add Card' onPress={this.onNavPress}/>
        <View style={styles.container2}>
          <View style={styles.textEntry}>
            <Text style={{fontSize:20}}>Question:</Text>
            <View style={styles.wrap}>
              <TextInput
                style={[styles.input,{width:(width * 0.90)}]}
                onChangeText={(question) => this.setState({question})}
                value={this.state.question}
                />
            </View>
          </View>
          <View style={styles.textEntry}>
            <Text style={{fontSize:20}}>Answer:</Text>
            <View style={styles.wrap}>
              <TextInput
                style={[styles.input,{width:(width * 0.90)}]}
                onChangeText={(answer) => this.setState({answer})}
                value={this.state.answer}
                />
              </View>
            </View>
            <TextButton 
              style={styles.blackButton} 
              onPress={this.onSubmit}  
              disabled={disable}>Submit</TextButton>
        </View>
      </View>
    );
  }
}

// connect to redux
function mapStateToProps({decks}) {
  return {
    decks
  }
}

// export connected view
export default connect(mapStateToProps)(NewQuestionView);

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
  blackButton: {
    backgroundColor:black,
    color:white
  },
  input : {
    marginLeft:4,
    marginRight:4,
  },
  name: {
    fontSize:20,
    paddingBottom:20
  },
  textEntry: {
    alignItems:"center",
  },
  wrap : {
    borderWidth: 1,
    borderColor: black,
    borderRadius:5,
    paddingTop:10,
    paddingBottom:5,    
  },
});
