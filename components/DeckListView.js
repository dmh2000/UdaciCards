// library module imports
import React from 'react';
import {connect} from 'react-redux';
import { 
  StyleSheet, 
  Text, 
  View ,
  TouchableOpacity, 
  Dimensions,
  Animated
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

// application local imports
import TextButton from './TextButton';
import {loadDecks} from '../actions';
import {black,gray, white} from '../utils/colors';

/**
 * show the list of available decks
 * or a way to create the first one
 */
class DeckListView extends React.Component {
  state = {
    bounceValue: new Animated.Value(0)
  }

  componentDidMount() {
    this.props.dispatch(loadDecks());
  }
  
  onPressNew = () => {
    this.props.navigation.navigate('NewDeckView');
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
        this.setState({bounceValue:new Animated.Value(0)});
        this.props.navigation.navigate('DeckView', {deckName:deckName})
      });


    }
  }

  renderDeckList(decks) {

    return Object.keys(decks).map( (id) => {

      deck = decks[id];

      // skip invalid decks
      if (!deck.hasOwnProperty('title')) {
        return null;
      }

      // extract the parameters needed
      len = decks[id].questions.length;

      const cards = len === 1 
        ? '1 card'
        : `${len} cards`;
      const title = deck.title;
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

    if (!this.props.hasOwnProperty('decks')) {
      return (
        <View>
          <Text>no decks</Text>
        </View>
      )
    }

    // empty decks prop
    if ((this.props.decks === null) || (Object.keys(this.props.decks).length === 0)) {
      return (
        <View style={styles.container}>
          <Text style={[styles.title,{paddingBottom:40}]}>No Decks Yet! Create One!</Text>
          <TextButton style={styles.blackButton} onPress={this.onPressNew}>
            <Text>New Deck</Text>
          </TextButton>
        </View>
      )
    }

    // got some decks, show them
    return (
      <Animated.View style={[styles.container,{transform: [{scaleX:this.state.bounceValue}]}]}>
        {this.renderDeckList(this.props.decks)}
      </Animated.View>
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
export default connect(mapStateToProps)(DeckListView);


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
  }, 
  blackButton: {
    backgroundColor:black,
    color:white,
    width:200,
    fontSize:15
  },
});