import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button,FlatList} from 'react-native';
import MyButton from '../shared/myButton';
import  { globalStyles } from '../shared/styles';
import nextId, { resetId } from "react-id-generator";
import MyLongPressButton from '../shared/longPressButton';

findPlaceInList = (planList, name) => {

    for(let i = 0; i < planList.length; i++){ 
        if (planList[i].title == name)
            return i;
    }
    return -1;
}


export default function PlansBtnOptions( { navigation, planList, GraphResults, GraphDates, startOfMonthResults, user_id, languageSelected } ) {

    return ( 
        <View>
            {/* <Text style={globalStyles.subTitle}>Your plans</Text> */}
            <View style={styles.selectBtns}> 
                {
                    planList.map(item => (
                        <MyLongPressButton 
                        user_id= {user_id}
                        navigation= {navigation}
                        planList={planList}
                        style={{...globalStyles.button, ...styles.planSelectbtns}} 
                        title= {item.title}
                        GraphResults= {GraphResults}
                        startOfMonthResults= {startOfMonthResults}
                        onPress={() => {
                            let place = findPlaceInList(planList, item.title);
                            console.log(planList[place]);
                            navigation.navigate('PlanView', { planList: planList ,plan: planList[place], GraphResults: GraphResults, GraphDates: GraphDates, startOfMonthResults: startOfMonthResults, user_id: user_id, languageSelected: languageSelected});

                        }}
                        key={nextId()}
                        languageSelected={languageSelected}
                        /> 
                    ))
                }    
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    selectBtns: {
        flexDirection: 'row', // column row 
        justifyContent: 'space-evenly',

    }, 
    planSelectbtns: {
        backgroundColor: '#e6e6e6',
        color: 'red',
        borderRadius:100,
        width: 110,
        height: 110,
    },
  
  });