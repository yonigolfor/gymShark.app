import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, Linking} from 'react-native';
import { globalStyles } from '../shared/styles';
import { Dimensions } from "react-native";
import LoadingScreen from './loadingScreen';
import ReactDOM from "react-dom"

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('screen').height;

// paypal SDK


  export default class Shop extends Component { // - navigation props
    constructor(){
      super();
      this.state = {
        isLoading: false,

      };    
  }

  openPaypalPage = (link) => {
      Linking.openURL(link);
  }

isSuccess = () =>  {
    this.props.navigation.navigate("BuySucceed");
};

purchaseFailed = () => {
    console.log("Purchase has failed...");
}

  fetchPurchase = (itemNumber, user_id, amt) => {
    console.log('Try: Purchasing');
    
    fetch('http://192.168.1.156:4000/purchase/'+amt,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'itemNumber': itemNumber,
            'user_id': user_id,
            
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log('the data');
        console.log(data);
        this.openPaypalPage(data.paypalLink); //openning paypal web
        
        //this.isSuccess();
    })
    .catch((err)=> {console.log(err); this.purchaseFailed();})

        // return fetch('http://192.168.1.156:4000/create-paypal-transaction', {
        //   method: 'post',
        //   headers: {
        //     'content-type': 'application/json'
        //   }
        // }).then(function(res) {
        //   return res.json();
        // }).then(function(data) {
        //   return data.id; // Use the key sent by your server's response, ex. 'id' or 'token'
        // });
      
  }



  render() {
    const user_id = this.props.navigation.getParam("user_id");
    let itemNumber = 1; // example
    let amt = 25;
    

    return (
        <View>
            {
                this.state.isLoading ? 
                <LoadingScreen /> : null
            }


            <Text style={{...globalStyles.textTitle, ...styles.title}}>Shop</Text>
            <Button
            title = "Buy"
            onPress = {() => {
                console.log("Purchasing!");
                this.fetchPurchase(itemNumber, user_id, amt);
        }}
            />
        </View>
    )
  }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a0013', // 1a001a sagol 1a0000
        height: screenHeight,
        width: screenWidth,
        
        
    },
    title: {
        fontSize: 70,
        color:'gold',
 
        marginBottom: 30
    },
    loading: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        marginTop:30
    }
  });

