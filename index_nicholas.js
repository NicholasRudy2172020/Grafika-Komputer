import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { Water } from './node_modules/three/examples/jsm/objects/Water2.js';
import gsap from './node_modules/gsap/gsap-core.js';
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

const PointLight1 = new THREE.PointLight(0xffffff,100)
PointLight1.position.set(6, 0, 0);
scene.add(PointLight1)

const PointLight2 = new THREE.PointLight(0xffffff,100)
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

//zoom
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let clickedCoordinates = new THREE.Vector3();
let isZoomedIn = false;

function onClick(event) {
    //referensi kode = https://discourse.threejs.org/t/zoom-into-object-and-open-popup-on-click/40337 pada 16.12 tanggal 24/01/2024
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, cam);

    //referensi kode = chatgpt pada 16.12 tanggal 24/01/2024
    const allFishModels = [
        ...angelfishes.map(fish => fish.model),
        ...angelfishes2.map(fish => fish.model),
        ...redfishes.map(fish => fish.model),
        ...bluewhale.map(fish => fish.model),
        ...killerwhale.map(fish => fish.model),
        ...spermwhalefish.map(fish => fish.model),
        ...stingrayfish.map(fish => fish.model),
        ...turtle.map(fish => fish.model),
        ...tunafish.map(fish => fish.model),
        ...clownfish.map(fish => fish.model),
        ...doryfish.map(fish => fish.model),
    ];

    const intersects = raycaster.intersectObjects(allFishModels, true);

    if (intersects.length > 0) {
        var object = intersects[0].object;

        clickedCoordinates.copy(intersects[0].point);

        if (isZoomedIn) {
            MovingFish();
            resetCamera();
        } else {
            zoomToObject(object);
            stopFishMovement();
        }
    } 
}

function resetCamera() {
    //referensi kode = chatgpt pada 16.12 tanggal 24/01/2024
    let tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: "expo.out",
            onUpdate: function () {
                orbitControls.enabled = false;
            },
            onComplete: function () {
                orbitControls.enabled = true;
                isZoomedIn = false;
            },
        },
    });

    tl.to(orbitControls.target, { x: 0, y: 0, z: 0 }).to(
        cam.position,
        { x: 0, y: -2, z: 5 },
        0
    );
}

document.addEventListener('click', onClick);

//referensi kode = https://discourse.threejs.org/t/zoom-into-object-and-open-popup-on-click/40337 pada 16.12 tanggal 24/01/2024
function zoomToObject(object) {

    let tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: "expo.out",
            onUpdate: function () {
                orbitControls.enabled = false;
            },
            onComplete: function () {
                orbitControls.enabled = true;
            },
        },
    });

    tl.to(orbitControls.target, { x: clickedCoordinates.x, y: clickedCoordinates.y, z: clickedCoordinates.z }).to(
        cam.position,
        { x: clickedCoordinates.x+1, y: clickedCoordinates.y+1, z: clickedCoordinates.z-3},
        0
    );

    isZoomedIn = true;
}

function stopFishMovement() {
    angelfishes.forEach(fish => {
        fish.isMoving = false; 
    });

    angelfishes2.forEach(fish => {
        fish.isMoving = false;
    });

    redfishes.forEach(fish => {
        fish.isMoving = false; 
    });

    bluewhale.forEach(fish => {
        fish.isMoving = false; 
    });

    killerwhale.forEach(fish => {
        fish.isMoving = false;
    });

    spermwhalefish.forEach(fish => {
        fish.isMoving = false; 
    });

    stingrayfish.forEach(fish => {
        fish.isMoving = false; 
    });

    turtle.forEach(fish => {
        fish.isMoving = false;
    });

    tunafish.forEach(fish => {
        fish.isMoving = false; 
    });

    clownfish.forEach(fish => {
        fish.isMoving = false; 
    });

    doryfish.forEach(fish => {
        fish.isMoving = false; 
    });

}

