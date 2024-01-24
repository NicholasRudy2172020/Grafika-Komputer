import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { Water } from './node_modules/three/examples/jsm/objects/Water2.js';
import { PointerLockControls } from './node_modules/three/examples/jsm/controls/PointerLockControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x21383e );

const params = {
    color: '#ffffff',
    scale: 4,
    flowX: 1,
    flowY: 1
};
let water;

let cam = new THREE.PerspectiveCamera(
    45, //angle lebar kamera
    window.innerWidth/window.innerHeight, //aspect ratio
    0.1, //jarak terdekat view kamera
    100 //jarak terjauh view kamera
);
const renderer = new THREE.WebGLRenderer();

cam.position.set(0, -2, 5);
// const helper = new THREE.CameraHelper( cam );
// scene.add( helper );
renderer.setSize(window.innerWidth, window.innerHeight); //menentukan gambar hasilnya sebesar lebar & panjang yang ditentukan
document.body.appendChild(renderer.domElement); //inisialisasi canvas
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

// const controls = new PointerLockControls(cam, document.body);
// scene.add(controls.getObject());
const orbitControls = new OrbitControls(cam, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.25;
orbitControls.enableZoom = false;
orbitControls.maxPolarAngle = Math.PI /2;
orbitControls.minPolarAngle = Math.PI /2

const AmbLight = new THREE.AmbientLight(0xffffff,0.25)
scene.add(AmbLight)

const PointLight1 = new THREE.PointLight(0xffffff,10)
PointLight1.position.set(6, 0, 0);
scene.add(PointLight1)

const PointLight2 = new THREE.PointLight(0xffffff,10)
PointLight2.position.set(-6, 0, 0);
scene.add(PointLight2)

const sphereGeo = new THREE.SphereGeometry(20,20,20)
const sphereTexture = new THREE.TextureLoader().load('./Model/underwater.jpg')
const sphereMaterial = new THREE.MeshLambertMaterial( { 
    map:sphereTexture,
    side: THREE.DoubleSide 
} ); 
const SkySphere = new THREE.Mesh(sphereGeo, sphereMaterial)
scene.add(SkySphere)


const waterGeometry = new THREE.PlaneGeometry( 25, 4 );

water = new Water( waterGeometry, {
    color: params.color,
    scale: params.scale,
    reflectivity: 0,
    flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
    flowSpeed: 0.04,
    textureWidth: 1024,
    textureHeight: 1024,
} );

water.position.y = -1;
water.position.z = 5


const water2 = water.clone()
water2.position.y = -1;
water2.position.z = -3

water.rotation.x = -Math.PI;
// scene.add( water );
// scene.add( water2 );

const loader = new GLTFLoader();
const TexLoad = new THREE.TextureLoader().load('Model/metal.jpg');

const floorGeometry = new THREE.PlaneGeometry(22.5, 10);
const floorMaterial = new THREE.MeshLambertMaterial({ map:TexLoad, side: THREE.DoubleSide, specular: 0x050505, shininess: 100 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
floor.position.y = -3
scene.add(floor);

const roof = new THREE.Mesh(floorGeometry, floorMaterial);
roof.rotation.x = Math.PI / 2;
roof.position.y = 1
scene.add(roof);

const wall1 = new THREE.Mesh(new THREE.BoxGeometry(21, 1, 0.1), new THREE.MeshLambertMaterial({ map:TexLoad }));
wall1.position.y = 1;
wall1.position.z = -5
scene.add(wall1);

const wall2 = new THREE.Mesh(new THREE.BoxGeometry(21, 1, 0.1), new THREE.MeshLambertMaterial({ map:TexLoad }));
wall2.position.y = -3;
wall2.position.z = -5
scene.add(wall2);

const wall3 = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 0.1), new THREE.MeshLambertMaterial({ map:TexLoad }));
wall3.position.x = -11;
wall3.position.y = -1;
wall3.position.z = -5
scene.add(wall3);

const wall4 = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 0.1), new THREE.MeshLambertMaterial({ map:TexLoad }));
wall4.position.x = 11;
wall4.position.y = -1;
wall4.position.z = -5
scene.add(wall4);

const wall5 = new THREE.Mesh(new THREE.BoxGeometry(21, 1, 0.1), new THREE.MeshLambertMaterial({ map:TexLoad }));
wall5.position.y = 1;
wall5.position.z = 5
scene.add(wall5);

const wall6 = new THREE.Mesh(new THREE.BoxGeometry(21, 1, 0.1), new THREE.MeshLambertMaterial({ map:TexLoad }));
wall6.position.y = -3;
wall6.position.z = 5
scene.add(wall6);

const wall7 = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 0.1), new THREE.MeshLambertMaterial({ map:TexLoad }));
wall7.position.x = -11;
wall7.position.y = -1;
wall7.position.z = 5
scene.add(wall7);

const wall8 = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 0.1), new THREE.MeshLambertMaterial({ map:TexLoad }));
wall8.position.x = 11;
wall8.position.y = -1;
wall8.position.z = 5
scene.add(wall8);

const wall9 = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 0.1), new THREE.MeshLambertMaterial({ map:TexLoad }));
wall9.rotation.y = Math.PI *  - 0.5;
wall9.position.x = -11;
wall9.position.y = -1;
scene.add(wall9);

