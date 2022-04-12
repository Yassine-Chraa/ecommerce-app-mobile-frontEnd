import React, {useEffect, useState} from 'react';
/***** React Native Components *****/
import {View, Text, TouchableOpacity, Button} from 'react-native';
import {CheckBox, Input, Tab, TabView} from 'react-native-elements';
import MyColors from '../colors';
//@ts-ignore
import {useValidation} from 'react-native-form-validator';
import defaultMesssages from '../constants/formMessages';
import axios from 'axios';

function SignupForm() {
  //=====> Sign Up Form State
  const [confirmPass, setConfirmPass] = useState('');
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { ...signUpForm, confirmPass },
    messages: defaultMesssages,
  });
  let submitForm = () => {
    validate({
      name: { required: true, minlength: 3 },
      email: { required: true, email: true },
      password: { required: true, minlength: 6 },
      confirmPass: {
        required: true,
        equalPassword: signUpForm.password,
      },
    });
    axios
      .post('https://mesro-dashboard.000webhostapp.com/api/users', signUpForm)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{ paddingTop: 40, paddingHorizontal: 20 }}>
      <Input
        placeholder="FullName"
        autoCompleteType={undefined}
        value={signUpForm.name}
        onChangeText={name => setSignUpForm({ ...signUpForm, name })}
        style={{ height: 50 }}
        errorMessage={isFieldInError('name') && getErrorsInField('name')} />
      <Input
        textContentType="emailAddress"
        placeholder="Email"
        style={{ height: 50 }}
        autoCompleteType={undefined}
        value={signUpForm.email}
        onChangeText={email => setSignUpForm({ ...signUpForm, email })}
        errorMessage={isFieldInError('email') && getErrorsInField('email')} />
      <Input
        secureTextEntry
        textContentType="newPassword"
        placeholder="Password"
        style={{ height: 50 }}
        autoCompleteType={undefined}
        value={signUpForm.password}
        onChangeText={password => setSignUpForm({ ...signUpForm, password })}
        errorMessage={isFieldInError('password') && getErrorsInField('password')} />
      <Input
        textContentType="password"
        secureTextEntry
        placeholder="Confirm Password"
        style={{ height: 50 }}
        autoCompleteType={undefined}
        value={confirmPass}
        onChangeText={confirmPass => setConfirmPass(confirmPass)}
        errorMessage={isFieldInError('confirmPass') && getErrorsInField('confirmPass')} />
      <View style={{ marginBottom: 10 }}>
        <Button
          title="Create An Account"
          onPress={() => submitForm()}
          color={MyColors.red} />
      </View>
      <Button title="Sign Up with Facebook" />
    </View>
  );
}
function LoginForm() {
  //=====> Sign In Form State
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: '',
    remember: false,
  });
  //=====> Validation
  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { ...signInForm },
    messages: defaultMesssages,
  });

  let submitForm = () => {
    validate({
      email: { required: true, email: true },
      password: { required: true, minlength: 6 },
    });
    console.log(signInForm);
    axios
      .post('https://mesro-dashboard.000webhostapp.com/api/login', signInForm)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{ paddingTop: 40, paddingHorizontal: 20 }}>
      <Input
        rightIcon={{ name: 'email' }}
        placeholder="Email"
        style={{ height: 50 }}
        autoCompleteType={undefined}
        value={signInForm.email}
        onChangeText={email => setSignInForm({ ...signInForm, email })}
        errorMessage={isFieldInError('email') && getErrorsInField('email')} />
      <Input
        secureTextEntry
        rightIcon={{ name: 'lock' }}
        placeholder="Password"
        style={{ height: 50 }}
        autoCompleteType={undefined}
        value={signInForm.password}
        onChangeText={password => setSignInForm({ ...signInForm, password })}
        errorMessage={isFieldInError('password') &&
          'The password must containt at least 6 characters.'}
        containerStyle={{ height: 70 }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <CheckBox
          title="Remember me"
          containerStyle={{
            paddingLeft: 0,
            backgroundColor: 'transparent',
            borderWidth: 0,
          }}
          checked={signInForm.remember}
          onPress={() => setSignInForm({ ...signInForm, remember: !signInForm.remember })} />
        <TouchableOpacity>
          <Text>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button
          title="Sign In"
          onPress={() => submitForm()}
          color={MyColors.red} />
      </View>
      <Button title="Sign In with Facebook" />
    </View>
  );
}
function Login() {
  const [index, setIndex] = useState(0);

  return (
    <>
      {/***** Login/Signup Taps *****/}
      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={{ backgroundColor: '#fff', height: 3 }}>
        <Tab.Item
          title="Sign up"
          buttonStyle={{ backgroundColor: MyColors.blue }}
          titleStyle={{ color: '#fff' }} />
        <Tab.Item
          title="Sign in"
          buttonStyle={{ backgroundColor: MyColors.blue }}
          titleStyle={{ color: '#fff' }} />
      </Tab>
      <TabView value={index} onChange={setIndex}>
        {/***** Sign Up *****/}
        <TabView.Item style={{ width: '100%' }}>
          <SignupForm />
        </TabView.Item>
        {/***** Sign In *****/}
        <TabView.Item style={{ width: '100%' }}>
          <LoginForm />
        </TabView.Item>
      </TabView>
    </>
  );
}

export default Login;