function MovingFish() {
    angelfishes.forEach(fish => {
        fish.isMoving = true; 
    });

    angelfishes2.forEach(fish => {
        fish.isMoving = true;
    });

    redfishes.forEach(fish => {
        fish.isMoving = true; 
    });

    bluewhale.forEach(fish => {
        fish.isMoving = true; 
    });

    killerwhale.forEach(fish => {
        fish.isMoving = true;
    });

    spermwhalefish.forEach(fish => {
        fish.isMoving = true; 
    });

    stingrayfish.forEach(fish => {
        fish.isMoving = true; 
    });

    turtle.forEach(fish => {
        fish.isMoving = true;
    });

    tunafish.forEach(fish => {
        fish.isMoving = true; 
    });

    clownfish.forEach(fish => {
        fish.isMoving = true; 
    });

    doryfish.forEach(fish => {
        fish.isMoving = true; 
    });
};

// Referensi: https://threejs.org/docs/#api/en/core/Object3D.position
const fish1 = createFish(loader, 'Model/emperor_angelfish.glb', new THREE.Vector3(-2, 0, 6), 1);
fish1.isMoving = true;
const fish2 = createFish(loader, 'Model/emperor_angelfish.glb', new THREE.Vector3(0, -1, 1), 1);
fish2.isMoving = true;
const fish3 = createFish(loader, 'Model/emperor_angelfish.glb', new THREE.Vector3(-5, -2, 1), 1);
fish3.isMoving = true;

const fish31 = createFish(loader, 'Model/emperor_angelfish.glb', new THREE.Vector3(-1, -2, 10), 1);
fish31.isMoving = true;
const fish32 = createFish(loader, 'Model/emperor_angelfish.glb', new THREE.Vector3(-2, -1, 10), 1);
fish32.isMoving = true;
const fish33 = createFish(loader, 'Model/emperor_angelfish.glb', new THREE.Vector3(-4, -2, 12), 1);
fish33.isMoving = true;

const fish7 = createFish(loader, 'Model/redfish.glb', new THREE.Vector3(0, -1, 9), 0.002);
fish7.isMoving = true;
const fish8 = createFish(loader, 'Model/redfish.glb', new THREE.Vector3(2, -2, 8), 0.002);
fish8.isMoving = true;
const fish9 = createFish(loader, 'Model/redfish.glb', new THREE.Vector3(6, -2, 10), 0.002);
fish9.isMoving = true;

const fish13 = createFish(loader, 'Model/blue_whale.glb', new THREE.Vector3(-11, -7, -10), 0.001);
fish13.isMoving = true;
const fish14 = createFish(loader, 'Model/blue_whale.glb', new THREE.Vector3(5, -10, -10), 0.001);
fish14.isMoving = true;
const fish15 = createFish(loader, 'Model/blue_whale.glb', new THREE.Vector3(-2, -15, -15), 0.001);
fish15.isMoving = true;

// const fish16 = createFish(loader, 'Model/blue_whale.glb', new THREE.Vector3(-25, 10, 13), 0.001);
// const fish17= createFish(loader, 'Model/blue_whale.glb', new THREE.Vector3(30, -15, 20), 0.001);
// const fish18 = createFish(loader, 'Model/blue_whale.glb', new THREE.Vector3(15, -10, 10), 0.001);

const fish16 = createFish(loader, 'Model/killer_whale.glb', new THREE.Vector3(-11, -3, -12), 0.001);
fish16.isMoving = true;
const fish17 = createFish(loader, 'Model/killer_whale.glb', new THREE.Vector3(5, -2, -10), 0.001);
fish17.isMoving = true;
const fish18 = createFish(loader, 'Model/killer_whale.glb', new THREE.Vector3(-2, -1, -12), 0.001);
fish18.isMoving = true;

const fish19 = createFish(loader, 'Model/sperm_whale.glb', new THREE.Vector3(-13, -1, -7), 0.001);
fish19.isMoving = true;
const fish20 = createFish(loader, 'Model/sperm_whale.glb', new THREE.Vector3(9, -2, -9), 0.001);
fish20.isMoving = true;
// const fish21 = createFish(loader, 'Model/sperm_whale.glb', new THREE.Vector3(-3, -2, -11), 0.001);

