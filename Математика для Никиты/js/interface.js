class Interface {
    startBlock;

    constructor() {
        this.startBlock = document.getElementById("main-block");
        this.startBlock.addEventListener('click', (target) => {console.log(target.target.id + typeof(target.target.id));});
    }

};



