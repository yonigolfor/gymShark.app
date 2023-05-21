import React, { Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Modal, ScrollView, Image } from 'react-native';
import  { globalStyles } from '../shared/styles';
import MyButton from '../shared/myButton';
import NewPlanForm from './newPlanForm';
import Plan from '../components/plan';
import PlansBtnOptions from '../components/plansOptions';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from "react-native";
import GradientBackground from '../shared/gradientBackground';
import GradientButton from '../shared/gradientButton';
import Animated from 'react-native-reanimated';
import { Language } from '../tools/utils';

const screenHeight = Dimensions.get('screen').height;
const scrollerSize = screenHeight * 17/16;

// props: navigation. state: openPopUp
export default class Results extends Component {
  constructor(){
    super();

    this.state = {
      openPopUp: false,
      isNewUser: false,
      happenOnce: 0, // means not checked yet
    };   
    this.yAxis = 0;
}
setopenPopUp = ( boolean ) => {
  this.setState({ openPopUp: boolean });
}

setIsNewUser = ( boolean ) => {
  this.setState({ isNewUser: boolean });
}

setHappenOnce = ( num ) => {
  this.setState({ happenOnce: num });
}

myScroll = () => {   
  let newScroll = this.yAxis + (scrollerSize);//(screenHeight * 13/16);
  this.scrollRef.scrollTo({ x:0, y:newScroll, animated: true });
  this.yAxis = newScroll;  
}

decreaseScroll = () => {
  let newScroll = this.yAxis - (scrollerSize);
  this.yAxis = newScroll;   
}


