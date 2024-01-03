import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(
    45, //angle lebar kamera
    window.innerWidth/window.innerHeight, //aspect ratio
    0.1, //jarak terdekat view kamera
    100 //jarak terjauh view kamera
);
const renderer = new THREE.WebGLRenderer();

cam.position.set(0, 5, 6); //menggeser kamera dari 0,0,0 menjadi 0,0,5
renderer.setSize(window.innerWidth, window.innerHeight); //menentukan gambar hasilnya sebesar lebar & panjang yang ditentukan
document.body.appendChild(renderer.domElement); //inisialisasi canvas

const controls = new OrbitControls(cam, renderer.domElement);
const AmbLight = new THREE.AmbientLight(0xffffff,1)
scene.add(AmbLight)

const loader1 = new GLTFLoader();
const loader2 = new GLTFLoader();
let mixer1;
let mixer2;

loader1.load(
	'Model/emperor_angelfish.glb', //Sumber: https://sketchfab.com/3d-models/emperor-angelfish-3dc2d360d98c485496899121792ebcce
	function ( gltf ) {
        const model = gltf.scene;
		scene.add( model );
		gltf.animations;
        console.log(gltf.animations[0])
		gltf.scene;
		gltf.scenes;
		gltf.cameras;
		gltf.asset;

        model.traverse( function ( object ) {

            if ( object.isMesh ) object.castShadow = true;
    
        })

        mixer1 = new THREE.AnimationMixer(model);
        const clip = gltf.animations[0];
        clip.loop = THREE.LoopRepeat;
        clip.clampWhenFinished = true;
        const action = mixer1.clipAction(clip);
        action.play();

	},

);

loader2.load(
	'Model/redfish.glb', //Sumber: https://sketchfab.com/3d-models/fish-ae9089d355d244aebd9abee4da7d35af
	function ( gltf ) {
        const model = gltf.scene;
		scene.add( model );
		gltf.animations;
        console.log(gltf.animations[0])
		gltf.scene;
		gltf.scenes;
		gltf.cameras;
		gltf.asset;

        model.scale.set(0.001, 0.001, 0.001)
        model.rotation.y = 90
        model.position.y = model.position.y + 0.2
        model.traverse( function ( object ) {

            if ( object.isMesh ) object.castShadow = true;
    
        })

        mixer2 = new THREE.AnimationMixer(model);
        const clip = gltf.animations[0];
        clip.loop = THREE.LoopRepeat;
        clip.clampWhenFinished = true;
        const action = mixer2.clipAction(clip);
        action.play();

	},

);

function draw(){
    if (mixer1) {
        mixer1.update(0.01);
    }
    if (mixer2){
        mixer2.update(0.01)
    }

    controls.update();
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}
draw();
