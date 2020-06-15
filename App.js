import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import { Txt, TxtBold } from './src/components/Txt'

import bg from './assets/icons/social-feed-colour-800px.png'

const {width: WIDTH} = Dimensions.get('window');

const App = () => {

  const [tweetUrl, setTweetUrl] = useState()

  return (
    <View style={styles.container}>
      <Image source={bg} style={{width: 300, height: 300, marginTop: 20}} />
      <Txt style={styles.headerText}>Twitter Fake News Detector</Txt>
      <TextInput
        style={styles.textInput}
        placeholder="Enter twitter url here"
        returnKeyType="go"
        autoCapitalize="none"
        value={tweetUrl}
        placeholderTextColor="#d3d4cf" />
      <TouchableOpacity>
        <View style={styles.requestBtn}>
          <TxtBold style={styles.requestBtnTxt}>Submit</TxtBold>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b'
  },
  headerText: {
        fontSize: 24,
        width: 250,
        color: '#fff',
        fontWeight: 'bold',
    },
  textInput: {
		fontSize: 16,
        width: WIDTH - 32,
        height: 40,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 8,
        borderColor: '#5794ff',
        borderWidth: 1,
		paddingStart: 16,
		paddingEnd: 16,
        color: 'rgba(51, 51, 51, 0.8)',
        top: 4
    },
    requestBtn: {
      backgroundColor: '#5794ff',
      borderRadius: 16,
      alignItems: 'center',
          justifyContent: 'center',
          marginTop: 24
    },
    requestBtnTxt: {
      fontSize: 18,
      letterSpacing: 1,
      paddingVertical: 12,
      color: '#fff',
    },
});

export default App;
