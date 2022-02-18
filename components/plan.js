import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import Exercise from '../components/exercise';
import nextId, { resetId } from "react-id-generator";
import { Ionicons } from '@expo/vector-icons';
import MyButton from '../shared/myButton';
import { AntDesign } from '@expo/vector-icons';
import Overlay from 'react-native-modal-overlay';
import { Utils } from '../tools/utils';
import { globalStyles } from '../shared/styles';
import LoadingScreen from '../screens/loadingScreen';


calculateResult = (inputs) => {
let result, repsCounter, finalResult = 0, kgVal; // kgVal in case of Body Weight.

for (let i = 0; i < inputs.length; i++) {
    repsCounter = 0
    // take care of body weight
    //if(!inputs[i].kg || inputs[i].kg == '') // means body weight
    if(inputs[i].isBodyWeight)
        kgVal = 1;
    else 
        kgVal = inputs[i].kg;

    result = kgVal * inputs[i].sets;

    for(let j = 0; j < inputs[i].reps.length; j++){
        repsCounter += parseInt(inputs[i].reps[j]);
    }
    result = result * repsCounter;
    finalResult += result;

}
return finalResult;
}

findGraphResultsIndex = (planTitle, GraphResults, user_id) => {
    if (GraphResults.length > 0) {
        for(let i = 0; i < GraphResults.length; i++) {
            if (GraphResults[i].title == planTitle)
            return i;
        }
    }

    createGraphObject(planTitle, GraphResults, user_id);
    return GraphResults.length - 1;
}


createGraphObject = (planTitle, GraphResults, user_id) => {
    let obj = {
        title: planTitle,
        data: [],
    };
    GraphResults.push(obj);
    //update db
    updateDbGraphResults(GraphResults, user_id)
}


removePlan = (planList, plan, GraphResults, startOfMonthResults) => {
    const index = planList.findIndex(el => el.title == plan.title);
    const index2 = GraphResults.findIndex(el => el.title == plan.title);
    const index3 =startOfMonthResults.findIndex(el => el.x == plan.title);
    if (index > -1) {
        planList.splice(index, 1);
        GraphResults.splice(index2, 1);
        startOfMonthResults.splice(index3, 1);
        
    }
        

        
}

getTodayDate = (GraphDates) => {

    // let month = new Date().getMinutes(); //Current Minutes => just for check month issue

    // let month = new Date().getMonth() + 1; //Current Month
    // month = numToMonth(month);
    let month = Utils.getMonth;
    if (GraphDates.length > 0){
        for (let i = GraphDates.length; i > 0; i--){
            if (GraphDates[i - 1] == ''); //keep looping
            else {
                if (GraphDates[i - 1] != month)
                return month;
                else 
                    return '';
            }
        }
    }
    else return month;
}



