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
  event.preventDefault();
  var email = $("#email")
    .val()
    .trim();
  var password = $("#password")
    .val()
    .trim();

  var loginPromise = firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  loginPromise.catch(event => $("#welcomeMsg").text(event.message));

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      window.location = "results.html";
    } else {
      console.log(user);
    }
  });
});

$("#signup-user").on("click", event => {
  event.preventDefault();
  var email = $("#email")
    .val()
    .trim();
  var password = $("#password").val();

  var signupPromise = firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  signupPromise.catch(event => $("#welcomeMsg").text(event.message));
  //redirect to profile creation page
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      window.location = "profile.html";
    } else {
      console.log(user);
    }
  });
});

$("#signout-user").on("click", event => {
  firebase.auth().signOut();
  $("#welcomeMsg").text("Thanks for using Beerstrology!  You're signed out.");
});
