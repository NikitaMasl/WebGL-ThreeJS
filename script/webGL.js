window.onload = function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvas = document.getElementById('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    var renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0xffffff);
    renderer.shadowMapEnabled = true;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 60, width /height, 0.1, 1000 );

    var light = new THREE.SpotLight( 0xFFFFFF ); 
    light.position.set(10, 200, 0);
    light.castShadow = true;
    scene.add( light );

    var uniforms = {};
    uniforms.resolution = {type:'v2',value:new THREE.Vector2(window.innerWidth,window.innerHeight)};

    //var texture1 = new THREE.TextureLoader().load( '../img/Base.jpg' );

    var geometry = new THREE.BoxGeometry( 2, 0.1, 2 );
    var materials = new THREE.MeshLambertMaterial( {color: 0xff0000} );
    var base = new THREE.Mesh( geometry, materials );
    base.position.y=-1;
    base.receiveShadow = true;
    scene.add( base );

    //var texture2 = new THREE.TextureLoader().load( '../img/Wall.jpg' );

    var geometryWall = new THREE.BoxGeometry( 0.1, 0.9, 2 );
    var materialsWall = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
    var wall1 = new THREE.Mesh( geometryWall, materialsWall );
    wall1.position.y=-0.5;
    wall1.position.x=-0.95;
    wall1.castShadow = true;
    wall1.receiveShadow = true;
    scene.add( wall1 );    

    var geometryWall2 = new THREE.BoxGeometry( 2, 0.9, 0.1 );
    var materialsWall2 = new THREE.MeshLambertMaterial( {color: 0x00ff00} ) ;
    var wall2 = new THREE.Mesh( geometryWall2, materialsWall2 );
    wall2.position.y=-0.5;
    wall2.position.z=-0.95;
    wall2.castShadow = true;
    wall2.receiveShadow = true;
    scene.add( wall2 ); 


    var vertices = [
        new THREE.Vector3(1,1,1),//1
        new THREE.Vector3(1,1,0.95),//2
        new THREE.Vector3(1,0.925,1),//3
        new THREE.Vector3(1,0.975,0.95),//4
        new THREE.Vector3(0.6,1,0.95),//5
        new THREE.Vector3(0.6,1,1),//6
        new THREE.Vector3(0.6,0.975,0.95),//7
        new THREE.Vector3(0.6,0.925,1)//8
        ];


    var vertices1 = [
        new THREE.Vector3(1,1,1),//1
        new THREE.Vector3(1,1,-0.6),//2
        new THREE.Vector3(1,-0.975,1),//3
        new THREE.Vector3(1,-0.925,-0.6),//4
        new THREE.Vector3(-0.925,1,-1),//5
        new THREE.Vector3(-1,0.925,0.6),//6
        new THREE.Vector3(-1,-0.95,-1),//7
        new THREE.Vector3(-0.925,-0.975,0.6)//8
        ];

    var faces = [
        new THREE.Face3(0,2,1),
        new THREE.Face3(2,3,1),
        new THREE.Face3(4,6,5),
        new THREE.Face3(6,7,5),
        new THREE.Face3(4,5,1),
        new THREE.Face3(5,0,1),
        new THREE.Face3(7,6,2),
        new THREE.Face3(6,3,2),
        new THREE.Face3(5,7,0),
        new THREE.Face3(7,2,0),
        new THREE.Face3(1,3,4),
        new THREE.Face3(3,6,4),
        ];
    var geomforsteps1 = new THREE.Geometry();
    geomforsteps1.vertices = vertices;
    geomforsteps1.faces = faces;
    
    var geomforsteps2 = new THREE.Geometry();
    geomforsteps2.vertices = vertices1;
    geomforsteps2.faces = faces;

    var materialTest = [new THREE.MeshBasicMaterial({color:0x00FFFF})];
    //var testGeometry = new THREE.Mesh( geom, materialTest );

    //testGeometry.position.x = -0.4;
    //testGeometry.position.y = -1.9;
    //testGeometry.position.z = -0.5;

    //scene.add(testGeometry);
    var steps1 = [];
    for(i=0; i<10; i++){    
      steps1 = new THREE.Mesh( geomforsteps1, materialTest );
      scene.add(steps1);
      steps1.position.x = -0.4;
      steps1.position.y = -1.9 + (i*0.05);
      steps1.position.z = -1 - (i*0.05);
    }

    var steps2 = [];
    for(i=0; i<10; i++){    
      steps2 = new THREE.Mesh( geomforsteps2, materialTest );
      scene.add(steps2);
      steps2.position.x = -0.4;
      steps2.position.y = -1.4 + (i*0.05);
      steps2.position.z = -1.5 - (i*0.05);
    }

    camera.position.x = 2;
    camera.position.y = 1.5;
    camera.position.z = 2;

    var controls = new OrbitControls( camera, canvas );
    controls.enableDamping = true; 3
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    //controls.minDistance = 100;
    //controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;

    var animate = function () {
        requestAnimationFrame( animate );
        controls.update(); 
        render();
    };
    function render() {
        camera.lookAt(base.position);
        renderer.render( scene, camera );
    }

    animate();

}