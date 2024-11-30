const firebaseConfig = {
    apiKey: "AIzaSyB87k1W0LUz3Uq5SlaIPDM-8p3UTODKpKk",
    authDomain: "accodal-firebase-server.firebaseapp.com",
    projectId: "accodal-firebase-server",
    storageBucket: "accodal-firebase-server.firebasestorage.app",
    messagingSenderId: "805247179068",
    appId: "1:805247179068:web:b7691b40dce41c15a86639"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();