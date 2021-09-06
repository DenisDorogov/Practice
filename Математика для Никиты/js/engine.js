class Engine {
    examples = [];
    allExamples = [];




    constructor(type, difficulty) {
        this.examples = [];
        this.allExamples = [];
        switch (type) {
            case 'b-summ':
                this.examples = this.generateSumm(difficulty)
                break;
            case 'b-diff':
                this.examples = this.generateDiff(difficulty)
                break;
            case 'b-summ-diff':
                this.examples = this.generateSummDiff(difficulty)
                break;
            case 'b-mult':
                this.examples = this.generateMult(difficulty)
                break;
            case 'b-div':
                this.examples = this.generateDiv(difficulty)
                break;
            case 'b-mult-div':
                this.examples = this.generateMultDiv(difficulty)
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
            length--;
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
        return this.cutCount(this.allExamples, DIFFICULTY['summ'][difficulty].count);
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
        return this.cutCount(this.allExamples, DIFFICULTY['diff'][difficulty].count);
    }

    generateMult(difficulty = 'easy') {
        let example;
        let r;
        for (let a = DIFFICULTY['mult'][difficulty].end; a > DIFFICULTY['mult'][difficulty].start; a--) {
            for (let b = 10; b > 0; b--) {
                r = a * b;
                example = {
                    'example': a + ' x ' + b + ' =',
                    'answer': r,
                    'userAnswer': undefined,
                    'userResult': false
                };

                this.allExamples.push(example);
            };
        };
        return this.cutCount(this.allExamples, DIFFICULTY['mult'][difficulty].count);
    }

    generateDiv(difficulty = 'easy') {
        let example;
        let r;
        for (let a = DIFFICULTY['div'][difficulty].end; a > DIFFICULTY['div'][difficulty].start; a--) {
            for (let b = 10; b > 0; b--) {
                r = a * b;
                example = {
                    'example': r + ' / ' + a + ' =',
                    'answer': b,
                    'userAnswer': undefined,
                    'userResult': false
                };
                this.allExamples.push(example);
            };
        };
        return this.cutCount(this.allExamples, DIFFICULTY['div'][difficulty].count);
    }

    generateSummDiff(difficulty = 'easy') {
        let middleware;
        middleware = this.generateSumm(difficulty);
        this.allExamples = middleware.concat(this.generateDiff(difficulty));
        return this.cutCount(this.allExamples, DIFFICULTY['summ'][difficulty].count)
    }

    generateMultDiv(difficulty = 'easy') {
        let middleware;
        middleware = this.generateMult(difficulty);
        this.allExamples = middleware.concat(this.generateDiv(difficulty));
        return this.cutCount(this.allExamples, DIFFICULTY['mult'][difficulty].count)
    }


}
