// Array listing word options.
var words = ['legacy', 'arcade', 'outlands', 'game', 'arena', 'quorra', 'flynn', 'clu'];
// Variables to hold number of wins and losses.
var wins = 0;
var losses = 0;
// Varibale holding number of guesses remaining.
var guessesRemaining = 10;
// Variable holding guessed letters.
var alreadyGuessed = [];
//Choose random word for player to guess from array!
var randomWord = words[Math.floor(Math.random() * words.length)];

function play_single_sound() {
    document.getElementById('audiotag1').play();
}

// eval(randomWord).getMusic();
// Displays _ for all letters in word and gives them id by index
function displayWord() {

    for (var i = 0; i < randomWord.length; i++) {

        var ul = document.getElementById("word");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode("_"));
        li.setAttribute("id", ("letter" + i));
        ul.appendChild(li);

    }
}

//END DISPLAY WORD FUNCTION

// Displays new word
function newWord() {
    document.getElementById("word").innerHTML = "";
    displayWord();
    document.getElementById("listedLetters").innerHTML = "<li id='guess'> </li>";
}

displayWord();

// Starts game
function startGame() {

    document.onkeyup = function (event) {

        // Determines which key was pressed.
        var userGuess = event.key;

        // ADDS KEY PRESSED TO LIST AND DISPLAYS TO GUESSED LETTERS 
        function typedLetters() {
            var liList = document.getElementById("listedLetters").getElementsByTagName("li");

            var count = liList.length
            var countLoops = 0;

            for (i = 0; i < count; i++) {
                countLoops++;
                if (document.getElementById("guessedLetter" + i) !== null) {
                    var getItem = document.getElementById("guessedLetter" + i).innerHTML;
                    if (getItem === userGuess) {
                        countLoops--;
                    }
                }
                else if (countLoops === count) {

                    var ul = document.getElementById("listedLetters");
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(userGuess));
                    li.setAttribute("id", ("guessedLetter" + i))
                    ul.appendChild(li);
                }
            }
        }
        //************* END FOR LOOP **************************REGEX ABOVE

        //USING REGEX TO MAKE SURE THAT typedLetters() DOESN'T LOG NON REGULAR AND LOWERCASE LETTERS
        var pat = /^[a-z]+$/;
        if (pat.test(userGuess)) {
            typedLetters();
        }

        //Function that takes a string parameter and sees if userGuess is in that string
        function checkList(word) {

            var wrongCounter = 0;
            //FOR LOOP TO ITERATE THROUGH WORD AND CHECK IF LETTER IS THE LETTER THAT THE USER TYPED ----------------------
            for (i = 0; i < word.length; i++) {

                if (word[i] === userGuess) {

                    //Changes _ to correct letter(s) guessed
                    for (i = 0; i < word.length; i++) {
                        if (word[i] === userGuess) {
                            var li = document.getElementById(("letter" + i)).innerHTML = word[i];
                        }

                    }

                    //CHECK IF PLAYER WON STARTS HERE
                    var saveWord = "";

                    //for loop to check player's progress on word
                    for (var i = 0; i < randomWord.length; ++i) {
                        var letter = document.getElementById(("letter" + i)).innerHTML;
                        var saveWord = saveWord.concat(letter);
                    }

                    //checks if player already won
                    if (saveWord === word) {
                        var youWin = "YOU WON THIS GAME! Press Enter to play again!"
                        document.querySelector("#game").innerHTML = youWin;
                        wins++;

                        //UPDATES WIN AND LOSS COUNTER
                        guessesRemaining = 10;
                        var winCounter = "Wins: " + wins + "<br />" +
                            "Losses: " + losses + "<br />" +
                            "Guesses Remaining: " + guessesRemaining;
                        document.querySelector("#winsAndLosses").innerHTML = winCounter;
                        //****** 
                        var gameover = "YOU WON THE GAME! PRESS ENTER TO PLAY AGAIN!";
                        document.querySelector("#game").innerHTML = gameover;
                        eval(randomWord).getImage();

                        alreadyGuessed = [];

                        //IF USER PRESS ENTER AFTER WINNING
                        document.onkeyup = function (event) {
                            if (event.which == 13 || event.keyCode == 13) {
                                restartGame();
                                startGame();
                            }
                        }
                    }
                    //CHECK IF PLAYER WON ENDS HERE

                }
                else {
                    wrongCounter++;
                }

                if (wrongCounter === word.length) {

                    //FOR LOOP TEST TO CHECK ARRAY FOR ALREADY GUESSED 

                    // Decrement 'Guesses Remaining' if guess is wrong.
                    var pat = /^[a-z]+$/;
                    if (pat.test(userGuess)) {

                        if (alreadyGuessed.indexOf(userGuess) === -1) {
                            guessesRemaining--;
                            alreadyGuessed.push(userGuess);
                        }
                    }

                    // Updates 'Wins' and 'Losses' counters.
                    var guessCounter = "Wins: " + wins + "<br />" +
                        "Losses: " + losses + "<br />" +
                        "Guesses Remaining: " + guessesRemaining;
                    document.querySelector("#winsAndLosses").innerHTML = guessCounter;
                    //**** 
                    var gameWrong = "Your guess is incorrect. You have " + guessesRemaining + " guesses remaing!";
                    document.querySelector("#game").innerHTML = gameWrong;
                    if (guessesRemaining === 0) {
                        var gameover = "Game Over! Try Again. Press Enter to play again!";
                        document.querySelector("#game").innerHTML = gameover;
                        losses++;
                        //UPDATES WIN AND LOSS COUNTER
                        guessesRemaining = 10;
                        var lossCounter = "Wins: " + wins + "<br />" +
                            "Losses: " + losses + "<br />" +
                            "Guesses Remaining: " + guessesRemaining;
                        document.querySelector("#winsAndLosses").innerHTML = lossCounter;

                        //PLAYER CAN PRESS ENTER TO PLAY AGAIN!
                        alreadyGuessed = [];
                        document.onkeyup = function (event) {
                            if (event.which == 13 || event.keyCode == 13) {
                                restartGame();
                                startGame();

                            }
                        }

                    }
                }
            }
        }


        checkList(randomWord);

        //Function to restart the game! 
        function restartGame() {
            randomWord = words[Math.floor(Math.random() * words.length)];
            eval(randomWord).getMusic();
            guessesRemaining = 10;
            newWord();
            document.getElementById("listedLetters").innerHTML = "<li id='guess'> </li>";
            var gameStart = "Type any letter to make a guess!";
            document.querySelector("#game").innerHTML = gameStart;
        }

        //END OF DOCUMENT ON KEY UP EVENT
    }

}

startGame();

