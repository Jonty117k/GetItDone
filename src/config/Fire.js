import firebase from 'firebase'
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAyLFvxZ805zkt5y1HjKJQYelDPZ3NENoM",
    authDomain: "chord-runner-1.firebaseapp.com",
    databaseURL: "https://chord-runner-1.firebaseio.com",
    projectId: "chord-runner-1",
    storageBucket: "chord-runner-1.appspot.com",
    messagingSenderId: "806055726070"
  };
var fire = firebase.initializeApp(config);
export default fire;