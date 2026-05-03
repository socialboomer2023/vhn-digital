import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_res;
uniform float u_flowSpeed;
uniform float u_colorIntensity;
uniform float u_meshDensity;
uniform vec2 u_mouse;

#define PI 3.14159265359
#define TAU 6.28318530718

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec2 hash2(vec2 p) {
  return vec2(
    fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453),
    fract(sin(dot(p, vec2(269.5, 183.3))) * 43758.5453)
  );
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p, int octaves) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 8; i++) {
    if (i >= octaves) break;
    val += amp * noise(p * freq);
    freq *= 2.03;
    amp *= 0.49;
    p += vec2(1.7, 9.2);
  }
  return val;
}

float ridgedNoise(vec2 p) {
  return 1.0 - abs(noise(p) * 2.0 - 1.0);
}

float ridgedFbm(vec2 p, int octaves) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  float prev = 1.0;
  for (int i = 0; i < 8; i++) {
    if (i >= octaves) break;
    float n = ridgedNoise(p * freq);
    n = n * n;
    val += n * amp * prev;
    prev = n;
    freq *= 2.2;
    amp *= 0.5;
    p += vec2(1.3, 7.1);
  }
  return val;
}

vec2 domainWarp(vec2 p, float t, float scale, float seed) {
  return vec2(
    fbm(p * scale + vec2(1.7 + seed, 9.2) + t * 0.15),
    fbm(p * scale + vec2(8.3, 2.8 + seed) - t * 0.12)
  );
}

vec3 voronoi(vec2 p, float t) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float minDist = 1.0;
  float secondDist = 1.0;
  vec2 nearestCell = vec2(0.0);
  vec2 cellCenter = vec2(0.5);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 point = hash2(i + neighbor);
      vec2 anim = vec2(
        sin(t * 0.3 + point.x * TAU) * 0.15,
        cos(t * 0.25 + point.y * TAU) * 0.15
      );
      vec2 diff = neighbor + point + anim - f;
      float d = dot(diff, diff);
      if (d < minDist) {
        secondDist = minDist;
        minDist = d;
        nearestCell = i + neighbor + point + anim;
        cellCenter = point + anim;
      } else if (d < secondDist) {
        secondDist = d;
      }
    }
  }
  return vec3(sqrt(minDist), sqrt(secondDist), cellCenter.x + cellCenter.y);
}

vec3 gradientColor(float t, float intensity) {
  vec3 c0 = vec3(0.02, 0.06, 0.12);
  vec3 c1 = vec3(0.05, 0.15, 0.22);
  vec3 c2 = vec3(0.08, 0.25, 0.28);
  vec3 c3 = vec3(0.12, 0.35, 0.38);
  vec3 c4 = vec3(0.18, 0.45, 0.42);
  vec3 c5 = vec3(0.28, 0.58, 0.50);
  vec3 c6 = vec3(0.38, 0.68, 0.58);
  vec3 c7 = vec3(0.50, 0.78, 0.68);
  vec3 c8 = vec3(0.65, 0.88, 0.82);
  t = fract(t);
  float idx = t * 8.0;
  float i = floor(idx);
  float f = fract(idx);
  f = f * f * (3.0 - 2.0 * f);
  vec3 col = c0;
  if (i >= 7.0) col = mix(col, c8, f);
  else if (i >= 6.0) col = mix(col, c7, f);
  else if (i >= 5.0) col = mix(col, c6, f);
  else if (i >= 4.0) col = mix(col, c5, f);
  else if (i >= 3.0) col = mix(col, c4, f);
  else if (i >= 2.0) col = mix(col, c3, f);
  else if (i >= 1.0) col = mix(col, c2, f);
  else col = mix(col, c1, f);
  col += (c8 - c0) * (intensity - 1.0) * 0.3;
  return col;
}

