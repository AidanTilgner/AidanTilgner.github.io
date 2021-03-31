//array to show how many turns there are
const howManyTurns = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//initialize functions
let playGame = () => {

    //executes following code when the play button is clicked
    console.log("let's play");
    
    //number of turns
    numOfTurns = 0;

    //someone won
    someoneWon = false;

    //make an array off all the squares on the board
    squares = document.querySelectorAll('.column');
    squares.forEach(el => {

        //add event listeners to each box respectively
        console.log('adding event listeners')
        el.addEventListener('click', (e) => {

            //executes following code whenever a box is clicked
            //whosTurn changes based on whether number of turns is an even or odd number, or zero
            let whosTurn;
            let opponent;
            if (numOfTurns % 2 === 0){
                whosTurn = 'x';
                opponent = 'o';
            }else{
                whosTurn = 'o';
                opponent = 'x';
            }
            console.log('box event listener triggered')
            if(!e.target.classList.contains(opponent)){
                e.target.classList.add(whosTurn);
                if(checkWin(whosTurn)){
                    someoneWon = true;
                    displayWin(whosTurn);
                }else{
                    numOfTurns += 1;
                    console.log(`Turn Number: ${numOfTurns - 1}`);
                    console.log('Next turn')
                    if(numOfTurns > 8){
                        console.log('No one wins');
                        displayWin('No One');
                    }
                }
            }
        })
    });
    console.log(numOfTurns);


    if(someoneWon){
        console.log('We have a winner');
    }

}

let checkWin = (whosTurn) => {
    console.log('checking win...');
    //make a board
    board = [[], [], []]

    //asign truthies and falsies to board
    //row 1
    board[0][0] = document.getElementById('square-1').classList.contains(whosTurn);
    board[0][1] = document.getElementById('square-2').classList.contains(whosTurn);
    board[0][2] = document.getElementById('square-3').classList.contains(whosTurn);

    //row 2
    board[1][0] = document.getElementById('square-4').classList.contains(whosTurn);
    board[1][1] = document.getElementById('square-5').classList.contains(whosTurn);
    board[1][2] = document.getElementById('square-6').classList.contains(whosTurn);

    //row 3
    board[2][0] = document.getElementById('square-7').classList.contains(whosTurn);
    board[2][1] = document.getElementById('square-8').classList.contains(whosTurn);
    board[2][2] = document.getElementById('square-9').classList.contains(whosTurn);

    //check each index of each board index for truth
    function checkRows (){
        if(
            board[0][0] && 
            board[0][1] &&
            board[0][2]
            ||
            board[1][0] && 
            board[1][1] &&
            board[1][2]
            ||
            board[2][0] && 
            board[2][1] &&
            board[2][2]
        ){
            return true;
        }else{
            return false;
        }
    }

    console.log('Row win: ' + checkRows());

    //check each the first index of every board index for truth
    function checkColumns (){
        if(
            board[0][0] && 
            board[1][0] &&
            board[2][0]
            ||
            board[0][1] && 
            board[1][1] &&
            board[2][1]
            ||
            board[0][2] && 
            board[1][2] &&
            board[2][2]
        ){
            return true;
        }else{
            return false;
        }
    }

    console.log('Column win: ' + checkColumns());

    function checkDiagonal (){
        if(
            board[0][0] && 
            board[1][1] &&
            board[2][2]
            ||
            board[0][2] && 
            board[1][1] &&
            board[2][0]
        ){
            return true;
        }else{
            return false;
        }
    }

    console.log('Diagonal win: ' + checkDiagonal());

    if(checkRows() || checkColumns() || checkDiagonal()){
        return true;
    }else{
        return false;
    }
}

let clearBoard = () => {
    squares = document.querySelectorAll('.column');
    squares.forEach(square => {
        square.classList.remove('x');
        square.classList.remove('o');
    })
}


let displayWin = (whosTurn) => {
    console.log(`${whosTurn} wins!!`);

    //change display on win banner
    winBanner = document.querySelector('.win-banner');
    winBanner.style.display = 'flex';

    //change display on banner h1
    winBannerH1 = document.querySelector('.win-banner__text');
    winBannerH1.innerText = `${whosTurn.toUpperCase()} WON!`

    //change display on restart button
    restartButton = document.querySelector('.button__restart');
    restartButton.style.display = 'inline-block'
    console.log(winBanner);
    console.log(restartButton);

    restartButton.addEventListener('click', () => {
        console.log('hello')
        clearBoard();
        winBanner.style.display = 'none';
        restartButton.style.display = 'none';
        playGame()
    })
};

let numOfTurns;

//add event listener to play button
const playButton = document.getElementById('play-button');
playButton.addEventListener('click', playGame())

