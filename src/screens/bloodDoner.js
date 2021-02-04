import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native'
import { Input, Button } from "react-native-elements";
import { color } from 'react-native-reanimated';
import { db } from "../../firebase";

const Donor = ({navigation}) => {
    const [name, setname] = useState("");
    const [number, setnumber] = useState()
    const [bloodType, setbloodType] = useState()
    const [email, setemail] = useState()
    const [details, setdetails] = useState()
    const [modal, setmodal] = useState(false)
    const blood = ['A', 'O', 'AB', 'B']

    const submit = async ()=>{
        await db
        .collection("list")
        .add({
            name,
            number,
            bloodType,
            email,
            details,
        })
        .then(()=>{
            navigation.goBack();
          alert("Data Saved!")
        })
        .catch(error=>alert(error))
    };

    return (
        <><View style={{flex:1,justifyContent:'center' ,backgroundColor:'#fff'}}>
            <Text style={{color:'#B22222',fontSize:48,fontWeight:'bold',textAlign:'center',marginTop:20}}>Thanks For Your Donation</Text>
            <View style={styles.view1}>
                <Input labelStyle={{color:'#B22222'}}  label="Name" containerStyle={styles.inpField} placeholder="Tulaib" value={name} type="text" autoFocus onChangeText={(val) => setname(val)} />
                <Input labelStyle={{color:'#B22222'}}  label="Phone" containerStyle={styles.inpField} placeholder="0300200002" value={number} type="number" onChangeText={(val) => setnumber(val)} />
                <Input labelStyle={{color:'#B22222'}}  label="Email" containerStyle={styles.inpField1} placeholder="tulaib@gmail.com" type="email" value={email} onChangeText={(val) => setemail(val)} />
                <Input labelStyle={{color:'#B22222'}}  label="About You" containerStyle={styles.inpField1} placeholder="I'm a Hygenic person, My Blood is Pure
                " 
                type="text" value={details} onChangeText={(val) => setdetails(val)} />

                <Button  containerStyle={{marginTop:10,width:'50%'}} title="Your Blood Group " buttonStyle={{color:'#B22222',borderColor:'#B22222',borderWidth:1 }} titleStyle={{color:'#B22222'}} type="outline" onPress={() => setmodal(true)} />
                <Button containerStyle={{marginTop:10,width:'50%'}} buttonStyle={{backgroundColor:'#B22222'}} title="Save" type="solid" onPress={submit} />
            </View>
            <View style={{flex:1,alignItems:"center"}}>
           
                <Modal visible={modal} animationType="slide" >
                    
                    <View style={styles.modals}>
                    <Text style={{fontSize:32,marginBottom:20, color:"#B22222", fontWeight:'bold',marginLeft:-10}}>Select Blood Group</Text>
                    {
                        blood.map((val, id) => {
                            return (
                                <Button titleStyle={{textAlign:'center'}} buttonStyle={{width:'80%', backgroundColor:"#B22222"}} style={{alignContent:'center'}} key={id} containerStyle={{ marginBottom: 20 }} title={val} type="solid" onPress={() => {
                                    alert(`Blood Group ${val} Selected`)
                                    setbloodType(val)
                                    setmodal(false)
                                }} />
                            
                            )
                        })
                    }
                    </View>
                </Modal>
            </View>
            </View>
        </>
    )
}

export default Donor

const styles = StyleSheet.create({
    inpField: {
        width: "90%"
    },
    modals:{
        flex:1,
        justifyContent:'center',
        // alignItems:'center',
        paddingLeft:70,
        // alignContent:'center',
        backgroundColor:'#fff'
    },
    view1: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        maxHeight:70,

    },
    btn: {
        marginBottom: 10,
    },
    inpField1:{
        width:"90%",
    }
})
