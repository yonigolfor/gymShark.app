import React, { Component } from 'react';
import { View } from 'react-native';
import Plan from '../components/plan';
import  { globalStyles } from '../shared/styles'; 
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from "react-native";

export default class PlanView extends Component {
    constructor(){
      super();
  
      this.state = {

      };   
      this.yAxis = 0;
  }
  

  myScroll = () => {   
    const screenHeight = Dimensions.get('screen').height;
    let newScroll = this.yAxis + (screenHeight * 9/16);
    this.scrollRef.scrollTo({ x:0, y:newScroll, animated: true });
    this.yAxis = newScroll;   
  }

  decreaseScroll = () => {
    const screenHeight = Dimensions.get('screen').height;
    let newScroll = this.yAxis - (screenHeight * 9/16);
    this.yAxis = newScroll;   
  }
  
  render(){

    // console.log("in planView language:", this.props.navigation.getParam('languageSelected'));

    return(
          <View style={globalStyles.container}> 
            <ScrollView 
            ref={ref => this.scrollRef = ref}
            >
              <Plan 
              user_id={this.props.navigation.getParam('user_id')}
              GraphResults= {this.props.navigation.getParam('GraphResults')}
              plan={this.props.navigation.getParam('plan')} 
              planList={this.props.navigation.getParam('planList')}
              GraphDates= {this.props.navigation.getParam('GraphDates')}
              startOfMonthResults= {this.props.navigation.getParam('startOfMonthResults')}
              navigation={this.props.navigation}
              myScroll={this.myScroll}
              decreaseScroll={this.decreaseScroll}
              languageSelected={this.props.navigation.getParam('languageSelected')}
              />
            </ScrollView>
         </View>
    )

  }
}

