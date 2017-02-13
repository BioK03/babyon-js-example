var camera = null;

var fullScreen = false;


window.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('renderCanvas');
    var overlay = document.getElementById('overlay');

    var engine = new BABYLON.Engine(canvas, true);
    var scene = null;
    var light = null;
    var sphere = null;
    var ground = null;
    var movingVector = [0.0, 0.0];
    var arrObjects = [];
    
    var createScene = function() {
        var scene = new BABYLON.Scene(engine);

        // Lights
        var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
        var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);

        // Need a free camera for collisions
        camera = new BABYLON.FreeCamera("UniversalCamera", new BABYLON.Vector3(0, -8, -20), scene);
        camera.attachControl(overlay, true);
        camera.speed = 3;

        arrObjects.push(BABYLON.Mesh.CreatePlane("ground", 200.0, scene));
        arrObjects[arrObjects.length-1].material = new BABYLON.StandardMaterial("groundMat", scene);
        arrObjects[arrObjects.length-1].material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        arrObjects[arrObjects.length-1].position = new BABYLON.Vector3(5, -10, -15);
        arrObjects[arrObjects.length-1].rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

        arrObjects.push(BABYLON.Mesh.CreateBox("crate", 2, scene));
        arrObjects[arrObjects.length-1].material = new BABYLON.StandardMaterial("groundMat", scene);
        arrObjects[arrObjects.length-1].material.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        arrObjects[arrObjects.length-1].position = new BABYLON.Vector3(5, -9, -8.2);

        arrObjects.push(BABYLON.Mesh.CreateBox("crate", 2, scene));
        arrObjects[arrObjects.length-1].material = new BABYLON.StandardMaterial("groundMat", scene);
        arrObjects[arrObjects.length-1].material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        arrObjects[arrObjects.length-1].position = new BABYLON.Vector3(5, -10.4, -10.19);
        arrObjects[arrObjects.length-1].rotation = new BABYLON.Vector3(Math.PI / 4, 0, 0);

        arrObjects.push(BABYLON.Mesh.CreateBox("crate", 2, scene));
        arrObjects[arrObjects.length-1].material = new BABYLON.StandardMaterial("groundMat", scene);
        arrObjects[arrObjects.length-1].material.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        arrObjects[arrObjects.length-1].position = new BABYLON.Vector3(5, -9.415, -9.2);
        arrObjects[arrObjects.length-1].rotation = new BABYLON.Vector3(Math.PI / 4, 0, 0);

        scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

        scene.collisionsEnabled = true;
        camera.checkCollisions = true;
        camera.applyGravity = true;

        camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

        for(var i=0; i<arrObjects.length; i++)
        {
            arrObjects[i].checkCollisions = true;
        }
        return scene;
    }

    var scene = createScene();

    engine.runRenderLoop(function() {
        checkEvents();
        scene.render();
    });

    window.addEventListener('resize', function() {
        engine.resize();
    });

    var keys = [];
    for(var i=0; i<300; i++)
    {
        keys[i]=false;
    }

    window.addEventListener("keydown", function(e){
        keys[e.which] = true;
    });

    window.addEventListener("keyup", function(e){
        keys[e.which] = false;
    });

    var checkEvents = function(){
        movingVector[0] *= 0.5;
        movingVector[1] *= 0.5;

        if(keys[90] && movingVector[0]<1) {movingVector[0] += 0.01}
        if(keys[83] && movingVector[0]>-1) {movingVector[0] -= 0.01}
        if(keys[68] && movingVector[1]<1) {movingVector[1] += 0.01}
        if(keys[81] && movingVector[1]>-1) {movingVector[1] -= 0.01}

    };

    // CURSOR MANAGEMENT
    overlay.requestPointerLock = overlay.requestPointerLock || overlay.mozRequestPointerLock;
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

    overlay.onclick = function() {
        overlay.requestPointerLock();
        requestFullScreen(canvas);
        fullScreen = true;
    }

    document.addEventListener("mousemove", updatePosition, false);
    
    

});

document.body.oncontextmenu = function() {
    return false;
}

function updatePosition(e) {
    if(fullScreen){
        camera.rotation.x += e.movementY/1000
        camera.rotation.y += e.movementX/10000

        if(camera.rotation.x > 1.5){
            camera.rotation.x = 1.5;
        }

        if(camera.rotation.x < -1.5){
            camera.rotation.x = -1.5;
        }
    }

    console.log(camera.rotation);
  //console.log(e.movementX+" "+e.movementY);
  
}

function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}