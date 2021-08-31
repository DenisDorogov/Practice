class Storehouse {

    constructor() {
        if (localStorage.math == undefined) {
            let math = {"resetTime": undefined };
            math.resetTime =  Date.now();
            this.setStorage('math', math);
          }
    };

    setStorage(key, object) {
        var jsonObject = JSON.stringify(object);
        localStorage.setItem(key, jsonObject);
    };
      
    getStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    };
};

let storehouse = new Storehouse();