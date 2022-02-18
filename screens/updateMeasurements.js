import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { globalStyles } from '../shared/styles';
import MyButton from '../shared/myButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from "react-native";
import { Entypo } from '@expo/vector-icons';
import Measurements from '../components/measurements';

export default class UpdateMeasurements extends Component { // - navigation props
    constructor(){
      super();
      // this.state = {
      //   myMsrmnts: {
      //       biceps: '',
      //       chest: '',
      //       shoulders: '',
      //       hips: '',
      //       waist: '', //מותן
      //       thigh: '', //ירך.רגליים
      //       calf: '',
      //   },
      // };    
  }

  checkMsrmntsExist = (myMsrmnts) => {
    if (myMsrmnts[0].value ||
        myMsrmnts[1].value ||
        myMsrmnts[2].value ||
        myMsrmnts[3].value ||
        myMsrmnts[4].value ||
        myMsrmnts[5].value ||
        myMsrmnts[6].value) {
        return true;
      }
      return false;
  }

  render() {
    const myMsrmnts = this.props.navigation.getParam('myMsrmnts');
    let imageUrl = 'https://previews.123rf.com/images/fosin/fosin1903/fosin190300001/124813933-red-helium-balloon-birthday-baloon-flying-for-party-and-celebrations-isolated-on-plaid-transparent-l.jpg';
    
    return (
        <View style= {globalStyles.container}>
            <ScrollView>
                <Text style={globalStyles.textTitle}>Body goals</Text>
                {
                  this.checkMsrmntsExist(myMsrmnts) && 
                  <Measurements myMsrmnts= {myMsrmnts}/>
                }

                {
                  !this.checkMsrmntsExist(myMsrmnts) && 
                  <View>
                    <Text style={styles.noMsrmnts}>No measurements yet!</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('NewMeasurementsForm', {myMsrmnts: myMsrmnts})} style={{...styles.addPlanContainer, height: Dimensions.get('screen').height - 250}}>
                    <Text style={globalStyles.textCreateNew}>Update Measurements</Text>
                    <Entypo name="new-message" size={100} color="gray" style={globalStyles.iconCreateNew} />
                    </TouchableOpacity>
                  </View>
               
                }
        
        <MyButton 
          text={'Update Measurements'}
          onPress={()=> this.props.navigation.navigate('NewMeasurementsForm', {myMsrmnts: myMsrmnts})}
          />
          <MyButton 
          text={'get measurements to console'}
          onPress={() => {
            console.log('the state:');     
            console.log(myMsrmnts);
          }}
          />
               
            </ScrollView>
        </View>
      )     
  }

}

const styles = StyleSheet.create({
  
      addPlanContainer: {
        display:'flex', 
        justifyContent: 'center',
        alignSelf: 'center',
        // backgroundColor: 'black',
      },
      noMsrmnts:{
        textAlign: "center",
      },

  });