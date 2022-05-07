import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { globalStyles } from '../shared/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from "react-native";
import Cookies from 'universal-cookie';
import LoadingScreen from './loadingScreen';
import GradientButton from '../shared/gradientButton';
import GradientBackground from '../shared/gradientBackground';
import { Utils } from '../tools/utils';
import MyButton from '../shared/myButton';


const cookies = new Cookies();
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('screen').height;

export default class Home extends Component {
  constructor(){
    super();
    
    this.state = {
        planList: [],
        GraphResults: [],
        GraphDates: [],
        startOfMonthResults: [],
        isUpdated: false,

        // NEW!
        // myMsrmnts: [{title: 'Biceps', value: ''}, {title: 'Chest', value: ''}, {title: 'Shoulders', value: ''}, 
        // {title: 'Hips', value: ''}, {title: 'Waist', value: ''}, {title: 'Thigh', value: ''}, {title: 'Calf', value: ''}, ],  
        
    };   
    this.isLoading = false;
}



// checkHasData = async (user_id) => {
//     this.isLoading = true;
//     fetch('http://192.168.1.156:4000/checkHasData',
//     {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             'user_id': user_id
//         })
//     })
    
//     .then(res=>res.json())
//     .then(data=>{ // data.user => all data 
//       if (data.user.planList.length && data.user.planList.length > 0){ // => update user details
//         this.updateUserData(data.user);
//       }
//       this.isLoading = false;
      
//     })
    
//     .catch((err)=> console.log("Huston, we got a problem: ",err))
// }

addLastUpdatedArr = (planList) => {
  let updatedPlan = planList;
  for (let i = 0; i < planList.length; i++) {
    
    if (!Array.isArray(planList[i].lastUpdated)){
      updatedPlan[i].lastUpdated = [];
    }
      
    
    if (!Array.isArray(planList[i].resultsHistory)){
      updatedPlan[i].resultsHistory = []; 
    }
      
    
  }
  
  return updatedPlan;
}


checkHasData = () => {
  let planList ,GraphDates ,startOfMonthResults ,GraphResults;
  try{
    planList = this.props.navigation.getParam('planList').planList;
    GraphDates = this.props.navigation.getParam('GraphDates').GraphDates;
    startOfMonthResults = this.props.navigation.getParam('startOfMonthResults').startOfMonthResults;
    GraphResults = this.props.navigation.getParam('GraphResults').GraphResults;
  }
  catch(err){
    console.log('cath err:', err);
  }

  console.log("planList found:", planList);


  if (!planList){ // new user
    console.log('user has NOT plans');
    return;
  }
  // if (planList.length && planList.length > 0){ // => update user details
    else{ 
    // add lastUpdated to plans who doesn't have
    planList = this.addLastUpdatedArr(planList);
    
    if (!Array.isArray(GraphDates))
      GraphDates = [];
    
    if (!Array.isArray(startOfMonthResults))
      startOfMonthResults = [];

    if (!Array.isArray(GraphResults))
      GraphResults = [];
    

    // update class state
    let userData = {
      planList: planList,
      GraphResults: GraphResults,
      GraphDates: GraphDates,
      startOfMonthResults: startOfMonthResults,
    }
    this.updateUserData(userData);
  }

}

updateUserData = (user) => {
 
  this.setState({
    planList: user.planList,
    GraphResults: user.GraphResults,
    GraphDates: user.GraphDates,
    startOfMonthResults: user.startOfMonthResults,
  })
}


async componentDidMount() {
  const userEmail = this.props.navigation.getParam('email');
  const user_id = this.props.navigation.getParam('userId');

  console.log('rendered! email:',userEmail);
  console.log('rendered! user_id:',user_id);
  if (user_id){
    console.log('in if');
     this.checkHasData();
  // await this.checkHasData(user_id);
 
  this.isLoading = false;
  }
}

getNickName = (email) =>{
  let index = email.indexOf("@");
  return email.substring(0, index);
}


render() {

  const email = this.props.navigation.getParam('email');
  const user_id = this.props.navigation.getParam('userId');
  const nickName = this.getNickName(email);
  
  return (
    
    <View style={globalStyles.container}>
    <GradientBackground />
      {
      this.isLoading ? 
      <LoadingScreen/> : null
      }
      <Text style={{backgroundColor: '#e0e0d1', padding:5, color: 'black'}}>Welcome {nickName} !</Text>
      

      <ScrollView
      ref={ref => this.myScroll = ref}
      >    
      
    <Text style={globalStyles.textAppTitle}>{Utils.Title}</Text>
        <View style={styles.options}>

            {/*first button */}
            <ImageBackground 
              style={globalStyles.headerImage}
              source= {require('../images/results.jpg')}>
                <GradientButton 
                text= {`Enter today's results`}
                onPress= {() => {
                  this.props.navigation.navigate('Results', {...this.state, user_id});
                }}
                opacity= {0.9}
                
                />
            </ImageBackground>

             {/* second btn */}
            <ImageBackground 
            style={globalStyles.headerImage}
            source= {require('../images/charts.jpg')}
            >
                <GradientButton 
                text= {`Tracker`}
                onPress= {() => {
                  if (this.state.GraphResults.length > 0)
                    this.props.navigation.navigate('Track', this.state);
                  else 
                    console.log('No results !');
                }}
                colorsArr={['#330013',  'red', '#ffa366' ]} //[ 'transparent' ,'#4d0026', '#990033']  
                opacity={0.9}
                />
            </ImageBackground>


          {/* shopping btn */}
            {/* <ImageBackground 
              style={{...globalStyles.headerImage, backgroundColor: "gold"}}
              // source= {require('../images/measure.jpg')}
            >
            
              <MyButton 
              text= "Purchase Equipment"
              onPress= {()=> this.props.navigation.navigate('Shop', { user_id })}
              style= {styles.homeBtn}
              />
          </ImageBackground> */}


              {/* third btn */}
          {/* <ImageBackground 
          style={globalStyles.headerImage}
          source= {require('../images/measure.jpg')}
          >
            
              <MyButton 
              text= "Body Measurements"
              onPress= {()=> this.props.navigation.navigate('UpdateMeasurements', this.state)}
              style= {styles.homeBtn}
              />
          </ImageBackground> */}
        
          </View>

          {/* logout btn */}
          {/* <TouchableOpacity 
          onPress={() => this.props.navigation.replace('Login', {logedOut: true})}
          activeOpacity= {0.1}
          >
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity> */}
         
          {/* <MyButton
            style={globalStyles.button}
            onPress={()=> {
              // console.log('cookies: ', cookies.getAll());
              // console.log(this.state.planList[0].resultsHistory);
              // console.log(this.state.GraphResults);
              // console.log(this.state.GraphDates);
              // console.log(this.state.startOfMonthResults);
              console.log(this.state.planList);
            }}
            text='get plans to console, and GraphResults, GraphDates, startOfMonthResults : '
            /> */}

      </ScrollView>  
         
      
    </View>
  );
}
}




