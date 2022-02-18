import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Switch} from 'react-native';
import { globalStyles } from '../shared/styles';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import Cookies from 'universal-cookie';
import LoadingScreen from './loadingScreen';
import { Utils } from '../tools/utils';

//*********** */

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase, ref, onValue, set } from 'firebase/database';

// const db = getDatabase();

// const firebaseConfig = {
//     apiKey: "AIzaSyDfSv-38azvjb0qDyjKTafm-f4c9XofeXw",
//     authDomain: "gym-track-4077e.firebaseapp.com",
//     databaseURL: "https://gym-track-4077e-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "gym-track-4077e",
//     storageBucket: "gym-track-4077e.appspot.com",
//     messagingSenderId: "694783577784",
//     appId: "1:694783577784:web:cf98812cf98d9b193aee4d",
//     measurementId: "G-LHEW7TBVB2"
//   };
  
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
//     // setemailErr(data.errors.email);
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

export default function Signup({ navigation }) {
    const [emailErr, setemailErr] = useState('');
    const [passwordErr, setpasswordErr] = useState('');
    const [rememberMe, setrememberMe] = useState(true);
    const [isLoading, setisLoading] = useState(false);

    const setCookies = navigation.getParam('setCookies');
    
    submitHandler = (values) => {
        // loading layout
        setisLoading(true);
        // console.log(values)
        fetch('http://192.168.1.156:4000/signup',  //84.229.25.235 \ 192.168.1.156
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email':values.email,
                'password': values.password
            })
        })
        
        .then(res=>res.json())
        .then(data=>{
            console.log('the data');
            console.log(data);
            if(data.errors){
                setemailErr(data.errors.email);
                setpasswordErr(data.errors.password);
            }
            else if(data.userId){ 
                // set cookies
                setCookies(rememberMe, data.userId, data.email)
                // new route
                navigation.replace('Home', data); 
            }
            setisLoading(false);
        })
        .catch((err)=> console.log(err))
    
        }

    return (
        <View style= {globalStyles.container}>

            {/* loading layout */}
            {
                isLoading ? 
                <LoadingScreen/> : null
            }

            <Text style={globalStyles.textTitle}>{Utils.Title}</Text>

            <Formik 
            initialValues={{email: '', password: ''}} 
            onSubmit={(values)=> {
                submitHandler(values);      
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
                        {/* <Button 
                        title={`Back to Login`}
                        onPress={() => navigation.navigate('Login')}
                        /> */}
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

