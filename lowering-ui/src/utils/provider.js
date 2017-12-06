
let Provider;

(function(){
    let instance;
    Provider = function Provider(context){
       if (instance) {
           if (context) {
                console.warn("Initialized");
           }
           return instance;
       } 
       instance = this;
       this._context = context;
    }

    Provider.prototype.get = function(){
        return this._context;
    }
    Provider.get = function(){
        return Provider.init().get();
    }
    Provider.set = function(context){
        new Provider(context);
    }
    Provider.init = function(){
        return new Provider();
    }
})();

export default Provider;