import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { globalStyles } from '../shared/styles';
import { LinearGradient } from 'expo-linear-gradient';



export default function GradientButton({ colorsArr, text, buttonStyle, textStyle, onPress, opacity }) {

    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <LinearGradient
                colors={colorsArr || ['red', '#ff4d4d', '#ff944d']} //['red', '#ff4d4d', '#ff944d']
                style={buttonStyle || {...styles.homeBtn, backgroundColor: 'none', opacity: opacity }}
                >
                    <Text style={textStyle || styles.text}>
                    {text}
                    </Text>
                    
                </LinearGradient>
            </TouchableOpacity>

        </View>
    )

}
        // Background Linear Gradient
        //['rgb(255, 102, 0)',  'transparent', 'rgb(255, 102, 0)', ]
        //['black',  'rgb(255, 102, 0)', 'black', ]
        //'black', 'red' , 'rgb(179, 0, 0)'
        //'transparent', 'orange' , 'rgb(179, 0, 0)'

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: "center",
        // marginTop: '15%',
    }, 

    homeBtn: {
        backgroundColor: '#80bfff', //#80b3ff blue . '#80bfff' => basic, red: #ff4d4d
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        borderWidth: 1,
        padding: 8,
        // marginTop: 24,
        height: 154,
        width: 200,
        textAlign: "center",
        justifyContent: 'center'
    }
    
  });

