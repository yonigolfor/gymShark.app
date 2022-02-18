import React from 'react';
import { View, TextInput} from 'react-native';
import  { globalStyles } from '../shared/styles';



fillArr = (numOfSets) => {
    for(let i=0; i < numOfSets; i++){
        numOfSets[i] = i;
    }
}

export default function RepsInput({ numOfSets }) {
    let setToArr = [];
    setToArr = fillArr(numOfSets);


    return (
        <View>
            {
                setToArr.map(item => (
                    <TextInput 
                    key={item}
                    style={globalStyles.input}
                    value= {sets}
                    keyboardType='numeric'
                    />
                )    
            )

            }
        </View>
        
    )
}