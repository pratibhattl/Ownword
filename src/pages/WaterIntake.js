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
    setSubmitted(true);
    reset({ amount: '' });
    createWaterIntakeApi(token, data, setIntakeList, setIsLoading)
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
      <ScrollView>
        {intakeList?.length > 0 &&
          intakeList?.map(x => {
            return (
              <View style={styles.formWrap}>
                <TextInput
                  style={styles.input}
                  defaultValue={String(x?.amount)}
                  editable={false}
                />
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
    backgroundColor: '#0A142A',
  },

  formWrap: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    // marginBottom: 100,
    width: '100%',
    justifyContent: 'space-between'
  },
  input: {
    width: '60%',
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#fff',
    placeholderTextColor: "#fff",
    backgroundColor: '#232C3F',
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
    width: '30%',
    backgroundColor: '#F14336',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
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
    width: '30%',
    backgroundColor: '#20C3D3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: '#000',
    fontSize: 16,
  },
})