getStartOfMonthArray = (GraphResults, GraphDates, startOfMonthResults, user_id) => {
    if (checkNewMonth(GraphDates)) {
        // clean start of month array
        if (startOfMonthResults.length > 0){
            startOfMonthResults.splice(0, startOfMonthResults.length);
        }
        for (let i = 0; i < GraphResults.length; i++) {
            if (GraphResults[i].data.length > 0){ // check case plan not used.
                startOfMonthResults.push(
                {
                x: GraphResults[i].title,
                y: GraphResults[i].data[GraphResults[i].data.length - 1]
                });
            }
          }
          // update db
          updateDbStartOfMonthResults(startOfMonthResults, user_id);
      
        } else //מספר התכניות שבוצעו שונה ממה שהגרף מכיל
            if (startOfMonthResults.length < GraphResults.length) { 
              startOfMonthResults.push({
                  x: GraphResults[GraphResults.length - 1].title,
                  y: GraphResults[GraphResults.length - 1].data[GraphResults[GraphResults.length - 1].data.length - 1]
              })
            // update db
            updateDbStartOfMonthResults(startOfMonthResults, user_id);
                
            } 
            else;
            
        

  }

  checkNewMonth = (GraphDates) => {
    if (GraphDates.length > 0) {
      if (GraphDates[GraphDates.length - 1])
        return true;
      else 
        return false;
    } 
    return true;
  }
  

  updateDbGraphResults = (GraphResults, user_id) => {
    console.log('Try: updating DB');
    fetch('http://192.168.1.156:4000/update',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'GraphResults': GraphResults,
            'user_id': user_id
        })
    })
    
    .then(res=>res.json())
    .then(data=>{
        // console.log('the data');
        // console.log(data);
    })
    .catch((err)=> console.log(err))
  }


  updateDbStartOfMonthResults = (startOfMonthResults, user_id) => {
    console.log('Try: updating DB');
    fetch('http://192.168.1.156:4000/update',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'startOfMonthResults': startOfMonthResults,
            'user_id': user_id
        })
    })
    
    .then(res=>res.json())
    .then(data=>{
        // console.log('the data');
        // console.log(data);
    })
    .catch((err)=> console.log(err))
  }


  updateDbGraphDates = (GraphDates, user_id) => {
    console.log('Try: updating DB');
    fetch('http://192.168.1.156:4000/update',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'GraphDates': GraphDates,
            'user_id': user_id
        })
    })
    
    .then(res=>res.json())
    .then(data=>{
        // console.log('the data');
        // console.log(data);
    })
    .catch((err)=> console.log(err))
  }

  updateDbPlanList = (planList, user_id) => {
    console.log('Try: updating DB');
    fetch('http://192.168.1.156:4000/update',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'planList': planList,
            'user_id': user_id
        })
    })
    
    .then(res=>res.json())
    .then(data=>{
        // console.log('the data');
        // console.log(data);
    })
    .catch((err)=> console.log(err))
  }
  
  checkTicks = (tickArr, exNames) => {
    for (let i = 0; i < exNames.length; i++) {
        if (!tickArr[i]) 
        return false;
    }
    return true;
  }

  updateHistoryResults = (plan) => {
    let arr = [];
    let kgVal, exIsBodyWeight;

    for (let i = 0; i < plan.exercisesNames.length; i++) {
        exIsBodyWeight = plan.lastUpdated[i].isBodyWeight;
        if (exIsBodyWeight) // case of body weight
            kgVal = ''; 
        else 
            kgVal = plan.lastUpdated[i].kg;

        arr.push({
            exName: plan.exercisesNames[i],
            kg: kgVal,
            reps: plan.lastUpdated[i].reps,
            sets: plan.lastUpdated[i].sets,
            exName: plan.lastUpdated[i].name,
            isBodyWeight: exIsBodyWeight,
        });
        
    }
    plan.resultsHistory.push(arr);
  }

  
  
