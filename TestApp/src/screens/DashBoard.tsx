import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ButtonWithStatus from '../components/ButtonWithStatus';
import Options from '../components/Options';
import SampleQuestionText from '../components/SampleQuestionText';
import {
  DARK_GREY,
  LIGHT_BLUE,
  LIGHT_ORANGE,
  TRANSPERANT,
  WHITE,
  WHITE_BLUE,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '../styles';

function DashBoard() {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [questionListIndex, setQuestionListIndex] = useState<number>(0);
  const [setAnswerStep, setSetAnswerStep] = useState<number>(0);
  const [questionAnswers, setQuestionAnswers] = useState<any[]>([]);

  useEffect(() => {
    const getQuestionAnswerData = async () => {
      firestore()
        .collection('Question')
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setQuestionAnswers(data);
        });
    };
    getQuestionAnswerData();
  }, []);

  const onPressContinueButton = () => {
    console.log('setAnswerStep== ', setAnswerStep);
    if (selectedAnswer === '') {
      return;
    }
    setSetAnswerStep(setAnswerStep + 1);
    if (setAnswerStep + 1 === 2) {
      if (questionListIndex + 1 > questionAnswers?.length - 1) {
        setQuestionListIndex(0);
      } else {
        setQuestionListIndex(questionListIndex + 1);
      }

      setSetAnswerStep(0);
      setSelectedAnswer('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subView}>
        {questionAnswers?.length > 0 && (
          <ButtonWithStatus
            setAnswerStep={setAnswerStep}
            statusColor={
              setAnswerStep === 1
                ? selectedAnswer ===
                  questionAnswers?.[questionListIndex]?.answer
                  ? WHITE_BLUE
                  : LIGHT_ORANGE
                : TRANSPERANT
            }
            correctAnswer={questionAnswers?.[questionListIndex]?.answer}
            onPressButton={onPressContinueButton}
          />
        )}
        <View style={styles.popMainViewStyle}>
          <ScrollView style={styles.popScrollViewStyle}>
            <View style={styles.popSubViewStyle}>
              <Text style={styles.missingWordStyle}>Fill in missing word</Text>
              <SampleQuestionText />
              <Text style={styles.questionStyle}>
                {questionAnswers?.[questionListIndex]?.question?.split(
                  '_____',
                )?.[0] || ''}{' '}
                <View style={{overflow: 'visible'}}>
                  <Text
                    style={[
                      styles.textBlankStyle,
                      setAnswerStep === 1
                        ? {
                            ...styles.txtAnsBlankVIewSTyle,
                            backgroundColor:
                              setAnswerStep === 1
                                ? selectedAnswer ===
                                  questionAnswers?.[questionListIndex]?.answer
                                  ? WHITE_BLUE
                                  : LIGHT_ORANGE
                                : WHITE,
                          }
                        : styles.txtAnsView,
                    ]}>
                    {setAnswerStep === 1 ? selectedAnswer : "'          '"}
                  </Text>
                </View>{' '}
                {questionAnswers?.[questionListIndex]?.question?.split(
                  '_____',
                )?.[2] || ''}
              </Text>

              <FlatList
                data={questionAnswers?.[questionListIndex]?.options}
                scrollEnabled={false}
                contentContainerStyle={{alignItems: 'center', marginTop: 40}}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                numColumns={2}
                renderItem={({item, index}) => {
                  return (
                    <Options
                      key={item?.id?.toString()}
                      selectedAnswer={selectedAnswer}
                      onSelect={() => {
                        setSelectedAnswer(item);
                      }}
                      title={item}
                    />
                  );
                }}
                keyExtractor={(item) => item.id?.toString()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BLUE,
    flexDirection: 'column-reverse',
  },
  subView: {
    width: '100%',
    height: WINDOW_HEIGHT - 150,
    backgroundColor: DARK_GREY,
    borderTopStartRadius: WINDOW_WIDTH * 0.08,
    borderTopEndRadius: WINDOW_WIDTH * 0.08,
    flexDirection: 'column-reverse',
    overflow: 'hidden',
  },
  questionStyle: {
    color: WHITE,
    width: '95%',
    fontSize: 19,
    textAlign: 'center',
    marginTop: 40,
    lineHeight: 40,
  },
  missingWordStyle: {
    color: WHITE,
    width: '100%',
    textAlign: 'center',
    marginTop: 40,
  },
  popMainViewStyle: {flex: 1, alignItems: 'center'},
  popScrollViewStyle: {width: '100%'},
  popSubViewStyle: {flex: 1, alignItems: 'center'},
  textBlankStyle: {
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txtAnsBlankVIewSTyle: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    bottom: -5,
    borderRadius: 17,
    overflow: 'hidden',
    color: WHITE,
  },
  txtAnsView: {textDecorationLine: 'underline', color: WHITE},
});

export default DashBoard;
