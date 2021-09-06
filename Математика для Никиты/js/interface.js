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
                alert(action);
                break;

            case 'b-mult':
                alert(action);
                break;

            case 'b-div':
                alert(action);
                break;

            case 'b-mult-div':
                alert(action);
                break;

            case 'summ':
                alert(action);
                break;


            default:
                alert('Case Interface ');
                break;
        }

    }

};



