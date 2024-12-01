/*
Programmer: Sergio Gutierrez
Date: 12/02/2018
Purpose: Project 4
*/

var selectedCol = "Blue"; //Stores the currently selected color. If none is selcted, the default is blue.
var gameTries = 1; //variable that stores the current amount of tries of the user in the game
var boxOne = ""; //Color of answer box one. Default is an empty string.
var boxTwo = ""; //Color of answer box two. Default is an empty string.
var boxThree = ""; //Color of answer box three. Default is an empty string.
var boxFour = ""; //Color of answer box four. Default is an empty string.
var letters = ["B", "G", "P", "R", "W", "Y"]; //Array that stores the first letters of all possible colors.
var gameAnswer = new Array();  //will store the Four letters that are the answer to pass the game.
var count = 0; // counter to be used in multiple functions
var count2 = 0; //Another counter to be used in multiple functions
var userAnswers = ["", "", "", ""]; //This array stores the user's four selection of colors
var tempGameAnswer = ["", "", "", ""]; //Temp array that will store the contents of the gameAnswer array.
var savedUserAnswer = new Array(); //Another array that stores the user's four selection of colors
document.cookie = "gameStatus=noLoss";
var gamEnded = 0;

if (document.images == false) { //Checking if images are supported by browser
    alert("This browser doesn't support images. \n" +
           "Page will not work properly. \n" +
            "Upgrade your browser.");
   }

function initialize() {
//This function initiliazes the game's values for the game to start

let randomNums = 0; //Variable that will hold a random numeric value
    
for (i=0; i<4; i++) { 
   randomNums = Math.floor(Math.random()*6); //gives a random numeric value from 0-5, representing all 6 possible letters.
   gameAnswer.push(letters[randomNums]); //Pushing one letter to the gameAnswer array. The For loop will push a total of 4.
}

selectedCol = "Blue"; //Holds the currently selected color. The default value will be blue.
document.forms["myForm"]["sInfo"].value = "Game restored and ready to play"; //Display starting message of the game.

  for (var i= 1; i < 21; i++){ //This will place a question mark on the 10 data and 10 clue text fields.
  document.forms["myForm"]["Data" + i].value = "?";
  document.forms["myForm"]["Clue" + i].value = "?";
  }
}

function checkanswer(){
//This function checks and processes the four color answer of the user

    var tempAnswer = boxOne.substring(0, 1) + boxTwo.substring(0, 1) + //storing current guess in temporary variable.
    boxThree.substring(0, 1) + boxFour.substring(0, 1);

    if (gameTries >= 2 && document.cookie != "gameStatus=Won" && document.cookie != "gameStatus=Lost"){
        for (i=0; i < savedUserAnswer.length; i++) { 
            if (savedUserAnswer[i] == tempAnswer){
                window.alert("You already gave that answer!");
                return;
            }
        }
    } 

    //If not all the answer boxes have a selected color, display that message
    if ( (boxOne == "") || (boxTwo == "") || (boxThree == "") || (boxFour == "")) {
       window.alert("All Answer Boxes must be filled with a Color prior to Check Answer.");
       return;
    }      

    if (document.cookie == "gameStatus=Lost"){ //If the game was already lost, display appropriate message
        showLoss();
        return;
    }

    if (document.cookie == "gameStatus=Won" || gamEnded == 1){ //If the game was already won, display the appropriate message
        youAlreadyWon();
        return;
    }
        //Store the user's 4 letter answer in the data field corresponding to the turn.
        document.forms["myForm"]["Data" + gameTries].value = tempAnswer;

        savedUserAnswer.push(tempAnswer);  //Saving the guess in an array, for future comparison

        checkGuesses();
        gameTries++; //update the number of guesses

        if (document.forms["myForm"]["Clue10"].value != "XXXX" && gameTries >= 11){
        showLoss(); //if the game went over guess 10, and user didn't win, display loss message.
        }

        return;
}


function checkGuesses() {
//This function checks whether the user is choosing or typying their inputs correctly
//Otherwise they will get alerts letting them know how to do it
    
   // alert(document.cookie);

    userAnswers[0] = boxOne.substring(0, 1);  //Storing the first letter of the name of color of the first box
    userAnswers[1] = boxTwo.substring(0, 1); //Storing the first letter of the name of color of the second box
    userAnswers[2] = boxThree.substring(0, 1); //Storing the first letter of the name of color of the third box
    userAnswers[3] = boxFour.substring(0, 1); //Storing the first letter of the name of color of the fourth box
    tempGameAnswer[0] = gameAnswer[0];  //Storing the contents of gameAnswer array into a temp array
    tempGameAnswer[1] = gameAnswer[1];
    tempGameAnswer[2] = gameAnswer[2];
    tempGameAnswer[3] = gameAnswer[3];
    count = 0;  //Variable that will store the count of X's that will be displayed in the clue fields.
    count2 = 0; //Variable that will store the number of O's that will be displayed in the clue fields.

    for (i=0; i < 4; i++) { 
        if (userAnswers[i] == tempGameAnswer[i]){ //If the user's
            tempGameAnswer[i] = "."; //For every correct answer the user guessed, replace the gameAnswer element with a period
            userAnswers[i] = "K"; //For every correct answer the user guessed, replace the user array with a K, since no colors start with that letter.
            count++; //Will keep track of the user's correct answers
          }
    }

    if (count == 4){ //If the count of correct answers is 4, displaying a game ending message
        document.cookie = "gameStatus=Won"; //Set the cookie to win
        gamEnded = 1;
        showWin(gameTries);
    }
    else{ //otherwise, display the number of turns completed
        document.forms["myForm"]["sInfo"].value = "Checked Guesses. Turn#: " + gameTries + " completed.";
    }

   // alert(userAnswers);
   // alert(tempGameAnswer);


    for (i=0; i<4; i++) { 
       for (j=0; j<4; j++) { 
         if (userAnswers[j] == tempGameAnswer[i]){
            tempGameAnswer[i] = "."; //For every correct answer the user guessed, replace the gameAnswer element with a period
            userAnswers[j] = "K";  //For every correct answer the user guessed, replace the user array with a K, since no colors start with that letter.
           count2++; //Will keep track of the partially corrected but misplaced guessed (future O's)
         }
      }
    }

    document.forms["myForm"]["Clue" + gameTries].value = "";
    for (i=0; i < count; i++) { 
    document.forms["myForm"]["Clue" + gameTries].value += "X"; //Store "X's" in the Clue field.
    }

    for (i=0; i < count2; i++) { 
        document.forms["myForm"]["Clue" + gameTries].value += "O";  //Store or append "O's" in the Clue field.
    }

    if (document.forms["myForm"]["Clue" + gameTries].value == ""){ //If we get to this point with the clue field being empty
        document.forms["myForm"]["Clue" + gameTries].value = "?"; //then store a simple question mark
    }

    //alert(count);
    //alert(count2);
 
    return;
}

