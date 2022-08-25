import './style.css';
import ancientsData from './data/ancients';
import {
    brownCards,
    blueCards,
    greenCards
} from './data/mythicCards/index';
import difficulties from './data/difficulties';

const ancient = document.querySelectorAll('.ancient-card');
const ancients = document.querySelector('.ancients-container');
const difficulty = document.querySelector('.difficulty-container')
let selectedA;
let selected2;
const card15 = document.getElementById('card15');
const card14 = document.getElementById('card14');
const card13 = document.getElementById('card13');
const card12 = document.getElementById('card12');
const shuffleButton = document.querySelector('.shuffle-button');
const currentState = document.querySelector('.current-state');
const deck = document.querySelector('.deck');
const lastCard = document.querySelector('.last-card');




//выбор древнего
ancients.onclick = function(event) {
    let a = event.target.closest('.ancient-card');
    if (!a) return;
    if (!ancients.contains(a)) return;
    highlight(a); 
    difficulty.style.visibility = 'visible';
};

//подсветка карты
function highlight(a) {
    if (selectedA) { 
      selectedA.classList.remove('active');
    }
    selectedA = a;
    selectedA.classList.add('active');
}
  
//выбор сложности
difficulty.onclick = function(event) {
    let a = event.target.closest('.difficulty');
    if (!a) return;
    if (!difficulty.contains(a)) return;
    highlight2(a); 
    shuffleButton.style.visibility = 'visible';
};

//подсветка сложности
function highlight2(a) {
    if (selected2) { 
      selected2.classList.remove('active');
    }
    selected2 = a;
    selected2.classList.add('active');
}

//замешать колоду
shuffleButton.onclick = function(event) {
    shuffleButton.style.visibility = '';
    currentState.style.visibility = 'visible';
    deck.style.visibility = 'visible';
};

const cardNum = String(randomNum);
const img = new Image();
img.src = `./assets/MythicCards/blue/blue${cardNum}.png`
img.onload = () => {
    lastCard.style.backgroundImage = `url(${img.src})`
}

deck.addEventListener('click', () => {
    lastCard.style.visibility = 'visible';
    randomCard();
})