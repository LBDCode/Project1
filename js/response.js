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
        var birthday = snapshot.val().birthday;

        $("#response-user-name").text(displayName);

        $("#signout-user").on("click", event => {
          firebase.auth().signOut();
          //put a redirect to signout page here
        });

        // array to match signs with specific beers
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

        //zodiac sign array
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

        var signFound = "";
        console.log(birthday);

        var dates = birthday.split("-");
        birthday = dates[1] + "/" + dates[2] + "/2018";

        Object.keys(zodiacSigns).forEach(function(zodiacKey) {
          var zodiac = zodiacSigns[zodiacKey];

          var isBetween = moment(birthday).isBetween(zodiac.start, zodiac.end);
          var isSame =
            moment(birthday).isSame(zodiac.start) ||
            moment(birthday).isSame(zodiac.end);

          if (isBetween || isSame) {
            signFound = zodiacKey;
          }
          console.log(signFound);
        });
      });

    //age validation
    //moment().subtract(21, "years") > moment(birthday);

    //calls beer api
    function beerAPI() {
      var apiKey = "?key=efb2f54c9ecd8ab0ff99ca273567c56c";
      var beerName = "page=1&per_page=80";
      var queryURL = "https://api.punkapi.com/v2/beers?";

      queryURL = queryURL + apiKey + beerName;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        for (var i = 0; i < 80; i++) {
          var name = response[i].name;
          var description = response[i].description;
          var newBeer = {
            name: name,
            description: description
          };
          //beerArray.push(newBeer);
          $("#beerList").append(name + ": " + description + "<br><br>");
        }
        //console.log(beerArray);
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
        console.log(predictionDate);
        predictionDate =
          predictionDate[1] + "-" + predictionDate[0] + "-" + predictionDate[2];
        console.log(predictionDate);
        $("#prediction").before(predictionDate);

        var predictionText = JSON.stringify(resp.prediction.emotions);
        predictionText += JSON.stringify(resp.prediction.health);
        predictionText += JSON.stringify(resp.prediction.luck);
        predictionText += JSON.stringify(resp.prediction.personal_life);
        predictionText += JSON.stringify(resp.prediction.profession);
        predictionText += JSON.stringify(resp.prediction.travel);
        $("#prediction").text(predictionText);

        //var predictionDate = JSON.val(resp.prediction_date);
        console.log(resp.prediction_date);

        console.log(resp);
      });
    }

    function getRandomBeer(userSign) {
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

    function updateUI(beerResponse) {
      beerMatches.foreach();
    }

    // beerAPI();
    horoscopeAPI(signFound);
    getRandomBeer(birthday);
  } else {
    console.log("Signed out");
    window.location = "response.html";
  }
});
