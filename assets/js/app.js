var Score = 10

document.addEventListener('DOMContentLoaded', () => {

    const flipAudio = new Audio();
    flipAudio.src = "./sounds/clickone.wav";

    const correctAudio = new Audio();
    correctAudio.src = "./sounds/correctanswer.wav";

    const incorrectAudio = new Audio();
    incorrectAudio.src = "./sounds/incorrectanswer.wav";

    const winAudio = new Audio();
    winAudio.src = "./sounds/gamewon.wav";

    const loseAudio = new Audio();
    loseAudio.src = "./sounds/gamelost.wav";

    const cardArray = [
      {
        name: 'lion',
        copy: 1,
        img: 'images/lion3.png'
      },
      {
        name: 'lion',
        copy: 2,
        img: 'images/lion3.png'
      },
      {
        name: 'leopard',
        copy: 3,
        img: 'images/leopard3.png'
      },
      {
        name: 'leopard',
        copy: 4,
        img: 'images/leopard3.png'
      },
      {
        name: 'cheetah',
        copy: 5,
        img: 'images/cheetah3.png'
      },
      {
        name: 'cheetah',
        copy: 6,
        img: 'images/cheetah3.png'
      },
      {
        name: 'panther',
        copy: 7,
        img: 'images/panther3.png'
      },
      {
        name: 'panther',
        copy: 8,
        img: 'images/panther3.png'
      },
      {
        name: 'tiger',
        copy: 9,
        img: 'images/tiger3.png'
      },
      {
        name: 'tiger',
        copy: 10,
        img: 'images/tiger3.png'
      },
      {
        name: 'jaguar',
        copy: 11,
        img: 'images/jaguar3.png'
      },
      {
        name: 'jaguar',
        copy: 12,
        img: 'images/jaguar3.png'
      }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsCopy = []
    var cardsWon = []

    resultDisplay.textContent = "Score: " + Score

    //flip your card
    function flipCard() {
    var cardId = this.getAttribute('data-id')
    var cardSrc = this.getAttribute('src')

    if (cardSrc == "images/tile8a.png"){
      return;
     } 

    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    cardsCopy.push(cardArray[cardId].copy)

    if (cardsChosen[0] === cardsChosen[1] && cardsCopy[0] == cardsCopy[1]) {
      alert('You must choose a different card!')
      cardsChosen.pop();
      cardsChosenId.pop();
      cardsCopy.pop();
      return;
    }

    if (cardsChosen.length === 1) {
      flipAudio.play();
    }
    
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500)
      return;
    }
 }

    //check for matches
    function checkForMatch() {

    var cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]

          if (cardsChosen[0] === cardsChosen[1]) {
          alert('These cards match!')
          cards[optionOneId].setAttribute('src', 'images/tile8a.png')
          cards[optionTwoId].setAttribute('src', 'images/tile8a.png')
          cardsWon.push(cardsCopy)
          if (!(cardsWon.length === cardArray.length/2))
            {
            correctAudio.play();
           }
          }
           else {
           cards[optionOneId].setAttribute('src', 'images/tile7a.png')
           cards[optionTwoId].setAttribute('src', 'images/tile7a.png')
           alert('They are not the same, try again')
           Score--;
           if (Score > 0) {
           incorrectAudio.play();
           }
           else {
             loseAudio.play();
             displayWinMessage();
           }
          }
    
          cardsChosen = []
          cardsChosenId = []
          cardsCopy = []
          resultDisplay.textContent = "Score: " + Score
          if (cardsWon.length === cardArray.length/2)
          {
           // resultDisplay.textContent = 'Congratulations! You Win! Your Score is: ' + Score + "/" + 10;
            displayWinMessage();
            winAudio.play();
         }
    }

    function displayWinMessage(){
      var text = document.getElementById('sInfo');

      if (Score == 10){
        text.value = 'PERFECTION!! CONGRATULATIONS!!!';
      }

      if (Score == 9){
        text.value = 'Congratulations!! You have an excellent score!!';
      }

      if (Score == 8){
        text.value = 'Congratulations! You have a great score!';
      }

      if (Score == 7){
        text.value = 'Congratulations! You have a good score!';
      }

      if (Score == 6){
        text.value = 'Congratulations! Not bad!';
      }

      if (Score == 5){
        text.value = 'Congratulations! Nothing impressive though!';
      }

      if (Score == 4){
        text.value = 'Congratz! Re-try to increase your score.';
      }

      if (Score == 3){
        text.value = 'Congratz on not losing.';
      }

      if (Score == 2){
        text.value = 'Congratz. Retry for better score!';
      }

      if (Score == 1){
        text.value = 'Congratz on winning, but you just barely made it!';
      }

      if (Score == 0){
        text.value = 'You lost. Better luck next time.';
      }
    }

    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img')
        card.setAttribute('src', 'images/tile7a.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
      }
    }

    createBoard();
    })

    function memoryHelp(){
      //This function displays a new window with the help information.    
          window.open("MemoryHelp.html","my_window","width=300,height=400, scrollbars=yes");
      }

      function newgame(){
        location.reload();
      }