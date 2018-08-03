import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, TextInput, Text,  View, Dimensions} from 'react-native';

import NavHeader from './NavHeader';
import TextButton from './TextButton';
import {black,white,gray} from '../utils/colors';
import {saveDeckTitle} from '../actions';

class NewDeckView extends React.Component {

  // object state
  state = {
    text:"",
    warn:"none"
  }

  // bind onPress to this via arrow function
  onNavPress = () => {
    this.props.navigation.navigate('DeckListView');
  }

  onChange = (text) => {
    return this.setState({
      text:text
    });
  }

  onSubmit = () => {
    const deckName = this.state.text;

    // clear text
    this.setState({text:""});

    // if no decks with this title exist, create it
    // otherwise just navigate to the existing one
    if (!this.props.decks.hasOwnProperty(deckName)) {
      // create new deck
      this.props.dispatch(saveDeckTitle(deckName))
      .then( () => {
        // navigate to individual deck view
        this.props.navigation.navigate('DeckView', {deckName:deckName});
      })
    }
    else {
        // navigate to individual deck view
        this.props.navigation.navigate('DeckView', {deckName:deckName});
    }
  }

  // render
  render() {

    const {height,width} = Dimensions.get('window');
    const disable = this.state.text.length === 0;
    return (
      <View style={styles.container1}>
        <NavHeader title='udacicards' onPress={this.onNavPress}/>
        <View style={styles.container2}>
          <Text style={styles.name}>Name Your Deck!</Text>
          <View style={styles.wrap}>
            <TextInput
              style={[styles.input,{width:(width * 0.8)}]}
              onChangeText={this.onChange}
              value={this.state.text}
              />
            </View>
          <TextButton 
            style={styles.blackButton} 
            onPress={this.onSubmit} 
            disabled={disable}
            >Submit</TextButton>
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
export default connect(mapStateToProps)(NewDeckView);

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
    marginRight:4
  },
  wrap : {
    borderWidth: 1,
    borderColor: black,
    borderRadius:5,
  },
  name: {
    fontSize:20,
    paddingBottom:20
  }
});
