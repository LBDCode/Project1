

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

$("#login-user").on("click", event => {
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();

    var loginPromise = firebase.auth().signInWithEmailAndPassword(email, password);    
    loginPromise.catch(event => $("#welcomeMsg").text(event.message));

    

});

// function writeUserData(userId, email, birthday) {
//     firebase.database().ref('users/' + userId).set({
//       email: email,
//       birthday: birthday
//       //some more user data
//     });
//   }



$("#signup-user").on("click", event => {
    var email = $("#email").val().trim();
    var password = $("#password").val();

    var signupPromise = firebase.auth().createUserWithEmailAndPassword(email, password);    
    signupPromise.catch(event => $("#welcomeMsg").text(event.message));
    alert("Thanks for joining Beestrology!")
});


$("#signout-user").on("click", event => {
   firebase.auth().signOut();
   $("#welcomeMsg").text("Thanks for using Beerstrology!  You're signed out.");
    
});

firebase.auth().onAuthStateChanged(user => {
    
    if(user) {
        console.log(user);
        $("#welcomeMsg").text("Welcome to Beerstrology!  You're signed in.");
        $("#signup-user").removeClass("hidden");
    } else{
        console.log("Signed out");
    }

});