const fish22 = createFish(loader, 'Model/stingray.glb', new THREE.Vector3(3, 0, 12), 0.003);
fish22.isMoving = true;
const fish23 = createFish(loader, 'Model/stingray.glb', new THREE.Vector3(1, -3, 12), 0.003);
fish23.isMoving = true;
const fish24 = createFish(loader, 'Model/stingray.glb', new THREE.Vector3(10, -1, 12), 0.003);
fish24.isMoving = true;

const fish25 = createFish(loader, 'Model/juvenile_turtle.glb', new THREE.Vector3(-3, -2, 13), 0.001);
fish25.isMoving = true;
const fish26 = createFish(loader, 'Model/juvenile_turtle.glb', new THREE.Vector3(-7, -1, 12), 0.001);
fish26.isMoving = true;
const fish27 = createFish(loader, 'Model/juvenile_turtle.glb', new THREE.Vector3(-10, -3, 12), 0.001);
fish27.isMoving = true;

const fish28 = createFish(loader, 'Model/tuna_fish.glb', new THREE.Vector3(0, 0, 13), 0.001);
fish28.isMoving = true;
const fish29 = createFish(loader, 'Model/tuna_fish.glb', new THREE.Vector3(-1, -3, 13), 0.001);
fish29.isMoving = true;
const fish30 = createFish(loader, 'Model/tuna_fish.glb', new THREE.Vector3(-4, -1, 13), 0.001);
fish30.isMoving = true;

const fish34 = createFish(loader, 'Model/clownfish.glb', new THREE.Vector3(1, 0, 13), 0.001);
fish34.isMoving = true;
const fish35 = createFish(loader, 'Model/clownfish.glb', new THREE.Vector3(-5, -2, 12), 0.001);
fish35.isMoving = true;
const fish36 = createFish(loader, 'Model/clownfish.glb', new THREE.Vector3(6, 0, 12), 0.001);
fish36.isMoving = true;

const fish37 = createFish(loader, 'Model/dory.glb', new THREE.Vector3(12, 0, 13), 0.001);
fish37.isMoving = true;
const fish38 = createFish(loader, 'Model/dory.glb', new THREE.Vector3(9, -2, 12), 0.001);
fish38.isMoving = true;
const fish39 = createFish(loader, 'Model/dory.glb', new THREE.Vector3(13, -3, 12), 0.001);
fish39.isMoving = true;

const angelfishes = [fish1, fish2, fish3];
scene.add(angelfishes)
const angelfishes2 = [fish31, fish32, fish33];
scene.add(angelfishes2)
const redfishes = [fish7, fish8, fish9];
scene.add(redfishes)
const bluewhale = [fish13, fish14, fish15];
scene.add(bluewhale)
const killerwhale = [fish16, fish17, fish18];
scene.add(killerwhale)
const spermwhalefish = [fish19, fish20];
scene.add(spermwhalefish)
const stingrayfish = [fish22, fish23, fish24];
scene.add(stingrayfish)
const turtle = [fish25, fish26, fish27];
scene.add(turtle)
const tunafish = [fish28, fish29, fish30];
scene.add(tunafish)
const clownfish = [fish34, fish35, fish36];
scene.add(clownfish)
const doryfish = [fish37, fish38, fish39];
scene.add(doryfish)


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

// Create a clickable box
const blue_killer_whale_infoBoxGeometry = new THREE.BoxGeometry(0.5,0.5,0.5);
let box_texture = new THREE.TextureLoader().load('./Model/boxtextures.jpg')
const blue_killer_whale_infoBoxMaterial = new THREE.MeshBasicMaterial({ map: box_texture });
const infoBox = new THREE.Mesh(blue_killer_whale_infoBoxGeometry, blue_killer_whale_infoBoxMaterial);
infoBox.position.set(0, -2.74, 4.22); // Set the position of the info box
scene.add(infoBox);

const angel_red_fish_infoBoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
let box2_texture = new THREE.TextureLoader().load('./Model/boxtextures.jpg')
const angel_red_fish_infoBox2Material = new THREE.MeshBasicMaterial({ map: box2_texture });
const infoBox2 = new THREE.Mesh(angel_red_fish_infoBoxGeometry, angel_red_fish_infoBox2Material);
infoBox2.position.set(10.3, -2.74, 4.6); // Set the position of the second info box
scene.add(infoBox2);

