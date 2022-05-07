import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, ScrollView, Dimensions} from 'react-native';
import  { globalStyles } from '../shared/styles';
import { AntDesign } from '@expo/vector-icons';
import MyButton from '../shared/myButton';
import { Ionicons } from '@expo/vector-icons';
import RadioButtonRN from 'radio-buttons-react-native';



export default class Exercise extends Component {
    constructor(){
        super();

        this.state = {
            name: '',
            kg: '',
            reps: [],
            sets: '',
            isBodyWeight: false,
            tickPressed: false,
            kgErr: '',
            setsErr: '',
            repsErr: '',
        };
        //this.bodyWeightChecked = false;
        
    }


    handleKgChange = (val) => {
        if(!this.state.isBodyWeight) { // if body Weight pressed: can't enter kg
            if ( (!isNaN(val) && val >= 0 && val <= 1000) || val == "" ) 
            this.setState({
                kg: val
            });
            // val = number between 0 to 1000 or nothing
        } 

        this.setState({    // updates also the name
            name: this.props.name
        })
    } 

    handleSetsChange = (val) => {
        if ((val < 11 && val > 0 && !isNaN(val)) || val == ''){ // block crazy number of sets
           this.setState({
            sets: val
        })
        } 
        else;
    }

    handleRepsChange = (val, placeInRep) => {
        if ((val > 0 && val < 26 && !isNaN(val)) || val == ''){
        this.setState({
            reps: this.setReps(val, placeInRep)
        })
    } else;
    } 

    setReps = (val, place) => {
        this.state.reps[place] = val;
        return this.state.reps;
    }

    tickPressed = async () => {
        if (!this.state.tickPressed){ // case save
            this.restartErrors();

            if(this.isValidInputs()){
            this.props.tickArr[this.props.indexInPlan] = true; // add green tick
            this.setState({tickPressed: true});
            this.scrollDown();
            //let exName =this.props.plan.exercisesNames[this.props.indexInPlan];
            this.addToPlanInputs(this.props.name);

            } else;
        } 
        else { //case unlock/change
            this.props.tickArr[this.props.indexInPlan] = false;
            this.setState({tickPressed: false});
            this.props.decreaseScroll();

        }
     
    }

    isValidInputs = () => {

        if ((this.state.kg >= 0 && !isNaN(this.state.kg) && this.state.kg.length > 0) || 
            this.state.isBodyWeight){ //check kg
            if (this.state.sets > 0 && this.state.sets < 11  && !isNaN(this.state.sets)) {  //check sets
                if (this.state.reps.length > 0 && this.state.reps.length == this.state.sets){ //check reps
                    for (let i = 0; i < this.state.sets; i++) { // check every rep input 
                        if (this.state.reps[i] > 0 && this.state.reps[i] < 26  && !isNaN(this.state.reps[i]));
                        else {
                            this.setState({repsErr: 'Reps must be 1-25'});
                            return false;
                        }
                    }
                    return true;
                } else {
                    this.setState({repsErr: 'Fill all reps or change number of sets.'})
                }
            } else {
                this.setState({setsErr: 'Sets must be 1-10'})
            }
        } else{
            this.setState({kgErr: 'Enter valid kg'})

        }
        return false;
    }

    restartErrors = () => {
        this.setState({repsErr: ''});
        this.setState({setsErr: ''});
        this.setState({kgErr: ''});
    }

    addToPlanInputs = (name) => {
        //let place = this.props.plan.exercisesNames.indexOf(name);
        
        let place = this.props.indexInPlan;
        this.props.plan.lastUpdated[place] = this.state;
       
    }


    createRepsInputs = (updatedSet) => {
        let numOfSets, allInputs = [];
        if(updatedSet){ // live => by user
            numOfSets = updatedSet;
        }
        else if (this.props.plan.lastUpdated[this.props.indexInPlan]) { // remember the last time
            numOfSets = this.props.plan.lastUpdated[this.props.indexInPlan].sets;
        } 
        else {
            numOfSets = this.props.plan.generalSets; // first time => general sets 
        }
     
        for(let i=0; i<numOfSets;i++){
        allInputs.push
            (
            <TextInput 
            style={{...globalStyles.input, ...styles.repsInpit}}
            onChangeText={(val)=>this.handleRepsChange(val, i)}
            value={this.props.plan.lastUpdated.length > 0 && this.state.reps[i]}
            placeholder= {(this.props.plan.lastUpdated[this.props.indexInPlan] && this.props.plan.lastUpdated[this.props.indexInPlan].reps[i]) || this.props.plan.generalReps}
            keyboardType='numeric'
            key={i}
            editable={!this.state.tickPressed} 
            />
            );

        }
        return allInputs;

    }

