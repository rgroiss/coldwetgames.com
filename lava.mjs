// GLSL port of the studio's HellLavaBackground.hlsl (YSIITU).
// The diagonal flow, five evolving folds and ember colour cycle are preserved.
// Website palette/contrast are brighter; see docs/external-sources.md.
const vertexSource = `
  attribute vec2 position;
  varying vec2 uv;
  void main() { uv = position * .5 + .5; gl_Position = vec4(position, 0., 1.); }
`;

const fragmentSource = `
  precision highp float;
  varying vec2 uv;
  uniform float time;
  uniform float aspect;

  float hash(vec2 value) {
    vec3 h = fract(vec3(value.xyx) * .1031);
    h += dot(h, h.yzx + 33.33);
    return fract((h.x + h.y) * h.z);
  }
  float noise(vec2 value) {
    vec2 cell = floor(value), blend = fract(value);
    blend = blend * blend * (3. - 2. * blend);
    return mix(mix(hash(cell), hash(cell + vec2(1., 0.)), blend.x),
      mix(hash(cell + vec2(0., 1.)), hash(cell + 1.), blend.x), blend.y);
  }
  void main() {
    vec2 p = (uv - .5) * vec2(aspect, 1.) / sqrt(aspect * aspect + 1.);
    vec2 broad = p;
    float motion = time * .0247 * 12.;
    p.x += sin(broad.y * 7. + motion * .19) * mix(.015, .07, .56);
    p.y += sin(broad.x * 5.2 - motion * .14) * mix(.012, .057, .56);
    float angle = -.43 + sin(motion * .03) * .025;
    p = vec2(p.x * cos(angle) - p.y * sin(angle), p.x * sin(angle) + p.y * cos(angle));
    p *= 25. + 3.2 * 1.4;
    vec2 coupled = vec2(p.x + p.y);
    for (int i = 0; i < 5; i++) {
      float phase = float(i) * 1.21;
      float crest = sin(max(p.x, p.y) * .93 + phase * .12);
      coupled += p + crest;
      p += (.3 + .56 * .18) * vec2(
        cos(4.73 + coupled.y * .39 + motion * .86 + phase * .07),
        sin(coupled.x * .94 - motion * .71 - phase * .05));
      float fold = cos(p.x + p.y + phase * .03) - sin(p.x * .69 - p.y - phase * .04);
      p -= fold * (.66 + .56 * .23);
    }
    float paint = clamp(length(p) * .036 * (2.15 + .72 * .55), 0., 2.);
    paint += (noise(broad * 45. + vec2(motion * .07, -motion * .05)) - .5) * mix(.012, .04, .46);
    float edge = mix(.012, .067, .46);
    float pool = 1. - smoothstep(.08 - edge, .34 + edge, paint);
    float ember = smoothstep(.52 - edge, .68 + edge, paint)
      * (1. - smoothstep(.9 - edge, 1.08 + edge, paint));
    float cycle = fract(time * .035) * 3.;
    float transition = smoothstep(0., 1., fract(cycle));
    vec3 orange = vec3(.94, .34, .14), red = vec3(.7, .12, .2), purple = vec3(.56, .27, .72);
    vec3 fire = cycle < 1. ? mix(orange, red, transition)
      : cycle < 2. ? mix(red, purple, transition) : mix(purple, orange, transition);
    vec3 color = mix(vec3(.12, .035, .075), vec3(.32, .08, .16), pool);
    color = mix(color, fire, ember * .82);
    color += (hash(floor(gl_FragCoord.xy)) - .5) * .018;
    gl_FragColor = vec4(color, 1.);
  }
`;

function createField(host) {
  const canvas = host.querySelector('canvas');
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' });
  if (!gl) throw new Error('WebGL unavailable');
  let program, buffer, timeLocation, aspectLocation;
  let enabled = false, visible = false, lost = false, disposed = false;
  let frame = 0, lastTime = 0, elapsed = 10;

  function initialize() {
    const shaders = [];
    try {
      for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]]) {
        const shader = gl.createShader(type);
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Lava shader unavailable');
      }
      program = gl.createProgram();
      shaders.forEach(shader => gl.attachShader(program, shader));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Lava program unavailable');
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      timeLocation = gl.getUniformLocation(program, 'time');
      aspectLocation = gl.getUniformLocation(program, 'aspect');
    } catch (error) {
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      throw error;
    } finally { shaders.forEach(shader => gl.deleteShader(shader)); }
  }

  function draw() {
    if (lost || disposed) return;
    gl.uniform1f(timeLocation, elapsed);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    host.dataset.lava = 'ready';
  }

  function render(time) {
    frame = 0;
    if (!enabled || !visible || document.hidden || lost || disposed) return;
    // Cap the decorative effect at 24 fps, independently of display refresh rate.
    if (!lastTime || time - lastTime >= 1000 / 24) {
      elapsed += lastTime ? Math.min((time - lastTime) / 1000, .1) : 0;
      lastTime = time;
      draw();
    }
    frame = requestAnimationFrame(render);
  }

  function schedule() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    const running = enabled && visible && !document.hidden && !lost && !disposed;
    host.dataset.lavaRunning = String(running);
    if (running) frame = requestAnimationFrame(render);
  }

  function resize() {
    if (lost || disposed) return;
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    // Deliberately low resolution: no device-pixel-ratio multiplication.
    const scale = Math.min(.7, 768 / width, 480 / height);
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(aspectLocation, width / height);
    draw();
  }

  function contextLost(event) {
    event.preventDefault();
    lost = true;
    host.dataset.lava = 'static';
    schedule();
  }
  function contextRestored() {
    try { initialize(); lost = false; resize(); schedule(); }
    catch { lost = true; host.dataset.lava = 'static'; schedule(); }
  }
  initialize();
  canvas.addEventListener('webglcontextlost', contextLost);
  canvas.addEventListener('webglcontextrestored', contextRestored);
  document.addEventListener('visibilitychange', schedule);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
  observer.observe(host);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  return {
    setEnabled(value) { enabled = value; schedule(); },
    dispose() {
      disposed = true;
      schedule();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', schedule);
      canvas.removeEventListener('webglcontextlost', contextLost);
      canvas.removeEventListener('webglcontextrestored', contextRestored);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      host.dataset.lava = 'static';
    },
  };
}

export function createLavaFields() {
  const fields = [];
  document.querySelectorAll('[data-lava-field]').forEach(host => {
    try { fields.push(createField(host)); }
    catch { host.dataset.lava = 'static'; }
  });
  return {
    setEnabled(value) { fields.forEach(field => field.setEnabled(value)); },
    dispose() { fields.forEach(field => field.dispose()); },
  };
}
