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
        var sign = snapshot.val().sign;

        $("#response-user-name").text(displayName);

        horoscopeAPI(sign);
        // getRandomBeer(sign);
        beerAPI("1");



        // $("#signout-user").on("click", event => {
        //   firebase.auth().signOut();
          //put a redirect to signout page here
        // });

        // array to match signs with specific beers
 

      });

    //calls beer api
    function beerAPI(id) {
      // var apiKey = "?key=efb2f54c9ecd8ab0ff99ca273567c56c/ids=";
      var beerID = id;
      var queryURL = "https://api.punkapi.com/v2/beers/";

      queryURL = queryURL + beerID;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response)
        // for (var i = 0; i < 80; i++) {
        //   var name = response[i].name;
        //   var description = response[i].description;
        //   var newBeer = {
        //     name: name,
        //     description: description
        //   };
          //beerArray.push(newBeer);
          // $("#beerList").append(name + ": " + description + "<br><br>");
        // }
 
      });
    }

    //calls horoscope api

    function horoscopeAPI(userSign) {
      var userId = "603274";
      var apiKey = "429a9b7ab74e0dca834c1032c00446b0";
      var data = { tzone: 5.5 };
      var sign = userSign;

      var request = $.ajax({
        url:
          "https://json.astrologyapi.com/v1/sun_sign_prediction/daily/" + sign,
        method: "POST",
        dataType: "json",
        headers: {
          authorization: "Basic " + btoa(userId + ":" + apiKey)
        },
        data: JSON.stringify(data)
      });

      // calls API response - in this case horoscope predicition and prediction date
      request.then(function(resp) {
        var predictionDate = resp.prediction_date;
        predictionDate = predictionDate.split("-");
 
        predictionDate =
          predictionDate[1] + "-" + predictionDate[0] + "-" + predictionDate[2];
  
        $("#prediction").before(predictionDate);

        var predictionText = JSON.stringify(resp.prediction.emotions);
        predictionText += JSON.stringify(resp.prediction.health);
        predictionText += JSON.stringify(resp.prediction.luck);
        predictionText += JSON.stringify(resp.prediction.personal_life);
        predictionText += JSON.stringify(resp.prediction.profession);
        predictionText += JSON.stringify(resp.prediction.travel);
        predictionText = predictionText.replace(/"/g, '')
        $("#horoscope").text(predictionText);

      });
    }

    function getRandomBeer(userSign) {
      var beerMatches = {
        aries: [40, 55, 46, 45, 1],
        taurus: [14, 15, 64, 27, 1],
        gemini: [68, 29, 2, 76, 1],
        cancer: [78, 45, 14, 33, 1],
        leo: [72, 2, 52, 49, 1],
        virgo: [15, 25, 20, 21, 1],
        libra: [29, 55, 50, 10, 1],
        scorpio: [45, 58, 37, 26, 1],
        sagittarius: [72, 42, 43, 17, 1],
        capricorn: [64, 25, 57, 67, 1],
        aquarius: [40, 68, 42, 80, 1],
        pisces: [78, 58, 35, 12, 1]
      };
      var getBeerIndex = Math.floor(Math.random() * Math.floor(4));
      //var getBeer = beerMatches.userSign;
      console.log(getBeerIndex);
      //console.log(beerMatches.userSign[getBeerIndex]);
      console.log(beerMatches[userSign][getBeerIndex]);
      console.log(userSign);
      console.log(Object.keys(beerMatches)[0]);

      var returnBeer = beerMatches[userSign];
      returnBeer.forEach;
      console.log(returnBeer);
      returnBeer.splice(getBeerIndex, 1);
      console.log(returnBeer);
    }

    // function updateUI(beerResponse) {
    //   beerMatches.foreach();
    // }

    // beerAPI();

    // getRandomBeer(birthday);
  } else {
    console.log("Signed out");
    // window.location = "login.html";
  }
});
