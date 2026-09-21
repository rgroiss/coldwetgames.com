import * as THREE from './assets/vendor/three/three.module.min.js';

// A decorative exhibit. All meaningful text, images and actions stay in the HTML.
export async function createExhibit(stage) {
  const canvas = stage.querySelector('canvas');
  const hint = stage.querySelector('[data-drag-hint]');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  let texture;
  try {
    texture = await new THREE.TextureLoader().loadAsync(stage.querySelector('img').getAttribute('src'));
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 30);
  const display = new THREE.Group();
  scene.add(display);

  const shellMaterial = new THREE.MeshStandardMaterial({ color: 0x30223e, metalness: .65, roughness: .32 });
  const rimMaterial = new THREE.MeshStandardMaterial({ color: 0xc8b5e3, metalness: .8, roughness: .24 });
  const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x171019, metalness: .35, roughness: .45 });
  const limeMaterial = new THREE.MeshBasicMaterial({ color: 0xd2ff5a, toneMapped: false });

  function box(width, height, depth, material, z = 0) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.z = z;
    display.add(mesh);
    return mesh;
  }
  box(5.66, 2.92, .22, shellMaterial, -.13);
  box(5.62, 2.88, .08, rimMaterial, .02);
  box(5.54, 2.8, .085, darkMaterial, .07);
  const artwork = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 5.2 * 215 / 460),
    new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }),
  );
  artwork.position.set(0, .035, .12);
  display.add(artwork);

  const edge = box(5.28, .028, .016, limeMaterial, .12);
  edge.position.y = -1.32;
  for (const x of [-2.69, 2.69]) {
    for (const y of [-1.33, 1.33]) {
      const screw = new THREE.Mesh(new THREE.CircleGeometry(.035, 12), rimMaterial);
      screw.position.set(x, y, .12);
      display.add(screw);
    }
  }

  scene.add(new THREE.AmbientLight(0xcfb8ef, 2.4));
  const keyLight = new THREE.DirectionalLight(0xf2edff, 5);
  keyLight.position.set(-2, 3, 4);
  scene.add(keyLight);
  const pointerLight = new THREE.PointLight(0xb799ff, 30, 15, 2);
  pointerLight.position.set(3, 1, 3);
  scene.add(pointerLight);
  const fillLight = new THREE.DirectionalLight(0xd2ff5a, 2);
  fillLight.position.set(3, -2, 2);
  scene.add(fillLight);

  let enabled = false;
  let visible = false;
  let disposed = false;
  let lost = false;
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let dragOriginX = 0;
  let dragOriginY = 0;
  let dragX = 0;
  let dragY = 0;
  let pointerX = 0;
  let pointerY = 0;
  const clamp = THREE.MathUtils.clamp;
  display.rotation.set(.045, -.18, -.09);

  function draw() {
    if (disposed || lost) return;
    renderer.render(scene, camera);
    stage.dataset.rendered = 'true';
  }

  function render(time) {
    frame = 0;
    if (!enabled || !visible || document.hidden || disposed || lost) return;
    const delta = lastTime ? Math.min((time - lastTime) / 1000, .05) : 0;
    lastTime = time;
    elapsed += delta;
    const ease = 1 - Math.exp(-7 * delta);
    display.rotation.x += (.045 + dragY + pointerY * .09 - display.rotation.x) * ease;
    display.rotation.y += (-.18 + dragX + pointerX * .13 - display.rotation.y) * ease;
    display.rotation.z = -.09 + Math.sin(elapsed * .45) * .017;
    display.position.y = Math.sin(elapsed * .85) * .08;
    pointerLight.position.x = 2 + pointerX * 3;
    pointerLight.position.y = 1 - pointerY * 2;
    draw();
    frame = requestAnimationFrame(render);
  }

  function schedule() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    if (enabled && visible && !document.hidden && !disposed && !lost) frame = requestAnimationFrame(render);
  }

  function resize() {
    if (disposed || lost) return;
    const { width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = Math.max(6.9, 3.5 / (Math.tan(THREE.MathUtils.degToRad(17)) * camera.aspect));
    camera.updateProjectionMatrix();
    draw();
  }

  function pointerMove(event) {
    if (!enabled) return;
    const bounds = canvas.getBoundingClientRect();
    pointerX = clamp((event.clientX - bounds.left) / bounds.width * 2 - 1, -1, 1);
    pointerY = clamp((event.clientY - bounds.top) / bounds.height * 2 - 1, -1, 1);
    if (dragging) {
      dragX = clamp(dragOriginX + (event.clientX - startX) * .004, -.4, .4);
      dragY = clamp(dragOriginY + (event.clientY - startY) * .003, -.22, .22);
    }
  }

  function pointerDown(event) {
    if (!enabled || event.button !== 0 || event.pointerType !== 'mouse') return;
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    dragOriginX = dragX;
    dragOriginY = dragY;
    canvas.setPointerCapture(event.pointerId);
  }

  function pointerUp(event) {
    dragging = false;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  }
  function pointerLeave() { if (!dragging) { pointerX = 0; pointerY = 0; } }
  function contextLost(event) {
    event.preventDefault();
    lost = true;
    stage.dataset.rendered = 'false';
    stage.dataset.interactive = 'false';
    stage.dataset.scene = 'lost';
    hint.hidden = true;
    schedule();
  }
  function contextRestored() {
    lost = false;
    stage.dataset.scene = 'ready';
    stage.dataset.interactive = String(enabled);
    hint.hidden = !enabled;
    resize();
    schedule();
  }

  canvas.addEventListener('pointerdown', pointerDown);
  canvas.addEventListener('pointermove', pointerMove);
  canvas.addEventListener('pointerup', pointerUp);
  canvas.addEventListener('pointercancel', pointerUp);
  canvas.addEventListener('pointerleave', pointerLeave);
  canvas.addEventListener('lostpointercapture', pointerLeave);
  canvas.addEventListener('webglcontextlost', contextLost);
  canvas.addEventListener('webglcontextrestored', contextRestored);
  document.addEventListener('visibilitychange', schedule);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
  observer.observe(stage);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  resize();
  stage.dataset.scene = 'ready';

  return {
    setEnabled(value) {
      enabled = value;
      stage.dataset.interactive = String(value && !lost);
      hint.hidden = !value || lost;
      if (!enabled) { dragging = false; pointerX = 0; pointerY = 0; }
      schedule();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', schedule);
      canvas.removeEventListener('pointerdown', pointerDown);
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerup', pointerUp);
      canvas.removeEventListener('pointercancel', pointerUp);
      canvas.removeEventListener('pointerleave', pointerLeave);
      canvas.removeEventListener('lostpointercapture', pointerLeave);
      canvas.removeEventListener('webglcontextlost', contextLost);
      canvas.removeEventListener('webglcontextrestored', contextRestored);
      const materials = new Set();
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (object.material) materials.add(object.material);
      });
      materials.forEach((material) => material.dispose());
      texture.dispose();
      renderer.dispose();
      stage.dataset.rendered = 'false';
      stage.dataset.interactive = 'false';
      stage.dataset.scene = 'static';
      hint.hidden = true;
    },
  };
}
