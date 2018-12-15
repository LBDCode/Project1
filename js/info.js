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
  console.log(user);

  if (user) {
    var user = firebase.auth().currentUser;
    console.log(user);

    var displayName = firebase.auth().currentUser.displayName;

    $("#info-user-name").text(displayName);

    return firebase
      .database()
      .ref("/users/" + displayName)
      .once("value")
      .then(function(snapshot) {
        var firstName = snapshot.val().firstName;
        var lastName = snapshot.val().lastName;
        var birthday = snapshot.val().birthday;
        var persStatment = snapshot.val().personalStatement;
        var userPic = snapshot.val().profile_picture;

        $("#info-picture").attr("src", userPic);
        $("#info-first-name").text(firstName);
        $("#info-last-name").text(lastName);
        $("#info-birthday").text(birthday);
        $("#info-personal-statement").text(persStatment);
      });
  } else {
    console.log("Signed out");
    window.location = "index.html";
  }  

});

$(".logout-button").on("click", event => {
  firebase.auth().signOut();
  window.location = "index.html";
});

$(".results-button").on("click", event => {
  window.location = "results.html";
});
