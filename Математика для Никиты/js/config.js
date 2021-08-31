var countMath = 40;
var minSum = 20;
var maxSum = 100;
var difMax = 99;
var difMin = 11;
var multArray = [];
var difArray = [];
var questionArray = [];
let answerArray = [];
let countCorrects = 0;
let mistakes = 0;
let mark = 0;
let rectification = false;
let k = 0;
var n = 0;
var message = ['ОТЛИЧНО', 'ХОРОШО', 'ПОЙДЁТ', 'ПЛОХО', 'УЖАСНО'];
var penalty = 0;
let time = Date.now();
let storage = {};
let marks = [
  [0,    'DarkRed',      6, '2',  'ЖУТЬ',    0  ],
  [2.5,  'DarkOrange',   5, '3',  'УЖАСНО',  0.5],
  [3.5,  'Gold',         4, '4-', 'ПЛОХО',   0.6],
  [4,    '#70c81a',      3, '4',  'ПОЙДЁТ',  0.7],
  [4.25, '#00cbb0',      2, '5-', 'ХОРОШО',  0.8],
  [4.75, 'MediumOrchid', 1, '5',  'ОТЛИЧНО', 0.9] 
];