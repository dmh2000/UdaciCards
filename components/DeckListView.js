// library module imports
import React from 'react';
import {connect} from 'react-redux';
import { 
  StyleSheet, 
  Text, 
  View ,
  TouchableOpacity, 
  Dimensions,
  Animated,
  FlatList
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

  renderDeck = ({item}) =>  {
      const deck = item;

      // skip invalid decks
      if (!deck.hasOwnProperty('title')) {
        return null;
      }

      // extract the parameters needed
      len = deck.questions.length;

      // get number of cards string
      const cards = len === 1 
        ? '1 card'
        : `${len} cards`;

      // computed parameters
      const title = deck.title;
      const dim = Dimensions.get('window');
      const margin = dim.width * 0.10;
      const width  = dim.width * 0.80;

      // render a pressable view
      return (
        <TouchableOpacity  style={[styles.card,{marginLeft:margin},{width:width}]}  onPress={this.onPress(title)}>
        <Animated.View  style={[styles.container, {transform: [{scaleX:this.state.bounceValue}]}]}>          
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.count}>{cards}</Text>
        </Animated.View>
        </TouchableOpacity>
      )
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
    
    // transform top level object to array of decks
    // filter out invalid decks (left because emulator remembers bad values)
    const decks = Object.keys(this.props.decks).filter( (name) => {
      return this.props.decks[name].hasOwnProperty('title');
    }).map( (id) => {
      return this.props.decks[id];
    });

    // got some decks, show them
    return (
      <View styles={[styles.container]}>
        <FlatList
          data={decks}
          showsVerticalScrollIndicator={true}
          keyExtractor={(item,index) => item.title}
          renderItem={this.renderDeck}
          />
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
export default connect(mapStateToProps)(DeckListView);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
  },
  card: {
    flex:1,
    height: 110,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderBottomColor: black,
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom:10,
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