vec3 meshGradient(vec2 uv, float t, float density) {
  float flowT = t * 0.15;
  vec2 warp1 = domainWarp(uv, flowT, 1.8 * density, 0.0);
  vec2 warp2 = domainWarp(uv, flowT * 0.85, 2.5 * density, 10.0);
  vec2 warp3 = domainWarp(uv, flowT * 1.1, 1.2 * density, 20.0);
  vec2 coord1 = uv * 3.0 * density + warp1 * 0.8 + vec2(flowT * 0.08, flowT * 0.05);
  vec2 coord2 = uv * 4.0 * density + warp2 * 0.6 + vec2(-flowT * 0.06, flowT * 0.07);
  vec2 coord3 = uv * 2.5 * density + warp3 * 1.0 + vec2(flowT * 0.04, -flowT * 0.06);
  float n1 = fbm(coord1, 5);
  float n2 = fbm(coord2, 4);
  float n3 = fbm(coord3, 6);
  float blend = n1 * 0.45 + n2 * 0.35 + n3 * 0.2;
  float ridged = ridgedFbm(coord1 * 1.5 + flowT * 0.05, 4);
  float colorAngle = atan(n2 - 0.5, n1 - 0.5) / TAU + 0.5;
  float colorPos = colorAngle + blend * 0.6 + ridged * 0.15;
  float meshLine1 = smoothstep(0.35, 0.0, abs(fract(coord1.x) - 0.5)) * smoothstep(0.35, 0.0, abs(fract(coord1.y) - 0.5));
  float meshLine2 = smoothstep(0.3, 0.0, abs(fract(coord2.x) - 0.5)) * smoothstep(0.3, 0.0, abs(fract(coord2.y) - 0.5)) * 0.7;
  float meshLine = max(meshLine1, meshLine2);
  vec3 meshCol = gradientColor(colorPos, 1.0);
  meshCol += vec3(0.1, 0.2, 0.18) * meshLine * 0.5;
  float fieldDistort = fbm(uv * 2.0 + flowT * 0.05, 3) * 0.5 + 0.5;
  float fieldBlend = smoothstep(0.2, 0.8, blend + fieldDistort * 0.3);
  vec3 baseCol = gradientColor(colorPos + 0.15, 0.85) * (0.7 + fieldBlend * 0.3);
  vec3 col = mix(baseCol, meshCol, meshLine * 0.6 + 0.05);
  vec3 voro = voronoi(uv * 4.0 * density + warp1 * 0.3, flowT);
  float voroEdge = smoothstep(0.08, 0.0, voro.y - voro.x) * 0.4;
  float voroBlend = smoothstep(0.4, 0.6, voro.x) * 0.15;
  col += gradientColor(colorPos + voro.z * 0.1 + 0.3, 0.9) * voroBlend;
  col += vec3(0.15, 0.25, 0.22) * voroEdge * 0.25;
  float caustic = pow(max(sin(coord1.x * 8.0 + flowT) * sin(coord1.y * 8.0 - flowT * 0.7), 0.0), 3.0);
  col += vec3(0.2, 0.35, 0.3) * caustic * 0.04;
  col += vec3(0.05, 0.1, 0.1) * ridged * 0.3;
  float depth = fbm(uv * 1.5 + warp3 * 0.5, 3);
  vec3 depthTint = mix(vec3(0.0, 0.02, 0.04), vec3(0.02, 0.08, 0.12), smoothstep(0.3, 0.7, depth));
  return col + depthTint * 0.08;
}

vec3 sparkle(vec2 uv, float t) {
  vec2 sparkleUv = uv * 30.0;
  vec2 sparkleId = floor(sparkleUv);
  vec2 sparkleFract = fract(sparkleUv) - 0.5;
  vec2 rnd = hash2(sparkleId);
  float phase = rnd.x * TAU;
  float speed = 0.5 + rnd.y * 1.5;
  float blink = pow(max(sin(t * speed + phase), 0.0), 16.0);
  float dist = length(sparkleFract);
  float star = smoothstep(0.05, 0.0, dist) * blink;
  return vec3(0.6, 0.85, 0.8) * star * 0.8;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_time * u_flowSpeed;
  vec2 p = (gl_FragCoord.xy - u_res * 0.5) / min(u_res.x, u_res.y);
  if (u_mouse.x >= 0.0) {
    vec2 mPos = (u_mouse - u_res * 0.5) / min(u_res.x, u_res.y);
    float mDist = length(p - mPos);
    float mInfluence = smoothstep(0.5, 0.0, mDist);
    p += normalize(p - mPos + vec2(0.001)) * mInfluence * 0.08 * sin(t * 0.5);
  }
  vec2 meshUv = (p * min(u_res.x, u_res.y) + u_res * 0.5) / u_res;
  vec3 col = meshGradient(meshUv, t, u_meshDensity);
  col += sparkle(meshUv * 1.5, t) * 0.6;
  float centerDist = length(p);
  col += vec3(0.06, 0.08, 0.06) * exp(-centerDist * centerDist * 1.5) * 0.1;
  col *= u_colorIntensity;
  col *= smoothstep(0.0, 0.4, 1.0 - centerDist * centerDist * 0.35);
  col = col * col * (2.8 - 1.8 * col);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

export default function FlowingMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    const dpr = Math.min(window.devicePixelRatio, 2);

    function resize() {
      if (!canvas || !gl) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();

    function compileShader(src: string, type: number) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(VERTEX_SHADER, gl.VERTEX_SHADER);
    const fs = compileShader(FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_res');
    const uFlowSpeed = gl.getUniformLocation(program, 'u_flowSpeed');
    const uColorIntensity = gl.getUniformLocation(program, 'u_colorIntensity');
    const uMeshDensity = gl.getUniformLocation(program, 'u_meshDensity');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    gl.uniform1f(uFlowSpeed, 0.4);
    gl.uniform1f(uColorIntensity, 1.0);
    gl.uniform1f(uMeshDensity, 1.0);
    gl.uniform2f(uMouse, -1.0, -1.0);

    let mouseX = -1;
    let mouseY = -1;

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX * dpr;
      mouseY = (window.innerHeight - e.clientY) * dpr;
    }

    function onMouseLeave() {
      mouseX = -1;
      mouseY = -1;
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize);

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    function render() {
      if (!gl || !canvas) return;
      const time = performance.now() * 0.001;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