const wall10 = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 0.1), new THREE.MeshLambertMaterial({ map:TexLoad }));
wall10.rotation.y = Math.PI *  - 0.5;
wall10.position.x = 11;
wall10.position.y = -1;
scene.add(wall10);

const divider = new THREE.Mesh(new THREE.BoxGeometry(5, 20, 1), new THREE.MeshLambertMaterial({ map:TexLoad }));
divider.rotation.y = Math.PI *  - 0.5;
divider.position.y = -1
divider.position.z = 7
scene.add(divider);

PointLight1.castShadow = true;
PointLight2.castShadow = true;

floor.receiveShadow = true;
roof.receiveShadow = true;
wall1.castShadow = true;
wall2.castShadow = true;
wall3.castShadow = true;
wall4.castShadow = true;
wall5.castShadow = true;
wall6.castShadow = true;
wall7.castShadow = true;
wall8.castShadow = true;
divider.castShadow = true;

function createFluorescentLamp(lightPosition) {
    const lampGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.2, 32);
    const lampMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.5,
        roughness: 0.5,
        metalness: 0.5,
    });

    const lamp = new THREE.Mesh(lampGeometry, lampMaterial);
    lamp.position.copy(lightPosition);
    lamp.position.y = 1;
    lamp.castShadow = true;

    scene.add(lamp);

    return lamp;
}

const lamp1 = createFluorescentLamp(PointLight1.position);
const lamp2 = createFluorescentLamp(PointLight2.position);

function createFish(loader, modelPath, initialPosition, scale = 1) {
    const result = {
        model: null,
        mixer: null
    };

    loader.load(
        modelPath,
        function (gltf) {
            const fishModel = gltf.scene;
            scene.add(fishModel);

            fishModel.scale.set(scale, scale, scale);
            fishModel.position.copy(initialPosition);

            fishModel.traverse(function (object) {
                if (object.isMesh) object.castShadow = true;
            });

            const mixer = new THREE.AnimationMixer(fishModel);
            const clip = gltf.animations[0];
            clip.loop = THREE.LoopRepeat;
            clip.clampWhenFinished = true;
            const action = mixer.clipAction(clip);
            action.play();

            result.model = fishModel;
            result.mixer = mixer;
        }
    );

    return result;
}

const fish1 = createFish(loader, 'Model/emperor_angelfish.glb', new THREE.Vector3(-2, 0, 6), 1);
const fish2 = createFish(loader, 'Model/emperor_angelfish.glb', new THREE.Vector3(0, -1, 1), 1);
const fish3 = createFish(loader, 'Model/emperor_angelfish.glb', new THREE.Vector3(-5, -2, 1), 1);

const fish7 = createFish(loader, 'Model/redfish.glb', new THREE.Vector3(2, 0, 6), 0.001);
const fish8 = createFish(loader, 'Model/redfish.glb', new THREE.Vector3(1, -3, 6), 0.001);
const fish9 = createFish(loader, 'Model/redfish.glb', new THREE.Vector3(4, -2, 8), 0.001);


const angelfishes = [fish1, fish2, fish3];
scene.add(angelfishes)
const redfishes = [fish7, fish8, fish9];
scene.add(redfishes)


// const movementSpeed = 0.1;

// function handleKeyDown(event) {
//   switch (event.code) {
//     case 'KeyW':
//       moveCameraForward();
//       break;
//     case 'KeyA':
//       controls.moveRight(1);
//       break;
//     case 'KeyS':
//       moveCameraBackward();
//       break;
//     case 'KeyD':
//       controls.moveRight(-1);
//       break;
//   }
// }

  
//   function handleKeyUp(event) {
//     switch (event.code) {
//       case 'KeyW':
//       case 'KeyA':
//       case 'KeyS':
//       case 'KeyD':
//         controls.moveForward(0);
//         controls.moveRight(0);
//         break;
//     }
//   }

//   function moveCameraForward() {
//     const direction = new THREE.Vector3();
//     cam.getWorldDirection(direction);
//     cam.position.addScaledVector(direction, -movementSpeed);
//   }
  
//   function moveCameraBackward() {
//     const direction = new THREE.Vector3();
//     cam.getWorldDirection(direction);
//     cam.position.addScaledVector(direction, movementSpeed);
//   }
  
//   document.addEventListener('keydown', handleKeyDown);
//   document.addEventListener('keyup', handleKeyUp);

  function draw(){
    requestAnimationFrame(draw);
    angelfishes.forEach(fish => {
        if (fish.mixer) {
            fish.mixer.update(0.025);
            fish.model.position.x -= 0.005;
            fish.model.position.z = 7;
            fish.model.rotation.y = 10;
            if (fish.model.position.x < -20) {
                fish.model.position.x += 50;
            }
        }
    });
    
    redfishes.forEach(fish => {
        fish.model.rotation.y = 1.5
        if (fish.mixer) {
            fish.mixer.update(0.025);
            fish.model.position.x += 0.007;
            if (fish.model.position.x > 20) {
                fish.model.position.x -= 50;
            }
        }
    });

    // controls.getObject().position.copy(cam.position);
    // controls.getObject().rotation.copy(cam.rotation);
    orbitControls.update();
    renderer.render(scene, cam);
}
draw();