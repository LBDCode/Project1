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
var storageRef = firebase.storage().ref();

firebase.auth().onAuthStateChanged(user => {
  console.log(user);

  if (user) {

    $("#submit-image").on("click", function() {
      event.preventDefault();
      var user = firebase.auth().currentUser;
      var photoFile = $("#photo-file").get(0).files[0];
      var photoName = (+new Date()) + '-' + photoFile.name;
      var photoMetaData = {fileType: photoFile.type};

      var task = storageRef.child(photoName).put(photoFile, photoMetaData);

      task
      .then(function(snapshot) {
        return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
      })
 
      .then(function(downloadURL) {
        console.log("download link: " + downloadURL);        
        return downloadURL;
      })

      .then(function(downloadURL) {
        $("#profile-image").attr("src", downloadURL);

        user
          .updateProfile({
            photoURL: downloadURL,
          })

          .then( function() {
            console.log("set profile pic");
          })

          .catch(function(error) {
            console.log("upload failed: " + error);
          });

      })

      .catch(function(error) {
        console.log("upload failed: " + error);
      });

    });



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
      
      
     

      // console.log(user);

      // console.log(firstName, lastName, birthday, persStatement, userName);

      //update user info w/ userName and maybe picture


      user
        .updateProfile({
          displayName: userName,
        })
        .then(function() {
          var profilePic = user.photoURL;
          // Update successful.
          //create custom profile
          createProfile(firstName, lastName, birthday, userName, persStatement, profilePic);
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

function createProfile(first, last, bday, displayName, statement, imageUrl) {
  firebase
    .database()
    .ref("users/" + displayName)
    .set({
      firstName: first,
      lastName: last,
      birthday: bday,
      personalStatement: statement,
      profile_picture: imageUrl
      // Add more stuff here
    });

    





}

//function to assign sign
//how do you upload photos
