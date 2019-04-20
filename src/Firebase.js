import * as firebase from 'firebase';  
const config = {  
    apiKey: "AIzaSyAgcvAlmTb95qMuzGkTju9x_Xw29JYlrtY",
    authDomain: "bhamhockey-5bb48.firebaseapp.com",
    databaseURL: "https://bhamhockey-5bb48.firebaseio.com",
    projectId: "bhamhockey-5bb48",
    storageBucket: "bhamhockey-5bb48.appspot.com",
    messagingSenderId: "683337115923"
};
export default class Firebase{
    static auth;
    static registrationInfo = {
        displayName: "",
        email: "",
        
    };

    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
    }
}
