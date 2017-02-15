var OverlayCreator = {


    createOverlay: function(){
        overlay.requestPointerLock = overlay.requestPointerLock || overlay.mozRequestPointerLock;
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

        overlay.onclick = function() {
            //overlay.requestPointerLock();
            //requestFullScreen(canvas);
            //fullScreen = true;
        }

        OverlayCreator.changeText("top-left", "<i>300</i>/<i>300</i>");
        OverlayCreator.changeText("bottom-right", "<img src='images/gun.png'/>")

        
    },
    
    changeText(position, text){
        document.querySelector("#overlay #"+position).innerHTML = text;
    }
}