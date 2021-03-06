import React, { Component} from 'react'
import {PropTypes} from 'prop-types'
import { KeyboardAvoidingView,
         LayoutAnimation,
         Platform,
         StyleSheet,
         UIManager,
         Text,
         Dimensions,
        ImageBackground
        } from 'react-native'
import { Image, View } from 'react-native-animatable'
import CustomButton from '../../components/CustomButton';
import imgLogo from '../../images/logo.png'
import imgBg from '../../images/bg.png';
import metrics from '../../config/metrics'

import Opening from './Opening'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true)

/**
 * The authentication screen.
 * It shows three different sub-screens:
 * - The opening screen, with the two buttons that redirect to the login/signup forms (if this.state.visibleForm === null)
 * - The signup form (if this.state.visibleForm === 'SIGNUP')
 * - The login form (if this.state.visibleForm === 'LOGIN')
 *
 * The app state (isLoggedIn, isLoading) and the login/signup functions are received as props from src.app.js
 *
 * The animations are delegated to:
 * - react-native-animatable: for the simpler animations of the components (in e.g. bounceIn animation of the logo)
 * - react-native's LayoutAnimation: for the form show/hide animation
 * - react-native's KeyboardAvoidingView: for applying a bottom padding when a keyboard show-up is detected
 *
 * An example of this screen animation flow is the following:
 * - The user opens the app.
 * - The logo shows up using the bounceIn animation of react-native-animatable, while the "Opening" subscreen animates the button
 *   using the fadeIn animation of react-native-animatable.
 * - The user taps on the "Create account" button.
 * - _setVisibleForm gets called with the 'SIGNUP' parameter. It configures the next animation and sets this.state.visibleForm to 'SIGNUP'.
 *   The state change triggers a render and the change of formStyle gets animated (thanks to the animation configuration previously
 *   applied by _setVisibleForm).
 * - Just after the signup form has become visible it animates the form button using the bounceIn animation of react-native-animatable.
 * - The user fills up its info and signup succesfully.
 * - componentWillUpdate checks the isLoggedIn props and after realizing that the user has just authenticated it calls _hideAuthScreen.
 *   _hideAuthScreen then 1. calls the SignupForm.hideForm(), that hides the form buttons (zoomOut) and the form itself (fadeOut),
 *   2. fadeOut the logo, 3. tells the container that the login animation has completed and that the app is ready to show the next screen (HomeScreen).
 */
export default class AuthScreen extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    signup: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    onLoginAnimationCompleted: PropTypes.func.isRequired // Called at the end of a succesfull login/signup animation
  }

  state = {
    visibleForm: 'LOGIN' // Can be: null | SIGNUP | LOGIN
  }

  componentWillUpdate (nextProps) {
    // If the user has logged/signed up succesfully start the hide animation
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this._hideAuthScreen()
    }
  }

  _hideAuthScreen = async () => {
    // 1. Slide out the form container
    await this._setVisibleForm(null)
    // 2. Fade out the logo
    await this.logoImgRef.fadeOut(800)
    // 3. Tell the container (app.js) that the animation has completed
    this.props.onLoginAnimationCompleted()
  }

  _setVisibleForm = async (visibleForm) => {
    // 1. Hide the current form (if any)
    if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {
      await this.formRef.hideForm()
    }
    // 2. Configure a spring animation for the next step
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    // 3. Set the new visible form
    this.setState({ visibleForm })
  }

  render () {
    const { isLoggedIn, isLoading, signup, login } = this.props
    const { visibleForm } = this.state
    // The following style is responsible of the "bounce-up from bottom" animation of the form
    const formStyle = (!visibleForm) ? { height: 0 } : { marginTop: 40 }
    return (
      <View style={styles.containerRow}>
            <ImageBackground
            animation={'bounceIn'}
            duration={1200}
            delay={200}
            style={styles.imgBg}
            source={imgBg}
            >
            {(visibleForm === 'SIGNUP') && (
                <CustomButton
                onPress={() => this._setVisibleForm('LOGIN')}
                buttonStyle={styles.backButton}
                textStyle={styles.backButtonText}
                text={'Back'}
                />
            )}
            {(visibleForm != 'SIGNUP') && (
                                           <View style={{flex:1}}>
                                           <View style={styles.paddingTopView} />
                <View style={styles.row}>
                    <Image
                          animation={'bounceIn'}
                          duration={1200}
                          delay={200}
                          ref={(ref) => this.logoImgRef = ref}
                          style={styles.logoImg}
                          source={imgLogo}
                        />
                    <View style={styles.textContainer}>
                        <Text style={styles.logoText} numberOfLines={1}>
                            {'Archer'}
                        </Text>
                    </View>
                </View>
                                           </View>
            )}
                {(!visibleForm && !isLoggedIn) && (
                  <Opening
                    onCreateAccountPress={() => this._setVisibleForm('SIGNUP')}
                    onSignInPress={() => this._setVisibleForm('LOGIN')}
                  />
                )}
                <KeyboardAvoidingView
                  keyboardVerticalOffset={-100}
                  behavior={'padding'}
                  style={[formStyle, styles.bottom]}
                >
                  {(visibleForm === 'SIGNUP') && (
                    <SignupForm
                      ref={(ref) => this.formRef = ref}
                      onLoginLinkPress={() => this._setVisibleForm('LOGIN')}
                      onSignupPress={signup}
                      isLoading={isLoading}
                    />
                  )}
                  {(visibleForm === 'LOGIN') && (
                    <LoginForm
                      ref={(ref) => this.formRef = ref}
                      onSignupLinkPress={() => this._setVisibleForm('SIGNUP')}
                      onLoginPress={login}
                      isLoading={isLoading}
                    />
                  )}
                </KeyboardAvoidingView>
            </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
 containerRow: {
     justifyContent: 'center',
     flexDirection:'row',
     alignItems: 'center',
     width: metrics.DEVICE_WIDTH,
     height: metrics.DEVICE_HEIGHT,
 },
  bottom: {
    backgroundColor: 'white'
  },
  imgBg: {
     width: metrics.DEVICE_WIDTH,
     height: metrics.DEVICE_HEIGHT
 },
 paddingTopView: {
     height: (metrics.DEVICE_HEIGHT/6)
 },
 backButton: {
     backgroundColor: '#EBF1FE',
     borderWidth: 0,
     marginLeft: (metrics.DEVICE_WIDTH - 70 - 20),
     marginRight: 20
 },
 backButtonText: {
     color: '#258FFB',
     fontSize: 16,
     fontWeight: 'bold'
 },
 row: {
     justifyContent: 'center',
     flexDirection:'row',
     padding: 0,
     margin: 20,
     width: (Dimensions.get('window').width - 40) ,
     height: (Dimensions.get('window').height/6),
     alignItems: 'center'     
 },
 logoImg: {
     justifyContent: 'center',     
     height: ((Dimensions.get('window').height - 210)/4 - 2),
     width: ((Dimensions.get('window').height - 210)/4 - 2),
 },
 textContainer: {
     flex: 1,
 },
 logoText: {
     justifyContent: 'center',
     color: '#548FFB',
     fontSize: 64,
     fontWeight: '500',
     marginLeft: 20,
     height: ((Dimensions.get('window').height - 210)/4 - 2)
 }
                                 
})
