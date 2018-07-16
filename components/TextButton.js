import React from 'react';
import {Text,TouchableOpacity,StyleSheet} from 'react-native';
import {blue,white} from '../utils/colors';

export default function TextButton({children,onPress, style={}})
{
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset,style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    borderRadius:10,
    width:200,
    height:45,
    paddingTop:10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center' ,
    margin: 10
  }
});
