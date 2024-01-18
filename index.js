import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { Water } from './node_modules/three/examples/jsm/objects/Water2.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x5A5A5AB );

const params = {
    color: '#ffffff',
    scale: 4,
    flowX: 1,
    flowY: 1
};
let water;

const cam = new THREE.PerspectiveCamera(
    45, //angle lebar kamera
    window.innerWidth/window.innerHeight, //aspect ratio
    0.1, //jarak terdekat view kamera
    100 //jarak terjauh view kamera
);
const renderer = new THREE.WebGLRenderer();

cam.position.set(0, 5, 6);
renderer.setSize(window.innerWidth, window.innerHeight); //menentukan gambar hasilnya sebesar lebar & panjang yang ditentukan
document.body.appendChild(renderer.domElement); //inisialisasi canvas

const controls = new OrbitControls(cam, renderer.domElement);
const AmbLight = new THREE.AmbientLight(0xffffff,1)
scene.add(AmbLight)

const sphereGeo = new THREE.SphereGeometry(20,20,20)
const sphereTexture = new THREE.TextureLoader().load('./Model/scenery.jpg')
const sphereMaterial = new THREE.MeshLambertMaterial( { 
    map:sphereTexture,
    side: THREE.DoubleSide 
} ); 
const SkySphere = new THREE.Mesh(sphereGeo, sphereMaterial)
scene.add(SkySphere)


const waterGeometry = new THREE.PlaneGeometry( 40, 40 );

water = new Water( waterGeometry, {
    color: params.color,
    scale: params.scale,
    flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
    flowSpeed: 0.04,
    textureWidth: 1024,
    textureHeight: 1024,
} );

water.position.y = 1;
water.rotation.x = Math.PI * - 0.5;
scene.add( water );

const loader = new GLTFLoader();

// const loader1 = new GLTFLoader();
// const loader2 = new GLTFLoader();

// let mixer1;
// let mixer2;
// let model1;
// let model2;

// loader1.load(
// 	'Model/emperor_angelfish.glb', //Sumber: https://sketchfab.com/3d-models/emperor-angelfish-3dc2d360d98c485496899121792ebcce
// 	function ( gltf ) {
//         model1 = gltf.scene;
// 		scene.add( model1 );
//         model1.position.x = -1;
//         model1.traverse( function ( object ) {

//             if ( object.isMesh ) object.castShadow = true;
    
//         })

//         mixer1 = new THREE.AnimationMixer(model1);
//         const clip = gltf.animations[0];
//         clip.loop = THREE.LoopRepeat;
//         clip.clampWhenFinished = true;
//         const action = mixer1.clipAction(clip);
//         action.play();

// 	},

// );

// loader2.load(
// 	'Model/redfish.glb', //Sumber: https://sketchfab.com/3d-models/fish-ae9089d355d244aebd9abee4da7d35af
// 	function ( gltf ) {
//         model2 = gltf.scene;
// 		scene.add( model2 );

//         model2.scale.set(0.001, 0.001, 0.001)
//         model2.rotation.y = 90
//         model2.position.x += 0.2
//         model2.traverse( function ( object ) {

//             if ( object.isMesh ) object.castShadow = true;
    
//         })

//         mixer2 = new THREE.AnimationMixer(model2);
//         const clip = gltf.animations[0];
//         clip.loop = THREE.LoopRepeat;
//         clip.clampWhenFinished = true;
//         const action = mixer2.clipAction(clip);
//         action.play();

// 	},

// );

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

const fish1 = createFish(loader, 'assets/blue_whale.glb', new THREE.Vector3(-1, 0, 6), 1);
const fish2 = createFish(loader, 'assets/blue_whale.glb', new THREE.Vector3(3, -5, -5), 1);
const fish3 = createFish(loader, 'assets/blue_whale.glb', new THREE.Vector3(6, -2, 1), 1);
//const fish4 = createFish(loader, 'assets/blue_whale.glb', new THREE.Vector3(-3, -1, 6), 1);
const fish4 = createFish(loader, 'assets/blue_whale.glb', new THREE.Vector3(-5, -10, -5), 1);
const fish5 = createFish(loader, 'assets/blue_whale.glb', new THREE.Vector3(12, -3, 1), 1);

const fish7 = createFish(loader, 'assets/killer_whale.glb', new THREE.Vector3(-2, 0, 0), 0.001);
const fish8 = createFish(loader, 'assets/killer_whale.glb', new THREE.Vector3(-9, -3, 2), 0.001);
const fish9 = createFish(loader, 'assets/killer_whale.glb', new THREE.Vector3(4, -5, 8), 0.001);
const fish10 = createFish(loader, 'assets/killer_whale.glb', new THREE.Vector3(-7, 0, 3), 0.001);
const fish11= createFish(loader, 'assets/killer_whale.glb', new THREE.Vector3(9, -8, 5), 0.001);
const fish12 = createFish(loader, 'assets/killer_whale.glb', new THREE.Vector3(5, -7, 5), 0.001);

const bluewhale = [fish1, fish2, fish3, fish4, fish5];
scene.add(bluewhale)
const killerwhale = [fish7, fish8, fish9, fish10, fish11, fish12];
scene.add(killerwhale)

// Create a clickable box
const infoBoxGeometry = new THREE.BoxGeometry(2, 2, 2);
const infoBoxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: false, opacity: 0 });
const infoBox = new THREE.Mesh(infoBoxGeometry, infoBoxMaterial);
infoBox.position.set(0, 3, 10); // Set the position of the info box
scene.add(infoBox);

// Add event listener for mouse click
document.addEventListener('click', onMouseClick, false);

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

    // Hide the hide button
    const hideInfoButton = document.getElementById('hideInfoButton');
    hideInfoButton.style.display = 'none';
});


function draw(){
    requestAnimationFrame(draw);
    bluewhale.forEach(fish => {
        fish.model.rotation.y = 1.5
        if (fish.mixer) {
            fish.mixer.update(0.025);
            fish.model.position.x += 0.005;
            //fish.model.position.z += 0.005;
            fish.model.rotation.y = Math.PI * 0.5;
            fish.model.position.y = -5;


            fish.model.scale.set(0.003, 0.003, 0.003);

            if (fish.model.position.x > 100) {
                fish.model.position.x = -100;
            }
        }
    });
    
    killerwhale.forEach(fish => {
        fish.model.rotation.y = 1.5
        if (fish.mixer) {
            fish.mixer.update(0.025);
            fish.model.position.x += 0.007;
            fish.model.scale.set(0.003, 0.003, 0.003);
        }
    });

    controls.update();
    renderer.render(scene, cam);
}
draw();