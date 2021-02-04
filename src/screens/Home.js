import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Modal , TouchableOpacity} from 'react-native'
import { auth, db } from "../../firebase";
import { Button, ListItem } from "react-native-elements";


const Home = ({ navigation }) => {
    const [listitem, setlistitem] = useState([])
    const [modal, setmodal] = useState(false)
    const blood = ['O', 'A', 'B', 'AB']

    const [arr, setarr] = useState([])
    const [dis, setdis] = useState(false)
    const Logout = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    }
    useEffect(() => {
        db.collection("list").onSnapshot(snapshot => (
            setlistitem(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ))
        db.collection("list").onSnapshot(snapshot => (
            setarr(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ))
    }, [])

    const sort = (val) => {
        console.log(arr)
        setlistitem(arr)
        if (val == "O") {
            setlistitem((old) => {
                return old.filter((elem, id) => {
                    return (elem.data.bloodType !== "A" && elem.data.bloodType !== "B" && elem.data.bloodType !== "AB")
                })
            })
        }
        else if (val == "A") {
            setlistitem((old) => {
                return old.filter((elem, id) => {
                    return (elem.data.bloodType !== "B" && elem.data.bloodType !== "AB")
                })
            })
        }
        else if (val == "B") {
            setlistitem((old) => {
                return old.filter((elem, id) => {
                    return (elem.data.bloodType !== "AB")
                })
            })
        }
        else if (val == "AB") {
            setlistitem(arr)
        }

    }

    return (
        <>

        <View style={styles.header}>
            <Text style={{marginTop:10,fontSize:20,marginLeft:10,color:'#B22222',fontWeight:'bold'}}>Hi, <Text style={{color:'#000',textTransform:'capitalize'}}>{auth?.currentUser.displayName}</Text></Text>
            <TouchableOpacity activeOpacity={0.5}
            onPress={Logout}
            style={{borderRadius:1,borderWidth:1,
            borderColor:'#B22222',backgroundColor:'#fff',
            fontSize:18,
            width:"30%",alignItems:'center',
            height:90,
            color:'#fff' }}
            ><Text style={{fontSize:18,fontWeight:'bold',color:'#B22222',alignItems:'center',justifyContent:'center',paddingTop:10}}>Logout</Text></TouchableOpacity>
        </View>


        <ScrollView style={{ maxHeight: "85%" }}>
            {
                listitem.map((val, id) => {
                    return (
                        <ListItem key={id} bottomDivider >
                            <ListItem.Content 
                            style={{ flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                               
                                <View style={{flex:1 }}>
                                    <Text style={{ marginBottom: 5 ,fontWeight:'bold',color:'#000',fontSize:28,letterSpacing:1,textTransform:'capitalize'}}>
                                        {val.data.name} - <Text style={{fontWeight:'bold',color:'#B22222',textTransform:'uppercase'}}>{val.data.bloodType} </Text> 
                                    </Text>
                                    <View style={{flex:1}}>
                                    <Text style={{fontWeight:'600',color:'#B22222',fontSize:18}}>{val.data.number} </Text>
                                    <Text style={{ marginTop: 5 , fontSize:18 , fontWeight:'bold',color:'#000'}}>About Me: 
                                    <Text style={{fontSize:17, textTransform:'capitalize',color:"#B33333"}}> {val.data.details}</Text> 
                                    </Text>
                                    </View>
                                    </View>
                                    <View>
                                        <View style={{ flex: 1 ,paddingTop:10}}>
                                            <Text style={{fontWeight:'bold',color:'#B22222',textTransform:'lowercase',fontSize:18}} >{val.data.email}</Text>
                                        </View>
                                </View>
                                
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
        <View style={styles.btnView}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent:'space-around' }}>
                <Button  onPress={() => navigation.navigate("Blooddoner")} 
                containerStyle={styles.donor} title="Donate Blood" titleStyle={{color:'#B22222', fontSize:17,fontWeight:'bold'}} type="outline" />
                <Button  titleStyle={{color:'#B22222',fontSize:17,fontWeight:'bold'}} title="Patient's Blood Group" containerStyle={styles.donor} type="outlined" onPress={() => setmodal(true)} />
                <Modal visible={modal} animationType="slide">
                <View style={styles.modals}>
                <Text style={{fontSize:32,marginBottom:20, color:"#B22222", fontWeight:'bold',textAlign:'center'}}>Select Blood Group</Text>

                    {blood.map((val, id) => {
                        return (
                            <Button  key={id} buttonStyle={{width:'80%', backgroundColor:"#B22222"}} containerStyle={{ marginBottom: 20,marginLeft:70 }} title={val} type="solid" onPress={() => {
                                setmodal(false)
                                sort(val)
                            }} />
                        )})
                    }
                    </View>
                </Modal>
            </View>
        </View>
    </>
    )
}

export default Home

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        maxHeight: "7.5%",
        borderBottomColor:"#B22222",
        borderBottomWidth:1

    },
    modals:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    donor: {
        width: '49%',
        borderColor:'#B22222',
        borderWidth:2
        },
    btnView: {
        marginBottom: 0,
        flex: 1,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems: "center",
        maxHeight: "7.5%",
        backgroundColor:'#fff'

    }
})
