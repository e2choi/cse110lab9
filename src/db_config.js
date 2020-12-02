var firebase = require('firebase');
var firebaseApp = firebase.initializeApp({
    // TODO: replace with your own Firebase config object
        apiKey: "AIzaSyCgYcncl5FQuwbF9XbNN4rHNPsV9PW_60k",
        authDomain: "cse110-a3437.firebaseapp.com",
        databaseURL: "https://cse110-a3437.firebaseio.com",
        projectId: "cse110-a3437",
        storageBucket: "cse110-a3437.appspot.com",
        messagingSenderId: "158422817907",
        appId: "1:158422817907:web:2e85edffbaf31983a41e06",
        measurementId: "G-FRLVJEXPMK"
})

var db = firebaseApp.database();

module.exports = db; 