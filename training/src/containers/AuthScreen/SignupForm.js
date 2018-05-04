import React, { Component, PropTypes } from 'react'
import { StyleSheet, Image, Dimensions} from 'react-native';
import { Text, View } from 'react-native-animatable'

import TouchableView from '../../components/TouchableView';
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../config/metrics'
import imgCheckBox0 from '../../images/checkBox0.png';
import imgCheckBox1 from '../../images/checkBox1.png'
export default class SignupForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onSignupPress: PropTypes.func.isRequired,
    onLoginLinkPress: PropTypes.func.isRequired
  }

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    countryName: '',
    checkBox: false
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
    const { email, password, firstName, lastName, phone, countryName, checkBox } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress } = this.props
      const isPersonalInfoValid = firstName !== '' && lastName !== '' && phone !== '' && countryName !== ''
    const isValid = email !== '' && password !== '' && isPersonalInfoValid && checkBox
    return (
      <View style={styles.container}>
        <View style={styles.registerTextContainer}>
            <Text style={styles.registerText} numberOfLines={1}>
            {'REGISTER ACCOUNT'}
            </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.form} ref={(ref) => this.formRef = ref}>
          <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'First name'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.emailInputRef.focus()}
            onChangeText={(value) => this.setState({ firstName: value })}
            isEnabled={!isLoading}
          />
            <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'Last name'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.emailInputRef.focus()}
            onChangeText={(value) => this.setState({ lastName: value })}
            isEnabled={!isLoading}
            />
            <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'Country'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.emailInputRef.focus()}
            onChangeText={(value) => this.setState({ countryName: value })}
            isEnabled={!isLoading}
            />
            <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'Phone number'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.emailInputRef.focus()}
            onChangeText={(value) => this.setState({ firstName: value })}
            isEnabled={!isLoading}
            />
          <CustomTextInput
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
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
            <TouchableView
                    onPress={() => { this.setState({
                                           checkBox: !this.state.checkBox
                                           })
                            }}
                    style={[styles.button, styles.checkBoxStyle]}>
                <View style={{flexDirection: 'row'}}>
                    <Image
                        animation={'bounceIn'}
                        duration={1200}
                        delay={200}
                        ref={(ref) => this.logoImgRef = ref}
                        style={styles.checkBoxImg}
                        source={(this.state.checkBox) ? imgCheckBox0 : imgCheckBox1}
                    />
                    <Text style={{justifyContent: 'center', margin: 10}}>
                        {' Accept terms and conditions.'}
                    </Text>
                </View>
            </TouchableView>
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => onSignupPress(email, password, firstName)}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.createAccountButton}
              textStyle={styles.createAccountButtonText}
              text={'REGISTER'}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.loginLink}
            onPress={onLoginLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Already have an account?'}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
     margin: 10,
     marginTop: 5,
     borderRadius: 5,
     borderWidth: 1,
     borderColor: '#999999'
  },
  registerTextContainer: {
     margin: 5
 },
  registerText: {
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
    margin: 5
  },
  checkBoxStyle:{
    marginLeft: 10
 },
 checkBoxImg: {
    justifyContent: 'center',
    height: 30,
    width: 30,
    resizeMode: 'contain'
 },
                                
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: '#238EFB',
    marginLeft: 10,
    marginRight: 10
  },
  createAccountButtonText: {
    color: '#999999',
    fontWeight: 'bold'
  },
  loginLink: {
    color: '#258FFB',
    alignSelf: 'center',
    padding: 20
  }
})
