import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import globalStyles from './styles';



export default function MyButton({ onPress, text, style }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={style || styles.textToButton}>{ text }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textToButton: {
        backgroundColor: '#80bfff', //#80b3ff blue . '#80bfff' => basic, red: #ff4d4d
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        borderWidth: 1,
        padding: 10,
        // marginTop: 24,
        height: 150,
        width: 200,
        textAlign: "center",
        textAlignVertical: "center",
      },
    
  });