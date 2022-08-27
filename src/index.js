import "./style.css";
import ancientsData from "./data/ancients";
import { brownCards, blueCards, greenCards } from "./data/mythicCards/index";
import difficulties from "./data/difficulties";

const ancient = document.querySelectorAll(".ancient-card");
const ancients = document.querySelector(".ancients-container");
const difficulty = document.querySelector(".difficulty-container");
let selectedA;
let selected2;
const shuffleButton = document.querySelector(".shuffle-button");
const currentState = document.querySelector(".current-state");
const deck = document.querySelector(".deck");
const lastCard = document.querySelector(".last-card");
let randomNum;
let currentAncient = "";
const oneGreen = document.querySelector(".dot.green.one");
const oneBrown = document.querySelector(".dot.brown.one");
const oneBlue = document.querySelector(".dot.blue.one");
const twoGreen = document.querySelector(".dot.green.two");
const twoBrown = document.querySelector(".dot.brown.two");
const twoBlue = document.querySelector(".dot.blue.two");
const thirdGreen = document.querySelector(".dot.green.third");
const thirdBrown = document.querySelector(".dot.brown.third");
const thirdBlue = document.querySelector(".dot.blue.third");
let firstStageCards = [];
let secondStageCards = [];
let thirdStageCards = [];
let clicks = 0;

//выбор древнего
ancients.onclick = function (event) {
  let a = event.target.closest(".ancient-card");
  if (!a) return;
  if (!ancients.contains(a)) return;
  highlight(a);
  difficulty.style.visibility = "visible";
  currentAncient = event.target.id;
  currentAncient = ancientsData.find((item) => item.name === currentAncient);
  newAncient();
};

//
function newAncient() {
  currentState.style.visibility = "";
  deck.style.visibility = "";
  lastCard.style.visibility = "";
  selected2.classList.remove("active");
  firstStageCards = [];
  secondStageCards = [];
  thirdStageCards = [];
  clicks = 0;
}

let greenCardDeck;
let brownCardDeck;
let blueCardDeck;
//колоды всех цветов
function getColorDeck(foundObj) {
  let countGreen = cardsSum("greenCards", foundObj);
  let countBrown = cardsSum("brownCards", foundObj);
  let countBlue = cardsSum("blueCards", foundObj);
  greenCardDeck = shuffleArray(greenCards).slice(0, countGreen);
  brownCardDeck = shuffleArray(brownCards).slice(0, countBrown);
  blueCardDeck = shuffleArray(blueCards).slice(0, countBlue);
  console.log(greenCardDeck);
}

//подсветка карты
function highlight(a) {
  if (selectedA) {
    selectedA.classList.remove("active");
  }
  selectedA = a;
  selectedA.classList.add("active");
}

//выбор сложности
difficulty.onclick = function (event) {
  let a = event.target.closest(".difficulty");
  if (!a) return;
  if (!difficulty.contains(a)) return;
  highlight2(a);
  shuffleButton.style.visibility = "visible";
};

//подсветка сложности
function highlight2(a) {
  if (selected2) {
    selected2.classList.remove("active");
  }
  selected2 = a;
  selected2.classList.add("active");
}

//замешать колоду кнопка
shuffleButton.onclick = function (event) {
  shuffleButton.style.visibility = "";
  currentState.style.visibility = "visible";
  deck.style.visibility = "visible";
  lastCard.style.visibility = "";
  getCurrentState(currentAncient);
  getColorDeck(currentAncient);
  takeStageDeck(currentAncient);
};

//рандом
function getRandom(min, max) {
  randomNum = Math.floor(Math.random() * max + min);
}
getRandom();

//тасовка карт
// function shuffle(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

//заполнить трекер
function getCurrentState(currentAncient) {
  oneGreen.textContent = currentAncient.firstStage.greenCards;
  oneBrown.textContent = currentAncient.firstStage.brownCards;
  oneBlue.textContent = currentAncient.firstStage.blueCards;
  twoGreen.textContent = currentAncient.secondStage.greenCards;
  twoBrown.textContent = currentAncient.secondStage.brownCards;
  twoBlue.textContent = currentAncient.secondStage.blueCards;
  thirdGreen.textContent = currentAncient.thirdStage.greenCards;
  thirdBrown.textContent = currentAncient.thirdStage.brownCards;
  thirdBlue.textContent = currentAncient.thirdStage.blueCards;
}

