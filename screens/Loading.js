import React, {Component} from 'react';
import Dashboard from './Dashboard';

import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

/* Logo */
import Logo from '../assets/images/icons/LUCETE-LOGO2.png';


class LoadingScene extends Component {
    static navigationOptions = {
       headerShown: false,
    }
  state = {
    LogoAnime: new Animated.Value(0),
    LogoText: new Animated.Value(0),
    loadingSpinner: false,
  };

  componentDidMount() {
    const {LogoAnime, LogoText, navigation} = this.state;
    
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
      }).start(),

      Animated.timing(LogoText, {
        toValue: 1,
        duration: 1200,
      }),
    ]).start(() => {
      this.setState({
        loadingSpinner: true,
      });

      //setTimeout(switchToDashboard, 1500);
      setTimeout( () => {
          this.props.navigation.navigate('Dashboard');
        }, 1500);
    });
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            top: this.state.LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <Image source={Logo} />

          {this.state.loadingSpinner ? (
            <ActivityIndicator
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              size="large"
              color="#fcb89f"
            />
          ) : null}
        </Animated.View>
        <Animated.View style={{opacity: this.state.LogoText}}>
          <Text style={styles.logoTitle}> LUCETE </Text>
          <Text style={styles.logoText}> created by Curtain Call </Text>
        </Animated.View>
      </View>
    );
  }
}

export default LoadingScene;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcb89f',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoTitle: {
    color: '#FFFFFF',
    fontFamily: 'GoogleSans-Bold',
    fontSize: 30,
    marginTop: 29.1,
    fontWeight: '300',
    marginLeft: 60
    
  },
  logoText: {
    color: '#FFFFFF',
    fontFamily: 'GoogleSans-Regular',
    fontSize: 20,
    marginLeft: 20
  }
});