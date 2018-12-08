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
    $("#submit-user").on("click", function() {
      event.preventDefault();
      //will need an in statement to check if userName already exists?
      //check if 21
      var firstName = $("#first-name")
        .val()
        .trim();
      var lastName = $("#last-name")
        .val()
        .trim();
      var birthday = $("#birthday")
        .val()
        .trim();
      var persStatement = $("#personal-statement")
        .val()
        .trim();
      var userName = $("#user-name")
        .val()
        .trim();
      var user = firebase.auth().currentUser;

      console.log(user);

      console.log(firstName, lastName, birthday, persStatement, userName);

      //update user info w/ userName and maybe picture

      user
        .updateProfile({
          displayName: userName
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(function() {
          // Update successful.
          //create custom profile
          createProfile(firstName, lastName, birthday, userName, persStatement);
          //redirect to results page
          window.location = "results.html";
        })
        .catch(function(error) {
          // An error happened.
          console.log("Err: " + error);
        });
    });
  } else {
    // console.log("Signed out");
    // window.location = "login.html";
  }
});

function createProfile(first, last, bday, displayName, statement) {
  firebase
    .database()
    .ref("users/" + displayName)
    .set({
      firstName: first,
      lastName: last,
      birthday: bday,
      personalStatement: statement
      // profile_picture : imageUrl,
      // Add more stuff here
    });
}

//function to assign sign
//how do you upload photos
