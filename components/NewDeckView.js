import React from 'react';
import { StyleSheet, TextInput, Text,  View, Dimensions} from 'react-native';

import NavHeader from './NavHeader';
import TextButton from './TextButton';
import {black,white,gray} from '../utils/colors';

export default class NewDeckView extends React.Component {

  // object state
  state = {
    text:""
  }

  // bind onPress to this via arrow function
  onNavPress = () => {
    this.props.navigation.navigate('DeckListView');
  }

  onSubmit = () => {
    console.log('submit');
    const deckName = this.state.text;

    // clear text
    this.setState({text:""});

    // create new deck

    // navigate to individual deck view
    this.props.navigation.navigate('DeckView', {deckName:deckName});
  }

  // render
  render() {
    const {height,width} = Dimensions.get('window');
    console.log(height,width);
    return (
      <View style={styles.container1}>
        <NavHeader title='udacicards' onPress={this.onNavPress}/>
        <View style={styles.container2}>
          <Text style={styles.name}>Name Your Deck!</Text>
          <TextInput
            style={[styles.input,{width:(width * 0.8)}]}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
            <TextButton style={styles.blackButton} onPress={this.onSubmit}>Submit</TextButton>
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
  blackButton: {
    backgroundColor:black,
    color:white
  },
  input : {
    width:200,
    borderWidth: 2,
    borderColor: black,
    borderRadius:5
  },
  name: {
    fontSize:20,
    paddingBottom:20
  }
});
