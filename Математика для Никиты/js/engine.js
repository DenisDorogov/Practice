class Engine {
    examples = [];
    allExamples = [];




    constructor(type, difficulty) {
        this.examples = [];
        this.allExamples = [];
        switch (type) {
            case 'b-summ':
                this.examples = this.generateSumm(difficulty)
                console.log(this.examples);
                break;
            case 'b-diff':
                this.examples = this.generateDiff(difficulty)
                console.log(this.examples);
                break;
            case 'b-summ-diff':
                this.examples = this.generateSummDiff(difficulty)
                console.log(this.examples);
                break;
            case 'b-mult':
                this.examples = this.generateMult(difficulty)
                console.log(this.examples);
                break;
            case 'b-div':
                this.examples = this.generateDiv(difficulty)
                console.log(this.examples);
                break;
            case 'b-mult-div':
                this.examples = this.generateMultDiff(difficulty)
                console.log(this.examples);
                break;

            default:
                break;
        }
    }

    cutCount(array, count = null) {
        if (count === null) count = COUNT_EXAMPLES;
        let length = array.length;
        let resultArray = [];
        let n, out;
        for (var i = 0; i < count; i++) {
            n = Math.floor(Math.random() * length);
            resultArray.push(array[n]);
            out = array.splice(n, 1);
        }
        return resultArray;
    }


    generateSumm(difficulty = 'easy') {
        let example;
        let a;
        for (let r = DIFFICULTY['summ'][difficulty].end; r > DIFFICULTY['summ'][difficulty].start; r--) {
            for (let b = r - 1; b > 0; b--) {
                a = r - b;
                example = {
                    'example': a + ' + ' + b + ' =',
                    'answer': r,
                    'userAnswer': undefined,
                    'userResult': false
                };
                this.allExamples.push(example);
            }
        }
        return this.cutCount(this.allExamples);
    }

    generateDiff(difficulty = 'easy') {
        let example;
        let r;
        for (let a = DIFFICULTY['diff'][difficulty].end; a > DIFFICULTY['diff'][difficulty].start; a--) {
            for (let b = a - 1; b > 0; b--) {
                r = a - b;
                example = {
                    'example': a + ' - ' + b + ' =',
                    'answer': r,
                    'userAnswer': undefined,
                    'userResult': false
                };
                this.allExamples.push(example);
            };
        };
        console.log(this.allExamples); //debug
        return this.cutCount(this.allExamples);
    }


}