export default function Plan({ plan, navigation, GraphResults, planList, GraphDates, startOfMonthResults, myScroll, decreaseScroll }) {
    const [popUp, setpopUp] = useState(false);
    const [deletePressed, setdeletePressed] = useState(false);
    const [errTicks, seterrTicks] = useState('');
    const user_id = navigation.getParam('user_id');    
    const [isLoading, setisLoading] = useState(false);

    let tickArr = [];

    return (
        <View style={styles.plan}>

            {/* loading layout */}
            {
                isLoading ? 
                <LoadingScreen/> : null
            }

            <Overlay 
            visible={popUp} 
            closeOnTouchOutside={true}
            onClose={()=>setpopUp(false)}
            animationType={'fadeInUp'}  //fadeInUp, zoomIn, bounceIn, flipInX
            containerStyle= {styles.overlayStyle}
            childrenWrapperStyle= {styles.overlayChildrenStyle}
            >
                <Text>{`Do you want to remove '${plan.title}' ?`}</Text>
                <View style={styles.options}>
                    <MyButton 
                    text='YES'
                    onPress={()=> {
                        removePlan(planList, plan, GraphResults, startOfMonthResults);
                        updateDbPlanList(planList, user_id)
                        setpopUp(false);
                        navigation.navigate('Home');
                    }}
                    style={styles.btnOption}
                    />
                    <MyButton 
                    text='NO'
                    onPress={()=> {
                    setdeletePressed(false);
                    setpopUp(false);
                    }}
                    style={styles.btnOption}
                    />
                </View>

            </Overlay>
      

            <ScrollView>
            {
                navigation.getParam('planList').length == 1 &&
                <AntDesign 
                    style={styles.top}
                    name="delete" 
                    size={26} 
                    color={deletePressed ? "green" : 'gray' }
                    onPress={() => {
                        setdeletePressed(true); 
                        setpopUp(true);
                    }}
                />
            }
              
                <Text style={styles.planTitle}>{plan.title}</Text>
                
                {plan.exercisesNames.map((item, index) => (
                        <Exercise
                        user_id= {user_id}
                        name={item}
                        key={nextId()}
                        plan= {plan}
                        indexInPlan= {index}
                        myScroll={myScroll}
                        decreaseScroll={decreaseScroll}
                        tickArr={tickArr}
                        />
                    ) 
                )}

                    <TouchableOpacity onPress={ async ()=> {
                        // loading layout
                        setisLoading(true);
                        // check all ticks green
                        if (checkTicks(tickArr, plan.exercisesNames)){
                        seterrTicks('');
                        // calculate the result
                        let result = calculateResult(plan.lastUpdated);;
                        let resToGraph;
                        // find place in array of GraphResults to push 
                        let index = await findGraphResultsIndex(plan.title, GraphResults, user_id);
                        
                        if (plan.lastResult != 0){
                            resToGraph = result - plan.lastResult + GraphResults[index].data[GraphResults[index].data.length - 1];
                            plan.lastResult = result;

                        } else { 
                            //set the first place in the chart
                            resToGraph = planList.indexOf(plan) * 2 + 1; // + 15
                            plan.lastResult = result;
                            
                        }  
                        
                        //update historyResults
                        await updateHistoryResults(plan);
                        //send result to tracker                        
                        GraphResults[index].data.push(resToGraph);
                        // update db
                        await updateDbGraphResults(GraphResults, user_id);
                        //get today date
                        let today = getTodayDate(GraphDates);
                        GraphDates.push(today);
                        // update db
                        await updateDbGraphDates(GraphDates, user_id);
                        //reset start of month array
                        await getStartOfMonthArray(GraphResults, GraphDates, startOfMonthResults, user_id);
                        // update planList for 'lastUpdated'
                        await updateDbPlanList(planList, user_id);
                        // back Home page
                        navigation.navigate('Home');
                        }
                        else {
                            //err message not all ticks
                            seterrTicks('Check all exercises!');
                        }
                        setisLoading(false);

                        }}>
                        <Text style={globalStyles.errorMsg}>{errTicks}</Text>
                        <View style={styles.doneExercise}>
                            <Text style={{color: 'green', margin: 5, fontSize: 20, fontStyle:'italic'}}>DONE</Text>
                            <Ionicons name="ios-checkbox-outline" size={44} color="green" />
                        </View>
                        
                    </TouchableOpacity>
                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    plan: {
        margin:40,
        marginTop: 25,

      },
    planTitle: {
        fontSize: 36,
        fontFamily: 'serif',
        borderBottomWidth:1,
        borderColor: 'blue',
        textAlign: 'center',
    },
        doneExercise:{
        flex: 1,
        flexDirection: "row-reverse",
        borderColor: 'green',
        borderWidth: 4,
        borderRadius: 30,
        justifyContent:'center',
        alignItems: 'center', 
    },
    options: {
        display: "flex",
        flexDirection: 'row',
        justifyContent:"center"
    },
    btnOption: {
        height: 60,
        width: 70,
        textAlign: "center",
        textAlignVertical: "center",
        padding: 10,
        borderWidth: 1, 
        borderRadius:20, 
        margin:20,  
    },
    overlayStyle: {
        backgroundColor: 'rgba(0, 0, 0 ,0.4)',
    },
    overlayChildrenStyle: {
        // backgroundColor: 'red',
        borderRadius:10,
    }

  
  })
