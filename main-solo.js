// Initialize Firebase
var config = {
  apiKey: "AIzaSyD6HEAHfcXGN-WrUxSaraO3TYNzGbAr8ts",
  authDomain: "tm-games1.firebaseapp.com",
  databaseURL: "https://tm-games1.firebaseio.com",
  projectId: "tm-games1",
  storageBucket: "tm-games1.appspot.com",
  messagingSenderId: "969120080569"
};
firebase.initializeApp(config);

// Reference Games collection
var gamesRef = firebase.database().ref("games-solo");
//get the games as an array
var r1 = firebase.database().ref('games-solo')
r1.on('value', (snap) => {
  const val = snap.val()
  const asArray = Object.keys(val)
    //.map(key => Object.assign({}, val[key], { key }))
    .map(key => val[key])
    document.getElementById("title3").innerHTML = asArray.length; //for the odometer counter
})

//listen for form SUBMIT
document.getElementById("form").addEventListener("submit", submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  //Get values
  var corporation = document.getElementById("corporation").value;
  var score = document.getElementById("corporation-score").value;
  var expansions = arrayExpansions();
  var result = document.querySelector("input[name='result']:checked").value;

  // Save Game
  saveGame(score, corporation, expansions, result);

  //Show aleart
    document.getElementById("submit").style.opacity = 0;
    setTimeout(function(){
      document.getElementById("submit").style.display = "none";
      document.querySelector(".alert").style.display = "block";
    }, 300);
  setTimeout(function(){
    document.querySelector(".alert").style.opacity = 1;
  },600);
  setTimeout(function(){
},1100);


  //clear form
  document.getElementById("form").reset();
  resetAll();

  //hide alert after 3 seconds

  setTimeout(function(){
    setTimeout(function(){
      document.querySelector(".alert").style.opacity = 0;
    },500);
    setTimeout(function(){
    document.querySelector(".alert").style.display = "none";
    document.getElementById("submit").style.display = "block";
  }, 800);
  setTimeout(function(){
  document.getElementById("submit").style.opacity = 1;
}, 1100);
}, 5000);

}

// Save Game to firebasejs
function saveGame(corporation, score, expansions, result) {
  var newGameRef = gamesRef.push();
  newGameRef.set({
    corporation: corporation,
    score: score,
    expansions: expansions,
    result: result
  })
  console.log(corporation + " " + score)
}

//getting form values

function arrayExpansions() {
  expansions = [];
  x = document.querySelectorAll('input[name="expansions"]:checked');
  for (i=0; i < x.length; i++) {
      expansions.push(x[i].value);
  }
  return expansions;
}

function resetAll () {
  //clear the selected colour
  x = document.querySelectorAll(".change-colours");
  for (i=0; i < x.length; i++) {
    x[i].classList.remove("change-colours");
  }
}
