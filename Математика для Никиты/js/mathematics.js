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
let time = new Date();
let storage = {};


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
function outputStat() {
  let statistic = getStorage('math');
  
  let markAvg = statistic.averageResult;
  let lastResult = statistic.lastResult;
  let lastDate = statistic.lastDate;
  let resetDate = statistic.resetTime;
  let divMarkAvg = document.getElementById('markAvg');
  let divLastResult = document.getElementById('lastResult');
  let divLastDate = document.getElementById('lastDate');
  let divResetDate = document.getElementById('resetDate');
  console.log(lastDate);
  //lastDate = Date.parse(lastDate);
  //lastDate = `${lastDate.getDate()}. ${lastDate.getMonth()}`;
  divMarkAvg.innerHTML = `Средняя оценка: ${markAvg}`;
  divLastResult.innerHTML = `Последняя оценка: ${lastResult}`;
  divLastDate.innerHTML = `Последняя проверка: ${lastDate}`;
  divResetDate.innerHTML = `Время сброса: ${resetDate}`;
};

function numNames(num, unit) {
  //console.log('num = ' + num);
  //num = String(num);
  switch(unit) {
    case 'month':
      switch(num) {
        case 'Jan': return 'янв'; break;
        case 'Feb': return 'фев'; break;
        case 'Mar': return 'мар'; break;
        case 'Apr': return 'апр'; break;
        case 'May': return 'мая'; break;
        case 'Jun': return 'июн'; break;
        case 'Jul': return 'июл'; break;
        case 'Aug': return 'авг'; break;
        case 'Sep': return 'сен'; break;
        case 'Oct': return 'окт'; break;
        case 'Nov': return 'ноя'; break;
        case 'Dec': return 'дек'; break;
        default: unit; break;
      }
      break;

      default: console.log('numNames: неправильно задан параметр'); break;
  }
  

} ;


function dateTransform(date, method) { //date = Fri Apr 03 2020 18:26:27 GMT+0500 (Екатеринбург, стандартное время)
  //if (typeof (date) !== 'string') return console.log('dateTransform: date= '+ date + typeof date);
  if (typeof(date) == 'undefined') return;
  let hours;
  let minutes;
  let seconds;
  //if (typeof(date) == 'object') date = date.toISOString();
  
    switch(method) {
      case 'date': 
        return  `${date.slice(8,10)} ${numNames(date.slice(4,7),'month')}`;
        
      break;

      case 'time':
        console.log('dateTransform time: ', date);
        date = toString(date);

        hours = date.slice(11,13);
        minutes = date.slice(14,16);
        seconds = date.slice(17,19);
        date = '';
        if (hours !== '00')  date = hours + ':';
        return date + minutes + '.' + seconds;
      break;

      case 'duration':
        date = Math.floor(date/1000);
        seconds = date % 60;
        minutes = (date-seconds) % 60;
        hours = (date-minutes-seconds) % 60;
        return `${hours}:${minutes}.${seconds}`;
      break;
      case undefined: return 'неопределено';

      default: console.log('Неверный параметр: dateTransform: date: '+ date + ' method ' + method); break;  

    }
    
}

function getQuestion() {
  if (startTime = 0) startTime = new Date();
  document.getElementById('results-block').innerHTML = '';
  var divMath = document.getElementById('main-block');
  divMath.innerHTML = `<form class="praxis-block" id = "praxis-block"><div class="praxis" id = "praxis">${questionArray[k][0]}</div><input type="text" autofocus class="answer" id="answer" ><div class="enter-answer" id="buttonAnswer" >ГОТОВО</div></form>`;
  buttonAnswer = document.getElementById("buttonAnswer");
  buttonAnswer.addEventListener('click', checkAnswer);
  inputAnswer = document.getElementById("answer");
  inputAnswer.addEventListener('keydown', function(event) {if ((event.keyCode == 13) || (event.keyCode == 9)) checkAnswer();});
//  inputAnswer.focus();
 
};
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
    
    statistic = getStorage('math');
    statistic.countAttempts += 1;
    statistic.lastResult = mark;
    statistic.averageResult =  (statistic.averageResult * (statistic.countAttempts - 1) + statistic.lastResult)/statistic.countAttempts;
    
    statistic.message = 'Время решения';
    let stopTime = new Date();
    console.log(stopTime.toString());
    statistic.lastDate = dateTransform(stopTime.toString(), 'date');
    statistic.time = dateTransform( stopTime - time , 'duration');
    setStorage('math' , statistic);
}

function setStorage(key, object) {
  var jsonObject = JSON.stringify(object);
  localStorage.setItem(key, jsonObject);
}

function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}


//time = new Date();
//console.log (time);
//console.log (time.toString());
//console.log (time.toDateString());

//console.log (time.toISOString());

//console.log (time.toUTCString());

//console.log (time.toGMTString());



////console.log (time.toTimeString());

//console.dir (time.toUTCString());
//console.log ('cnhjrf');



if (localStorage.math == undefined) {
  let math = {"resetTime": undefined };
  math.resetTime =  dateTransform((new Date()).toString(), 'date');
  setStorage('math', math);
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
outputStat();
buttonAnswer = document.getElementById("button-start");
//inputAnswer = document.getElementById("answer");
buttonAnswer.addEventListener('click', getQuestion);
//inputAnswer.addEventListener('keydown', getQuestion);


