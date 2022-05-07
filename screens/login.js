import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Modal, KeyboardAvoidingView, Switch } from 'react-native';
import { globalStyles } from '../shared/styles';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import Cookies from 'universal-cookie';
import LoadingScreen from './loadingScreen';
import { Utils } from '../tools/utils';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { 
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    deleteUser 
} from "firebase/auth";

const cookies = new Cookies();
const maxAgeCookie = 60 * 60 * 24 * 30 ; // 1 month

const isValidInput = (values, setemailErr, setpasswordErr) => {
    if (!values.email){
        setemailErr('Please enter your email');
        return false;
    } 
    // if (!values.password){
    //     setemailErr('please enter password');
    //     return false;
    // }
        
    return true;
}

const isEqualEmails = (str1, str2) => {
    let i = 0;

    // length of first string
    let len1 = str1.length;

    // length of second string
    let len2 = str2.length;

    // if length is not same
    // simply return false since both string
    // can not be same if length is not equal
    if (len1 != len2)
        return false;

    // loop to match one by one
    // all characters of both string
    while (i < len1)
    {

        // if current characters of both string are same,
        // increase value of i to compare next character
        if (str1[i] == str2[i])
        {
            i++;
        }

        // if any character of first string
        // is some special character
        // or numeric character and
        // not same as corresponding character
        // of second string then return false
        else if (!((str1[i].charCodeAt() >= 'a'.charCodeAt() && str1[i].charCodeAt() <= 'z'.charCodeAt())
                || (str1[i].charCodeAt() >= 'A'.charCodeAt() && str1[i].charCodeAt() <= 'Z'.charCodeAt())))
        {
            return false;
        }

        // do the same for second string
        else if (!((str2[i].charCodeAt() >= 'a'.charCodeAt() && str2[i].charCodeAt() <= 'z'.charCodeAt())
                || (str2[i].charCodeAt() >= 'A'.charCodeAt() && str2[i].charCodeAt() <= 'Z'.charCodeAt())))
        {
            return false;
        }

        // this block of code will be executed
        // if characters of both strings
        // are of different cases
        else
        {
            // compare characters by ASCII value
            if (str1[i].charCodeAt() >= 'a'.charCodeAt() && str1[i].charCodeAt() <= 'z'.charCodeAt())
            {
                if (str1[i].charCodeAt() - 32 != str2[i].charCodeAt())
                    return false;
            }

            else if (str1[i].charCodeAt() >= 'A'.charCodeAt() && str1[i].charCodeAt() <= 'Z'.charCodeAt())
            {
                if (str1[i].charCodeAt() + 32 != str2[i].charCodeAt())
                    return false;
            }

            // if characters matched,
            // increase the value of i to compare next char
            i++;

        } // end of outer else block

    } // end of while loop

    // if all characters of the first string
    // are matched with corresponding
    // characters of the second string,
    // then return true
    return true;

} // end of equalIgnoreCase function

const getUserFromDb = async (values, setemailErr) => {
    let email = values.email; 
    let password = values.password;

    const db = getDatabase();
    const reference = ref(db, 'users/');
    let userData;
    
    await new Promise((resolve,reject) => {
        let snapEmail, snapPass;
        onValue(reference, (dataSnapshot) => {

            Object.values(dataSnapshot.val()).forEach(snapshot =>{
                // console.log("val:", snapshot.email);
                snapEmail = snapshot.email;
                snapPass = snapshot.password;
                if(isEqualEmails(snapEmail, email) && snapPass == password){
                        
                    // check password
                    userData = snapshot;
                    resolve(userData);
                }
            })
            resolve(false);
        })
        
    })

    if(!userData)
        setemailErr('Email or password is incorrect');
    
    else
        return userData;

}


//init firebase
const firebaseConfig = {
    apiKey: "AIzaSyAhk4HWLjbw2O4P3kZiMvhJjgFE5rm39Cs",
    authDomain: "gymsharks-7cda5.firebaseapp.com",
    databaseURL: "https://gymsharks-7cda5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gymsharks-7cda5",
    storageBucket: "gymsharks-7cda5.appspot.com",
    messagingSenderId: "743360215939",
    appId: "1:743360215939:web:782ee3a8381774020594b6",
    measurementId: "G-NVGD0GRN39"
  };
initializeApp(firebaseConfig);
const auth = getAuth();

export default function Login({ navigation }) {
    const [emailErr, setemailErr] = useState('');
    const [passwordErr, setpasswordErr] = useState('');
    const [rememberMe, setrememberMe] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    

    test = async (values) => {
        let userData, isValid;
        
        // loading layout
        console.log("logging in...");
        setisLoading(true);

        // reset Errors
        setemailErr('');
        setpasswordErr('');
        // start handle
        isValid = isValidInput(values, setemailErr, setpasswordErr);
        if (!isValid){
            setisLoading(false);
            return;
        }
        
        userData = await getUserFromDb(values, setemailErr);
        console.log("userData: ", userData);
        if (userData){
            console.log('userData sent from login: ', userData);
            // new route
            navigation.replace('Home', userData);
        }

        setisLoading(false);
    }

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
               test(values);
                //loginHandler(values);
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
         
                        <TouchableOpacity onPress={() => navigation.replace('Signup', { setCookies })}>
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