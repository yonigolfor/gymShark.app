import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Modal } from 'react-native';
import  { globalStyles } from '../shared/styles';
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import MyButton from '../shared/myButton'; 
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLegend, VictoryTheme, VictoryAxis } from "victory-native";
import { Utils } from '../tools/utils';
import { captureRef  } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { LinearTextGradient } from "react-native-text-gradient"; // +link
import GradientBackground from '../shared/gradientBackground';
import update_post from '../myObjects/dbCommunication';
import { Language } from '../tools/utils';


getPlanList = (navigation) => {
  console.log(navigation.getParam('planList'));
  
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('screen').height;



const chartConfig = {
  backgroundGradientFrom: "red",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#800000",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `white`,
  strokeWidth: 5, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: true, // optional
  barRadius: 5,
  

  // hoverBackgroundColor: '#99003d',
  // pointHoverBackgroundColor: '#99003d',

};



getDatasets = (GraphResults) => {
  let datasetsArr = [], values, color;
  for(let i = 0; i < GraphResults.length; i++) {
    values = {
      data: GraphResults[i].data,
      color: (opacity = 1) =>  getColor(i),
    }
    datasetsArr.push(values);
  }
  return datasetsArr;
}

getColor = (index) => {
  switch (index) {
    case 0: 
      return '#e6b800'; // זהב
    case 1: 
      return '#ff6666'; // כחול קהה#006699 
    case 2: 
      return '#006699';
    case 3: 
      return 'purple';
    case 4: 
      return '#99003d'; // ורוד קהה
  
    default: 
      return 'green';
  } 
}


getLegends = (GraphResults) => {
  let legendsArr = [];
  for(let i = 0; i < GraphResults.length; i++) {
    legendsArr.push(GraphResults[i].title);
  }
  return legendsArr;
}


getTodayResultArray = (GraphResults, startOfMonthResults) => {
  let actualArr = [], yVal, size = 80; //80=>size barChart
  for (let i = 0; i < GraphResults.length; i++) {
    yVal = GraphResults[i].data[GraphResults[i].data.length - 1] + size - (i*2 + 1); //  - indexStarter
    if (yVal > 0 ){
    actualArr[i] = {
      x: GraphResults[i].title, 
      y: (yVal)
    }
  }
  else { // case 
    actualArr[i] = {
      x: GraphResults[i].title, 
      y: startOfMonthResults[i].y / 2
    }
  }
}
  return actualArr;
}

setStartOfMonthRes = (plansList) => {
  let starterArr = [], size = 80;

  for (let i = 0; i < plansList.length; i++) { // create copy
   starterArr[i] = plansList[i];  
  }
  for (let i = 0; i < starterArr.length; i++) {
    starterArr[i].y = size;
  }
  return starterArr;
}

takeScreenShot = async (viewRef) => {
  try {
    let result = await captureRef(viewRef, {
      // result: 'base64',
      format: "jpg"
    });
    console.log(result);
    openShareDialogAsync(result);
  } catch (e) {
    console.log(e);
  }
}


let openShareDialogAsync = async (screenShotUri) => {
  if (!(await Sharing.isAvailableAsync())) {
    alert(`Uh oh, sharing isn't available on your platform`);
    return;
  }
  await Sharing.shareAsync(screenShotUri);
}; 


export default function Track( { navigation } ) {
  let GraphResults = navigation.getParam('GraphResults');
  let startOfMonthResults = navigation.getParam('startOfMonthResults');
  const user_id = navigation.getParam('user_id');
  const [hasSawTracker, setHasSawTracker] = useState(navigation.getParam('hasSawTracker'));
  const languageSelected = navigation.getParam('languageSelected');

  console.log('GraphRes:', GraphResults);

  const viewRef = useRef(null);

  const data = {

    datasets: getDatasets(GraphResults),
    legend: getLegends(GraphResults)

  };

  const dataBarChartnotFinal = {
    startOfMonth: setStartOfMonthRes(startOfMonthResults), //startOfMonthResults
    today:  getTodayResultArray(GraphResults, startOfMonthResults) 
  };


  

  return (

    <View ref={viewRef} collapsable={false} style={globalStyles.container}>
  
   
    {/* case no plans modal */}
    <Modal transparent visible={!hasSawTracker} animationType='fade'>
    <View style={globalStyles.modalPopup}>
      <View style={globalStyles.modalContainer}>
        <Image 
        source={require('../images/boy-chart.png')} 
        style={{height:150, width:190, marginVertical:10}}
        />
        <Text
        style={{fontSize:15}}
        >
          {languageSelected == 'English'? Language.trackerModalText.en
                : Language.trackerModalText.he}
        </Text>
        <MyButton 
        text={languageSelected == 'English'? Language.trackerModalBtn.en
        : Language.trackerModalBtn.he}
        onPress={()=>{
         // update in db that is not new in tracker anymore
         
         update_post({user_id, sawTracker: true});
         setHasSawTracker(true);
         // cancel the popup
        }} 
        style={{padding:10, marginTop: 20, borderWidth: 1, 
          borderRadius:10, fontSize:20, fontWeight: 'bold', 
          fontStyle:'italic', backgroundColor: 'rgba(0,0,0,0.1)'}}
        />
      </View>
    </View>
  </Modal>
  

       <ScrollView>
       <GradientBackground
          //#800040
          colorsArr={['black', 'black' ,'#800040' , '#800040' ]}
          />
      
        <View>
          {/* <Text style={globalStyles.textTitle}>Tracker</Text> */}

         
        {/* <GradientBackground
          colorsArr={['#800040' , '#4d0000', 'black']} 
          //['#800040' , '#4d0000', 'black' ]
          /> */}
          <Text style={{...globalStyles.subTitle, textAlign: 'center', fontSize: 45, color:'white',}}>{languageSelected == 'English'? Language.trackerTitle.en
        : Language.trackerTitle.he}</Text>
          <View
         style={{ flex: 1,
          justifyContent: 'center',
          alignItems: 'center',}}
         >
          <MyButton 
          style={{color: 'pink', borderWidth: 2, borderColor: 'pink', borderRadius: 50, padding: 5, fontWeight: 'bold'}}
          text={'Share!'}
          onPress={()=> takeScreenShot(viewRef)}
          />
         </View>
          {/* <ScrollView horizontal={true}>  */}
            <LineChart
            bezier
            data={data}
            width={screenWidth + 40}
            height={350}
            chartConfig={chartConfig}
            withInnerLines={false}
            fromZero={true}
            // withOuterLines={false}
            // withHorizontalLines={false}
            // withVerticalLabels={false}
            withHorizontalLabels={false}
           // verticalLabelRotation={115}
           // horizontalLabelRotation={110}
            />
         
         

          </View>      
              {/* end */}



         <Text style={{...globalStyles.subTitle, textAlign: 'center', color:'white'}}>{languageSelected == 'English'? `${Utils.getMonth} improvements`
                : `תהליך חודש ${Utils.getMonthHebrew} `}</Text>
        
        <View>
          <GradientBackground
          colorsArr={['#800040' ,  'black']} 
          //['#800040' , '#4d0000', 'black' ]
          />
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 20 }}
        >
          <VictoryLegend 
          x= {Dimensions.get('screen').width / 2 - 80}
          gutter={40}
          orientation= {'horizontal'}
          data={[
            {
              name: languageSelected == 'English'? '1st'
              : 'תחילת החודש',
              symbol: {
                fill: '#757070' //was purple
              }, 
              labels: {
                fill: 'white',
                fontSize: 15,
              }
            },
            {
              name: languageSelected == 'English'? 'Today'
              : 'היום', 
              symbol: {
                fill: '#ff8080'
              }, 
              labels: {
                fill: 'white',
                fontSize: 15,
              }
            }
          ]}
          />
         
          <VictoryGroup offset={8}> 
            <VictoryBar
            animate={{
              onLoad: { duration: 3000 }
            }}
              barWidth={25}
              
              style={{ data: { fill: "#757070" } }}
              data={dataBarChartnotFinal.startOfMonth}
            />
            <VictoryBar
              animate={{
                onLoad: { duration: 3000 }
              }}
              
              barWidth={25}
              alignment={'start'}
              style={{ data: { fill: "#ff6666" } }}
              data={dataBarChartnotFinal.today}
            />

          </VictoryGroup>

        </VictoryChart>
        </View>
            

          {/* <MyButton
          onPress={()=>getPlanList(navigation)}
          text='get plans to console'
          />

          <MyButton
          onPress={()=>{
            console.log(dataBarChartnotFinal);
            console.log(startOfMonthResults);
          }}
          text='get the data bar chart: '
          /> */}
          
      </ScrollView>

    </View>
 
    

  );
}