const spermfish_stingray_infoBoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
let box3_texture = new THREE.TextureLoader().load('./Model/boxtextures.jpg')
const spermfish_stingray_infoBox3Material = new THREE.MeshBasicMaterial({ map: box3_texture });
const infoBox3 = new THREE.Mesh(spermfish_stingray_infoBoxGeometry, spermfish_stingray_infoBox3Material);
infoBox3.position.set(-10.3, -2.74, -4.6); // Set the position of the second info box
scene.add(infoBox3);

const turtle_tunafish_infoBoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
let box4_texture = new THREE.TextureLoader().load('./Model/boxtextures.jpg')
const turtle_tunafish_infoBox4Material = new THREE.MeshBasicMaterial({ map: box4_texture });
const infoBox4 = new THREE.Mesh(turtle_tunafish_infoBoxGeometry, turtle_tunafish_infoBox4Material);
infoBox4.position.set(-10.3, -2.74, 4.6); // Set the position of the second info box
scene.add(infoBox4);

const clown_doryfish_infoBoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
let box5_texture = new THREE.TextureLoader().load('./Model/boxtextures.jpg')
const clown_doryfish_infoBox4Material = new THREE.MeshBasicMaterial({ map: box5_texture });
const infoBox5 = new THREE.Mesh(clown_doryfish_infoBoxGeometry, clown_doryfish_infoBox4Material);
infoBox5.position.set(10.3, -2.74, -4.6); // Set the position of the second info box
scene.add(infoBox5);


// Add event listener for mouse click
document.addEventListener('click', onMouseClick, false);
document.addEventListener('click', onMouseClick2, false)
document.addEventListener('click', onMouseClick3, false)
document.addEventListener('click', onMouseClick4, false)
document.addEventListener('click', onMouseClick5, false)

// Function to handle mouse click
function onMouseClick(event) {  // Sumber: https://discourse.threejs.org/t/zoom-into-object-and-open-popup-on-click/40337
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set raycaster with mouse and camera
    raycaster.setFromCamera(mouse, cam);

    // Check for intersection with the info box
    const intersects = raycaster.intersectObject(infoBox);

    if (intersects.length > 0) {
        // Update information overlay content
        const infoTitleElement = document.getElementById('infoTitle');
        const infoContentElement = document.getElementById('infoContent');

        infoTitleElement.textContent = "Informasi Blue Whale and Killer Whale";
        infoContentElement.innerHTML = `
            <strong>1. Blue Whale:</strong><br> 
            - Mamalia terbesar dalam lautan<br>
            - Nama ilmiah: Balaenoptera musculus<br>
            - Habitat: Semua lautan<br>
            - Makanan: 'Krill' makhluk kecil mirip udang, copepoda, plankton<br>
            - Populasi: Kepadatan global populasi paus biru diperkirakan 10.000-25.000 paus biru, sekitar 3-11 persen dari<br>
              perkiraan ukuran populasi pada tahun 1911.<br><br>
            <strong>2. Killer Whale:</strong><br>
            - Puncak predator dalam lautan<br>
            - Nama Latin: Orcinus Orca<br>
            - Memiliki kulit berwarna hitam dengan bagian bawah berwarna putih dan bercak putih di dekat setiap mata<br>
            - Makanan: ikan, anjing laut, hiu putih, spesies lumba lumba, anak paus balin, bahkan paus dewasa<br>
            - Habitat: Semua lautan dunia ( kutub di Arktik dan Antartika, Laut Baltik, Laut Hitam,<br>
              Samudera Arktik

        `;
        // Show the information overlay
        const infoOverlay = document.getElementById('infoOverlay');
        infoOverlay.style.display = 'block';
        
        // Show the blue whale image
        const blueWhaleImage = document.getElementById('blueWhaleImage');
        blueWhaleImage.style.display = 'block';

        // Show the killer whale image
        const killerWhaleImage = document.getElementById('killerWhaleImage');
        killerWhaleImage.style.display = 'block';

        const hideInfoButton = document.getElementById('hideInfoButton');
        hideInfoButton.style.display = 'block';
}
}