  render(){
    const user_id = this.props.navigation.getParam('user_id');
    let planList = this.props.navigation.getParam('planList');
    const GraphDates = this.props.navigation.getParam('GraphDates');
    const resultsHistory = this.props.navigation.getParam('resultsHistory');
    const GraphResults = this.props.navigation.getParam('GraphResults');
    const languageSelected = this.props.navigation.getParam('languageSelected');

    console.log('languageSelected in Results:', languageSelected);

    // check if is new player once cuz cant do one time hook here
    if (planList.length == 0 && this.state.happenOnce == 0){
      this.setIsNewUser(true);
      this.setHappenOnce(1);
    }
      


    return(
      <View style={globalStyles.container}>
   
      <Modal visible={this.state.openPopUp} animationType='fade'>
        <ScrollView style={styles.firstPage}>
          <NewPlanForm planList={planList} setopenPopUp={this.setopenPopUp} user_id={user_id} languageSelected={languageSelected}/>
        </ScrollView>
      </Modal>
      
      {/* new user modal */}
      <Modal transparent visible={this.state.isNewUser} animationType='fade'>
        <View style={globalStyles.modalPopup}>
          <View style={globalStyles.modalContainer}>
            <Image 
            source={require('../images/list.webp')} 
            style={{height:150, width:150, marginVertical:10}}
            />
            <Text
            style={{fontSize:15}}
            >
              {languageSelected == 'English'? Language.resultsModalText.en
                  : Language.resultsModalText.he}
            </Text>
            <MyButton 
            text={languageSelected == 'English'? Language.resultsModalBtn.en
            : Language.resultsModalBtn.he}
            onPress={()=>{
              this.setIsNewUser(false);
              this.setopenPopUp(true); // automate navigation to create new plan 
            }} // fontStyle:'italic'
            style={{padding:10, marginTop: 20, borderWidth: 1, 
              borderRadius:10, fontSize:20, fontWeight: 'bold', 
              fontStyle:'italic', backgroundColor: 'rgba(0,0,0,0.1)'}}
            />
          </View>
        </View>
      </Modal>


      <View style={styles.firstPage}>
      {
        planList.length != 1  ?
        <GradientBackground 
        colorsArr= {['black', '#800000', '#ff4d4d',]}
        /> :
        null
      }

        <ScrollView 
        ref={ref => this.scrollRef = ref}
        >
     
<Text style={globalStyles.textTitle}>{languageSelected == 'English'? Language.resultsScreenTitle.en
            : Language.resultsScreenTitle.he}</Text>

          {/* remove new plan option ater 4 plans */}
          {
            (planList.length == 1 ) &&

            <TouchableOpacity //ff4d4d color
            onPress={()=> this.setopenPopUp(true)} 
            style={{...styles.createPlan, marginLeft: 10}}>
            <View style={{display:'flex', flexDirection: 'row', padding: 5, alignSelf: 'center'}}> 
              <Text style={{...globalStyles.textCreateNew, fontSize: 20, margin: 3, color: '#333333'}}>{languageSelected == 'English'? Language.resultsAddPlan.en
            : Language.resultsAddPlan.he}</Text> 
              <Ionicons name="ios-add-circle-outline" size={35} color="#333333"  style={globalStyles.iconCreateNew}/>
            </View>
          </TouchableOpacity>
   
          }

           {/* history btn */}
           {
            planList.length > 0 ?
            <View style={{ padding: 5}}>
            <MyButton 
            text={languageSelected == 'English'? Language.resultsHistoryBtn.en
            : Language.resultsHistoryBtn.he}
            onPress={() => this.props.navigation.navigate('History', { planList: planList, languageSelected })}
            style={{...globalStyles.textCreateNew, fontSize: 20, margin: 3, color: '#333333', ...styles.createPlan, marginTop: 10, padding: 5}}
            /> 
            </View>
          
            : null
          }

        {/* show plan buttons if there are more than one */}
        { 
            planList.length > 1 && 
            <PlansBtnOptions 
            user_id= {user_id}
            GraphResults= {GraphResults}
            planList={planList} 
            GraphDates={GraphDates}
            startOfMonthResults = {this.props.navigation.getParam('startOfMonthResults')}
            navigation={this.props.navigation}
            languageSelected={languageSelected}
  
            />
          }

        
          {
            planList.length != 1 && 
            <TouchableOpacity 
            onPress={()=> this.setopenPopUp(true)} 
            style={planList.length == 1? 
            styles.addPlanContainer : 
            {...styles.addPlanContainer, height: Dimensions.get('screen').height - 380, 
            marginTop:40, justifyContent: 'flex-start',
            }}
            >
              <Text style={globalStyles.textCreateNew}>{languageSelected == 'English'? Language.resultsCreatePlan.en
            : Language.resultsCreatePlan.he}</Text>
              <Ionicons name="ios-add-circle-outline" size={100} color="#b3b3b3"  style={globalStyles.iconCreateNew}/>
            </TouchableOpacity>
          }



          
     


        {/* show the only plan */}
          {
            planList.length == 1 &&
            <View style={styles.showPlan}>
                <Plan
                user_id= {user_id}
                GraphResults= {GraphResults}
                planList= {planList}
                GraphDates = {GraphDates}
                startOfMonthResults = {this.props.navigation.getParam('startOfMonthResults')}
                plan={planList[0]}
                navigation={this.props.navigation}
                myScroll={this.myScroll}
                decreaseScroll={this.decreaseScroll}
                languageSelected={languageSelected}
                />             
            </View>
          }

          
        </ScrollView>
        

      </View>

    
    </View>
    )
  }
}

const styles = StyleSheet.create({
  firstPage: {
    flex: 1,
    backgroundColor: '#FAEBD7',
  },
  selectBtns: {
    flexDirection: "row",
    borderWidth: 2,
  },
  addPlanContainer: {
    display:'flex', 
    justifyContent: 'center',
    alignSelf: 'center',
    height: Dimensions.get('screen').height - 250
    // backgroundColor: 'black',
  },
  newPlanTxt: {
    fontSize: 30,
    color: 'gray',

  },
  addIcon:{
    opacity:0.6,
    alignSelf:"center"
  },
  createPlan: {
    borderWidth:2, 
    borderRadius: 30, 
    borderColor:'#333333' ,
    justifyContent:"flex-start", 
    width:200, 
    backgroundColor:'#ebaf60', //#f7ddbb

  },


});
