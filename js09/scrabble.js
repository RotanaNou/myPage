/*  Name: Rotana Nou
    Contact: Rotana_Nou@student.uml.edu
    Assignment 9: Creating a scrabble game.
    Course: 91.461 GUI Programming I
    Copyright@2016 by Rotana Nou
    Description: Implement a bit of the game of scrabble using drag and drop.
    To give additional knowledge with JQuery UI library.
    File Name: scrabble.js
    Date: 12/06/16
    References: http://christianeverett.github.io/91.461/public_html/Scrabble.html by Christian Everett
    http://weblab.cs.uml.edu/~rmeza/scrabble/ by Ramon Meza
    https://jquery.com
    https://w3schools.com
    https://piazza.com/class/isglehm177n60h?cid=61
*/
/* https://d1b10bmlvqabco.cloudfront.net/attach/isglehm177n60h/isglewt8cgh2bz/iw3u3rymm4fi/Scrabble_Pieces_AssociativeArray_Jesse.js */
/* create array to hold letters and values of each letters */
var ScrabbleTiles = [
    {"letter":"A", "value":1, "amount":9},
    {"letter":"B", "value":3, "amount":2},
    {"letter":"C", "value":3, "amount":2},
    {"letter":"D", "value":2, "amount":4},
    {"letter":"E", "value":1, "amount":12},
    {"letter":"F", "value":4, "amount":2},
    {"letter":"G", "value":2, "amount":3},
    {"letter":"H", "value":4, "amount":2},
    {"letter":"I", "value":1, "amount":9},
    {"letter":"J", "value":8, "amount":1},
    {"letter":"K", "value":5, "amount":1},
    {"letter":"L", "value":1, "amount":4},
    {"letter":"M", "value":3, "amount":2},
    {"letter":"N", "value":1, "amount":5},
    {"letter":"O", "value":1, "amount":8},
    {"letter":"P", "value":3, "amount":2},
    {"letter":"Q", "value":10, "amount":1},
    {"letter":"R", "value":1, "amount":6},
    {"letter":"S", "value":1, "amount":4},
    {"letter":"T", "value":1, "amount":6},
    {"letter":"U", "value":1, "amount":4},
    {"letter":"V", "value":4, "amount":2},
    {"letter":"W", "value":4, "amount":2},
    {"letter":"X", "value":8, "amount":1},
    {"letter":"Y", "value":4, "amount":2},
    {"letter":"Z", "value":10, "amount":1}
]
/*Global variable to hold array tiles board for word tracking*/
var word = new Array(8);
/*updateScore function*/
/*Responsible for updateing the player score depending on the words and rack score*/
function updateScore(word) {
    //variable fields
    var pointTotal = 0;
    var addScore = 0;
    var doubleBonus = 0;
    var i;
    var j;
    //loop through arry object
    for ( i = 0; i < word.length; i++) {
        //search for letter in the tiles
        for ( j = 0; j < ScrabbleTiles.length; j++) {
            //checking if the letters are there
            if (word[i] != "" && (word[i] == ScrabbleTiles[j].letter)) {
                //for bonus square of double
                if (i == 2) {
                    //add score
                    addScore = ScrabbleTiles[j].value * 2;
                    pointTotal += addScore;
                    //check if i is equal to 5
                }if (i == 5) {
                    doubleBonus++;
                    addScore = ScrabbleTiles[j].value;
                    pointTotal += addScore;
                }if(i!=2 && i!=5) {
                    pointTotal += ScrabbleTiles[j].value
                }
            }
        }
    }
    //checking if double bounus square is not 0 then time by 2
    if(doubleBonus!=0) {
        pointTotal = pointTotal * 2;
    }
    //update in currentPoint div
    document.getElementById('currentPoint').innerHTML = pointTotal.toString();
}
/*Some global variables*/
var tileLetter = 0;
var cntBlock = 0;
/*allowDrop function*/
/*Responsible for droppable tiles and on the rack back*/
function allowDrop(){
    //let the tile be dropped able
    $("#usrTile").droppable({ accept: '.rack_blocks', out:Letters});
    function Letters(event, ui){
        tileLetter--;
    }
    //this part is responsible for the letters that are draggable and clcik on the board. It can bring back to the rack area
    $( ".rack_blocks" ).draggable({ snap: ".board_blocks", snapMode: "inner", revert: 'invalid'/*, drag:reset*/ });
    //for this function is to make array spot empty when tile is on
    function Drag (event, ui) {
        if(ui.draggable.attr("id") == word[$(this).attr("id")]) {
            //get rid of tiles
            word[$(this).attr("id")] = "";
            cntBlock--;
            wordUpdate(word); //update word
        }
    }
    //drag and drop the rack onto blocks
    $(".board_blocks").droppable({ accept: '.rack_blocks', drop: Drop, out:Drag });
    //this function get executed when tile drop
    function Drop(event, ui){
        var letter;
        //get id and assign to letter object
        letter =  ui.draggable.prop('id');
        //get id and assign to item
        var item;
        item =  $(this).attr("id");
        //convert to int
        var number;
        number = parseInt(item);
        //checking for space on the target board for user error accidently
        if(typeof word[number-1] === 'undefined' && typeof word[number+1] === 'undefined' && cntBlock!= 0) {
            document.getElementById('chkDict').innerHTML = "Please No Space in between target block.";
        }else{
            cntBlock++;
            word[number] = letter;
            wordUpdate(word);
        }
    }
}
/*global variable*/
/*handle the total point*/
var totalPoint = 0;
/*pageReload is responsible for new game. relaod new tiles new board new scores*/
function pageReload(){
    resetBoard();
    document.getElementById('usrTotal').innerHTML = "";
    totalPoint = 0;
}
/*images global variable*/
var images = "";
/*randomTile function*/
/*responsible for pick random tile to the board*/
function randomTile()
{
    //declare some variables
    var letter;
    var setRan;
    var addLetter  = 7 - tileLetter;
    var i;
    //loop through the tiles (addletter)
    for( i = 0; i < addLetter; i++) {
        //set random number from 1 to 25
        setRan = Math.floor((Math.random() * 25));
        letter = ScrabbleTiles[setRan].letter;
        console.log(setRan);
        //uploading the images in usrTile
        $("#usrTile").append(" <img id=\""+ letter + "\" class=\"rack_blocks\" src=\"images/" + letter + ".jpg\">")
        tileLetter++;
    }
    blockWord();
    console.log(images);
    allowDrop();
}
/*This function is for locking word*/
function blockWord(){
    //crate var to hold empty string.
    var object ="";
    var i;
    //loop through word
    for( i = 0; i <= word.length; i++) {
        //check if there is nothing in the word slot
        if(typeof word[i] === 'undefined') {
        }else{
            $("#" + word[i]).draggable( 'disable' )
        }
    }
}
//search for words and update the word on the board
function wordUpdate(dragBlock){
    var currentword = "";
    var i;
    for( i=0; i<dragBlock.length; i++){
        if(typeof dragBlock[i] === 'undefined') {
        }else{
            currentword+=dragBlock[i];
        }
    }
    if(currentword) {
        document.getElementById('chkDict').innerHTML = currentword;
        updateScore(word);
        wordCheck();
    }
}
// The dictionary lookup object
var dict = {};
// Do a jQuery Ajax request for the text dictionary
$.get( "dictionary/dict.txt", function( txt ) {
    // Get an array of all the words
    var words = txt.split( "\n" );
    var i;
    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( i = 0; i < words.length; i++ ) {
        dict[ words[i] ] = true;
    }
});
// Modified to only pass in one word, which can then be verified.
function findWord( word ) {
    // See if it's in the dictionary
    if ( dict[ word ] ) {
        // If it is, return that word
        return word;
    }
    // Otherwise, it isn't in the dictionary.
    return "_____";
}
//checking words and output for valid or invalid info to player.
function wordCheck(){
    findWord();
    var submittedWord = document.getElementById('chkDict').innerHTML;
    submittedWord = submittedWord.toLowerCase();
    if ( dict[submittedWord] ) {
        document.getElementById('chkDict').innerHTML = "Check Word: VALID";
    }else{
        document.getElementById('chkDict').innerHTML = "Check Word: INVALID" + " " + " ' " + submittedWord + "'";
    }
}
/*resetBoard function*/
/*Responsible for reset the tiles, board, scores, and reset after submit button is pressed*/
function resetBoard()
{
    //declare some variable
    var letter;
    var setRan;
    var addLetter  = 7;
    var emptyStr ="";
    var i;
    tileLetter = 7;
    //loop through the word
    for( i =0; i<word.length;i++)
    {
        word[i]="";
    }
    //add another seven tiles to the rack
    for( i = 0; i < 7; i++)
    {
        //randomly choosen from 1 to 25
        setRan = Math.floor((Math.random() * 25));
        letter = ScrabbleTiles[setRan].letter;
        console.log(setRan);
        //uploading images of the tiles to usrTile div
        emptyStr = emptyStr + (" <img id=\""+ letter + "\" class=\"rack_blocks\" src=\"images/" + letter + ".jpg\">");
    }
    console.log(images);
    //set usrTile empty
    document.getElementById('usrTile').innerHTML = emptyStr;
    allowDrop();
    //set currentPoint empty
    document.getElementById('currentPoint').innerHTML = " ";
    //set chkDict empty
    document.getElementById('chkDict').innerHTML = " ";
}
/*reloadTiles function*/
function reloadTiles()
{
    //checking if it says valid then
    if(document.getElementById('chkDict').innerHTML === "Check Word: VALID")
    {
        //add to the totalpoint
        totalPoint += parseInt(document.getElementById('currentPoint').innerHTML);
        //update the totalpoint
        document.getElementById('usrTotal').innerHTML = "Total Score: " + totalPoint;
        resetBoard();
    }else{ // otherwise cannot add it.
        alert("Can not submit with EMPTY/INVALID word.");
    }
}
