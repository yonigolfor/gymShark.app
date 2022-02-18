import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('screen').height;

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAEBD7',  //'#FAEBD7' - basic . red: #ff4d4d . black: #262626
    },
    textTitle : {
        textAlign: "center",
        fontSize: 40,
        fontFamily: 'serif',
        fontStyle: "italic",
        fontWeight: '900',
        marginBottom: 20,
        color:'gray' // basic: 'gray'
        
    },
    subTitle: {
        // textAlign: "center",
        marginLeft: 15,
        fontSize: 30,
        fontFamily: 'serif',
        fontStyle: "italic",
        fontWeight: '900',
        marginBottom: 10,
        color:'black',


    },  
    button: {
        backgroundColor: 'orange',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'serif',
        borderWidth: 5,
        padding: 10,
        marginTop: 24,
        height: 100,
        width: 180,
        textAlign: "center",
        textAlignVertical: "center",
        borderRadius:10,
        
      },
      input: {
        borderWidth: 1,
        padding: 5,
        // marginBottom: 15,
        marginTop: 4,
      },
      headerImage: {
        flex: 1,
        opacity: 0.6,
        marginTop: screenHeight / 40, //50
        resizeMode: "cover",
      
        // backgroundColor: 'black'
      },
      errorMsg: {
        color: 'red',
        fontSize: 15,
        // marginBottom: 15
      },
      textCreateNew: {
        fontSize: 30,
        color: '#b3b3b3',
        textAlign: "center",
      },
      iconCreateNew:{
        opacity:0.6,
        alignSelf:"center"
      },
      backPageIcon: {
        position:"absolute",
        top:"0.7%",
        right:10,
        borderWidth: 2,
        borderRadius: 30,
        padding: "0.8%",
       
      }
          // textButtonsHome: {
    //     backgroundColor: 'white',
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     borderWidth: 1,
    //     padding: 10,
    //     marginTop: 24,
    // },
})