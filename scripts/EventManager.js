var EventManager = {
    keys: [],

    createEventManager: function(){
            
        for(var i=0; i<300; i++)
        {
            EventManager.keys[i]=false;
        }

        window.addEventListener("keydown", function(e){
            console.log(e.which);
            EventManager.keys[e.which] = true;
        });

        window.addEventListener("keyup", function(e){
            EventManager.keys[e.which] = false;
        });
    },

    checkEvents: function(){

    }
}