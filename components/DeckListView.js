import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createId} from '../utils/api.js';

export default class DeckListView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DeckListView {createId('home')}</Text>
      </View>
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
});