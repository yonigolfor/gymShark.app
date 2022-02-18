// import React, { Component } from 'react';
// import { StyleSheet, Text, View, ActivityIndicator, Button} from 'react-native';
// import { globalStyles } from '../shared/styles';
// import { Dimensions } from "react-native";
// import LoadingScreen from './loadingScreen';

// const screenWidth = Dimensions.get("window").width;
// const screenHeight = Dimensions.get('screen').height;



//   export default class BuySucceed extends Component { // - navigation props
//     constructor(){
//       super();
//       this.state = {
//         isLoading: false,

//       };    
//   }




//   render() {
//     const user_id = this.props.navigation.getParam("user_id");
//     let itemNumber = 1;


//     return (
//         <View backgroundColor='green'>
//             {
//                 this.state.isLoading ? 
//                 <LoadingScreen /> : null
//             }

//             <Text style={{...globalStyles.textTitle, ...styles.title}}>successfully!</Text>

//         </View>
//     )
//   }

// }


// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#1a0013', // 1a001a sagol 1a0000
//         height: screenHeight,
//         width: screenWidth,
        
        
//     },
//     title: {
//         fontSize: 70,
//         color:'gold',
 
//         marginBottom: 30
//     },
//     loading: {
//         color: 'white',
//         textAlign: 'center',
//         fontSize: 25,
//         marginTop:30
//     }
//   });


import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function BuySucceed(props) {

  const route = useRoute();

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontWeight:'bold',fontSize:20}}>Payment Successfull</Text>
      <Text style={{marginTop: 10,}}> payId - {route.params.payId}</Text>
      <Text style={{marginTop: 10,}}> token - {route.params.token}</Text>
      <Text style={{marginTop: 10,}}> payerId - {route.params.payerId}</Text>
     </View>
  );
}