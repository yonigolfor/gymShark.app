import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput} from 'react-native';
import { globalStyles } from '../shared/styles';
import { Formik } from 'formik';
import MyButton from '../shared/myButton';
import { ScrollView } from 'react-native-gesture-handler';


const measureFields = {
    biceps: '',
    chest: '',
    shoulders: '',
    hips: '',
    waist: '', //מותן
    thigh: '', //ירך.רגליים
    calf: '',
  }


setDetails = (myMsrmnts, values) => {
    myMsrmnts[0].value = values.biceps || myMsrmnts[0].value;
    myMsrmnts[1].value = values.chest || myMsrmnts[1].value;
    myMsrmnts[2].value = values.shoulders || myMsrmnts[2].value;
    myMsrmnts[3].value = values.hips || myMsrmnts[3].value;
    myMsrmnts[4].value = values.waist || myMsrmnts[4].value;
    myMsrmnts[5].value = values.thigh || myMsrmnts[5].value;
    myMsrmnts[6].value = values.calf || myMsrmnts[6].value;
}

isValidInput = (values) => {
    if (values.biceps)
        if(isNaN(values.biceps)) return false;
    if (values.chest)
        if(isNaN(values.chest)) return false;
    if (values.shoulders)
        if(isNaN(values.shoulders)) return false;
    if (values.hips)
        if(isNaN(values.hips)) return false;
    if (values.waist)
        if(isNaN(values.waist)) return false;
    if (values.thigh)
        if(isNaN(values.thigh)) return false;
    if (values.calf)
        if(isNaN(values.calf)) return false;

    return true;
 
}

export default function NewMeasurementsForm({ navigation }) {
    const myMsrmnts = navigation.getParam('myMsrmnts') ;
    const [errorMsg, seterrorMsg] = useState('')

    return (
        <View style={globalStyles.container}>
            <ScrollView>
                <Text style={globalStyles.textTitle}>Update Measurements</Text>
                    <Formik initialValues={measureFields} 
                    onSubmit={(values) => {
                        seterrorMsg('');

                        if (isValidInput(values)){
                            setDetails(myMsrmnts, values);
                            console.log('after:', myMsrmnts);
                            navigation.navigate('Home');
                        } 
                        else {
                            seterrorMsg('Oops: Only numbers allowed!');
                        }
                    }}
                    >
                    {(props)=> (
                    <View style={{padding:15}}>
                        <Text style={{...globalStyles.subTitle, fontSize: 22}}>Enter Measurements :</Text>
                        <Text>Biceps:</Text>
                        <TextInput
                        style={{...globalStyles.input, ...styles.input}}
                        placeholder={myMsrmnts[0].value ? myMsrmnts[0].value : 'First time!'}
                        onChangeText={props.handleChange('biceps')}
                        value={props.values.biceps}
                        keyboardType= 'numeric'
                        />
                        <Text>Chest:</Text>
                        <TextInput 
                        style={{...globalStyles.input, ...styles.input}}
                        placeholder={myMsrmnts[1].value ? myMsrmnts[1].value : 'First time!'}
                        onChangeText={props.handleChange('chest')}
                        value={props.values.chest}
                        keyboardType= 'numeric'
                        />
                        <Text>Shoulders:</Text>
                        <TextInput 
                        style={{...globalStyles.input, ...styles.input}}
                        placeholder={myMsrmnts[2].value ? myMsrmnts[2].value : 'First time!'}
                        onChangeText={props.handleChange('shoulders')}
                        value={props.values.shoulders}
                        keyboardType= 'numeric'
                        />
                        <Text>Hips:</Text>
                        <TextInput 
                        style={{...globalStyles.input, ...styles.input}}
                        placeholder={myMsrmnts[3].value ? myMsrmnts[3].value : 'First time!'}
                        onChangeText={props.handleChange('hips')}
                        value={props.values.hips}
                        keyboardType= 'numeric'
                        />
                        <Text>Waist:</Text>
                        <TextInput 
                        style={{...globalStyles.input, ...styles.input}}
                        placeholder={myMsrmnts[4].value ? myMsrmnts[4].value : 'First time!'}
                        onChangeText={props.handleChange('waist')}
                        value={props.values.waist}
                        keyboardType= 'numeric'
                        />
                        <Text>Thigh:</Text>
                        <TextInput 
                        style={{...globalStyles.input, ...styles.input}}
                        placeholder={myMsrmnts[5].value ? myMsrmnts[5].value : 'First time!'}
                        onChangeText={props.handleChange('thigh')}
                        value={props.values.thigh}
                        keyboardType= 'numeric'
                        />
                        <Text>Calf:</Text>
                        <TextInput 
                        style={{...globalStyles.input, ...styles.input}}
                        placeholder={myMsrmnts[6].value ? myMsrmnts[6].value : 'First time!'}
                        onChangeText={props.handleChange('calf')}
                        value={props.values.calf}
                        keyboardType= 'numeric'
                        />
                        <Text style={globalStyles.errorMsg}>{errorMsg}</Text>

                        <MyButton 
                        text= 'Submit'
                        onPress= {() => props.handleSubmit()}
                        />
                    </View>
                    
                    )}

                    </Formik>
                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

  });