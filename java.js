const cardsArray = [
    { name: '1', img: 'Imagenes/Miguel Hidalgo.jpg' },
    { name: '1', img: 'Imagenes/Miguel Hidalgo.jpg' },
    { name: '2', img: 'Imagenes/Jose Mara Morelos.jpg' },
    { name: '2', img: 'Imagenes/Jose Mara Morelos.jpg' },
    { name: '3', img: 'Imagenes/Ignacio Aldama.jpg' },
    { name: '3', img: 'Imagenes/Ignacio Aldama.jpg' },
    { name: '4', img: 'Imagenes/Josefa Ortiz.jpg' },
    { name: '4', img: 'Imagenes/Josefa Ortiz.jpg' },
    { name: '5', img: 'Imagenes/Juan Aldama.jpg' },
    { name: '5', img: 'Imagenes/Juan Aldama.jpg' },
    { name: '6', img: 'Imagenes/Leona Viario.jpg' },
    { name: '6', img: 'Imagenes/Leona Viario.jpg' },
    { name: '7', img: 'Imagenes/Mariano Abasolo.jpg' },
    { name: '7', img: 'Imagenes/Mariano Abasolo.jpg' }
];

const memorama = document.querySelector('.memorama');
const resetButton = document.getElementById('resetButton');
const attemptsCounter = document.getElementById('attemptsCounter');
let attempts = 0;


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function createBoard() {
    

    memorama.innerHTML = ''; // Limpiar el tablero
    const shuffledCards = shuffle(cardsArray.slice());
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card.name;
        cardElement.innerHTML = `
            <div class="inner">
                <div class="front">❓</div>
                <div class="back"><img src="${card.img}" alt="${card.name}" class="imgmemo"></div>
            </div>
        `;
        memorama.appendChild(cardElement);
    });
    addEventListeners();
}

function addEventListeners() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', flipCard));
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    attempts++;
    attemptsCounter.textContent = attempts;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    attempts = 0;
    attemptsCounter.textContent = attempts;
    createBoard();
}

// Inicializar el tablero
createBoard();

// Añadir evento para el botón de reinicio
resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    resetGame();
});
function mostrarMensaje() {
    alert("Tu respuesta fue incorrecta                                                             Repasa y sigue intentandolo");
   
}