const styles = StyleSheet.create({
  options: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },  
  logout:{
    alignSelf: "flex-end",
    margin: 20,
    marginTop: 25,
    marginLeft: 15,
    fontWeight: "bold",
    fontSize: 18,
    borderBottomWidth: 4,
    borderColor: 'black',
    borderRadius: 10,
    padding:4,
    textAlign:"center",
    textAlignVertical: 'center',

  },
  homeBtn: {
    backgroundColor: '#80bfff', //#80b3ff blue . '#80bfff' => basic, red: #ff4d4d
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 1,
    padding: 10,
    // marginTop: 24,
    height: 154,
    width: 200,
    textAlign: "center",
    textAlignVertical: "center",
  },
  linearGradient: {
    borderRadius: 5,
    width: Dimensions.get("window").width,
    height: Dimensions.get('screen').height,
  }
});


          {/* first btn */}

        {/* <ImageBackground 
          style={globalStyles.headerImage}
          source= {require('../images/results.jpg')}
          >
              <MyButton 
              text= "Enter today's results"
              onPress= {() => this.props.navigation.navigate('Results', {...this.state, user_id})}
              style= {styles.homeBtn}
              />
              
          </ImageBackground> */}
  
          //sec btn:
                {/* <MyButton 
                text= "Tracker"
                onPress= {() => {
                  if (this.state.GraphResults.length > 0)
                  this.props.navigation.navigate('Track', this.state);
                  else 
                  console.log('No results !');
                }}
                style= {styles.homeBtn}
                /> */}