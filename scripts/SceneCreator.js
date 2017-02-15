var SceneCreator = {
    camera: null,
    scene: null,

    createScene: function(){
        var canvas = document.getElementById('renderCanvas');
        var overlay = document.getElementById('overlay');

        var engine = new BABYLON.Engine(canvas, true);
        var light = null;
        var sphere = null;
        var ground = null;
        var movingVector = [0.0, 0.0];
        
        var createBabylonScene = function() {
            SceneCreator.scene = new BABYLON.Scene(engine);

            var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), SceneCreator.scene);
            var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), SceneCreator.scene);

            SceneCreator.camera = new BABYLON.FreeCamera("UniversalCamera", new BABYLON.Vector3(3, 1, 3), SceneCreator.scene);
            SceneCreator.camera.attachControl(overlay, true);
            SceneCreator.camera.speed = 3;

            SceneCreator.createPlane("ground", 200, "groundMat", [1, 1, 1], [0, 0, 0], [Math.PI/2, 0, 0], true);

            /*SceneCreator.createBox("crate", 2, "groudMat", [0.2, 0.2, 0.2], [5, -9, -8.2], [0, 0, 0], true);
            SceneCreator.createBox("crate2", 2, "groundMat", [0.1, 0.1, 0.1], [5, -10.4, -10.19], [Math.PI/4, 0, 0], true);
            SceneCreator.createBox("crate3", 2, "groundMat", [0.3, 0.3, 0.3], [5, -9.415, -9.2], [Math.PI/4, 0, 0], true);

            SceneCreator.createSphere("sphere", 1, 4, "groundMat", [0.2, 0.2, 0.9], [5, -5, -8.2], [0, 0, 0], true);*/

            SceneCreator.createBox("crate3", 6, "groundMat", [1, 0, 0], [0, -1, -2], [0, 0, 0], true);
            /*SceneCreator.createBox("crate3", 2, "groundMat", [0, 1, 0], [10, -9, 10], [Math.PI / 6, 0, 0], true);*/
            SceneCreator.createPlane("plane", 6, "groundMat", [0, 0, 0], [0, 1, 3.8], [(Math.PI/2) - Math.asin(1/3), Math.PI, 0], true); 

            SceneCreator.scene.gravity = new BABYLON.Vector3(0, -0.1, 0);

            SceneCreator.scene.collisionsEnabled = true;
            SceneCreator.camera.checkCollisions = true;
            SceneCreator.camera.applyGravity = true;
            SceneCreator.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

            
        }

        createBabylonScene();

        engine.runRenderLoop(function() {
            EventManager.checkEvents();
            SceneCreator.scene.render();
        });

        window.addEventListener('resize', function() {
            engine.resize();
        });
    },

    createBox: function(name, dimension, material, color, position, rotation, collisions){
        var box = BABYLON.Mesh.CreateBox(name, dimension, SceneCreator.scene);
        box.material = new BABYLON.StandardMaterial(material, SceneCreator.scene);
        box.material.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2]);
        box.position = new BABYLON.Vector3(position[0], position[1], position[2]);
        box.rotation = new BABYLON.Vector3(rotation[0], rotation[1], rotation[2]);
        box.checkCollisions = collisions;
    },

    createSphere: function(name, dimension, arcs, material, color, position, rotation, collisions){
        var sphere = BABYLON.Mesh.CreateSphere(name, arcs, dimension, SceneCreator.scene);
        sphere.material = new BABYLON.StandardMaterial(material, SceneCreator.scene);
        sphere.material.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2]);
        sphere.position = new BABYLON.Vector3(position[0], position[1], position[2]);
        sphere.rotation = new BABYLON.Vector3(rotation[0], rotation[1], rotation[2]);
        sphere.checkCollisions = collisions;
    },

    createPlane: function(name, dimension, material, color, position, rotation, collisions){
        var plane = BABYLON.Mesh.CreatePlane(name, dimension, SceneCreator.scene);
        plane.material = new BABYLON.StandardMaterial(material, SceneCreator.scene);
        plane.material.diffuseColor = new BABYLON.Color3(color[0], color[1], color[2]);
        plane.position = new BABYLON.Vector3(position[0], position[1], position[2]);
        plane.rotation = new BABYLON.Vector3(rotation[0], rotation[1], rotation[2]);
        plane.checkCollisions = collisions;
    }


}