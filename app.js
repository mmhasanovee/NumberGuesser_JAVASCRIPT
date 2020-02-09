//game values


let min = 0,
    max = 15,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;

console.log('I guess u r tech-savvy :p '+winningNum);    

//UI elem
const UIgame = document.querySelector('#game'),
    UIminNum = document.querySelector('.min-num'),
    UImaxNum = document.querySelector('.max-num'),
    UIguessBtn = document.querySelector('#guess-btn'),
    UIguessInput = document.querySelector('#guess-input'),
    UImessage = document.querySelector('.message');

//Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

//play again event

UIgame.addEventListener('mousedown', function (e) {

    if (e.target.className === 'play-again') {

        window.location.reload();
    }
});

//Listen for guess
UIguessBtn.addEventListener('click', function () {

    let guess = parseInt(UIguessInput.value);
    //console.log(guess);

    //input validation
    if (isNaN(guess) || guess < min || guess > max) {

        setMessage(`Please enter a valid number between the range ${min} and ${max}`, 'red');
        

    }

    else {

        //check if won

        if (guess === winningNum) {

            gameOver(true, `${winningNum} is the correct answer, YOU WON!!`);
        } else {
            //wrong input
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                gameOver(false, `Game Over, the correct number was ${winningNum}`);




            } else {
                //change color
                UIguessInput.style.borderColor = 'red';
                //guess left - answer left
                setMessage(`${guess} is wrong, you have ${guessesLeft} guesses left`, 'red');
            }


        }
    }
});

//game end

function gameOver(won, msg) {

    let color;
    won === true ? color = 'green' : color = 'red';
    if(won===false){}
    UIguessInput.disabled = true;
    //change color
    UIguessInput.style.borderColor = color;
    UImessage.style.color = color;
    //set winning message
    setMessage(msg);

    //re play
    if(won===true){
      Swal.fire({
        title: 'Congrats, you guessed it right!',
        width: 600,
        padding: '3em',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })
    }
    UIguessBtn.value = 'Play Again';
    UIguessBtn.className += 'play-again';
    

}

//winning number generator
function getWinningNum(min, max) {

    return (Math.floor(Math.random() * (max - min + 1) + min));


}

function setMessage(msg, color) {
    UImessage.style.color = color;
    UImessage.textContent = msg;
}

//Congrats animation----------------------



