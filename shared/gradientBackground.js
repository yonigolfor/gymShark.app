import React, { useState } from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import { globalStyles } from '../shared/styles';
import { LinearGradient } from 'expo-linear-gradient';


const screenHeight = Dimensions.get('screen').height;



export default function GradientBackground({ colorsArr  }) {

    return (
        <LinearGradient
        colors={colorsArr || ['black', 'black' ,'#800000' , 'red' ]} //'rgba(0,0,0,0.8)' basic
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: screenHeight ,
        }}
        />

    )

}

const styles = StyleSheet.create({

    
  });

