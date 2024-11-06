import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/small_empty_room_1_2k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping; // Use for reflections
    scene.environment = texture; // Apply texture as environment map
    scene.background = texture; // Optional: set as background
});

const loader = new GLTFLoader();
loader.load( '/3d_clipart_webdev.glb', function ( gltf ) {
    const webdev  = gltf.scene ;
    
    webdev.position.set(15, -33, -5); // Raise model by 1 unit
    webdev.scale.set(3.5, 3.5, 3.5); // Scale up by 1.5
    
        scene.add( webdev );
    
    },
loader.load( '/table_chairs.glb', function ( gltf ) {
const model  = gltf.scene ;

model.position.set(20,-100, 0); // Raise model by 1 unit
model.scale.set(1, 1, 1); 

	scene.add( model );

}));


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
camera.position.z = 50;
camera.position.x = 150;
camera.position.y = -10;

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate() {
    requestAnimationFrame(animate);
    

    controls.update();

    renderer.render(scene, camera);
}

animate();


gsap.to("#header",{
    y:10,
    duration:1
})

gsap.from("#offcanvasIntroLabel",{
opacity:0,
    duration:10
})



gsap.from(".profile",{
    x:100,
    duration:1
})

gsap.from("#intro button",{
    opacity: 0, 
    duration:1,
    x:-50,
    stagger:0.5,
    scrub:true
})

gsap.from(".skills-section button",{
    opacity: 0, 
    duration:3,
    y:-50,
    stagger:0.7,
    scrub:true
})

function animateOffcanvasHeaderIn() {
    gsap.fromTo(
      ".offcanvas-header",
      { y: -100, opacity: 0 }, // Start position above the screen
      { y: 0, opacity: 1, duration: 4, ease: "power4.out" } // Slide down to original position
    );
  }
  
  // Function to animate offcanvas header when closing
  function animateOffcanvasHeaderOut() {
    gsap.to(".offcanvas-header", { y: -100, opacity: 0, duration: 1, ease: "power4.in" });
  }
  
  // Event listeners to trigger animations on offcanvas show/hide
  document.querySelectorAll(".offcanvas").forEach((offcanvas) => {
    offcanvas.addEventListener("show.bs.offcanvas", animateOffcanvasHeaderIn);
    offcanvas.addEventListener("hide.bs.offcanvas", animateOffcanvasHeaderOut);
  });