function onMouseClick2(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, cam);

    const intersects = raycaster.intersectObject(infoBox2);

    if (intersects.length > 0) {
        // Update information overlay content for angelfish and redfish
        const infoTitleElement = document.getElementById('infoTitle');
        const infoContentElement = document.getElementById('infoContent');

        infoTitleElement.textContent = "Informasi Angelfish and Redfish";
        infoContentElement.innerHTML = `
            <strong>1. Angelfish:</strong><br> 
            - Ikan laut yang indah<br>
            - Nama ilmiah: Pomacanthidae<br>
            - Habitat: Terumbu karang di laut tropis dan subtropis<br>
            - Makanan: Omnivora, memakan alga dan invertebrata kecil<br>
            - Ukuran: Bervariasi menurut spesies, biasanya berukuran kecil hingga sedang<br><br>
            <strong>2. Redfish:</strong><br>
            - Juga dikenal sebagai drum merah atau bass<br>
            - Nama ilmiah: Sciaenops ocellatus<br>
            - Habitat: Perairan pesisir, termasuk teluk dan muara<br>
            - Makanan: Memangsa krustasea, ikan, dan moluska<br>
            - Ukuran: Dapat mencapai panjang lebih dari 40 inci<br>
        `;
        const infoOverlay = document.getElementById('infoOverlay');
        infoOverlay.style.display = 'block';

         // Show the angel fish image
         const angelfishImage = document.getElementById('angelfishImage');
         angelfishImage.style.display = 'block';
 
         // Show the redfish image
         const redfishImage = document.getElementById('redfishImage');
         redfishImage.style.display = 'block';

        const hideInfoButton = document.getElementById('hideInfoButton');
        hideInfoButton.style.display = 'block';
    }
}

function onMouseClick3(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, cam);

    const intersects = raycaster.intersectObject(infoBox3);

    if (intersects.length > 0) {
        // Update information overlay content for angelfish and redfish
        const infoTitleElement = document.getElementById('infoTitle');
        const infoContentElement = document.getElementById('infoContent');

        infoTitleElement.textContent = "Informasi Sperm Whale dan Stingray";
        infoContentElement.innerHTML = `
            <strong>1. Spermwhale:</strong><br> 
            - hewan terbesar dalam kelompok paus bergigi sekaligus hewan bergigi terbesar di dunia.<br>
            - Nama ilmiah: Physeter macrocephalus<br>
            - Habitat: Sebenarnya merata di hampir seluruh dunia. Mereka terdistribusi mulai dari laut tropis, subtropis, <br>
            hingga lautan sub kutub dari kedua belahan bumi. Perairan dengan kedalaman lebih dari 1.000 m adalah habitat asli paus ini.<br>
            - Makanan: Sotong, cumi-cumi, hiu, udang, ikan<br>
            - Ukuran: Dapat tumbuh hingga sepanjang 16 meter dengan bobot 41.000 kg.<br><br>
            <strong>2. Stingray:</strong><br>
            - Disebut juga ikan pari<br>
            - Nama ilmiah: Myliobatoidei<br>
            - Julukan: Ikan Setan (Ikan yang ekornya panjang dan tajam)<br>
            - Habitat: Ditemukan di perairan laut pesisir tropis dan subtropis di seluruh dunia.<br>
            - Makanan: Udang, ikan kecil, cacing, kerang, krustaseam dan invertebrata laut lainnya <br>
            - Populasi : 31 Spesies sejak 2021 turun sebesar 71,1% sejak tahun 1970<br>         
            - Ukuran: memiliki ukuran panjang lebih dari 190 sentimeter dengan berat mencapai lebih dari 350 kilogram.<br>
        `;
        const infoOverlay = document.getElementById('infoOverlay');
        infoOverlay.style.display = 'block';

         // Show the sperm whale image
         const spermWhaleImage = document.getElementById('spermWhaleImage');
         spermWhaleImage.style.display = 'block';
 
         // Show the stingray image
         const stingrayfishImage = document.getElementById('stingrayfishImage');
         stingrayfishImage.style.display = 'block';

        const hideInfoButton = document.getElementById('hideInfoButton');
        hideInfoButton.style.display = 'block';
    }
}

