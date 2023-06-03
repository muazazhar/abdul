/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  TextInput,
  I18nManager,
} from 'react-native';
import './src/i18n';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {t, i18n} = useTranslation();
  const isRtl = I18nManager.isRTL;

  const changeLanguage = async lng => {
    console.log('language', lng);
    await AsyncStorage.setItem('language', lng);
    i18n.changeLanguage(lng).then(() => {
      I18nManager.forceRTL(lng == 'en' ? false : true);
      RNRestart.Restart();
    });
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          backgroundColor: '#3d79fe',
          height: '100%',
          width: '100%',
          paddingHorizontal: 10,
          // alignItems: 'center',
        }}>
        <Image
          style={{height: 50, width: 70}}
          source={require('./src/visa.png')}
        />

        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            marginBottom: '50%',
            color: 'white',
          }}>
          {t(
            'Find and book Barber, beauty, Salon & Spa service anywhere, anytime',
          )}
        </Text>
        <TextInput
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 1,
            color: 'white',
            fontSize: 20,
            marginBottom: '50%',
            width: '90%',
            alignSelf: 'center',
          }}
          // onChangeText={onChangeText}
          value={t('Nearby Service')}
        />
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'white',
            marginBottom: '50%',
          }}>
          {t(
            'Find and book Barber, beauty, Salon & Spa service anywhere, anytime',
          )}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Button title="English" onPress={() => changeLanguage('en')} />
          {/* <Button title="Arabic" onPress={() => changeLanguage('ar')} /> */}
          <Button title="Hebrew" onPress={() => changeLanguage('he')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