function selectedcolor(col) {
//Simple function that stores the selected color in a variable
    selectedCol = col;
}

function pastecolor(num){
//Function that stores the selected color of the user in the corresponding box the user chooses.
//It also changes the source image according to the right color.

    if (num == 1){
        document.getElementById('Ans1').src = `images/${selectedCol}Rectangle.GIF` //Get updated source of the image of chosen color
        boxOne = selectedCol; //Store on the first answer box the color selected by the user
       }
      
    if (num == 2){
        document.getElementById('Ans2').src = `images/${selectedCol}Rectangle.GIF`; //Get updated source of the image of chosen color
        boxTwo = selectedCol; //Store on the second answer box the color selected by the user
       }

    if (num == 3){
        document.getElementById('Ans3').src = `images/${selectedCol}Rectangle.GIF`; //Get updated source of the image of chosen color
        boxThree = selectedCol; //Store on the third answer box the color selected by the user
       }

    if (num == 4){
        document.getElementById('Ans4').src = `images/${selectedCol}Rectangle.GIF`; //Get updated source of the image of chosen color
        boxFour = selectedCol; //Store on the fourth answer box the color selected by the user
       }
}

function youAlreadyWon(){
    //This function displays the message that the user has already won
    document.forms["myForm"]["sInfo"].value = "You already won! Must hit ReStart to start a new game!";
}

function showWin(tries) {
//This function displays a message if the user wins. The content will depend on the turn of the game ended.

    if (tries == 1){
        document.forms["myForm"]["sInfo"].value = "You won: WOW! You are lucky. Take me to Las Vegas when you go. Answer was " + gameAnswer;
       }
          
    if (tries == 2){
        document.forms["myForm"]["sInfo"].value = "You won: Excellent! You are extremely lucky. Answer was " + gameAnswer;
       }
    
    if (tries == 3){
        document.forms["myForm"]["sInfo"].value = "You won: Superior! You are very lucky. Answer was " + gameAnswer;
        }
    
    if (tries == 4){
        document.forms["myForm"]["sInfo"].value = "You won: Extremely Good! Your logic skills are great. Answer was " + gameAnswer;
        }

    if (tries == 5){
        document.forms["myForm"]["sInfo"].value = "You won: Very Good! Your logic skills are very good. Answer was " + gameAnswer;
       }
          
    if (tries == 6){
        document.forms["myForm"]["sInfo"].value = "You won: Good! Your logic skills are good. Answer was " + gameAnswer;
       }
    
    if (tries == 7){
        document.forms["myForm"]["sInfo"].value = "You won: Nicely Done! Your logic skills are developing very well. Answer was " + gameAnswer;
       }
    
    if (tries == 8){
        document.forms["myForm"]["sInfo"].value = "You won: Smile! Your logic skills are doing well. Answer was " + gameAnswer;
       }

    if (tries == 9){
        document.forms["myForm"]["sInfo"].value = "You won: Got it! Your logic skills are starting to show up. Answer was " + gameAnswer;
        }
    
    if (tries == 10){
        document.forms["myForm"]["sInfo"].value = "You won: Right! Your logic skills are adequate. Answer was " + gameAnswer;
        }   
    }

    function showLoss(){
        //This function displays a message letting the user know they already lost
        // and must press the restart button to play the game
        document.forms["myForm"]["sInfo"].value = "Game Over. Must hit ReStart to start a new game!";
        document.cookie = "gameStatus=Lost"; //Set the cookie to lost
    }

    function showhelp(){
    //This function displays a new window with the help information.    
        window.open("UserHelp.htm","my_window","width=320,height=400, scrollbars=yes");
    }

    
    function newgame() {
      //This function gives functionality to the restart button

     // Reinitiliazing game variables/arrays
     selectedCol = "Blue";
     gameTries = 1;
     gamEnded = 0;
     boxOne = "";
     boxTwo = "";
     boxThree = "";
     boxFour = "";
     count = 0;
     count2 = 0;
     gameAnswer = [];
     userAnswers = ["", "", "", ""];
     tempGameAnswer = ["", "", "", ""];
     savedUserAnswer = [];
     document.cookie = "gameStatus=noLoss";

     document.getElementById('Ans1').src = "images/QuestionRectangle.GIF"; //Putting default question mark image on answer boxes
     document.getElementById('Ans2').src = "images/QuestionRectangle.GIF";
     document.getElementById('Ans3').src = "images/QuestionRectangle.GIF";
     document.getElementById('Ans4').src = "images/QuestionRectangle.GIF";

      initialize();
    }