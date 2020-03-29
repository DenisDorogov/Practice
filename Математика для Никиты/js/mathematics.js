var countMath = 3;
var minSum = 20;
var maxSum = 100;
var difMax = 99;
var difMin = 11;
var sumArray = [];
var difArray = [];
var questionArray = [];
let answerArray = [];
let countCorrects = 0;
let mistakes = 0;
let mark = 0;
let k = 0;
var n = 0;
var message = ['СУПЕР!!!', 'ОТЛИЧНО', 'ХОРОШО', 'ПОЙДЁТ'];
var penalty = 0;



// Вывод результата в блок
function outputResults() {
  var parent = document.getElementById('results-block');
parent.style.display= 'flex';
  for (let i = 0; i < countMath; i++) {
    var putIn = document.createElement("p");
    putIn.innerHTML = `${answerArray[i][0]}${answerArray[i][2]}`;
    putIn.classList.toggle('green');
    putIn.classList.toggle('result-espression');
    if (!answerArray[i][3]) {
      putIn.classList.toggle('mistake');
      putIn.classList.toggle('green');
    }
    parent.appendChild(putIn);
  };
  if (mistakes > 0) {
    questionArray = answerArray.filter( right => right[3] == false);
    questionArray.slice(0, 2);
    k = 0;
    mistakes = 0;
    countMath = questionArray.length;
    countCorrects = 0;
    answerArray = [];
  }

}

function getQuestion() {
  document.getElementById('results-block').innerHTML = '';
  var divMath = document.getElementById('main-block');
  divMath.innerHTML = `<form class="praxis-block" id = "praxis-block"><div class="praxis" id = "praxis">${questionArray[k][0]}</div><input type="text" autofocus class="answer" id="answer" ><div class="enter-answer" id="buttonAnswer" >ГОТОВО</div></form>`;
  buttonAnswer = document.getElementById("buttonAnswer");
  buttonAnswer.addEventListener('click', checkAnswer);
  inputAnswer = document.getElementById("answer");
  inputAnswer.addEventListener('keydown', function(event) {if ((event.keyCode == 13) || (event.keyCode == 9)) checkAnswer();});
//  inputAnswer.focus();
 
}
//function nextQuestion(example) {
//  var parent = document.getElementById('praxis-block');
//  var delElem = document.getElementById('praxis');
//  var insElem = document.createElement("div");
////  console.log(delElem);
//  insElem.setAttribute('class', 'praxis');
//  insElem.setAttribute('id', 'praxis');
//  insElem.innerHTML = `${example}`;
////  parent.appendChild(insElem);
//  parent.removeChild(delElem);
//  parent.insertBefore(insElem, parent.firstChild);
  
//  var delElem = document.getElementById('answer');
//  var insElem = document.createElement("input");
//  insElem.setAttribute('type', 'text');
//  insElem.setAttribute('class', 'answer');
//  insElem.setAttribute('id', 'answer');
//  insElem.setAttribute('autofocus', '');
//  parent.removeChild(delElem);
//  parent.insertBefore(insElem, parent.firstChild)
// }

function checkAnswer() {
  let answerValue = +(document.getElementById("answer").value);
  if (answerValue == questionArray[k][1]) {
    countCorrects++;
    answerArray.push([questionArray[k][0], questionArray[k][1], answerValue, true]);
  } else {
    answerArray.push([questionArray[k][0], questionArray[k][1], answerValue, false]);
  }
  console.log(answerArray[k][1],answerArray[k][3]);
  document.getElementById("answer").value = '';
  k++;
  if (k < countMath) getQuestion();
  else {
    outputMain();
    outputResults();
  }
    
}

function outputMain() {
  
  let text = '';
  mistakes += countMath - countCorrects;
  if (mistakes == 0) {mark = 6 - penalty; text = message[0+penalty];}
  else if (mistakes <= 2) {mark = 5 - penalty; text = message[1+penalty];}
  else if (mistakes <= 4) {mark = 4 - penalty; text = message[2+penalty];}
  else if (mistakes <= 6) {mark = 3 - penalty; text = message[3+penalty];}
  else mark = 2;
  var parent = document.getElementById('main-block');
  var elem = document.createElement("div");
  parent.innerHTML = `<div class="mark${mark} result"><h1 id="mark-text">${text}</h1></div><p id= "mark-result-text">Правильных ответов ${countCorrects} из ${countMath}</p>`;
  if (mistakes > 0) {
    penalty += 1; 
    questionArray = answerArray.filter( right => right[3] == false);
    k = questionArray.length;
    let buttonCorrect = document.createElement('div');
    buttonCorrect.id = 'button-correct';
    buttonCorrect.innerHTML = `<h2 class = "button-correct-text">ИСПРАВИТЬ</h2>`
    parent.appendChild(buttonCorrect);
    buttonCorrect.addEventListener('click', getQuestion)
  }
//  if (getStorage('results') == undefined) {
   let statistic = {lastResult: 'Прошлый результат отсутствует', mark: undefined}
//  setStorage('results' , statistic);
//  } else {
    statistic = getStorage('results');
    statistic.lastResult = mark;
    setStorage('results' , statistic);
//  }
  
}

function setStorage(key, object) {
  var jsonObject = JSON.stringify(object);
  localStorage.setItem(key, jsonObject);
}

function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}



for (var i = (minSum - 10); i < maxSum; i++) {
  for (var j = 1; j <= (maxSum - i); j++) {
    sumArray[n++] = [i + " + " + j + " = ", i + j];
  }
}

var n = 0;
for (var i = difMin; i <= difMax; i++) {
  for (var j = 2; j < 8; j++) {
    difArray[n++] = [i + ' - ' + j + ' = ', i - j];
  }
}

for (var i = 0; i < countMath; i++) {
  if (Math.floor(Math.random() * 2) == 1) {
    var n = Math.floor(Math.random() * sumArray.length);
    questionArray.push(sumArray[n]);
    var out = sumArray.splice(n, 1);
  } else {
    var n = Math.floor(Math.random() * difArray.length);
    if (difArray.length > 0) {
      questionArray.push(difArray[n]);
      var out = difArray.splice(n, 1);
    } else {
      i--;
    }
  }
}
//getQuestion('main-block', questionArray[0]);

buttonAnswer = document.getElementById("button-start");
//inputAnswer = document.getElementById("answer");
buttonAnswer.addEventListener('click', getQuestion);
//inputAnswer.addEventListener('keydown', getQuestion);


