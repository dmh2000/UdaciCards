import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View ,
  TouchableOpacity, 
  Dimensions,
  Animated
} from 'react-native';

import TextButton from './TextButton';
import {createId,getDecks} from '../utils/api.js';
import {black,gray} from '../utils/colors';

export default class DeckListView extends React.Component {
  state = {
    decks: {},
    bounceValue: new Animated.Value(0)
  }

  componentDidMount() {
    getDecks()
      .then( (decks) => {
        this.setState(() => ({
          decks
        }));
      });
  }
  
  onPress(deckName) {
    return () => {
      // animation
      const {bounceValue} = this.state;
      Animated.sequence([
        Animated.timing(bounceValue, {duration:250,toValue:1}),
        Animated.spring(bounceValue, {toValue:1}),
      ]).start( () => {
        // navigate to specified deck
        console.log('start');
        this.setState({bounceValue:new Animated.Value(0)});
        this.props.navigation.navigate('DeckView', {deckName:deckName})
      });


    }
  }

  renderDeckList(decks) {
    if (!decks) {
      return;
    }
    return Object.keys(decks).map( (deck) => {

      // extract the parameters needed
      const len = decks[deck].questions.length;
      const cards =  len === 1 
        ? '1 card'
        : `${len} cards`;
      const title = decks[deck].title;
      const {width} = Dimensions.get('window');
      
      // render a pressable view
      return (
      <TouchableOpacity key={title} onPress={this.onPress(title)}>
      <View  style={[styles.card,{width:width-40}]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{cards}</Text>
      </View>
      </TouchableOpacity>
      )
    })
  }
  
  render() {
    console.log('render',this.state.bounceValue);
    return (
      <Animated.View style={[styles.container,{transform: [{scaleX:this.state.bounceValue}]}]}>
        {this.renderDeckList(this.state.decks)}
      </Animated.View>
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
  card: {
    alignItems: 'center',
    borderBottomColor: black,
    borderBottomWidth: 1,
    paddingTop: 40,
    paddingBottom: 40,
    marginTop: 20,
    marginBottom:20
  },
  title: {
    fontSize: 30
  },
  count: {
    fontSize: 20,
    color:gray
  }
});