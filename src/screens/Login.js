// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// function Login(){
//     return (
//         <View style={styles.container}>
//             <Text style={{fontSize:42,fontWeight:'bold'}}>I'm Login</Text>
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         backgroundColor:"#fff",
//         alignItems:'center',
//         justifyContent:'center'
//     }
// })
// export default Login;
import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import {auth} from "../../firebase";


const Login = ({navigation}) => {

    
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");


    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser) =>{
            if(authUser){
                navigation.replace("Home")
            }
        });
        return unsubscribe;
    },[])

    const signIn = () =>{
        auth
        .signInWithEmailAndPassword(email,password)
        .catch((error)=> alert(error))
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={{ color: '#B22222' , fontSize:42, fontWeight:'bold',marginTop:20 }}>BLOOD BANK</Text>
                <Input
                placeholder='  Ahmed@gmail.com'
                style={{width:300}}
                type="email"
                value={email} autoFocus onChangeText={(val) => setemail(val)}
                containerStyle={{width:300, borderRadius:50,marginTop:50}}
                leftIcon={{ type: 'font-awesome', name: 'user',color:'#B22222' }}/>
                 <Input
                placeholder='  Password'
                style={{width:300}}
                type="password" value={password} secureTextEntry 
                onChangeText={(val) => setpassword(val)}
                containerStyle={{width:300, borderRadius:50}}
                leftIcon={{ type: 'font-awesome', name: 'lock' ,color:'#B22222'}}/> 
                <View style={styles.btns}>
                <Button titleStyle={{color:'#B22222'}} buttonStyle={{borderColor:'red',color:'red'}} onPress={signIn} containerStyle={styles.btn} type="outline" title="LOG IN" />
                <Button buttonStyle={{color:'red',backgroundColor:'#B22222',marginLeft:5}} onPress={()=> navigation.navigate("Signup")} containerStyle={{width:135}} type="solid" title="SIGN UP" />
                </View>     
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inpField:{
        width:300
    },
    btn:{
        borderColor:'red',
        color:'red',
        width:135
    },
    btns:{
        // flex:1,
        flexDirection:'row',
        justifyContent:'space-around'    
    }
});

export default Login