function onMouseClick4(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, cam);

    const intersects = raycaster.intersectObject(infoBox4);

    if (intersects.length > 0) {
        // Update information overlay content for angelfish and redfish
        const infoTitleElement = document.getElementById('infoTitle');
        const infoContentElement = document.getElementById('infoContent');

        infoTitleElement.textContent = "Informasi Green Sea Turtle dan Ikan Tuna";
        infoContentElement.innerHTML = `
            <strong>1. Green Sea Turtle:</strong><br> 
            - Disebut juga penyu hijau<br>
            - Penyu laut besar yang termasuk dalam keluarga Cheloniidae.<br>
            - Nama ilmiah: Chelonia mydas<br>
            - Warna pada penyu hijau disebabkan oleh lapisan lemak dibawahnya.<br>
            - Masa hidup = >100 tahun.<br>
            - Habitat: perairan tropis dan subtropis di sekitar pantai, pulau, serta habitat hutan mangrove dan<br>
              padang lamun yang kaya akan sumber makanan.<br>
            - Makanan: tumbuhan laut (alga dan rumput laut) dan hewan tanpa belakang ( kepiting, ubur-ubur dan spons)<br>
            - Ukuran: bisa mencapai hingga 150 cm panjang karapas dan berat hingga 395 kg <br><br>
            <strong>2. Tuna:</strong><br>
            - Nama ilmiah: Thunnus albacares<br>
            - Ikan pelagis besar yang mengembara di lautan tropika dan ugahari di seluruh dunia.<br>
            - Ikan yang akan mati bila berhenti<br>
            - Masa hidup = 6 - 7 tahun<br>
            - Habitat: laut terbuka perairan yang hangat, termasuk di lautan tropis dan subtropis dengan suhu 20-30.<br>
            - Makanan: ikan kecil, krustasea, moluska.<br>         
            - Ukuran: panjangnya mencapai 6 kaki dan berat 400 pon<br>
        `;
        const infoOverlay = document.getElementById('infoOverlay');
        infoOverlay.style.display = 'block';

        // Show the turtle image
        const turtleImage = document.getElementById('turtleImage');
        turtleImage.style.display = 'block';

        // Show the tuna image
        const tunaImage = document.getElementById('tunaImage');
        tunaImage.style.display = 'block';

        const hideInfoButton = document.getElementById('hideInfoButton');
        hideInfoButton.style.display = 'block';
    }
}

function onMouseClick5(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, cam);

    const intersects = raycaster.intersectObject(infoBox5);

    if (intersects.length > 0) {
        // Update information overlay content for angelfish and redfish
        const infoTitleElement = document.getElementById('infoTitle');
        const infoContentElement = document.getElementById('infoContent');

        infoTitleElement.textContent = "Informasi Clownfish dan Ikan Dori";
        infoContentElement.innerHTML = `
            <strong>1. Clownfish:</strong><br> 
            - Lebih dikenal dengan sebutan ikan badut<br>
            - Nama ilmiah: Amphiprioninae<br>
            - Di alam bebas mereka bersimbiosis dengan anemon laut..<br>
            - Masa hidup = Ikan badut hidup sekitar 8 tahun di alam liar dan 12 tahun atau lebih di lingkungan yang dilindungi.<br>
            - Habitat: merupakan ikan karang tropis yang hidup di perairan hangat pada daerah terumbu dengan kedalaman<br>
              kurang dari 50 meter dan berair jernih.<br>
            - Makanan: Omnivore (pemakan hewan dan tumbuhan<br>
            - Ukuran: 3 – 4 inci (10 cm).<br><br>
            <strong>2. Ikan Dori:</strong><br>
            - Nama ilmiah: Zeus faber<br>
            - Bisa berubah warna sesuai dengan keadaan<br>
            - Masa hidup = Masa hidup mereka mencapai sekitar 12 tahun di alam liar<br>
            - Habitat: tinggal di dekat dasar laut, hidup di kedalaman 5 hingga 360 meter (16 hingga 1.200 ft). Mereka biasanya menyendiri.<br>
            - Makanan: Selain hidup di karang ikan blue tang juga memanfaatkan ganggang disekitarnya untuk makanan sehari-hari mereka.<br>
              Ikan kecil ini tidak memakan plankton atau ikan kecil lainnya<br>
            - Ukuran: tumbuh hingga ukuran maksimum 65 cm (2 kaki) dan 5 kilogram (12 lb) beratnya.<br>
              Ia mempunyai 10 duri panjang pada sirip punggungnya dan 4 duri pada sirip duburnya.<br>
        `;
        const infoOverlay = document.getElementById('infoOverlay');
        infoOverlay.style.display = 'block';

        // Show the turtle image
        const clownfishImage = document.getElementById('clownfishImage');
        clownfishImage.style.display = 'block';

        // Show the tuna image
        const doryImage = document.getElementById('doryImage');
        doryImage.style.display = 'block';

        const hideInfoButton = document.getElementById('hideInfoButton');
        hideInfoButton.style.display = 'block';
    }
}