    scrollDown = () => {

        
        setTimeout(()=> {this.props.myScroll();}, 230);       
       
    }
    
    


    render() {
        const radioBtnOptions = ['Body Weight', 'KG'];
        const radioBtnData = [        
            { label: radioBtnOptions[0] },
            { label: radioBtnOptions[1] },     
            ];

        const initialRadioValue = () => {
            if (this.props.plan.lastUpdated[this.props.indexInPlan])
                if (this.props.plan.lastUpdated[this.props.indexInPlan].isBodyWeight) // means did bodyWeight
                return 1;
              
            return 2;
        }      
        
       
        return (
        <View>
            {
                this.state.tickPressed &&
                <AntDesign name="check" size={300} color="#ff9933" style={styles.tickOverlay}/>
            }
            <ScrollView 
            ref={ref => this.scrollView = ref}
            >
            <Text style={styles.exTitle}>{this.props.name}</Text>

            {/* <View style = {styles.kgBodyWeightContainer}> */}
            {/* <View style={{justifyContent:"center"}}> */}
       
            
            <RadioButtonRN
            data={radioBtnData}
            selectedBtn={(e) => {
                if (e.label ==  radioBtnOptions[0]) // => Body Weight selected
                this.setState({ isBodyWeight: true });
                //this.bodyWeightChecked = true;
                else                                // => KG selected
                this.setState({ isBodyWeight: false });
                //this.bodyWeightChecked = false
            }}
            initial= {initialRadioValue()} // initial to last entered
            style={{display:"flex", flexDirection: "row"}}
            boxStyle={{width: 120, backgroundColor:"none", margin: 10, }}
            textStyle={{alignSelf: "center"}}//
            animationTypes={['pulse']}
            />
                   
            {/*   </View> */}
            <View>
            <Text>kg</Text> 
            <TextInput 
            style={globalStyles.input}
            onChange= {(val)=>this.handleKgChange(val.nativeEvent.text)}
            value= {!isNaN(this.state.kg) && this.state.kg}
            placeholder= {(this.props.plan.lastUpdated[this.props.indexInPlan] && this.props.plan.lastUpdated[this.props.indexInPlan].kg) || 'kg'}
            keyboardType='numeric'
            maxLength= {4}
            editable={!this.state.tickPressed} // if tick pressed => disable text input
            
            />
            </View>
            <Text style={globalStyles.errorMsg}>{this.state.kgErr}</Text>
            {/* </View> */}

            <Text>sets</Text>
            <TextInput 
            style={globalStyles.input}
            onChangeText={(val)=>this.handleSetsChange(val)}
            value= {!isNaN(this.state.sets) && this.state.sets}
            // value= {this.props.plan.lastUpdated.length > 0 && this.state.sets}
            placeholder= {(this.props.plan.lastUpdated[this.props.indexInPlan] && this.props.plan.lastUpdated[this.props.indexInPlan].sets) || this.props.plan.generalSets}
            keyboardType='numeric'
            maxLength= {2}
            editable={!this.state.tickPressed} 
            />
            <Text style={globalStyles.errorMsg}>{this.state.setsErr}</Text>

            <Text>reps</Text>
            <View style={styles.reps}>
                {this.createRepsInputs(this.state.sets)}
            </View>
            <Text style={globalStyles.errorMsg}>{this.state.repsErr}</Text>

            <View>

                <TouchableOpacity onPress={()=> {this.tickPressed(); }}>
                    <Ionicons 
                    style={styles.tick}
                    name="ios-checkmark-circle-outline" 
                    size={60} 
                    color={this.state.tickPressed ? 'green' : '#DA4C00'}
                    />
                </TouchableOpacity>
               
            </View>
                    {/* <MyButton 
                    text='get the plan to console' //console.log (this.props.plan)
                    onPress={()=> console.log(this.state)}
                    /> */}
            </ScrollView>
        </View>
        )
    }
}



const styles = StyleSheet.create({
    exTitle: {
        fontSize: 28,
        fontWeight: "900",
        fontFamily: 'serif'

      },
    planTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        borderBottomWidth:1,
        borderStyle: "dotted",
        borderColor: 'blue'

        
    },
    reps: {
        flexDirection: "row-reverse",
        justifyContent: "space-around",
        
    },
    repsInpit:{
        margin:8,
    },
    tick: {
        alignSelf:"center",
        marginTop:10,
        marginBottom: 20

    },
    tickOverlay: {
        alignSelf:"center",
        zIndex:20,
        position: "absolute",
        top: Dimensions.get('screen').height / 12,
        left: 5,
        // borderWidth: 2,
        opacity:0.4,        
    }, 
    kgBodyWeightContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
    }

  
  });