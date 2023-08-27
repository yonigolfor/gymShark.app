import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "../shared/styles";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import Cookies from "universal-cookie";
import LoadingScreen from "./loadingScreen";
import GradientButton from "../shared/gradientButton";
import GradientBackground from "../shared/gradientBackground";
import { Utils } from "../tools/utils";
import { Language } from "../tools/utils";
import MyButton from "../shared/myButton";

// const cookies = new Cookies();

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      planList: [],
      GraphResults: [],
      GraphDates: [],
      startOfMonthResults: [],
      isUpdated: false,
      // tools for new user
      hasCreatedPlan: false,
      hasSawTracker: false,

      // NEW!
      // myMsrmnts: [{title: 'Biceps', value: ''}, {title: 'Chest', value: ''}, {title: 'Shoulders', value: ''},
      // {title: 'Hips', value: ''}, {title: 'Waist', value: ''}, {title: 'Thigh', value: ''}, {title: 'Calf', value: ''}, ],
    };
    this.isLoading = false;
  }

  setHasSawTracker = (bool) => {
    this.setState({
      hasSawTracker: bool,
    });
  };

  setHasCreatedPlan = (bool) => {
    this.setState({
      hasCreatedPlan: bool,
    });
  };

  // checkHasData = async (user_id) => {
  //     this.isLoading = true;
  //     fetch('http://192.168.1.156:4000/checkHasData',
  //     {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //             'user_id': user_id
  //         })
  //     })

  //     .then(res=>res.json())
  //     .then(data=>{ // data.user => all data
  //       if (data.user.planList.length && data.user.planList.length > 0){ // => update user details
  //         this.updateUserData(data.user);
  //       }
  //       this.isLoading = false;

  //     })

  //     .catch((err)=> console.log("Huston, we got a problem: ",err))
  // }

  addLastUpdatedArr = (planList) => {
    let updatedPlan = planList;
    for (let i = 0; i < planList.length; i++) {
      if (!Array.isArray(planList[i].lastUpdated)) {
        updatedPlan[i].lastUpdated = [];
      }

      if (!Array.isArray(planList[i].resultsHistory)) {
        updatedPlan[i].resultsHistory = [];
      }
    }

    return updatedPlan;
  };

  checkHasData = (user_id) => {
    let planList,
      GraphDates,
      startOfMonthResults,
      GraphResults,
      hasCreatedPlan,
      hasSawTracker,
      languageSelected;
    try {
      planList = this.props.navigation.getParam("planList").planList;
      GraphDates = this.props.navigation.getParam("GraphDates").GraphDates;
      startOfMonthResults = this.props.navigation.getParam(
        "startOfMonthResults"
      ).startOfMonthResults;
      GraphResults =
        this.props.navigation.getParam("GraphResults").GraphResults;
      hasCreatedPlan = this.props.navigation.getParam("hasCreatedPlan");
      // hasSawTracker = this.props.navigation.getParam('hasSawTracker').hasSawTracker;
      // languageSelected = this.props.navigation.getParam('language');
    } catch (err) {
      console.log("catch err:", err);
    }
    try {
      // check hasSawTracker
      hasSawTracker =
        this.props.navigation.getParam("hasSawTracker").hasSawTracker;
    } catch (err) {
      console.log("caught err while checking hasSawTracker");
      hasSawTracker = false;
    }
    try {
      // check languageSelected = 'English'
      languageSelected = this.props.navigation.getParam("language");
    } catch (err) {
      console.log("caught err while checking languageSelected", err);
    }
    try {
      // check hasCreatedPlan
      hasCreatedPlan =
        this.props.navigation.getParam("hasCreatedPlan").hasCreatedPlan;
    } catch (err) {
      console.log("caught err while checking hasCreatedPlan");
      hasCreatedPlan = false;
    }

    console.log("planList found:", planList);
    console.log("hasSawTracker?", hasSawTracker);
    console.log("hasCreatedPlan?", hasCreatedPlan); // if not = undefined
    console.log("languageSelected?", languageSelected); // if not = undefined

    if (!planList) {
      // new user
      // send user to create new plan
      console.log("user has NOT plans");
      this.setState({
        hasCreatedPlan: true, // now going to create one
        hasSawTracker: hasSawTracker,
      });
      this.props.navigation.navigate("Results", {
        ...this.state,
        user_id,
        languageSelected,
      });

      return;
    } else {
      // add lastUpdated to plans who doesn't have
      planList = this.addLastUpdatedArr(planList);

      if (!Array.isArray(GraphDates)) GraphDates = [];

      if (!Array.isArray(startOfMonthResults)) startOfMonthResults = [];

      if (!Array.isArray(GraphResults)) GraphResults = [];

      // update class state
      let userData = {
        planList: planList,
        GraphResults: GraphResults,
        GraphDates: GraphDates,
        startOfMonthResults: startOfMonthResults,
        hasCreatedPlan: hasCreatedPlan,
        hasSawTracker: hasSawTracker,
      };
      this.updateUserData(userData);
    }
  };

  updateUserData = (user) => {
    this.setState({
      planList: user.planList,
      GraphResults: user.GraphResults,
      GraphDates: user.GraphDates,
      startOfMonthResults: user.startOfMonthResults,
      hasCreatedPlan: user.hasCreatedPlan,
      hasSawTracker: user.hasSawTracker,
    });
  };

  async componentDidMount() {
    const userEmail = this.props.navigation.getParam("email");
    const user_id = this.props.navigation.getParam("userId");

    console.log("rendered! email:", userEmail);
    console.log("rendered! user_id:", user_id);
    if (user_id) {
      console.log("in if");
      this.checkHasData(user_id);
      // await this.checkHasData(user_id);

      this.isLoading = false;
    }
  }

  getNickName = (email) => {
    let index = email.indexOf("@");
    return email.substring(0, index);
  };

  render() {
    const email = this.props.navigation.getParam("email");
    const user_id = this.props.navigation.getParam("userId");
    const nickName = this.getNickName(email);
    const languageSelected = this.props.navigation.getParam("language");
    // console.log('email:', email);
    // console.log('languageSelected:', languageSelected);
    // const screenWidth = Dimensions.get("window").width;
    // const screenHeight = Dimensions.get('screen').height;
    // const squareWidthSizeByPercent = screenWidth * 55.556 / 100;

    return (
      <View style={globalStyles.container}>
        <GradientBackground />
        {this.isLoading ? <LoadingScreen /> : null}
        <Text
          style={{ backgroundColor: "#e0e0d1", padding: 5, color: "black" }}
        >
          {" "}
          {languageSelected == "English"
            ? Language.greetingHomePage.en
            : Language.greetingHomePage.he}{" "}
          {nickName} !
        </Text>

        <ScrollView ref={(ref) => (this.myScroll = ref)}>
          <Text style={globalStyles.textAppTitle}>{Utils.Title}</Text>
          <View style={globalStyles.options}>
            {/*first button - enter results*/}
            <ImageBackground
              style={globalStyles.headerImage}
              source={require("../images/results.jpg")}
            >
              <GradientButton
                text={
                  languageSelected == "English"
                    ? Language.enterResultsButton.en
                    : Language.enterResultsButton.he
                }
                onPress={() => {
                  this.props.navigation.navigate("Results", {
                    ...this.state,
                    user_id,
                    languageSelected,
                  });
                }}
                opacity={0.9}
              />
            </ImageBackground>

            {/* second btn - tracker*/}
            <ImageBackground
              style={globalStyles.headerImage}
              source={require("../images/charts.jpg")}
            >
              <GradientButton
                text={
                  languageSelected == "English"
                    ? Language.trackerButton.en
                    : Language.trackerButton.he
                }
                onPress={() => {
                  this.props.navigation.navigate("Track", {
                    ...this.state,
                    user_id,
                    languageSelected,
                  });
                  this.setHasSawTracker(true);
                }}
                colorsArr={["#330013", "red", "#ffa366"]} //[ 'transparent' ,'#4d0026', '#990033']
                opacity={0.9}
              />
            </ImageBackground>

            {/* shopping btn */}
            {/* <ImageBackground 
              style={{...globalStyles.headerImage, backgroundColor: "gold"}}
              // source= {require('../images/measure.jpg')}
            >
            
              <MyButton 
              text= "Purchase Equipment"
              onPress= {()=> this.props.navigation.navigate('Shop', { user_id })}
              style= {styles.homeBtn}
              />
          </ImageBackground> */}

            {/* third btn */}
            {/* <ImageBackground 
          style={globalStyles.headerImage}
          source= {require('../images/measure.jpg')}
          >
            
              <MyButton 
              text= "Body Measurements"
              onPress= {()=> this.props.navigation.navigate('UpdateMeasurements', this.state)}
              style= {styles.homeBtn}
              />
          </ImageBackground> */}
          </View>

          {/* logout btn */}
          {/* <TouchableOpacity 
          onPress={() => this.props.navigation.replace('Login', {logedOut: true})}
          activeOpacity= {0.1}
          >
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity> */}

          {/* <MyButton
            style={globalStyles.button}
            onPress={()=> {
              // console.log('cookies: ', cookies.getAll());
              // console.log(this.state.planList[0].resultsHistory);
              // console.log(this.state.GraphResults);
              // console.log(this.state.GraphDates);
              // console.log(this.state.startOfMonthResults);
              console.log(this.state.planList);
            }}
            text='get plans to console, and GraphResults, GraphDates, startOfMonthResults : '
            /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  options: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  logout: {
    alignSelf: "flex-end",
    margin: 20,
    marginTop: 25,
    marginLeft: 15,
    fontWeight: "bold",
    fontSize: 18,
    borderBottomWidth: 4,
    borderColor: "black",
    borderRadius: 10,
    padding: 4,
    textAlign: "center",
    textAlignVertical: "center",
  },
  homeBtn: {
    backgroundColor: "#80bfff", //#80b3ff blue . '#80bfff' => basic, red: #ff4d4d
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    // marginTop: 24,
    height: 154,
    width: 200,
    textAlign: "center",
    textAlignVertical: "center",
  },
  linearGradient: {
    borderRadius: 5,
    width: Dimensions.get("window").width,
    height: Dimensions.get("screen").height,
  },
});

{
  /* first btn */
}

{
  /* <ImageBackground 
          style={globalStyles.headerImage}
          source= {require('../images/results.jpg')}
          >
              <MyButton 
              text= "Enter today's results"
              onPress= {() => this.props.navigation.navigate('Results', {...this.state, user_id})}
              style= {styles.homeBtn}
              />
              
          </ImageBackground> */
}

//sec btn:
{
  /* <MyButton 
                text= "Tracker"
                onPress= {() => {
                  if (this.state.GraphResults.length > 0)
                  this.props.navigation.navigate('Track', this.state);
                  else 
                  console.log('No results !');
                }}
                style= {styles.homeBtn}
                /> */
}
