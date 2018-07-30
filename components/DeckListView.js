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
 * Render individual deck info including link 
 */
class DeckRender extends React.PureComponent
{
  state = {
    animate : new Animated.Value(0)
  }
  /**
   * return a closure over the animate parameter
   */
  onPress = () => {
    // invoke animation
    // const {animate} = this.state;
    Animated.sequence([
      Animated.spring(this.state.animate, {toValue:1})
    ]).start( () => {
      // reset the animation value
      this.setState({animate:new Animated.Value(0)});
      // then call delegated onPress back to main component
      this.props.onPress(this.props.deck.title);
    });
  }
  
  render() {

    const deck = this.props.deck;

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
      <TouchableOpacity  style={[styles.card,{marginLeft:margin},{width:width}]}  onPress={this.onPress}>
      <Animated.View  style={[styles.container, {transform: [{scaleX:this.state.animate},{scaleY:this.state.animate}]}]}>          
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{cards}</Text>
      </Animated.View>
      </TouchableOpacity>
    )
  }
}

/**
 * show the list of available decks
 * or a way to create the first one
 */
class DeckListView extends React.Component {
  state = {
    bounceValue: new Animated.Value(0)
  }

  /**
   * invokes adding a new deck
   */
  onPressNew = () => {
    this.props.navigation.navigate('NewDeckView');
  }

  /**
   * DeckRender component calls this with deckname
   */
  onPress = (deckName) => {
    this.props.navigation.navigate('DeckView', {deckName:deckName})
  }

  /**
   * FlatList renderItem function
   */
  renderDeck = ({item}) =>  (
      <DeckRender deck={item} onPress={this.onPress}/>
  )
  
  /**
   * load all the decks
   */
  componentDidMount() {
    this.props.dispatch(loadDecks());
  }
  
  /**
   * render main view
   */
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

    // at this point 'decks' is an array of deck objects

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

/**
 * local  styles
 */
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