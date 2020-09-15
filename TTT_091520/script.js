const tttGame = new TTTGame();
tttGame.start();

function TTTGame(){
    const board = new Board();
    const humanP = new HumanP(board);
    const compP = new CompP(board);
    let turn = 0;
    let look = 1; // num of turns O looks head [1,5]
    document.getElementById("minusBtn").addEventListener("click",minusClicked);
    document.getElementById("plusBtn").addEventListener("click",plusClicked);


    function minusClicked(){
        if(look > 1){
            look--;
            document.getElementById("futureCounter").innerText = look;
        }
    }

    function plusClicked(){
        if(look < 5){
            look++;
            document.getElementById("futureCounter").innerText = look;
        }
    }

    this.start = function(){
        const config = { childList: true}; //if something changes
        const observer = new MutationObserver(() => takeTurn())//observer calls takeTurn
        board.positions.forEach((el) => observer.observe(el, config)); //for each changes in this
        takeTurn();//first takeTurn on start;
    }

    function takeTurn(){
        if(turn > 8){
            document.getElementById("end").innerText = "DRAW";
        }
        if(board.checkWin()){
            return;
        }

        if(turn % 2 === 0){
            humanP.takeTurn();
        }
        else{
            compP.takeTurn();
        }

        turn++;
    }
}

function Board(){
    this.positions = Array.from(document.querySelectorAll('.col'));
    //list of all positions -     console.log(this.positions);

    this.checkWin = function(){
        let hasWinner = false;
        const winningPos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ];

        const pos = this.positions;

        winningPos.forEach((winningCombo) => {
            const pos0InnerText = pos[winningCombo[0]].innerText;
            const pos1InnerText = pos[winningCombo[1]].innerText;
            const pos2InnerText = pos[winningCombo[2]].innerText;
            const isWin =   pos0InnerText !== '' &&
                            pos0InnerText === pos1InnerText &&
                            pos0InnerText === pos2InnerText;

            if(isWin){
                document.getElementById("end").innerText = pos0InnerText + " WINS";
                hasWinner = true;
                winningCombo.forEach((i) => {
                    pos[i].className += ' winner';
                })
            }
        });

        return hasWinner;
    }

}

function HumanP(board){
    this.takeTurn = function(){
        board.positions.forEach(el => el.addEventListener('click',handleTurnTaken));

    }

    function handleTurnTaken(event){
        //cycle through available position and only add X if target is in the array
        const availablePos = board.positions.filter((p) => p.innerText === '');
        availablePos.forEach((availableP) => {
            if(availableP === event.target){
                console.log("yes is target");
                event.target.innerText ='X';
                board.positions.forEach(el => el.removeEventListener('click',handleTurnTaken));
            }
            else{
                console.log("not a target");
            }
        });
    }

}

function CompP(board){
    this.takeTurn = function(){
        //TODO: use minimax
        const availablePos = board.positions.filter((p) => p.innerText === '');
        //creating a array where inner text = nothing
        const ranNum = Math.floor(Math.random() * availablePos.length);
        availablePos[ranNum].innerText = 'O';
    }
}

