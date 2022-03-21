var conect4row = document.getElementsByTagName('tr');
var connect4cell = document.getElementsByTagName('td');
var slots = document.querySelector('.slot');
var playerTurn = document.querySelector('.player-turn');
var reset = document.querySelector('.reset');

var player1 = "RED  PLAYER";
var player2 = "YELLOW PLAYER";
var player3 = "Game Over";
var currentPlayer = player1;
var drawCounter = 0;
var sound = new Audio("./sounds/winningSound.wav");
var coinSound = new Audio("./sounds/coinSound.wav");

var gameEnded = 1;
var rowCoord = 0;
var columnCoord = 0;


Array.prototype.forEach.call(connect4cell, (cell) =>{
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'beige';
});

/* ALTERNATIVE
for (let i = 0; i < connect4cell.length; i++){
    connect4cell[i].addEventListener('click', (e) =>{
      console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
      rowCoord = e.target.parentElement.rowIndex;
      columnCoord = e.target.cellIndex;
      console.log(rowCoord);
      console.log(columnCoord);

      if (currentPlayer == player1 && connect4cell[i].style.backgroundColor != "yellow"){
      connect4cell[i].style.backgroundColor = "red";
      currentPlayer = player2;
      }

     else if (currentPlayer == player2 && connect4cell[i].style.backgroundColor != "red"){
        connect4cell[i].style.backgroundColor = "yellow";
        currentPlayer = player1;
        }
    }) 
  } */

function reload(){
    location.reload();
}


 function changeColor(e){
    // Get clicked column index

    let column = e.target.cellIndex;
    let row = [];
    

   if (gameEnded == 1 && !(drawCounter > 41)) {

    for (i = 5; i > -1; i--){
        if (conect4row[i].children[column].style.backgroundColor == 'beige'){
            row.push(conect4row[i].children[column]);
            if (currentPlayer === player1){
                row[0].style.backgroundColor = 'red';
                drawCounter++;
                coinSound.play();
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player1} WINS!!`;
                    playerTurn.style.color = 'red';
                    gameEnded = 2;
                    currentPlayer = player3;
                    sound.play();
                    return;
                }else{
                    return currentPlayer = player2;
                }
            }else if (currentPlayer === player2)  {
                row[0].style.backgroundColor = 'yellow';
                drawCounter++;
                coinSound.play();
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player2} WINS!!`;
                    playerTurn.style.color = 'yellow';
                    gameEnded = 2;
                    currentPlayer = player3;
                    sound.play();                    
                    return;
                } else{
                    return currentPlayer = player1;
                }    
            }
        }
    }  
  }  
  if (drawCounter >= 42){
      draw();
  }
}

function draw(){
           currentPlayer = player3;
           gameEnded = 2;
           playerTurn.textContent = 'This is a Draw!!';
           playerTurn.style.color = 'lightGreen';
           return;
}

function colorMatchCheck(one, two, three, four){
    if (one === two && one === three && one === four && one !== 'beige' && one !== undefined){
        currentPlayer = 3;
        return true;
    }
    return false;
}


function horizontalCheck(){
    for (let row = 0; row < conect4row.length; row++){
        for (let col =0; col < 4; col++){
           if (colorMatchCheck(conect4row[row].children[col].style.backgroundColor,conect4row[row].children[col+1].style.backgroundColor, 
                                conect4row[row].children[col+2].style.backgroundColor, conect4row[row].children[col+3].style.backgroundColor)){
               return true;
           }
        }
    }
}

function verticalCheck(){
    for (let col = 0; col < 7; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(conect4row[row].children[col].style.backgroundColor, conect4row[row+1].children[col].style.backgroundColor,
                                conect4row[row+2].children[col].style.backgroundColor,conect4row[row+3].children[col].style.backgroundColor)){
                return true;
            };
        }   
    }
}

function diagonalCheck(){
    for(let col = 0; col < 4; col++){
        for (let row = 0; row < 3; row++){
            if (colorMatchCheck(conect4row[row].children[col].style.backgroundColor, conect4row[row+1].children[col+1].style.backgroundColor,
                conect4row[row+2].children[col+2].style.backgroundColor,conect4row[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
            }
        }

}

function diagonalCheck2(){
    for(let col = 0; col < 4; col++){
        for (let row = 5; row > 2; row--){
            if (colorMatchCheck(conect4row[row].children[col].style.backgroundColor, conect4row[row-1].children[col+1].style.backgroundColor,
                conect4row[row-2].children[col+2].style.backgroundColor,conect4row[row-3].children[col+3].style.backgroundColor)){
                    return true;
            }
        }
    }
}
