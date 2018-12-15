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
      var photoName = +new Date() + "-" + photoFile.name;
      var photoMetaData = { fileType: photoFile.type };

      var task = storageRef.child(photoName).put(photoFile, photoMetaData);

      task
        .then(function(snapshot) {
          return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
        })

        .then(function(downloadURL) {
          console.log("download link: " + downloadURL);
          return downloadURL;
        })

        .then(function(downloadURL) {
          $("#profile-image").attr("src", downloadURL);

          user
            .updateProfile({
              photoURL: downloadURL
            })

            .then(function() {
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
      
      // age validation
      // moment().subtract(21, "years") > moment(birthday);
      
      // update auth userProfile w/ user name, and run create profile function
      user
        .updateProfile({
          displayName: userName
        })
        .then(function() {
          var profilePic = user.photoURL;
          createProfile(
            firstName,
            lastName,
            birthday,
            userName,
            persStatement,
            profilePic
          );
          //redirect to results page
          window.location = "results.html";
        })

        .catch(function(error) {
          console.log("Err: " + error);
        });
    });
  } else {
    window.location = "index.html";
  }
});

function createProfile(first, last, bday, displayName, statement, imageUrl) {
  
  var signFound = "";

  //assign the user's zodiac sign based on bday
  function assignZodiac(bday) {

    var zodiacSigns = {
      aries: {
        start: "03/21/2018",
        end: "04/19/2018"
      },
      taurus: {
        start: "04/20/2018",
        end: "05/20/2018"
      },
      gemini: {
        start: "05/21/2018",
        end: "06/20/2018"
      },
      cancer: {
        start: "06/21/2018",
        end: "07/22/2018"
      },
      leo: {
        start: "07/23/2018",
        end: "08/22/2018"
      },
      virgo: {
        start: "08/23/2018",
        end: "09/22/2018"
      },
      libra: {
        start: "09/23/2018",
        end: "10/22/2018"
      },
      scorpio: {
        start: "10/23/2018",
        end: "11/21/2018"
      },
      sagittarius: {
        start: "11/22/2018",
        end: "12/21/2018"
      },
      capricorn: {
        start: "12/22/2018",
        end: "01/19/2019"
      },
      aquarius: {
        start: "01/20/2018",
        end: "02/18/2018"
      },
      pisces: {
        start: "02/19/2018",
        end: "03/20/2018"
      }
    };

    var dates = bday.split("-");
    bday = dates[1] + "/" + dates[2] + "/2018";

    Object.keys(zodiacSigns).forEach(function(zodiacKey) {
      var zodiac = zodiacSigns[zodiacKey];

      var isBetween = moment(bday).isBetween(zodiac.start, zodiac.end);
      var isSame =
        moment(bday).isSame(zodiac.start) ||
        moment(bday).isSame(zodiac.end);

      if (isBetween || isSame) {
        signFound = zodiacKey;
      }     
    });
    
  };

  //run aZ function to update bday signFound var
  assignZodiac(bday);

  //new object in firebase for that user w/ all their info
  firebase
  .database()
  .ref("users/" + displayName)
  .set({
    firstName: first,
    lastName: last,
    birthday: bday,
    personalStatement: statement,
    sign: signFound,
    profile_picture: imageUrl
  });
};

