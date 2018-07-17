import React from 'react';
import {View,Text, StyleSheet,TouchableOpacity} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

import TextButton from './TextButton';
import {white,black} from '../utils/colors';

function NavButton({children,onPress, style={}})
{
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  );
}

export default function NavHeader({title,onPress}) {
  return (
    <View style={styles.container}>
      <NavButton style={styles.title} onPress={onPress}>
      {'   '} <FontAwesome name='arrow-left' color={white}/> {'   '} {title}
      </NavButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor:black,
    paddingTop:15,
    paddingBottom:15
  },
  title: {
    color:white,
    backgroundColor:black,
    fontWeight:'bold'
  }
});