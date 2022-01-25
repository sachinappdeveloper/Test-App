import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import {
  LIGHT_GREY,
  TRANSPERANT,
  WHITE,
  WHITE_BLUE,
  WINDOW_WIDTH,
} from '../styles';
import {appImages} from '../styles/appImages';

const ButtonWithStatus = ({
  onPressButton = () => {},
  statusColor = TRANSPERANT,
  correctAnswer = '',
  answerStatus = 'click',
  setAnswerStep = 0,
}) => {
  return (
    <View style={[styles.container, {backgroundColor: statusColor}]}>
      <View
        style={[
          styles.statusBackgroundStyle,
          {opacity: statusColor !== TRANSPERANT ? 1 : 0},
        ]}>
        <Text style={styles.txtAnswerStatus}>
          {statusColor === WHITE_BLUE
            ? 'Good job!'
            : `Answer: ${correctAnswer}`}
        </Text>
        <View style={styles.flexView} />
        <Image source={appImages.flag} style={styles.imgFlag} />
      </View>
      <View style={styles.btnMainView}>
        <TouchableOpacity
          onPress={onPressButton}
          style={[
            styles.btnTouchStyle,
            {backgroundColor: setAnswerStep === 0 ? LIGHT_GREY : WHITE},
          ]}>
          <Text
            style={[
              styles.btnText,
              {color: setAnswerStep === 0 ? WHITE : statusColor},
            ]}>
            {(answerStatus = 'click' ? 'CONTINUE' : 'CHECK ANSWER')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtonWithStatus;

const styles = StyleSheet.create({
  container: {
    height: 160,
    borderTopStartRadius: WINDOW_WIDTH * 0.08,
    borderTopEndRadius: WINDOW_WIDTH * 0.08,
    overflow: 'hidden',
    alignItems: 'center',
  },
  statusBackgroundStyle: {
    height: 50,
    width: WINDOW_WIDTH - WINDOW_WIDTH * 0.08 * 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtAnswerStatus: {color: WHITE, fontWeight: 'bold', marginLeft: 20},
  flexView: {flex: 1},
  imgFlag: {height: 15, width: 15, marginRight: 20},
  btnMainView: {
    flex: 1,
    width: WINDOW_WIDTH - WINDOW_WIDTH * 0.08 * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTouchStyle: {
    height: 50,
    width: WINDOW_WIDTH - WINDOW_WIDTH * 0.08 * 2 - 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {fontWeight: 'bold'},
});