//сколько карт отобрать из колоды
function cardsSum(color, obj) {
  return obj.firstStage[color] + obj.secondStage[color] + obj.thirdStage[color];
}

//получаем три колоды по стадиям
function takeStageDeck(currentAncient) {
  for (let i = 0; i < currentAncient.firstStage.greenCards; i++) {
    firstStageCards.push(greenCardDeck[greenCardDeck.length - 1]);
    greenCardDeck.pop();
  }
  for (let i = 0; i < currentAncient.secondStage.greenCards; i++) {
    secondStageCards.push(greenCardDeck[greenCardDeck.length - 1]);
    greenCardDeck.pop();
  }
  for (let i = 0; i < currentAncient.thirdStage.greenCards; i++) {
    thirdStageCards.push(greenCardDeck[greenCardDeck.length - 1]);
    greenCardDeck.pop();
  }
  for (let i = 0; i < currentAncient.firstStage.brownCards; i++) {
    firstStageCards.push(brownCardDeck[brownCardDeck.length - 1]);
    brownCardDeck.pop();
  }
  for (let i = 0; i < currentAncient.secondStage.brownCards; i++) {
    secondStageCards.push(brownCardDeck[brownCardDeck.length - 1]);
    brownCardDeck.pop();
  }
  for (let i = 0; i < currentAncient.thirdStage.brownCards; i++) {
    thirdStageCards.push(brownCardDeck[brownCardDeck.length - 1]);
    brownCardDeck.pop();
  }
  for (let i = 0; i < currentAncient.firstStage.blueCards; i++) {
    firstStageCards.push(blueCardDeck[blueCardDeck.length - 1]);
    blueCardDeck.pop();
  }
  for (let i = 0; i < currentAncient.secondStage.blueCards; i++) {
    secondStageCards.push(blueCardDeck[blueCardDeck.length - 1]);
    blueCardDeck.pop();
  }
  for (let i = 0; i < currentAncient.thirdStage.blueCards; i++) {
    thirdStageCards.push(blueCardDeck[blueCardDeck.length - 1]);
    blueCardDeck.pop();
  }

  firstStageCards = shuffleArray(firstStageCards);
  secondStageCards = shuffleArray(secondStageCards);
  thirdStageCards = shuffleArray(thirdStageCards);

  console.log(firstStageCards);
  console.log(secondStageCards);
  console.log(thirdStageCards);
}

//общая колода
function getCardsDeck() {
  let deckResult = [].concat(
    firstStageCards,
    secondStageCards,
    thirdStageCards
  );
  console.log(deckResult);
  return deckResult;
}

///клик по колоде
deck.addEventListener("click", () => {
  lastCard.style.visibility = "visible";
  const result = getCardsDeck();
  if (clicks < result.length) {
    let img = result[clicks].cardFace;
    lastCard.style.backgroundImage = `url(${img})`;

    if (clicks < firstStageCards.length) {
      if (result[clicks].color === "green") {
        oneGreen.textContent = oneGreen.textContent - 1;
      }
      if (result[clicks].color === "brown") {
        oneBrown.textContent = oneBrown.textContent - 1;
      }
      if (result[clicks].color === "blue") {
        oneBlue.textContent = oneBlue.textContent - 1;
      }
    } else if (clicks < firstStageCards.length + secondStageCards.length) {
      if (result[clicks].color === "green") {
        twoGreen.textContent = twoGreen.textContent - 1;
      }
      if (result[clicks].color === "brown") {
        twoBrown.textContent = twoBrown.textContent - 1;
      }
      if (result[clicks].color === "blue") {
        twoBlue.textContent = twoBlue.textContent - 1;
      }
    } else {
      if (result[clicks].color === "green") {
        thirdGreen.textContent = thirdGreen.textContent - 1;
      }
      if (result[clicks].color === "brown") {
        thirdBrown.textContent = thirdBrown.textContent - 1;
      }
      if (result[clicks].color === "blue") {
        thirdBlue.textContent = thirdBlue.textContent - 1;
      }
    }

    clicks++;
    console.log(clicks);
  }
  if (clicks >= result.length) {
    deck.style.visibility = "";
  }
});
