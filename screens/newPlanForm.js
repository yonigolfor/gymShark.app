import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import  { globalStyles } from '../shared/styles';
import MyButton from '../shared/myButton';
import { TextInput } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import nextId, { resetId } from "react-id-generator";
import * as yup from 'yup';
import { Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import update_post from "../myObjects/dbCommunication";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('screen').height;


const planFields = {
    title: '', 
    generalSets: '', 
    generalReps: '', 
    exercisesNames: [],
    lastUpdated: [],
    lastResult: 0,
    resultsHistory: [],

  };

  getValidExNamesArr = (exNames) => {
    return exNames.filter( Boolean );
  }

  checkValidExNames = (exNames, setexInputErr) => {
    exNames = exNames.filter( Boolean );
    if (exNames.length > 0) { // not empty
      
      //check for duplicate O(n^2) ... max of 100 plays
      for (let i = 0; i < exNames.length - 1; i++) {
        for (let j = i + 1; j < exNames.length; j++) {
          if (exNames[i] == exNames[j]){
            // set error duplicate
            setexInputErr(`Can't duplicate same exercise!`);
            return false;
          }
        }
      }
      return true;
    }
    else {
      // empty list
      //set error empty list
      setexInputErr('Exercises list is empty!');
      return false;
    }
  }


const yupErrors = yup.object({
  title: yup.string().required().test('title-check','Must be at least 3 chars', (val) => {
    if (!val) return false;
    if (val.length < 3) return false;
    else return true;
  }),
  generalSets: yup.string().test('sets-check','Sets must be between 1-10',
    (val) => checkSetsReps(val, 1, 10)),
  generalReps: yup.string().test('reps=check','Reps must be between 1-25', 
    (val) => checkSetsReps(val, 1, 25)),

})

checkSetsReps = (val, startNum, endNum) => {
 
  if (!val) return true; // not required
  else if (isNaN(val)) 
      return false;
  
  return parseInt(val) >= startNum && parseInt(val) <= endNum;
}

updateDb = (planList, user_id) => {
  console.log('Try: updating DB');
  let data = {user_id, planList};
  update_post(data);
  // fetch('http://192.168.1.156:4000/update',
  // {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //         'planList': planList,
  //         'user_id': user_id
  //     })
  // })
  
  // .then(res=>res.json())
  // .then(data=>{
  //     console.log('the data');
  //     console.log(data);
  // })
  // .catch((err)=> console.log(err))
}

checkDefaultRepsSets = (values) => {
  // sets and reps by default
  if(!values.generalSets) 
    values.generalSets = '4';

  if(!values.generalReps) 
    values.generalReps = '10';

  return values;
}



export default function NewPlanForm({ planList, setopenPopUp, user_id }) {
  const [exercisesInputs, setExercisesInputs] = useState([0,1,2,3,4,5]);
  const [exInputErr, setexInputErr] = useState('');

    return(
        <View style={styles.firstPage}>
          <TouchableOpacity
          style={globalStyles.backPageIcon}
          onPress={()=> setopenPopUp(false)}>
           <Ionicons name="return-down-back-outline" size={35} color="#333333"/>
          </TouchableOpacity>
            
            <Text style={{...globalStyles.textTitle, marginTop: "12%"}}>NEW PLAN</Text>
            <Formik
            initialValues={planFields}
            validationSchema={yupErrors}
            onSubmit={(values)=>{
              setexInputErr('');

              if (checkValidExNames(values.exercisesNames, setexInputErr)) {
                
                values = checkDefaultRepsSets(values);
                values.key = nextId();
                values.lastUpdated = [];
                values.exercisesNames = getValidExNamesArr(values.exercisesNames);
                values.resultsHistory = [];
                planList.push(values);
                setopenPopUp(false);
                updateDb(planList, user_id);
              }
              else;
           
            }}
            >
            {(props)=> (
                <View style={styles.inputContainer}>
                    <Text style={styles.enterStyle}>Enter plan name :</Text>
                    <TextInput
                    onBlur={props.handleBlur('title')}
                    multiline
                    style={globalStyles.input}
                    placeholder='PLAN NAME'
                    onChangeText={props.handleChange('title')}
                    value={props.values.title}
                    />
                    <Text style={globalStyles.errorMsg}>{props.touched.title && props.errors.title}</Text>
                    <Text style={styles.enterStyle}>Enter general sets per exercise :</Text>
                    <TextInput 
                    onBlur={props.handleBlur('generalSets')}
                    style={globalStyles.input}
                    placeholder='GENERAL SETS'
                    onChangeText={props.handleChange('generalSets')}
                    value={props.values.generalSets}
                    keyboardType= 'numeric'
                    />
                    <Text style={globalStyles.errorMsg}>{props.touched.title && props.errors.generalSets}</Text>

                    <Text style={styles.enterStyle}>Enter general reps per set :</Text>
                    <TextInput 
                    onBlur={props.handleBlur('generalReps')}
                    style={globalStyles.input}
                    placeholder='GENERAL REPS'
                    onChangeText={props.handleChange('generalReps')}
                    value={props.values.generalReps}
                    keyboardType= 'numeric'
                    />
                    <Text style={globalStyles.errorMsg}>{props.touched.generalReps && props.errors.generalReps}</Text>

                    <Text style={styles.enterStyle}>Enter exercises names :</Text>
                    {exercisesInputs.map((prop)=> {
                      return(
                        <TextInput
                        style={{...globalStyles.input, marginBottom: 15}}
                        placeholder={`EX NAME ${prop+1}`}
                        onChangeText={props.handleChange(`exercisesNames[${prop}]`)}
                        value={props.values.exercisesNames[prop]}
                        key={prop}
                        />
                      )
                    })}
                    <Text style={globalStyles.errorMsg}>{exInputErr}</Text>
                    <View style={styles.downBtnsContainer}>
                    {/* After 10 exercises Add option removes */}
                      { 
                        exercisesInputs.length != 10 &&
                        <MyButton 
                        text= 'Add exercise'
                        style={{...styles.downBtns,}}
                        onPress= {(previousInputs)=> {
                          if (exercisesInputs.length < 10){
                            setExercisesInputs([...exercisesInputs, exercisesInputs.length]);
                          }
                          
                        }}
                        />
                      }

                      <MyButton 
                      text= 'Submit'
                      onPress= {props.handleSubmit} // backgroundColor: #ff4d4d , 00b300
                      style={{...styles.downBtns, marginTop: 30, backgroundColor: '#66a3ff', color: 'white', height: screenHeight / 9, fontSize: 24 }}
                      />
                    </View>
                   
                </View>
            )}
            </Formik> 

            {/* <MyButton 
            style={globalStyles.button}
            text='Cancel'
            onPress={()=> setopenPopUp(false)}
            /> */}
      </View>
    )
}



const styles = StyleSheet.create({
    firstPage: {
      alignItems: "center",
      padding:10,
    },
    test: {
      color: 'red',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 50,
    },
    downBtns: {
      fontSize: 20, 
      color: '#333333', 
      textAlign: 'center', 
      borderWidth: 3,
      borderRadius: 20,
      height: 50,
      width: screenWidth / 1.5 ,
      textAlignVertical:"center"
      
    },
    downBtnsContainer: {
     alignItems:"center",

    },  
    enterStyle: {
      fontSize: 18,
    },
    inputContainer: {
      width: screenWidth / 1.25
    }
  
  });
  