import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  View,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'

import { Txt, TxtBold } from './src/components/Txt'

import bg from './assets/icons/socio.png'

import LottieView from 'lottie-react-native';

import API from './src/util/Api'

const {width: WIDTH} = Dimensions.get('window').width;

const App = () => {

  const [tweetUrl, setTweetUrl] = useState()

  const [responData, setResponseData] = useState()

  const [isProcessing, setProcess] = useState(false)

  const [isResult, setResult] = useState(false)

  useEffect(() => {
    SplashScreen.hide()

    Linking.getInitialURL().then((url) => {
      // if your app was launched from the share you will get the text
      // else url will be null
      if (url) {
        console.log('shared string/text is ', url);
        setTweetUrl(url)
      }
    })

    // Linking.addEventListener('url',(url)=>{ 
    //   console.log('this is the url: ',url);
    // });

    // const getUrlAsync = async () => {
    //   // Get the deep link used to open the app
    //   const initialUrl = await Linking.getInitialURL();
    //   console.log(initialUrl)
    //   console.log("masuk sini")
    //   setTweetUrl(initialUrl)
    // };

    // getUrlAsync()

  }, [responData, isProcessing]);

  const onSubmit = () => {
    setProcess(true)
    API.post('/tweets', { url: tweetUrl })
      .then(res => {
        console.log(res.data)
        setResponseData(res.data.values)
        setResult(true)
        setProcess(false)
      })
     .catch(err => console.log(err))
    
  }

  const onBackPressed = () => {
    setProcess(false)
    setResult(false)
    setTweetUrl('')
  }

  return (
    <SafeAreaView style={styles.container}>
      {!isProcessing && !isResult && (
        <>
          <View style={styles.headerContainer}>
            <Image source={bg} style={styles.bg} />
            <TxtBold style={styles.headerText}>Twitter Fake News Detector</TxtBold>
            <Txt style={styles.descText}>Welcome. Lets find the truth behind the truth.</Txt>
            <Txt style={styles.descText}>Make sure the url you entered is complete.</Txt>
          </View>
          <View style={styles.footerContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter twitter url here"
              returnKeyType="search"
              autoCapitalize="none"
              value={tweetUrl}
              onChangeText={(text) => setTweetUrl(text)}
              placeholderTextColor="#d3d4cf"
              onSubmitEditing={onSubmit} />
            <TouchableOpacity onPress={onSubmit}>
              <View style={styles.requestBtn}>
                <TxtBold style={styles.requestBtnTxt}>Submit</TxtBold>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
      {isProcessing && (
        <>
          <LottieView source={require('./assets/loading/rocket.json')} autoPlay loop />
        </>
      )}
      {isResult && (
        <>
          <View style={styles.headerContainer}>
            <Image source={bg} style={styles.bg} />
            <LottieView
            source={responData.result == "FAKE" ? require('./assets/loading/fake.json') : require('./assets/loading/real.json')} 
            autoPlay
            loop={false}
            style={{position: 'relative', width: 200, height: 200, alignSelf: 'center', marginTop: -30}}  />
          </View>
          <View style={styles.footerContainer}>
            <TxtBold style={styles.resultText}>{responData.result}</TxtBold>
            <TouchableOpacity onPress={onBackPressed}>
              <View style={styles.requestBtn}>
                 <TxtBold style={styles.requestBtnTxt}>Back</TxtBold>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#15202b'
    backgroundColor: '#12171d'
  },
  headerText: {
        fontSize: 26,
        color: '#fff',
        // fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
  },
  descText: {
    fontSize: 15,
    color: '#777878',
    textAlign: 'center'
  }, 
  textInput: {
		fontSize: 16,
        alignSelf: 'stretch',
        height: 45,
		backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 12,
        borderColor: '#5794ff',
        borderWidth: 1,
		paddingStart: 16,
    paddingEnd: 16,
    marginLeft: 30,
    marginRight: 30,
        color: 'rgba(51, 51, 51, 0.8)',
        top: 4
  },
  requestBtn: {
      backgroundColor: '#1da1f2',
      borderRadius: 30,
      marginHorizontal: 60,
      alignSelf: 'stretch',
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
    headerContainer: {
      flex: 1,
      width: '100%'
    },
    footerContainer: {
      marginBottom: 40
    },
    bg: { 
      width: 320, 
      height: 320, 
      marginTop: 90,
      alignSelf: 'center',
      marginBottom: 40
    },
    resultText: {
      fontSize: 30,
      color: '#fff',
      // fontWeight: 'bold',
      textAlign: 'center',
},
});

export default App;
