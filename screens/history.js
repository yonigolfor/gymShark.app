import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { globalStyles } from '../shared/styles';
import MyButton from '../shared/myButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingScreen from './loadingScreen';
import { Dimensions } from "react-native";
import { Language } from '../tools/utils';


export default class History extends Component { // - navigation props
    constructor(){
      super();

      this.state = {

      };
      this.isLoading = false;
  }

  getColor = (planIndex) => {
     // for this time, good until 5 plans, including the default. easy to add
    switch(planIndex) {
      case 0:
        return '#f4d1a4'; // background -> stronger
      case 1:
        return '#97caef'; // #97caef skyblue
      case 2:
        return '#d6c2c2'; // purple  #e699ff #926363 #fbeec1
      case 3:
        return '#fbeec1';
        
      default:
      return 'gray';
    }
    
  }

  getRepsUI = (repsArr) => {
    let arr = [];
    let isLast = false;
    for (let i = 0; i < repsArr.length; i++){
      if (i == repsArr.length - 1) isLast = true;
      if(!isLast){
        arr.push(
          <Text style={styles.exercise}>{repsArr[i]}, </Text>
        )
      }
      else
      arr.push(
        <Text style={styles.exercise}>{repsArr[i]}</Text>
      )

    }

 
    return arr;
  }

  areAllShown = (planList, iDecreaser) => {
    for (let i = 0; i < planList.length; i++) {
     if (planList[i].resultsHistory.length >= iDecreaser - 1)
      return false;
    }
    return true;
  }

  showPlan = (thePlan, iDecreaser, languageSelected) => {
    let planUIarr = [];
    let planData, planLength, kgVal; // kgVal in case of bodyWeight
    let kgOrBodyWeightStr = languageSelected == 'English' ? 'kg' : 'ק"ג'; // kg by default
    planLength = thePlan.resultsHistory[0].length;
    
    planUIarr.push(
      <Text style={{...globalStyles.subTitle, alignSelf:"center", borderBottomWidth: 1 }}>
        {thePlan.title}
      </Text>
    )
    for (let j = 0; j < planLength; j++) { // loop for every exercise
      planData = thePlan.resultsHistory[thePlan.resultsHistory.length - iDecreaser][j];
      if (planData.isBodyWeight) {
        kgOrBodyWeightStr = languageSelected == 'English' ? ' Body weight' : ' משקל גוף ל-'; // or  Body Weight:
        kgVal = '';
      }
      else {
        kgOrBodyWeightStr = languageSelected == 'English' ? ' kg: ' : ' במשקל: ';
        kgVal = `${planData.kgVal} ${languageSelected == 'English' ? '' : "קילו ל-"}`; 
      }

      planUIarr.push(
        <View style={styles.exercisesContainer}>
          <Text style={styles.exercise}>
            
            {/* ex name */}
            {thePlan.exercisesNames[j]}
            {/* kg */}
            {`${kgOrBodyWeightStr}${kgVal}${languageSelected == 'English'? ' reps: ' : " חזרות: "}`}
            {/* reps UI */}
            {this.getRepsUI(planData.reps)} 

          </Text>          
        </View>
      )
    }
    return planUIarr;
  }
  
 showAllPlansHistory = (planList, languageSelected) => {

   this.isLoading = true; //loading screen on
   
   let plansUIarr = [], iDecreaser = 1, thePlan;

      while(!this.areAllShown(planList, iDecreaser)) {
       
          for (let i = 0; i < planList.length; i++) {
            thePlan = planList[i];

          // check if not exist
            if (thePlan.resultsHistory.length  >= iDecreaser) { 
          // show plan
         plansUIarr.push(
           <View style={{...styles.specificPlan, backgroundColor: this.getColor(planList.indexOf(thePlan))}}>
           {this.showPlan(thePlan, iDecreaser, languageSelected)}
           </View>
         
         )
        }
      }

      iDecreaser++;
      }
      
    this.isLoading = false;
    return plansUIarr;

 }


  render() {

    const planList = this.props.navigation.getParam('planList');
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get('screen').height;

    const languageSelected = this.props.navigation.getParam('languageSelected');

    return (
        <View style= {globalStyles.container}>
      {
      this.isLoading ? // loading screen
      <LoadingScreen/> : null
      }
      
          <ScrollView>

            <Text style={globalStyles.textTitle}>{languageSelected == 'English'? Language.historyTitle.en 
            : Language.historyTitle.he}</Text>
            {
              this.showAllPlansHistory(planList, languageSelected)
            }
            {/* <Button onPress={()=> console.log(planList[0].resultsHistory)} title='get History to console' /> */}
                    
          </ScrollView>
        </View>
      )     
  }

}

const styles = StyleSheet.create({
  exercise: {
    fontSize: 18,
    padding: 1,
    
  },
  exercisesContainer: {
    display: 'flex',
    flexDirection: 'row-reverse', 
    padding:5,
    flexWrap: "wrap", //keep content in screen
    

  },
  specificPlan: {
    backgroundColor:"yellow",
    marginBottom: 15,
    padding:5,

  },
  
  });


  // show plan

              // arr.push(
            //   <Text style={{...globalStyles.subTitle, alignSelf:"center", borderBottomWidth: 1}}>
            //     {thePlan.title}
            //   </Text>
            // )
            // for (let j = 0; j < thePlan.resultsHistory[0].length; j++) {
             
            //   planData = thePlan.resultsHistory[thePlan.resultsHistory.length - iDecreaser][j];
            //   arr.push(
            //     <View style={styles.exercisesContainer}>
    
            //       <Text style={styles.exercise}>
            //         {planData.exName}
            //       </Text>
    
            //       <Text style={styles.exercise}>
            //         {' kg: ' + planData.kg + ", reps: "}</Text>
            //       {
            //         this.getRepsUI(planData.reps)
            //       }
            //     </View>
            //   )
            // }