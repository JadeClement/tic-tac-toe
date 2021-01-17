//play button
var play_button = document.getElementById("play-button")

//scores
var userScore = 0;
var compScore = 0;
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");

//cells
const cell_s1 = document.getElementById("s1");
const cell_s2 = document.getElementById("s2");
const cell_s3 = document.getElementById("s3");
const cell_s4 = document.getElementById("s4");
const cell_s5 = document.getElementById("s5");
const cell_s6 = document.getElementById("s6");
const cell_s7 = document.getElementById("s7");
const cell_s8 = document.getElementById("s8");
const cell_s9 = document.getElementById("s9");

//count moves
 let count = 0;
 let play_again_count = 0;
 let x_moves = [];
 let o_moves = [];

//result div
const result_div = document.getElementById("result")

//user input variables
const directions = document.getElementById("directions")
const p1_label = document.getElementById("p1_span")
const p2_label = document.getElementById("p2_span")
const input_label = document.getElementById("input1")
const button_label = document.getElementById("button")
var ready_to_play = false;
const input = document.querySelector(".input")
input.classList.add("stop-show")

//Buttons on the bottom to control Game
const play_again_button = document.getElementById("Play Again")
const clear_button = document.getElementById("Clear")
const restart_match_button = document.getElementById("Restart Match")

//Variables to control instructions telling user who's going first
const first_move = document.querySelector(".first-move")
first_move.classList.add('stop-show')
const first_player = document.getElementById("first-player")
first_player.innerHTML = "HIIII"

//Instructions to pop up
const instruction1 = document.querySelector(".instruction1")
instruction1.classList.add("stop-show")

//Game-Over Variable
game_over = false;
//--------------------------------------------------------------
//show instructions
function show_instruc(){
  input.classList.remove("stop-show");
  play_button.classList.add("stop-show");
  input.classList.add("instruc-move");
}
//user input
function inputFunc(){
  var text = document.getElementById('input1').value;
  if (text ==="X" || text === "O"){
    p1 = text
    if(p1==="X"){
      p2="O"
    }
    else{
      p2="X"
    }
    p1_label.innerHTML = p1
    p2_label.innerHTML = p2
    directions.classList.add("stop-show")
    input_label.classList.add("stop-show")
    button_label.classList.add("stop-show")
    document.getElementById("button").disabled = true;
    ready_to_play = true
    return p1
  }
  else{
    directions.classList.add("red-glow")
    setTimeout(() => directions.classList.remove("red-glow"), 500)
  }

}
//detect which cell has been clicked
function detect_move(){
  cell_s1.addEventListener("click",() => make_move("s1"))
  cell_s2.addEventListener("click",() => make_move("s2"))
  cell_s3.addEventListener("click",() => make_move("s3"))
  cell_s4.addEventListener("click",() => make_move("s4"))
  cell_s5.addEventListener("click",() => make_move("s5"))
  cell_s6.addEventListener("click",() => make_move("s6"))
  cell_s7.addEventListener("click",() => make_move("s7"))
  cell_s8.addEventListener("click",() => make_move("s8"))
  cell_s9.addEventListener("click",() => make_move("s9"))
}
//create object
var obj = {"s1": cell_s1, "s2": cell_s2, "s3":cell_s3, "s4":cell_s4, "s5":cell_s5,"s6":cell_s6,"s7":cell_s7,"s8":cell_s8, "s9":cell_s9 };

//add alternating piece to cell if it hasn't already been taken
function make_move(cell){
  instruction1.classList.add("stop-show")
  if (ready_to_play){
    var piece = alt_piece()
  
    console.log(x_moves,o_moves)
    //Remove instruction for who's move it is after play again button
    if(x_moves.length === 0 && o_moves.length === 0){
      console.log("hola")
      first_move.classList.add("stop-show")
    }

    //add piece to board if cell hasn't already been taken
    if (x_moves.includes(cell) === false && o_moves.includes(cell) === false){
      obj[cell].innerHTML = piece;
      //console.log(x_moves,o_moves)
    }
    //make list of taken cells
    if (piece === "X"){
      x_moves.push(cell)
    }
    else{
      o_moves.push(cell)
    }
    //check if player has won
    check_win();
    }
    
  else{
      if (game_over){
        instruction1.classList.remove("stop-show")
      }
      else {
      directions.classList.add("red-glow")
      setTimeout(() => directions.classList.remove("red-glow"), 500)
      }
    }
}

//alternate the players
function alt_piece(){
  //determine p1 and p2
  p1 = inputFunc();
  if(p1==="X"){
    p2="O"
  }
  else{
    p2="X"
  }
  //count moves and alternate players according to that number
  count++;
  if (count%2===0){
      return p2
  }
  else {

    return p1
  }
}


//check if anyone has won
let checker = (arr,target) => target.every(v => arr.includes(v));
function check_win(){
  //list of possible ways to win
  var poss_wins = [["s1","s2","s3",],["s4","s5","s6"],["s7","s8","s9"],["s1","s4","s7"],["s2","s5","s8"],["s3","s6","s9"],["s1","s5","s9"],["s3","s5","s7"]]
  //check every possible way to win
  for (i=0; i<poss_wins.length; i++){
    if(checker(x_moves,poss_wins[i])){
      result_div.innerHTML = "X wins!"
      //increase score
      userScore++;
      userScore_span.innerHTML = userScore
      //so they can't click the same piece to win over and over
      ready_to_play = false;
      game_over = true
      
    }
    if(checker(o_moves,poss_wins[i])){
      result_div.innerHTML = "O wins!"
      //increase score
      compScore++;
      compScore_span.innerHTML = compScore
      //so they can't click the same piece to win over and over
      ready_to_play = false;
      game_over = true;
      
    }
  }
}

function clear(){
  result_div.classList.add("stop-show")
  //take the pieces off the board
  for (const property in obj){
    obj[property].innerHTML = "";

  //clear list of moves
  x_moves = []
  o_moves = []

  ready_to_play=true;
  }
}
function playAgain(){
  clear();
  play_again_count++;
  instruction1.classList.add("stop-show")
  first_move.classList.remove('stop-show')
  first = "X"
  if (p1=="X"){
    if(play_again_count%2===0){
      count=0 //X makes first move next game
      
    }
    else{
      count=1 //O makes first move
      first="O"
      
    }
  }
  else {
    if(play_again_count%2===0){
      count=0 //O makes first move
      first = "O"
    }
    else{
      count=1 //X makes first move  
    }
  }
  if (first==="X"){
    console.log("hi")
    first_player.innerHTML = "X"
  }
  else {
    console.log("hey")
    first_player.innerHTML = "O"
  }
}


function restartMatch(){
  //Clear Board
  clear();

  //Reset Scores
  compScore = 0;
  userScore = 0;
  compScore_span.innerHTML = compScore
  userScore_span.innerHTML = userScore

  //
  directions.classList.remove("stop-show")
  input_label.classList.remove("stop-show")
  button_label.classList.remove("stop-show")
  document.getElementById("button").disabled = false;
  
  count = 0

}
  
  
  




function main(){
    play_button.addEventListener("click",() => show_instruc())
    detect_move();
    clear_button.addEventListener("click",() => clear())
    play_again_button.addEventListener("click",() => playAgain())
    restart_match_button.addEventListener("click",() => restartMatch())
}
main();
