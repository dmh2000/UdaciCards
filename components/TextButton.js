import React from 'react';
import {Text,TouchableOpacity,StyleSheet} from 'react-native';
import {black,gray} from '../utils/colors';

export default function TextButton({children,onPress, style={},disabled})
{
  const textStyle = disabled 
  ? [styles.reset,style,{backgroundColor:gray}]
  : [styles.reset,style];

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled}
      >
      <Text style={textStyle}>{children}</Text>
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
