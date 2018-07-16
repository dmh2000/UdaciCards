import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NavHeader from './NavHeader';
import TextButton from './TextButton';
import {black,white,gray} from '../utils/colors';


export default class DeckView extends React.Component {
  onPress() {
    this.props.navigation.navigate('DeckListView');
  }

  render() {
    return (
      <View style={styles.container}>
        <NavHeader title='udacicards' onPress={this.onPress}/>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.title}>Title</Text>
            <Text style={styles.count}>1 card</Text>
          </View>
          <View style={styles.bottom}>
            <TextButton style={styles.whiteButton}>Start Quiz</TextButton>
            <TextButton style={styles.blackButton}>Add Question</TextButton>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  top: {
    paddingTop:50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottom: {
    paddingBottom:50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    color: black
  },
  count: {
    fontSize: 20,
    color:gray
  },
  whiteButton: {
    backgroundColor:white,
    color:black,
    borderWidth:2,
    borderColor:black
  },
  blackButton: {
    backgroundColor:black,
    color:white
  }
});
