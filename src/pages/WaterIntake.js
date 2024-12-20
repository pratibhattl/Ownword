import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer'
import LoadingScreen from '../components/LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getWaterIntakeApi, createWaterIntakeApi ,updateWaterIntakeApi} from '../apiService/IntakeApi';
import { getData,removeData } from '../helper';


export default function WaterIntake() {

  const { control, handleSubmit,reset, formState: { errors } } = useForm({
    defaultValues: {
      amount: '',
    },
  });
  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useState(null)
  const [intakeList, setIntakeList] = useState([])
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();
  const onSubmit = (data) => {    
    if(data?.amount !==""){
    setSubmitted(true);
    reset({ amount: '' });
    createWaterIntakeApi(token, data, setIntakeList, setIsLoading)
    }else{
      alert("Please enter water amount !!")
    }
  };
  useEffect(() => {
    getData('token').then((token) => {
      setToken(token);
    });
  }, [])

  useEffect(() => {
    getWaterIntakeApi(token, setIntakeList, setIsLoading)
  }, [token])


  const deleteLog=(id)=>{
    updateWaterIntakeApi(token,id, setIntakeList, setIsLoading,navigation,removeData)
  }



  if (isLoading) {
    return <LoadingScreen />;
  }


  return (
    <View style={styles.container}>
      <ScrollView style={styles.wrapper}>
        {intakeList?.length > 0 &&
          intakeList?.map(x => {
            return (
              <View style={styles.formWrap}>
                <TextInput
                  style={styles.input}
                  defaultValue={String(x?.amount)}
                  editable={false}
                />
                <Text style={styles.inputunit}>/ml</Text>
                <TouchableOpacity style={styles.primaryButton} onPress={()=> deleteLog(x?._id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )
          })
        }
        <View style={styles.formWrap}>
          <Controller
            control={control}
            render={({ field: { onChange, reset, value } }) => (
              <>
                <TextInput
                  style={[styles.input, submitted && errors.amount ? styles.isInvalid : null]}
                  value={value}
                  onChangeText={onChange}

                />
                {submitted && errors.amount && (
                  <Text style={styles.errorText}>{errors.amount.message}</Text>
                )}
              </>
            )}
            name="amount"
          />
          <Text style={styles.inputunit}>/ml</Text>
          <TouchableOpacity style={styles.secondoryButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView >
      <Footer />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#EDE8D0',
  },
  wrapper: {
    padding: 16,
  },

  formWrap: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    // marginBottom: 100,
    width: '100%',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 44,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 10,
    color: '#6C727F',
    placeholderTextColor: "#6C727F",
    backgroundColor: '#D5D1BB',
  },
  inputunit: {
    height: 44,
    lineHeight: 44,
    backgroundColor: '#D5D1BB',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    paddingHorizontal: 10,
    color: '#6C727F',
  },
  isInvalid: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  linkText: {
    color: '#fff',
    textAlign: 'left',
    marginBottom: 15,
  },
  primaryButton: {
    paddingHorizontal: 26,
    backgroundColor: '#dc3545',
    borderRadius: 4,
    alignItems: 'center',
    height: 44,
    color: '#fff',
    width: 100,
    lineHeight: 44,
    marginLeft: 16,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 44,
  },
  skipText: {
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingLeft: 35,
    paddingRight: 35,

  },
  footertext: {
    textAlign: 'center',
    color: '#fff',
  },
  secondoryButton: {
    paddingHorizontal: 26,
    backgroundColor: '#964b00',
    borderRadius: 4,
    alignItems: 'center',
    height: 44,
    lineHeight: 44,
    width: 100,
    marginLeft: 16,
  },
})