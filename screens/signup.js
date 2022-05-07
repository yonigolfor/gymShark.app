import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Switch, TouchableOpacity} from 'react-native';
import { globalStyles } from '../shared/styles';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import Cookies from 'universal-cookie';
import LoadingScreen from './loadingScreen';
import { Utils } from '../tools/utils';
import User from '../myObjects/user';

//*********** */

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from 'firebase/database'
// import { getAnalytics } from "firebase/analytics";

import { 
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    deleteUser 
} from "firebase/auth";


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


//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

//*********** */
const cookies = new Cookies();
const maxAgeCookie = 60 * 60 * 24 * 30 ; // 1 month

// function submitHandler(values) {
//     console.log(values);
//     const db = getDatabase();
//     const reference = ref(db, 'users/');
//     if(!values.email || !values.password)
//         //handleErrors()
//     // 

// emailErr(data.errors.email);
//     // setpasswordErr(data.errors.password);
//     set(reference, {
//         email:values.email,
//         password: values.password
//     });
//     c

//         // set cookies
//     setCookies(rememberMe, data.userId, data.email)
//         // new route
//     navigation.replace('Home', data); 
//     setisLoading(false);
//   }

// checkValidInput = async (values, setemailErr) => {
//     let isValid = false;
//     console.log("checking valid, values passed:", values);
//     // check valid email:
//     // check empty input -> ask for email
//     if (!values.email){
//         setemailErr("Please enter an email");
//         return false;
//     }
//     // check valid input abc@xyz.com

//     // check already used email -> email already used
//     const db = getDatabase();
//     const reference = ref(db, 'users/' + values.email);
//     let isEmailExist;
//     await onValue(reference, (snapshot) => {
//       console.log("snap", snapshot.val());
//       isEmailExist = snapshot.val();
//     });
//     if(isEmailExist) {
//         setemailErr('Email already exists');
//         return false;
//     }

//     // check valid password -> for now accept every pass

//     console.log("reach end valid input");
//     return true;
// }

insertUserToDb = async (db, user) => {
    const reference = ref(db, 'users/' + user.userId);
            await set ( reference, {
                userId: user.userId,
                email: user.email,
                password: user.password,
                rememberMe: user.rememberMe
            });
}

const handleError = (errMsg, setEmailErr, setPasswordErr, values) => {
    setEmailErr('');
    setPasswordErr('');

    if (!values.email || !values.password) { // case did not fill inputs
        if (!values.email)
            setEmailErr('Please enter your email');
        if (!values.password)
            setPasswordErr('please enter password at least 6 chars');
        return;
    }
    if (errMsg.includes('email')){
        setEmailErr(errMsg.substring(5));
    }
    if (values.password.length < 6){
        setPasswordErr('Password must contain at least 6 chars');
        return;
    }
    if (errMsg.includes('password')){
        setPasswordErr(errMsg.substring(5));
    }
}

const getUserFromDb = async (userId) => {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);
    

    return new Promise((resolve,reject) => {
        onValue(reference, (snapshot) => {
            if(snapshot.val()){
                userData = snapshot.val();
                resolve(userData);
            }
            resolve(false);
        });
    })
}


export default function Signup({ navigation }) {
    const [emailErr, setemailErr] = useState('');
    const [passwordErr, setpasswordErr] = useState('');
    const [rememberMe, setrememberMe] = useState(true);
    const [isLoading, setisLoading] = useState(true); 

    onAuthStateChanged(auth, (user) => { 
        console.log('user:', user);
        if (user){
            getUserFromDb(user.uid)
            .then(userData => {
                console.log("userData from DB:", userData);
                navigation.replace('Home', userData);
                setisLoading(false);
            })
            .catch(err => console.log(err));
            
        }
        else
            setisLoading(false);
    });
    

    test = async (values) => {
        setisLoading(true);

        const db = getDatabase();
        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(userCred => {
            let user = new User(values.email, values.password, 
                rememberMe, userCred.user.uid);

            insertUserToDb(db, user)
            .then(()=> {
                // new route
                console.log("userToPass: ",user);
                navigation.replace('Home', user);

                
            })
            .catch(err => console.log(err));
        
       
        })
        .catch(err => {
            //console.log('Error found:', err.code);
            console.log('foundError in signup', err);
            handleError(err.code, setemailErr, setpasswordErr, values);
        });

        setisLoading(false);
        
        // const reference = ref(db, 'users/' + values.email);
        // await set ( reference, {
        //     email: user.email,
        //     password: user.password,
        //     rememberMe: rememberMe
        // } , (err) => {
        //     if (!err)
        //         console.log("User saved succesfully!");
        //     else 
        //     console.log("User save failed: ", err);
        // });
       
    
        // set cookies
        //setCookies(rememberMe, data.userId, data.email)
        
    
    
        
    
    }

    // submitHandler = (values) => {
    //     // loading layout
    //     setisLoading(true);
    //     console.log("values: ", values);

        
    //     fetch('http://192.168.1.156:4000/signup',  //84.229.25.235 \ 192.168.1.156
    //     {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             'email':values.email,
    //             'password': values.password
    //         })
    //     })
        
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log('the data');
    //         console.log(data);
    //         if(data.errors){
    //             setemailErr(data.errors.email);
    //             setpasswordErr(data.errors.password);
    //         }
    //         else if(data.userId){ 
    //             // set cookies
    //             setCookies(rememberMe, data.userId, data.email)
    //             // new route
    //             navigation.replace('Home', data); 
    //         }
    //         setisLoading(false);
    //     })
    //     .catch((err)=> console.log(err))
    
    //     }


    return (
        <View style= {globalStyles.container}>

            {/* loading layout */}
            {
                isLoading ? 
                <LoadingScreen/> : null
            }

            <Text style={globalStyles.textAppTitle}>{Utils.Title}</Text>

            <Formik 
            initialValues={{email: '', password: ''}} 
            onSubmit={(values)=> {
                //submitHandler(values);  
                console.log("values: ", values);
                test(values);
            }}
            >
                {(props) => (
                    <View style={styles.loginContainer}>

                        <Text style={globalStyles.subTitle}>Signup</Text>
                        <Text>Enter your email: </Text>
                        <TextInput 
                        style={globalStyles.input}
                        placeholder={'abc@xyz.com'}
                        onChangeText={props.handleChange('email')}
                        value={props.values.email}
                        keyboardType='email-address'
                        />
                        <Text style={globalStyles.errorMsg}>{emailErr}</Text>

                        <Text>Enter password: </Text>
                        <TextInput 
                        style={globalStyles.input}
                        onChangeText={props.handleChange('password')}
                        value={props.values.password}
                        secureTextEntry={true}
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
                        title={`start`}
                        onPress={props.handleSubmit}
                        />

                        <TouchableOpacity onPress={() => navigation.replace('Login')}>
                            <Text style={{marginTop:45, fontStyle: 'italic', fontSize:15,fontWeight: '600'}}>Have an account? Login</Text>
                        </TouchableOpacity>

                    </View>
                
                )}
            </Formik>
        </View>
    )

}


const styles = StyleSheet.create({
    loginContainer: {
        margin: 30,

      },  
    
  });

