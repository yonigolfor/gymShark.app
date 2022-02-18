import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Modal, KeyboardAvoidingView, Switch } from 'react-native';
import { globalStyles } from '../shared/styles';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import Cookies from 'universal-cookie';
import LoadingScreen from './loadingScreen';
import { Utils } from '../tools/utils';


const cookies = new Cookies();
const maxAgeCookie = 60 * 60 * 24 * 30 ; // 1 month


export default function Login({ navigation }) {
    const [emailErr, setemailErr] = useState('');
    const [passwordErr, setpasswordErr] = useState('');
    const [rememberMe, setrememberMe] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    

    loginHandler = (values) => {
        // loading layout
        setisLoading(true);
        // reset Errors
        setemailErr('');
        setpasswordErr('');
        // start handle
        //console.log(values, rememberMe);
        fetch('http://192.168.1.156:4000/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email':values.email,
                'password': values.password,
                'rememberMe': rememberMe
            })
        })
        
        .then(res=>res.json())
        .then(data=>{
            console.log('the data', data);
            if(data.errors){
                setemailErr(data.errors.email);
                setpasswordErr(data.errors.password);
            }
            else if(data.userId){ 
                // set cookies for next login
                setCookies(rememberMe, data.userId, data.email);
                console.log(cookies.getAll());
                // new route
                navigation.replace('Home', data); 
            }
            setisLoading(false);
        })
        .catch((err)=> console.log(err))
    }

   
    removeCookies = () => {
        console.log('cookies before remove:', cookies.getAll());
        cookies.remove('rememberMe');
        cookies.remove('userId');
        cookies.remove('email');
        console.log('cookies after remove:', cookies.getAll());
    }

    setCookies = (rememberMeVal, userIdVal, emailVal) => {
        cookies.set('rememberMe', rememberMeVal, { path: '/' , maxAge: maxAgeCookie });
        cookies.set('userId', userIdVal, { path: '/' , maxAge: maxAgeCookie });
        cookies.set('email', emailVal, { path: '/' , maxAge: maxAgeCookie });
        console.log('cookies:!', cookies.getAll());
    }
   
    return (
        <KeyboardAvoidingView  
        style= {globalStyles.container}
        behavior='height'
        >
            {/* loading layout */}
            {
                isLoading ? 
                <LoadingScreen/> : null
            }
         
            {/* auto login */} 
            {
                cookies.get('rememberMe') && !navigation.getParam('logedOut') ? 
                navigation.replace('Home', { userId: cookies.get('userId') ,email: cookies.get('email') }) :
                null
            }
            {   // remove remember me cookies
                cookies.get('rememberMe') && navigation.getParam('logedOut') ?
                removeCookies() : 
                null
            }

            {/* modal signup
            <Modal visible={signupPopup} animationType={'fade'}>   
                <Signup navigation= {navigation} setsignupPopup={setsignupPopup} />
            </Modal> */}

            <Text style={globalStyles.textTitle}>{Utils.Title}</Text>

            <Formik 
            initialValues={{email: '', password: ''}}
            onSubmit={(values)=> {
               loginHandler(values);
            }}
            >
                {(props) => (
                    <View style={styles.loginContainer}>
                        <Text style={globalStyles.subTitle}>Login</Text>
                        <Text>Enter your email: </Text>
                        <TextInput 
                        style={{...globalStyles.input, marginBottom:0}}
                        placeholder={'abc@xyz.com'}
                        onChangeText={props.handleChange('email')}
                        value={props.values.email}
                        keyboardType='email-address'
                        />
                        <Text style={globalStyles.errorMsg}>{emailErr}</Text>
                        
                        <Text>Enter password: </Text>
                        <TextInput 
                        style={{...globalStyles.input, marginBottom:0}}
                        onChangeText={props.handleChange('password')}
                        value={props.values.password}
                        secureTextEntry={true}
                        placeholder={'******'}
                        />
                        <Text style={globalStyles.errorMsg}>{passwordErr}</Text>

                        <View style={{display:"flex", flexDirection: "row-reverse", marginBottom:15, justifyContent: "space-evenly"}}>
                            <Text style={{...styles.newUser, margin:15}}>Remember me</Text>
                            <Switch 
                            value={rememberMe}
                            onValueChange={(val) => setrememberMe(val)}
                            />
                        </View>
                   
                        <Button 
                        title={'Send'}
                        onPress={props.handleSubmit}
                        />
         
                        <TouchableOpacity onPress={() => navigation.navigate('Signup', { setCookies })}>
                            <Text style={styles.newUser}>Don't have an account yet?</Text>
                        </TouchableOpacity>
                        
                    </View>
                
                )}
            </Formik>

            {/* <Button 
            title= {'get cookies'}
            onPress= {()=>console.log(cookies.getAll())}
            /> */}
        </KeyboardAvoidingView >
    )

}


const styles = StyleSheet.create({
    loginContainer: {
        margin: 30,

      },  
      newUser: {
          marginTop:20,

      }
  });