import firebase from "firebase"; 

const firebaseConfig = {
    apiKey: "AIzaSyB5tp_72pFsP5kjatL4kW5qzcKbBSm2IB8",
    authDomain: "clone-999f4.firebaseapp.com",
    projectId: "clone-999f4",
    storageBucket: "clone-999f4.appspot.com",
    messagingSenderId: "901779391628",
    appId: "1:901779391628:web:9771ec3099ee8307e7a7a9",
    measurementId: "G-M2R2BVG6ZC"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db =firebaseApp.firestore();
  const auth =firebase.auth();
  
  export {db,auth};