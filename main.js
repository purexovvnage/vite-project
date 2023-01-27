import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight,0.01, 100);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(8);


const geometry = new THREE.TorusGeometry( 10,3,16,100 );
const material = new THREE.MeshStandardMaterial( { color: 0x86f441 } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(11,11,11);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(222, 55);
scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,11,11);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
  const star = new THREE.Mesh( geometry,material);

  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.png');
scene.background = spaceTexture;

// Avatar

const harrisonTexture = new THREE.TextureLoader().load('Harrison.jpeg');

const harrison = new THREE.Mesh( new THREE.BoxGeometry(3,3,3),new THREE.MeshBasicMaterial({ map: harrisonTexture } ));

scene.add(harrison);

const moonTexture = new THREE.TextureLoader().load('moon.jpeg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,33,33),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  }  )
);

scene.add(moon)

moon.position.z = 33;
moon.position.setX(-11);
moon.position.y = -3;

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.11;
  moon.rotation.y += 0.077;
  moon.rotation.z += 0.066;

  harrison.rotation.y += 0.011;
  harrison.rotation.z += 0.011;

  camera.position.z = t * -0.011;
  camera.position.x = t * -0.00022;
  camera.position.y = t * -0.00022;
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.011;
  torus.rotation.y += 0.0055;
  torus.rotation.z += 0.011;
  controls.update();
  renderer.render( scene,camera);
}

animate();
