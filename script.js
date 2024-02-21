/*----------------------------
FASE DI PREPARAZIONE
------------------------------*/

//Recuperare dalla pagina tutti gli elementi di nteresse
const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

//preparo info utili alla logica di gioco
const totalCells = 100;
const totalBombs = 16;
const maxScore = totalCells - totalBombs;
const bombsList = [];
let score = 0;

//generare TOT bombe casuali
while (bombsList.length < totalBombs) {
    const number = Math.floor(Math.random() * totalCells) + 1;
    if (!bombsList.includes(number)) bombsList.push(number);
}
console.log(bombsList)
/*---------------------------
GRIGLIA E LOGICA DI GIOCO
--------------------------*/
let isCellEven = false;
let isRowEven = false;


for (let i = 1; i <= 100; i++) {
    //creo un elemento e gli do la classe 'cell'
    const cell = document.createElement('div');
    cell.classList.add('cell');

    isCellEven = i % 2 === 0

    //se la riga e' pari e la cella e' pari: casella grigia
    //se la riga e' dispari e la cella e' dispari: casella grigia
    if (isRowEven && isCellEven) cell.classList.add('cell-dark');
    else if (!isRowEven && !isCellEven) cell.classList.add('cell-dark')

    //se sono alla fine della riga..
    if (i % 10 === 0) isRowEven = !isRowEven;

    //Gestiamo il click della cella
    cell.addEventListener('click', function () {
        //controllo che la cella non sia stata gia' cliccata
        if (cell.classList.contains('cell-clicked')) return;

        //se e' una bomba...
        if (bombsList.includes(i)) {
            cell.classList.add('cell-bomb');
            endGame(false);
        } else {
            //se non lo e'
            cell.classList.add('cell-clicked');
            updateScore()
        }
    });

    //lo inserisco nella griglia
    grid.appendChild(cell);
}

/*------------------------
FUNZIONI
------------------------------*/
//funzione per aggiornare il punteggio
function updateScore() {
    //incremento lo score
    score++;
    //lo inserisco nel contatore
    scoreCounter.innerText = String(score).padStart(5, 0);

    //controlliamo se l'utente ha vinto
    if (score === maxScore) endGame(true);
}

function endGame(isVictory) {
    if (isVictory === true) {
        //coloriamo di verde e cambiamo il messaggio
        endGameScreen.classList.add('win')
        endGameText.innerHTML = 'YOU <br> WIN'
    } else {
        //riveliamo le bombe
        revealAllBombs();
    }
    //mostriamo la schermata rimuovendo la classe
    endGameScreen.classList.remove('hidden');
}

//funnzione per ricaricare la pagina
function playAgain() {
    location.reload();
}
function revealAllBombs() {
    //recupero tutte le celle
    const cells = document.querySelectorAll('.cell')
    for (let i = 1; i <= cells.length; i++) {
        //controllo se la cella e' una bomba
        if (bombsList.includes(i)) {
            const cellToReveal = cells[i - 1]
            cellToReveal.classList.add('cell-bomb');
        }
    }
}


/*--------------------
EVENTI
--------------------*/
playAgainButton.addEventListener('click', playAgain);