// Event listener for hide button click
document.getElementById('hideInfoButton').addEventListener('click', function() {
    // Hide the information overlay
    const infoOverlay = document.getElementById('infoOverlay');
    infoOverlay.style.display = 'none';

    // Hide the blue whale image
    const blueWhaleImage = document.getElementById('blueWhaleImage');
    blueWhaleImage.style.display = 'none';

    // Hide the killer whale image
    const killerWhaleImage = document.getElementById('killerWhaleImage');
    killerWhaleImage.style.display = 'none';

    // Hide the angelfish image
    const angelfishImage = document.getElementById('angelfishImage');
    angelfishImage.style.display = 'none';

    // Hide the redfish image
    const redfishImage = document.getElementById('redfishImage');
    redfishImage.style.display = 'none';

    // Hide the spermWhale image
    const spermWhaleImage = document.getElementById('spermWhaleImage');
    spermWhaleImage.style.display = 'none';

    // Hide the stingray image
    const stingrayfishImage = document.getElementById('stingrayfishImage');
    stingrayfishImage.style.display = 'none';

    // Hide the turtle image
    const turtleImage = document.getElementById('turtleImage');
    turtleImage.style.display = 'none';

    // Hide the tuna image
    const tunaImage = document.getElementById('tunaImage');
    tunaImage.style.display = 'none';

    // Hide the clownfish image
    const clownfishImage = document.getElementById('clownfishImage');
    clownfishImage.style.display = 'none';

    // Hide the doryfish image
    const doryImage = document.getElementById('doryImage');
    doryImage.style.display = 'none';

    // Hide the hide button
    const hideInfoButton = document.getElementById('hideInfoButton');
    hideInfoButton.style.display = 'none';

    
});

  function draw(){
    requestAnimationFrame(draw);
    angelfishes.forEach(fish => {
        fish.mixer.update(0.025);
        if (fish.isMoving && fish.model && fish.mixer) {
            fish.model.position.x -= 0.005;
            fish.model.position.z = 7;
            fish.model.rotation.y = 10;
            if (fish.model.position.x < -20) {
                fish.model.position.x += 50;
            }
        }
    });

    angelfishes2.forEach(fish => {
        // fish.model.rotation.y = 1.5
        fish.mixer.update(0.025);
        if (fish.isMoving && fish.model && fish.mixer) {
            fish.model.position.x += 0.005;
            fish.model.position.z = 10;
            fish.model.rotation.y = 0;
            if (fish.model.position.x > 20) {
                fish.model.position.x -= 50;
            }
        }
    });
    
    redfishes.forEach(fish => {
        fish.model.rotation.y = 1.5
        fish.mixer.update(0.025);
        if (fish.isMoving && fish.model && fish.mixer) {
            fish.model.position.x += 0.005;
            if (fish.model.position.x > 20) {
                fish.model.position.x -= 50;
            }
        }
    });

    bluewhale.forEach(fish => {
        fish.model.rotation.y = 1.5
        fish.mixer.update(0.025);
        if (fish.isMoving && fish.model && fish.mixer) {
            fish.model.position.x += 0.005;
            fish.model.rotation.y = Math.PI * 0.5;
            fish.model.position.y = -5;
            fish.model.scale.set(0.006, 0.006, 0.006);
            if (fish.model.position.x > 20) {
                fish.model.position.x -= 50;
            }
        }
    });

    killerwhale.forEach(fish => {
        fish.model.rotation.y = 1.5
        fish.mixer.update(0.025);
        if (fish.isMoving && fish.model && fish.mixer) {
            fish.model.position.x += 0.005;
            fish.model.scale.set(0.005, 0.005, 0.005);
            if (fish.model.position.x > 20) {
                fish.model.position.x -= 50;
            }
        }
    });

    spermwhalefish.forEach(fish => {
        fish.model.rotation.y = 1.5
        fish.mixer.update(0.005);
        if (fish.isMoving && fish.model && fish.mixer) {
            fish.model.position.x += 0.005;
            fish.model.scale.set(0.005, 0.005, 0.005);
            if (fish.model.position.x > 20) {
                fish.model.position.x -= 50;
            }
        }
    });

    stingrayfish.forEach(fish => {
        fish.model.rotation.y = 1.5
        fish.mixer.update(0.005);
        if (fish.isMoving && fish.model && fish.mixer) {
            fish.model.position.x += 0.007;
            if (fish.model.position.x > 20) {
                fish.model.position.x -= 50;
            }
        }
    });

    turtle.forEach(fish => {
        // fish.model.rotation.y = 1.5
        fish.mixer.update(0.025);
        if (fish.isMoving && fish.model && fish.mixer) {
            fish.model.position.x -= 0.005;
            fish.model.position.z = 10;
            fish.model.rotation.y = 10.8;
            fish.model.scale.set(1, 1, 1);
            if (fish.model.position.x < -20) {
                fish.model.position.x += 50;
            }
        }
    });

    tunafish.forEach(fish => {
        // fish.model.rotation.y = 1.5
        fish.mixer.update(0.025);
        if (fish.isMoving && fish.model && fish.mixer) {
            fish.model.position.x -= 0.005;
            fish.model.position.z = 10;
            fish.model.rotation.y = 10.8;
            fish.model.scale.set(0.5, 0.5, 0.5);
            if (fish.model.position.x > 20) {
                fish.model.position.x -= 50;
            }
        }
    });

    clownfish.forEach(fish => {
        // fish.model.rotation.y = 1.5
        fish.mixer.update(0.025);
        if (fish.isMoving && fish.model && fish.mixer) {
            fish.model.position.x += 0.005;
            fish.model.rotation.y = -2.5;
            fish.model.scale.set(0.05, 0.05, 0.05);
            if (fish.model.position.x > 20) {
                fish.model.position.x -= 50;
            }
        }
    });

    doryfish.forEach(fish => {
        fish.mixer.update(0.025);
        if (fish.isMoving && fish.model && fish.mixer) {
            fish.model.position.x -= 0.005;
            fish.model.position.z = 10;
            fish.model.rotation.y = 10.8;
            fish.model.scale.set(0.05, 0.05, 0.05);
            if (fish.model.position.x < -20) {
                fish.model.position.x += 50;
            }
        }
    });

    // tunafish.forEach(fish => {
    //     fish.model.rotation.y = 1.5
    //     if (fish.mixer) {
    //         fish.mixer.update(0.005);
    //         fish.model.position.x += 0.007;
    //         fish.model.scale.set(0.005, 0.005, 0.005);
    //         if (fish.model.position.x > 20) {
    //             fish.model.position.x -= 50;
    //         }
    //     }
    // });

    // controls.getObject().position.copy(cam.position);
    // controls.getObject().rotation.copy(cam.rotation);
    orbitControls.update();
    renderer.render(scene, cam);
}
draw();