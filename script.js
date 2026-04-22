// Setup Three.js Scene
const canvas = document.getElementById('canvas');
if (!canvas) throw new Error('No canvas');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 5;

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 6000;
const positions = new Float32Array(particlesCount * 3);
const scales = new Float32Array(particlesCount);

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    scales[i] = Math.random();
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.018,
    color: 0x08bbbf,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Wireframe sphere
const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x08bbbf,
    transparent: true,
    opacity: 0.08,
    wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Inner glow sphere
const innerSphereGeo = new THREE.SphereGeometry(1.4, 32, 32);
const innerSphereMat = new THREE.MeshBasicMaterial({
    color: 0x9ad63c,
    transparent: true,
    opacity: 0.04,
    wireframe: true
});
const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
scene.add(innerSphere);

let scrollProgress = 0;
const clock = new THREE.Clock();

// GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
    trigger: '.paragraph',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => { scrollProgress = self.progress; }
});

// Hero entrance animations
gsap.from(".logo", { opacity: 0, y: -20, duration: 1, ease: "power2.out" });
gsap.from(".nav-links li", { opacity: 0, y: -10, stagger: 0.08, duration: 0.8, ease: "power2.out" });
gsap.from(".hero-badge", { opacity: 0, y: 30, duration: 0.8, delay: 0.3, ease: "power2.out" });
gsap.from(".hero-title", { opacity: 0, y: 40, duration: 1, delay: 0.5, ease: "power2.out" });
gsap.from(".hero-sub", { opacity: 0, y: 30, duration: 0.8, delay: 0.7, ease: "power2.out" });
gsap.from(".hero-actions", { opacity: 0, y: 20, duration: 0.8, delay: 0.9, ease: "power2.out" });

// Content sections
gsap.utils.toArray(".content-section h2").forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        y: 50, opacity: 0, duration: 1, ease: "power2.out"
    });
});

gsap.utils.toArray(".feature-card").forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: { trigger: ".features-grid", start: "top 80%" },
        y: 60, opacity: 0, duration: 0.8, delay: index * 0.1, ease: "power2.out"
    });
});

// Stats counter animation
gsap.utils.toArray(".stat-number").forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: ".stats-section", start: "top 80%" },
        opacity: 0, y: 30, duration: 0.8, ease: "power2.out"
    });
});

// CTA section
gsap.from(".cta-inner", {
    scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
    opacity: 0, y: 40, scale: 0.97, duration: 1, ease: "power2.out"
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    particles.rotation.y = elapsedTime * 0.04 + scrollProgress * Math.PI * 2;
    particles.rotation.x = elapsedTime * 0.015 + scrollProgress * Math.PI;

    sphere.rotation.y = elapsedTime * 0.06;
    sphere.rotation.x = elapsedTime * 0.03;
    sphere.scale.setScalar(1 + scrollProgress * 0.6);
    sphere.material.opacity = 0.08 + scrollProgress * 0.15;

    innerSphere.rotation.y = -elapsedTime * 0.1;
    innerSphere.rotation.z = elapsedTime * 0.05;

    // Animate particles wave
    const posArr = particles.geometry.attributes.position.array;
    for (let i = 0; i < posArr.length; i += 3) {
        posArr[i + 1] += Math.sin(elapsedTime * 0.5 + posArr[i]) * 0.001;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    // Color transition on scroll
    const hue = 0.5 + scrollProgress * 0.15;
    const color = new THREE.Color().setHSL(hue, 0.8, 0.55);
    particlesMaterial.color = color;
    sphereMaterial.color = color;

    renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
