// Вывод результата в блок
function output(id, example) {
    var divMath = document.getElementById(id);
    var putIn = document.createElement("p");
    putIn.innerHTML = example;
    divMath.appendChild(putIn);
}

var countMath = 20;
var minSum = 10;
var maxSum = 20;
var difMax = 10;
var difMin = 0;
var sumArray = [];
var difArray = [];

//for (var i=1; i<=countMath; i++) {
//    var sum = Math.floor(Math.random()* (maxSum - minSum) + minSum);
//    var num1 = Math.floor(Math.random()* (maxSum - sum) + sum - minSum);
//    var num2 = sum - num1;
//    output("math1", num1 + " + " + num2 + " = ");
//}

//var sum = Math.floor(Math.random()* (maxSum - minSum) + minSum);

var n = 0;
for (var i = 0; i < (maxSum); i++) {
    for (var j = 0; j <= (maxSum); j++) {
        var num1 = maxSum - i;
        var num2 = maxSum - j;
        if (num1 + num2 <= maxSum) {
            sumArray[n++] = num1 + " + " + num2 + " = ";
        }
    }
}


var n = 0;
for (var i = 1; i < (difMax - difMin); i++) {
    for (var j = 0; j < (difMax - difMin); j++) {
        var num1 = difMax - i;
        var num2 = (difMax - num1) - j;
        if (num1 - num2 >= difMin && num2 >= 0) {
            difArray[n++] = num1 + " - " + num2 + " = ";
        }
    }
}
for (var k = 1; k <= 4; k++) {

    for (var i = 0; i < countMath; i++) {
        if (Math.floor(Math.random() * 2) == 1) {
            var n = Math.floor(Math.random() * sumArray.length);
            output("math" + k, sumArray[n]);
            var out = sumArray.splice(n, 1);
        } else {
            var n = Math.floor(Math.random() * difArray.length);
            if (difArray.length > 0) {
                output("math" + k, difArray[n]);
                var out = difArray.splice(n, 1);
            } else {
                i--;
            }

        }
    }
}









//for (var i=1; i<=countMath; i++) {
//    var sum = Math.floor(Math.random()* (maxSum - minSum) + minSum);
//    var num1 = Math.floor(Math.random()* (20 - sum) + sum - 10);
//    var num2 = sum - num1;
//    var divMath1 = document.getElementById("math1");
//    var example = document.createElement("p");
//    example.innerHTML = num1 + " + " + num2 + " = ";
//    divMath1.appendChild( example );                      
//}
//for (var i=1; i<=countMath; i++) {
//    var dif = Math.floor(Math.random()* (difMax - difMin) + difMin);
//    var num1 = Math.floor(Math.random()* (10 - dif) + 1 + dif);
//    var num2 = num1 - dif;
//    var divMath1 = document.getElementById("math2");
//    var example = document.createElement("p");
//    example.innerHTML = num1 + " - " + num2 + " = ";
//    divMath1.appendChild( example );                      
//}
