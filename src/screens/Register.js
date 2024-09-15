import { useEffect, useState } from 'react'
import {StyleSheet, Text, View, Pressable, ImageBackground} from 'react-native'
import { colors } from '../global/colors'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useRegisterMutation } from '../services/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import { registerSchema } from '../validations/registerSchema'

const Register = ({navigation}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [errorEmail,setErrorEmail] = useState("")
    const [errorPassword,setErrorPassword] = useState("")
    const [errorConfirmPassword,setErrorConfirmPassword] = useState("")
    const [triggerRegister,{data,isSuccess,isError,error}] = useRegisterMutation()
    const dispatch = useDispatch()

    useEffect(()=>{
      if(isError) {
        setErrorEmail("email existente")
      }
    },[isError])



    const onSubmit = async () => {
      try {
        registerSchema.validateSync({email,password,confirmPassword})
        const {data} = await triggerRegister({email,password})
        dispatch(setUser({email:data.email,
         idToken:data.idToken,
         localId:data.localId
       }))
      } catch (error) {
        switch(error.path){
          case "email":
            setErrorEmail(error.message)
            setErrorPassword("")
            setErrorConfirmPassword("")
            break
          case "password":
            setErrorEmail("")
            setErrorPassword(error.message)
            setErrorConfirmPassword("")
            break
          case "confirmPassword":
            setErrorEmail("")
            setErrorPassword("")
            setErrorConfirmPassword(error.message)
            break
            
        }
      }
    }

    return (
        <View style={styles.main}>
            <ImageBackground
                source={require('../../assets/background.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <InputForm
                        label="Email"
                        value={email}
                        onChangeText={(t) => setEmail(t)}
                        isSecure={false}
                        error={errorEmail}
                    />
                    <InputForm
                        label="Password"
                        value={password}
                        onChangeText={(t) => setPassword(t)}
                        isSecure={true}
                        error={errorPassword}
                    />
                    <InputForm
                        label="Confirmar Password"
                        value={confirmPassword}
                        onChangeText={(t) => setConfirmPassword(t)}
                        isSecure={true}
                        error={errorConfirmPassword}
                    />
                    <SubmitButton onPress={onSubmit} title="Registrarme"/>
                    <Text style={styles.sub}>Do you already have an account?</Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.subLink}>Login</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: "90%",
        backgroundColor: colors.blue2,
        gap: 15,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },
    title: {
        fontSize: 22,
        fontFamily: "Lobster"
    },
    sub: {
        fontSize: 14,
        fontFamily: "Josefin",
        color: 'white'
    },
    subLink: {
        fontSize: 14,
        fontFamily: "Josefin",
        color: "blue"
    }
})