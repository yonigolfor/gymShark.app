import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button,FlatList} from 'react-native';
import MyButton from '../shared/myButton';
import  { globalStyles } from '../shared/styles';


arrangeTable = (myMsrmnts) => {
    let table = [];
    for (let i = 0; i < 7; i++) {
        if (myMsrmnts[i].value)
        table.push(
        <Text style={styles.table} key={i}>{`${myMsrmnts[i].title}: ${myMsrmnts[i].value}`}</Text>
        )
    }
    return table;
}

export default function Measurements({ myMsrmnts }) {

    return ( 
        <View style={styles.tableContainer}>
            { arrangeTable(myMsrmnts) } 
        </View>
    )
}

const styles = StyleSheet.create({
    tableContainer: {
        borderColor: 'black',
        borderWidth: 2,
    },
    table: {
        fontSize: 25,
        textAlign: 'center',
        color: 'orange',
        margin: 5,
        fontStyle: "italic"


    }
  
  });