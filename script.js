// Setup Three.js Scene
const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 5;

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const positions = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x08bbbf,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x08bbbf,
    transparent: true,
    opacity: 0.1,
    wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

let scrollProgress = 0;
const clock = new THREE.Clock();

// GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
    trigger: '.paragraph',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
        scrollProgress = self.progress;
    }
});

// Logo fade-in & nav links
gsap.from(".logo", { opacity: 0, y: -20, duration: 1, ease: "power2.out" });
gsap.from(".nav-links li", { opacity: 0, y: -10, stagger: 0.1, duration: 0.8, ease: "power2.out" });

// Content sections animation
gsap.utils.toArray(".content-section h2").forEach(section => {
    gsap.from(section, {
        scrollTrigger: { trigger: section, start: "top 80%", end: "bottom 20%", toggleActions: "play none none none" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// Features cards animation
gsap.utils.toArray(".feature-card").forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: { 
            trigger: ".features-grid", 
            start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out"
    });
});

// Paragraph subtle animation
const paragraph = document.querySelector(".paragraph p");
if (paragraph) {
    gsap.to(paragraph, { y: 10, repeat: -1, yoyo: true, duration: 2, ease: "sine.inOut" });
}

// Animation loop (EFFETTO MOUSE RIMOSSO)
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotate particles based on time and scroll only (NO MOUSE)
    particles.rotation.y = elapsedTime * 0.05 + scrollProgress * Math.PI * 2;
    particles.rotation.x = scrollProgress * Math.PI;

    // Animate sphere
    sphere.scale.setScalar(1 + scrollProgress * 0.5);
    sphere.material.opacity = 0.1 + scrollProgress * 0.2;

    // Animate particles position
    const positions = particles.geometry.attributes.position.array;
    for(let i = 0; i < positions.length; i += 3) {
        const i3 = i + 1;
        positions[i3] = Math.sin(elapsedTime + positions[i]) * (0.5 + scrollProgress);
    }
    particles.geometry.attributes.position.needsUpdate = true;

    // Color transition
    const color = new THREE.Color();
    color.setHSL(0.5 + scrollProgress * 0.2, 0.7, 0.5);
    particlesMaterial.color = color;
    sphereMaterial.color = color;

    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});