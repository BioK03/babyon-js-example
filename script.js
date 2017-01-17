window.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('renderCanvas');

    var engine = new BABYLON.Engine(canvas, true);
    var scene = null;
    var camera = null;
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
        var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, -8, -20), scene);
        camera.attachControl(canvas, true);
        camera.speed = 3;

        arrObjects.push(BABYLON.Mesh.CreatePlane("ground", 200.0, scene));
        arrObjects[arrObjects.length-1].material = new BABYLON.StandardMaterial("groundMat", scene);
        arrObjects[arrObjects.length-1].material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        arrObjects[arrObjects.length-1].position = new BABYLON.Vector3(5, -10, -15);
        arrObjects[arrObjects.length-1].rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

        arrObjects.push(BABYLON.Mesh.CreateBox("crate", 2, scene));
        arrObjects[arrObjects.length-1].material = new BABYLON.StandardMaterial("groundMat", scene);
        arrObjects[arrObjects.length-1].material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        arrObjects[arrObjects.length-1].position = new BABYLON.Vector3(5, -9, -8.2);

        arrObjects.push(BABYLON.Mesh.CreateBox("crate", 2, scene));
        arrObjects[arrObjects.length-1].material = new BABYLON.StandardMaterial("groundMat", scene);
        arrObjects[arrObjects.length-1].material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        arrObjects[arrObjects.length-1].position = new BABYLON.Vector3(5, -10.4, -10.19);
        arrObjects[arrObjects.length-1].rotation = new BABYLON.Vector3(Math.PI / 4, 0, 0);

        arrObjects.push(BABYLON.Mesh.CreateBox("crate", 2, scene));
        arrObjects[arrObjects.length-1].material = new BABYLON.StandardMaterial("groundMat", scene);
        arrObjects[arrObjects.length-1].material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
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
        movingVector[0] *= 0.95;
        movingVector[1] *= 0.95;

        if(keys[90] && movingVector[0]<1) {movingVector[0] += 0.1}
        if(keys[83] && movingVector[0]>-1) {movingVector[0] -= 0.1}
        if(keys[68] && movingVector[1]<1) {movingVector[1] += 0.1}
        if(keys[81] && movingVector[1]>-1) {movingVector[1] -= 0.1}
        /*sphere.position.z += movingVector[0]*0.1;
        sphere.position.x += movingVector[1]*0.1;*/
    };
});
