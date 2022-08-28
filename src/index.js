import "./style.css";
import ancientsData from "./data/ancients";
import { brownCards, blueCards, greenCards } from "./data/mythicCards/index";
import difficulties from "./data/difficulties";

const ancients = document.querySelector(".ancients-container");
const difficulty = document.querySelector(".difficulty-container");
let selectedA;
let selected2;
const shuffleButton = document.querySelector(".shuffle-button");
const currentState = document.querySelector(".current-state");
const deck = document.querySelector(".deck");
const lastCard = document.querySelector(".last-card");
let currentAncient = "";
let currentDifficulty;
const oneGreen = document.querySelector(".dot.green.one");
const oneBrown = document.querySelector(".dot.brown.one");
const oneBlue = document.querySelector(".dot.blue.one");
const twoGreen = document.querySelector(".dot.green.two");
const twoBrown = document.querySelector(".dot.brown.two");
const twoBlue = document.querySelector(".dot.blue.two");
const thirdGreen = document.querySelector(".dot.green.third");
const thirdBrown = document.querySelector(".dot.brown.third");
const thirdBlue = document.querySelector(".dot.blue.third");
const stageText = document.querySelectorAll(".stage-text");
let firstStageCards = [];
let secondStageCards = [];
let thirdStageCards = [];
let clicks = 0;
let greenCardDeck;
let brownCardDeck;
let blueCardDeck;

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

//обнуление данных
function newAncient() {
  currentState.style.visibility = "";
  deck.style.visibility = "";
  lastCard.style.visibility = "";
  firstStageCards = [];
  secondStageCards = [];
  thirdStageCards = [];
  clicks = 0;
  stageText[0].classList.remove("done");
  stageText[1].classList.remove("done");
  stageText[2].classList.remove("done");
}

//колоды всех цветов
function getColorDeck(foundObj) {
  let countGreen = cardsSum("greenCards", foundObj);
  let countBrown = cardsSum("brownCards", foundObj);
  let countBlue = cardsSum("blueCards", foundObj);
  let greenDeck = greenCards;
  let brownDeck = brownCards;
  let blueDeck = blueCards;
  let greenDeckNormal = greenCards.filter((item) => item.difficulty === 'normal');
  let brownDeckNormal = brownCards.filter((item) => item.difficulty === 'normal');
  let blueDeckNormal = blueCards.filter((item) => item.difficulty === 'normal');
  if (currentDifficulty === 'easy') {
    greenDeck = greenCards.filter((item) => item.difficulty !== 'hard');
    brownDeck = brownCards.filter((item) => item.difficulty !== 'hard');
    blueDeck = blueCards.filter((item) => item.difficulty !== 'hard');
  }
  if (currentDifficulty === 'hard') {
    greenDeck = greenCards.filter((item) => item.difficulty !== 'easy');
    brownDeck = brownCards.filter((item) => item.difficulty !== 'easy');
    blueDeck = blueCards.filter((item) => item.difficulty !== 'easy');
  }
  if (currentDifficulty === 'veryEasy') {
    greenDeck = greenCards.filter((item) => item.difficulty === 'easy');
    if (greenDeck.length < countGreen) {
      let moreDeck = countGreen - greenDeck.length;
      greenDeckNormal =shuffleArray(greenDeckNormal).slice(0, moreDeck);
      greenDeck = greenDeck.concat(greenDeckNormal);
      console.log(moreDeck);
    }
    brownDeck = brownCards.filter((item) => item.difficulty === 'easy');
    if (brownDeck.length < countBrown) {
      let moreDeck = countBrown - brownDeck.length;
      brownDeckNormal =shuffleArray(brownDeckNormal).slice(0, moreDeck);
      brownDeck = brownDeck.concat(brownDeckNormal);
      console.log(moreDeck);
    }
    blueDeck = blueCards.filter((item) => item.difficulty === 'easy');
    if (blueDeck.length < countBlue) {
      let moreDeck = countBlue - blueDeck.length;
      blueDeckNormal =shuffleArray(blueDeckNormal).slice(0, moreDeck);
      blueDeck = blueDeck.concat(blueDeckNormal);
      console.log(moreDeck);
    }
  }
  if (currentDifficulty === 'veryHard') {
    greenDeck = greenCards.filter((item) => item.difficulty === 'hard');
    if (greenDeck.length < countGreen) {
      let moreDeck = countGreen - greenDeck.length;
      greenDeckNormal =shuffleArray(greenDeckNormal).slice(0, moreDeck);
      greenDeck = greenDeck.concat(greenDeckNormal);
      console.log(moreDeck);
    }
    brownDeck = brownCards.filter((item) => item.difficulty === 'hard');
    if (brownDeck.length < countBrown) {
      let moreDeck = countBrown - brownDeck.length;
      brownDeckNormal =shuffleArray(brownDeckNormal).slice(0, moreDeck);
      brownDeck = brownDeck.concat(brownDeckNormal);
      console.log(moreDeck);
    }
    blueDeck = blueCards.filter((item) => item.difficulty === 'hard');
    if (blueDeck.length < countBlue) {
      let moreDeck = countBlue - blueDeck.length;
      blueDeckNormal =shuffleArray(blueDeckNormal).slice(0, moreDeck);
      blueDeck = blueDeck.concat(blueDeckNormal);
      console.log(moreDeck);
    }
  }
  //перемешать колоду отобранных по цветам карт и взять нужное количество
  greenCardDeck = shuffleArray(greenDeck).slice(0, countGreen);
  brownCardDeck = shuffleArray(brownDeck).slice(0, countBrown);
  blueCardDeck = shuffleArray(blueDeck).slice(0, countBlue);
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
  currentDifficulty = event.target.id;
  currentDifficulty = difficulties.find((item) => item.id === currentDifficulty);
  currentDifficulty = currentDifficulty.id;
  console.log(currentDifficulty);
  newAncient();
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

//тасовка карт
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
//перемешать колоды по стадиям
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
    //трекер
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
      stageText[0].classList.add("done");
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
      stageText[1].classList.add("done");
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
    stageText[2].classList.add("done");
  }
});
