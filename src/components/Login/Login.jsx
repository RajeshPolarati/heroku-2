import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import jwt_decode from 'jwt-decode'
// firebase.initializeApp({
//   apiKey: "AIzaSyCnkO4-gpMTIg6rUFkDfvqokuvznREw9K8",
//   authDomain: "mida-dev.firebaseapp.com",
//   projectId: "mida-dev",
//   storageBucket: "mida-dev.appspot.com",
//   messagingSenderId: "91257017872",
//   appId: "1:91257017872:web:e9e13dda19e7fc34849c95",
//   measurementId: "G-FE1DMVEFJV"
// });
// const auth = firebase.auth();

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   auth.onAuthStateChanged((person) => {
  //     console.log(person?.email);
  //     setTimeout(() => {
  //       auth.signOut()
  //     }, 5000);
  //     if (person?.email) {
  //       if(person?.email === 'rajeshpolarati@gmail.com'){
  //         navigate("/Scan")
  //       }
  //       if(person?.email === 'rajesh.p@westagilelabs.com'){
  //         navigate("/createDiscount")
  //       }
  //     } else {
  //       console.log(person);
  //       navigate('/')
  //     }
  //   });
  // },[]);
  // const signIn = async () => {
  //   try {
  //     await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  function handleCallback(response){
    console.log(response.credential);
    const user = jwt_decode(response.credential)
    console.log(user);
    if(user?.email === 'rajeshpolarati@gmail.com'){
              navigate("/Scan")
    }
            if(user?.email === 'rajesh.p@westagilelabs.com'){
              navigate("/createDiscount")
            }
  }
  useEffect(()=>{
    /* global google */
    console.log("calling");
    google.accounts.id.initialize({
      client_id:"91257017872-gnbq0pbl5m0kskudaqtpb2c34kgjdo60.apps.googleusercontent.com",
      callback:handleCallback
    })
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    // google.accounts.id.prompt(); // also
  },[window.onload])
  return (
    <div className="login">
      <div className="logo">Logo</div>
      <div className="login-text">Login as Merchant</div>
      {/* <button onClick={signIn}>sign in</button> */}
      <div id="buttonDiv" style={{marginTop:'20px'}}></div>

    </div>
  );
};
export default Login;
