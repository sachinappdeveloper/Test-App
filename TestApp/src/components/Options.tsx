import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DARK_GREY, OFF_WHITE, WHITE} from '../styles';

const Options = ({title = '', selectedAnswer = '', onSelect = () => {}}) => {
  return (
    <TouchableOpacity onPress={onSelect} style={[styles.container]}>
      <Text
        style={[
          styles.title,
          {backgroundColor: selectedAnswer === title ? OFF_WHITE : WHITE},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
    marginBottom: 20,
    marginRight: 20,
    maxWidth: '50%',
  },
  title: {
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 'bold',
    color: DARK_GREY,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 17,
    overflow: 'hidden',
  },
});
