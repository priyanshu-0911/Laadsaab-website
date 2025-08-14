// ======================= Firebase Initialization =======================

// Your web app's Firebase configuration
// IMPORTANT: Make sure these keys are correct
const firebaseConfig = {
  apiKey: "AIzaSyCl_X2bX_Ae3O287SSnNoqM1kQ70kbSz4o",
  authDomain: "gk696969.firebaseapp.com",
  projectId: "gk696969",
  storageBucket: "gk696969.appspot.com", // Corrected storageBucket name
  messagingSenderId: "748077453419",
  appId: "1:748077453419:web:75097c32604f9d8e5ae12e",
  measurementId: "G-ENG3FS96YE"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication
const auth = firebase.auth();
// Create a Google Auth provider
const googleProvider = new firebase.auth.GoogleAuthProvider();