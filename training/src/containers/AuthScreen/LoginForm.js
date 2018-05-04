import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable'

import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../config/metrics'

export default class LoginForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onLoginPress: PropTypes.func.isRequired,
    onSignupLinkPress: PropTypes.func.isRequired
  }

  state = {
    email: '',
    password: '',
    fullName: ''
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }

  render () {
    const { email, password } = this.state
    const { isLoading, onSignupLinkPress, onLoginPress } = this.props
    const isValid = email !== '' && password !== ''
    return (
      <View style= {styles.container}>
          <View style={styles.containerForm}>
            <View style={styles.loginTextContainer}>
                <Text style={styles.loginText} numberOfLines={1}>
                {'LOGIN'}
                </Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
              <CustomTextInput
                name={'email'}
                ref={(ref) => this.emailInputRef = ref}
                placeholder={'Email'}
                keyboardType={'email-address'}
                editable={!isLoading}
                returnKeyType={'next'}
                blurOnSubmit={false}
                withRef={true}
                onSubmitEditing={() => this.passwordInputRef.focus()}
                onChangeText={(value) => this.setState({ email: value })}
                isEnabled={!isLoading}
              />
              <CustomTextInput
                name={'password'}
                ref={(ref) => this.passwordInputRef = ref}
                placeholder={'Password'}
                editable={!isLoading}
                returnKeyType={'done'}
                secureTextEntry={true}
                withRef={true}
                onChangeText={(value) => this.setState({ password: value })}
                isEnabled={!isLoading}
              />
            </View>
            <View style={styles.footer}>
                <Text
                ref={(ref) => this.linkRef = ref}
                style={styles.forgotPasswordLink}
                >
                {'Forgot password?'}
                </Text>
              <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
                <CustomButton
                  onPress={() => onLoginPress(email, password)}
                  isEnabled={isValid}
                  isLoading={isLoading}
                  buttonStyle={styles.loginButton}
                  textStyle={styles.loginButtonText}
                  text={'LOGIN'}
                />
              </View>
            </View>
            </View>
            <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.signupLink}
            onPress={onSignupLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
            >
            {'Register a new account!'}
            </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
 container:{
    margin: 5,
    },
 containerForm: {
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#999999'
  },
 loginTextContainer: {
    margin: 5
 },
 loginText: {
    justifyContent: 'center',                                 
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 5,
    height: 20
 },
 separator: {
    backgroundColor: '#258FFB',
    height: StyleSheet.hairlineWidth,
    marginVertical: 0
 },
  form: {
    margin: 0
  },
  footer: {
    height: 120,
    justifyContent: 'center'
  },
  forgotPasswordLink: {
    color: '#258FFB',
    alignSelf: 'center',
    padding: 20
 },
  loginButton: {
     backgroundColor: '#238EFB',
     marginLeft: 10,
     marginRight: 10
  },
  loginButtonText: {
    color: '#999999',
    fontWeight: 'bold'
  },
  signupLink: {
    color: '#258FFB',
    alignSelf: 'center',
    padding: 20,
                                 paddingTop: 5
  }
})
