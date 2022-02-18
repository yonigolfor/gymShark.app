import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { globalStyles } from '../shared/styles';
import { Dimensions } from "react-native";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('screen').height;

export default function LoadingScreen() {

    return (
        <View style= {styles.container}>
            <Text style={{...globalStyles.textTitle, ...styles.title}}>GYM Sharks</Text>
            <ActivityIndicator size='large' color='orange'  />  
            {/* <Text style={{...globalStyles.subTitle,...styles.loading}}>Loading...</Text> */}
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a0013', // 1a001a sagol 1a0000
        height: screenHeight,
        width: screenWidth,
        
        
    },
    title: {
        textAlign: 'center',
        fontSize: 55,
        color:'white',
        marginTop: screenHeight / 6,
        marginBottom: 30
    },
    loading: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        marginTop:30
    }
  });

