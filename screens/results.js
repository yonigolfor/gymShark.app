import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, ScrollView } from 'react-native';
import  { globalStyles } from '../shared/styles';
import MyButton from '../shared/myButton';
import NewPlanForm from './newPlanForm';
import Plan from '../components/plan';
import PlansBtnOptions from '../components/plansOptions';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from "react-native";
import GradientBackground from '../shared/gradientBackground';
import GradientButton from '../shared/gradientButton';

const screenHeight = Dimensions.get('screen').height;
const scrollerSize = screenHeight * 17/16;

// props: navigation. state: openPopUp
export default class Results extends Component {
  constructor(){
    super();

    this.state = {
      openPopUp: false,
    };   
    this.yAxis = 0;
}
setopenPopUp = ( boolean ) => {
  this.setState({ openPopUp: boolean });
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
    const planList = this.props.navigation.getParam('planList');
    const GraphDates = this.props.navigation.getParam('GraphDates');
    const resultsHistory = this.props.navigation.getParam('resultsHistory');

    return(
      <View style={globalStyles.container}>
   
      <Modal visible={this.state.openPopUp} animationType='fade'>
        <ScrollView style={styles.firstPage}>
          <NewPlanForm planList={planList} setopenPopUp={this.setopenPopUp} user_id={user_id}/>
        </ScrollView>
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
     
<Text style={globalStyles.textTitle}> MY PLANS </Text>

          {/* remove new plan option ater 4 plans */}
          {
            (planList.length == 1 ) &&

            <TouchableOpacity //ff4d4d color
            onPress={()=> this.setopenPopUp(true)} 
            style={{...styles.createPlan, marginLeft: 10}}>
            <View style={{display:'flex', flexDirection: 'row', padding: 5, alignSelf: 'center'}}> 
              <Text style={{...globalStyles.textCreateNew, fontSize: 20, margin: 3, color: '#333333'}}> Add plan</Text> 
              <Ionicons name="ios-add-circle-outline" size={35} color="#333333"  style={globalStyles.iconCreateNew}/>
            </View>
          </TouchableOpacity>
   
          }

           {/* history btn */}
           {
            planList.length > 0 ?
            <View style={{ padding: 5}}>
            <MyButton 
            text='History'
            onPress={() => this.props.navigation.navigate('History', { planList: planList })}
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
            GraphResults= {this.props.navigation.getParam('GraphResults')}
            planList={planList} 
            GraphDates={GraphDates}
            startOfMonthResults = {this.props.navigation.getParam('startOfMonthResults')}
            navigation={this.props.navigation}
  
            />
          }

        
          {
            planList.length != 1 && 
            <TouchableOpacity 
            onPress={()=> this.setopenPopUp(true)} 
            style={planList.length == 1? 
            styles.addPlanContainer : 
            {...styles.addPlanContainer, height: Dimensions.get('screen').height - 380}}
            >
              <Text style={globalStyles.textCreateNew}>Create plan</Text>
              <Ionicons name="ios-add-circle-outline" size={100} color="#b3b3b3"  style={globalStyles.iconCreateNew}/>
            </TouchableOpacity>
          }



          
     


        {/* show the only plan */}
          {
            planList.length == 1 &&
            <View style={styles.showPlan}>
                <Plan
                user_id= {this.props.navigation.getParam('user_id')}
                GraphResults= {this.props.navigation.getParam('GraphResults')}
                planList= {this.props.navigation.getParam('planList')}
                GraphDates = {this.props.navigation.getParam('GraphDates')}
                startOfMonthResults = {this.props.navigation.getParam('startOfMonthResults')}
                plan={planList[0]}
                navigation={this.props.navigation}
                myScroll={this.myScroll}
                decreaseScroll={this.decreaseScroll}
                />             
            </View>
          }

          {/* <MyButton
          onPress={() =>{ 
            console.log('planList :');
            console.log(planList.length);
            
          }}
          text='get plans to console'
          /> */}
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
