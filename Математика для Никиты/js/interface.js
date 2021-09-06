class Interface {
    startBlock;
    difficulty = 'easy';

    constructor() {
        this.startBlock = document.getElementById("main-block");
        this.startBlock.addEventListener('click', (target) => {
            this.reaction(target.target.id);
        });
    }

    reaction(action) {

        switch (action) {
            case 'b-summ':
                examples = new Engine('b-summ', this.difficulty);
                break;

            case 'b-diff':
                examples = new Engine('b-diff', this.difficulty);
                break;

            case 'b-summ-diff':
                examples = new Engine('b-summ-diff', this.difficulty);
                break;

            case 'b-mult':
                examples = new Engine('b-mult', this.difficulty);
                break;

            case 'b-div':
                examples = new Engine('b-div', this.difficulty);
                break;

            case 'b-mult-div':
                examples = new Engine('b-mult-div', this.difficulty);
                break;

            default:
                alert('Case Interface ');
                break;
        }

    }

};



