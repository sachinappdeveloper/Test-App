import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {WHITE} from '../styles';

const SampleQuestionText = () => {
  return (
    <Text style={styles.container}>
      The <Text style={styles.title}>House</Text> is small.
    </Text>
  );
};

export default SampleQuestionText;

const styles = StyleSheet.create({
  container: {
    color: WHITE,
    width: '100%',
    fontSize: 19,
    textAlign: 'center',
    marginTop: 40,
  },
  title: {
    color: WHITE,
    width: '100%',
    fontSize: 19,
    textAlign: 'center',
    marginTop: 40,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
