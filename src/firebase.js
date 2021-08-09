import firebase from "firebase";

//Create firebase account and get the values
const firebaseConfig = {
  apiKey: API_Key,
  authDomain: Auth_Domain,
  projectId: Project_ID,
  storageBucket: Storage_Bucket,
  messagingSenderId: ID,
  appId: App_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;
