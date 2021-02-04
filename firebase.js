import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyCY6CXPeWdDaPtulHLmX0eBwCjoubkd1P0",
    authDomain: "bloodbank-b64b5.firebaseapp.com",
    databaseURL: "https://bloodbank-b64b5-default-rtdb.firebaseio.com",
    projectId: "bloodbank-b64b5",
    storageBucket: "bloodbank-b64b5.appspot.com",
    messagingSenderId: "75357882860",
    appId: "1:75357882860:web:03c5c8847bf13011c758c9",
    measurementId: "G-3DRMMRS4BH"
};

let app;
  
if(firebase.apps.length === 0){
  app=firebase.initializeApp(firebaseConfig);
}
else{
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db,auth};