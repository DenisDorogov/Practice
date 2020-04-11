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
let rectification = false;
let k = 0;
var n = 0;
var message = ['СУПЕР!!!', 'ОТЛИЧНО', 'ХОРОШО', 'ПОЙДЁТ', 'ПЛОХО', 'УЖАСНО'];
var penalty = 0;
let time = Date.now();
let storage = {};
let colors = [
  [0, 'DarkRed', 6, 0],
  [2.5, 'DarkOrange', 5, 0.5],
  [3.5, 'Gold', 4, 0.6],
  [4.5, 'Lime', 3, 0.7],
  [5, 'DodgerBlue', 2, 0.8],
  [5.5, 'DarkMagenta', 1, 0.9] 
];


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

};

function resultStyle(value, param = 0) {
  for (let i = colors.length-1; i >= 0; i--) {
    if(colors[i][param] <= value) {
      return colors[i][1];
    };
  };
};

function showMark(result) {
  let around = Math.round(result*2) 
}


function outputStat() {
  let statistic = getStorage('math');
  
  let markAvg = statistic.averageResult;
  let lastResult = statistic.lastResult;
  let lastDate = statistic.lastDate;
  let resetDate = statistic.resetTime;
  let timeAttempt = statistic.time;
  console.log(Date.now(time) - statistic.resetTime)
  let countAVG = statistic.countAttempts/dateTransform( Date.now(time) - statistic.resetTime, 'days');
  console.log(Date.now(time) - statistic.resetTime);
  let divResultMarkAVG = document.getElementById('result-mark-avg');
  let divResultMarkLast = document.getElementById('result-mark-last');
  let divResultCountAVG = document.getElementById('result-count-AVG');
  let divResultDateReset = document.getElementById('result-date-reset');
  let divResultDateLast = document.getElementById('result-date-last');
  let divResultTimeTesting = document.getElementById('result-time-testing');
  
  divResultMarkAVG.style.color = resultStyle(markAvg);
  divResultMarkLast.style.color = resultStyle(lastResult);
  divResultCountAVG.style.color = resultStyle(countAVG,3);

  markAvg = Math.round(markAvg*100)/100;
  resetDate = dateTransform(resetDate,'date');

  lastDate = dateTransform(lastDate,'date') + dateTransform(lastDate,'time');
  timeAttempt = dateTransform(timeAttempt,'time');

  divResultMarkAVG.innerHTML = isNaN(markAvg) ? '' : `Средняя оценка: ${markAvg}`;
  divResultMarkLast.innerHTML = !!lastResult ? `Последняя оценка: ${lastResult}` : '' ;
  divResultCountAVG.innerHTML = !!countAVG ? `Среднее в день: ${countAVG}` : '';
  divResultDateReset.innerHTML = `Время сброса: ${resetDate}`;
  divResultDateLast.innerHTML = !!lastDate ? `Последняя проверка: ${lastDate}` : '';
  divResultTimeTesting.innerHTML = !!timeAttempt ? `Последнее время: ${timeAttempt}` : '';
};

function numNames(num, unit) {
  //console.log('num = ' + num);
  //num = String(num);
  switch(unit) {
    case 'month':
      switch(num) {
        case 1: return 'янв'; break;
        case 2: return 'фев'; break;
        case 3: return 'мар'; break;
        case 4: return 'апр'; break;
        case 5: return 'мая'; break;
        case 6: return 'июн'; break;
        case 7: return 'июл'; break;
        case 8: return 'авг'; break;
        case 9: return 'сен'; break;
        case 10: return 'окт'; break;
        case 11: return 'ноя'; break;
        case 12: return 'дек'; break;
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
  let days;
  let month;
    switch(method) {
      case 'date': 
        date = new Date(date);
        return  `${date.getDate()} ${numNames(date.getMonth() + 1,'month')}`;
        
      break;

      case 'time':
        //console.log('dateTransform time: ', date);
        date = new Date(date);
        return date.getUTCHours() + ':' + date.getUTCMinutes() + '.' + date.getUTCSeconds();
      break;

      case 'duration':
        date = Math.floor(date/1000);
        seconds = date % 60;
        minutes = (date-seconds) % 60;
        hours = (date-minutes-seconds) % 60;
        return `${hours}:${minutes}.${seconds}`;
      break;

      case 'days':
        date < 86400000 ? days = 1 :days = Math.floor(date/86400000);
        return days;
      break;


      case undefined: return 'неопределено';

      default: console.log('Неверный параметр: dateTransform: date: '+ date + ' method ' + method); break;  

    }
    
}

function getQuestion() {
  document.getElementById('results-block').innerHTML = '';
  var divMath = document.getElementById('main-block');
  divMath.innerHTML = `<form class="praxis-block" id = "praxis-block"><div class="praxis" id = "praxis">${questionArray[k][0]}</div><input type="text" autofocus class="answer" id="answer" ><div class="enter-answer" id="buttonAnswer" >ГОТОВО</div></form><div class="progress"><progress class="progress-line" max="${countMath}" value="${k+1}"></progress><h2 class="progress-digit">${k+1}/${countMath}</h2></div>`;
  buttonAnswer = document.getElementById("buttonAnswer");
  buttonAnswer.addEventListener('click', checkAnswer);
  inputAnswer = document.getElementById("answer");
  inputAnswer.addEventListener('keydown', function(event) {if ((event.keyCode == 13)/* || (event.keyCode == 9)*/) checkAnswer();});
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
  let color;
  mistakes += countMath - countCorrects;
  if (!rectification) {
    mark = 6 - mistakes/2;
    text = message[12 - mark*2];
    for (let i = colors.length - 1; i >= 0 ; i--) {
      if (colors[i][2] > mistakes) {
        color = colors[i][1];
        i = -1;
      };  
    };
  };
//  if (mistakes == 0) {mark = 6 - penalty; text = message[0+penalty];}
//  else if (mistakes <= 2) {mark = 5 - penalty; text = message[1+penalty];}
//  else if (mistakes <= 4) {mark = 4 - penalty; text = message[2+penalty];}
//  else if (mistakes <= 6) {mark = 3 - penalty; text = message[3+penalty];}
//  else mark = 2;
  var parent = document.getElementById('main-block');
  var elem = document.createElement("div");
  parent.innerHTML = `<div class="mark${Math.floor(mark)} result"><h1 id="mark-text" style="color: ${color}">${text}</h1></div><p id= "mark-result-text">Правильных ответов ${countCorrects} из ${countMath}</p>`;
  if (mistakes > 0) {
    penalty += 1;
    rectification = true; //режим исправления ошибок. В статистику не идёт.
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
    let stopTime = Date.now();
    //console.log(stopTime.toString());
    statistic.lastDate = stopTime;
    statistic.time = stopTime - time;
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
  math.resetTime =  Date.now();
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


