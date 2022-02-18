import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import { Easing } from 'react-native-reanimated';
import Overlay from 'react-native-modal-overlay';
import MyButton from '../shared/myButton';


triggerAnimation = (animation, setpopUp) => {
    animation.setValue(0);
    Animated.timing(animation, {
        duration: 400,
        toValue: 3,
        ease: Easing.bounce,
        useNativeDriver: true,
    }).start(() => setpopUp(true));
}


findPlaceInList = (planList, title) => {

    for(let i = 0; i < planList.length; i++){ 
        if (planList[i].title == title)
            return i;
    }
    return -1;
}

findPlan = (planList, title) => {
    const index = findPlaceInList(planList, title)
    return planList[index];
}


removeAPlan = (planList, title, GraphResults, startOfMonthResults) => {
    const index = planList.findIndex(el => el.title == title);
    const index2 = GraphResults.findIndex(el => el.title == title);
    const index3 =startOfMonthResults.findIndex(el => el.x == title);
    if (index > -1) {
        planList.splice(index, 1);
        if (index2 > -1) { // case never train in the plan
            GraphResults.splice(index2, 1);
            startOfMonthResults.splice(index3, 1);
        } 
    }
        

}


updateDbPlanList = (planList, user_id) => {
    console.log('Try: updating DB');
    fetch('http://192.168.1.156:4000/update',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'planList': planList,
            'user_id': user_id
        })
    })
    
    .then(res=>res.json())
    .then(data=>{
        // console.log('the data');
        // console.log(data);
    })
    .catch((err)=> console.log(err))
  }
  
  updateDbGraphResults = (GraphResults, user_id) => {
    console.log('Try: updating DB');
    fetch('http://192.168.1.156:4000/update',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'GraphResults': GraphResults,
            'user_id': user_id
        })
    })
    
    .then(res=>res.json())
    .then(data=>{
        // console.log('the data');
        // console.log(data);
    })
    .catch((err)=> console.log(err))
  }


export default function MyLongPressButton({ navigation, onPress, title, style, planList, GraphResults, startOfMonthResults, user_id }) {
    // the animation *****
    const animation = new Animated.Value(0);

    const interpolated = animation.interpolate({
        inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
        outputRange: [0, -15, 0, 15, 0, -15, 0],
    })

    const shakeStyle = {
        transform: [
            { translateX: interpolated }
    ]
}
    // end of animation *****

   
    const [popUp, setpopUp] = useState(false);

    return (
        

        <View>  
            <Overlay 
            visible={popUp} 
            closeOnTouchOutside={true}
            onClose={()=>setpopUp(false)}
            animationType={'flipInX'}  //fadeInUp, zoomIn, bounceIn, flipInX
            containerStyle= {styles.overlayStyle}
            childrenWrapperStyle= {styles.overlayChildrenStyle}
            >
                <Text>{`Do you want to remove '${title}' ?`}</Text>
                <View style={styles.options}>
                    <MyButton 
                    text='YES'
                    onPress={()=> {
                        removeAPlan(planList, title, GraphResults, startOfMonthResults);
                        updateDbPlanList(planList, user_id);
                        updateDbGraphResults(GraphResults, user_id);
                        setpopUp(false);
                        navigation.navigate('Home');
                    }}
                    style={styles.btnOption}
                    />
                    <MyButton 
                    text='NO'
                    onPress={()=> {
                    setpopUp(false);
                    }}
                    style={styles.btnOption}
                    />
                </View>
            </Overlay>

            <TouchableOpacity 
            onPress={onPress}
            onLongPress={()=>{
                triggerAnimation(animation, setpopUp);
            }}
            >
                <Animated.View style={shakeStyle}> 
                    <Text style={style || styles.textToButton}>{ title }</Text>
                </Animated.View>
            </TouchableOpacity>
         
        </View>

    )
}

const styles = StyleSheet.create({
    textToButton: {
        backgroundColor: '#80bfff', //#80b3ff blue
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

      options: {
        display: "flex",
        flexDirection: 'row',
        justifyContent:"center"
    },
    btnOption: {
        height: 60,
        width: 70,
        textAlign: "center",
        textAlignVertical: "center",
        padding: 10,
        borderWidth: 1, 
        borderRadius:20, 
        margin:20,  
    },
    overlayStyle: {
        backgroundColor: 'rgba(0, 0, 0 ,0.4)',
    },
    overlayChildrenStyle: {
        // backgroundColor: 'red',
        borderRadius:10,
    }
  });