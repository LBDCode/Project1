var config = {
    apiKey: "AIzaSyBScGiSeR7W0ZUytnqnnze45isXpj6yBv0",
    authDomain: "beerstrology.firebaseapp.com",
    databaseURL: "https://beerstrology.firebaseio.com",
    projectId: "beerstrology",
    storageBucket: "beerstrology.appspot.com",
    messagingSenderId: "309263077148"
  };
  
firebase.initializeApp(config);

var database = firebase.database();


firebase.auth().onAuthStateChanged(user => {

    if(user) {

        var user = firebase.auth().currentUser;
        console.log(user);

        var displayName = firebase.auth().currentUser.displayName;

        $("#response-user-name").text(displayName);

        $("#signout-user").on("click", event => {

            firebase.auth().signOut();
            //put a redirect to signout page here
                
        });
        
    } else{
        console.log("Signed out");
        window.location = "login.html";
    }


    

});