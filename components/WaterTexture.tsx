"use client";

import { useRef } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";

const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uTexture;
uniform vec2 uCover;
uniform vec2 uPointer;
uniform float uTime;
uniform float uAspect;
uniform float uEnergy;
uniform float uOpacity;
uniform vec3 uVein;
uniform vec3 uBackground;

vec2 drift(vec2 uv, float t) {
  float a = sin(uv.y * 5.2 + t * 0.32) + sin(uv.y * 9.7 - t * 0.21);
  float b = cos(uv.x * 4.6 - t * 0.27) + cos(uv.x * 8.3 + t * 0.19);
  return vec2(a, b) * 0.0022;
}

vec2 ripple(vec2 uv, vec2 centre, float t, float energy) {
  vec2 delta = vec2((uv.x - centre.x) * uAspect, uv.y - centre.y);
  float dist = length(delta);
  if (dist < 0.0001) return vec2(0.0);
  float wave = sin(dist * 22.0 - t * 3.4) * exp(-dist * 4.6);
  return normalize(delta) * wave * 0.028 * energy;
}

void main() {
  vec2 uv = (vUv - 0.5) * uCover + 0.5;
  vec2 offset = drift(vUv, uTime) + ripple(vUv, uPointer, uTime, uEnergy);
  float veins = texture(uTexture, uv + offset).a;
  outColor = vec4(mix(uBackground, uVein, veins * uOpacity), 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function toRgb(value: string): [number, number, number] {
  const probe = document.createElement("canvas").getContext("2d");
  if (!probe) return [0, 0, 0];
  probe.fillStyle = "#000";
  probe.fillStyle = value;
  probe.fillRect(0, 0, 1, 1);
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

type WaterTextureProps = {
  src: string;
  opacity?: number;
};

export function WaterTexture({ src, opacity = 0.55 }: WaterTextureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useMountEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uCover = uniform("uCover");
    const uPointer = uniform("uPointer");
    const uTime = uniform("uTime");
    const uAspect = uniform("uAspect");
    const uEnergy = uniform("uEnergy");

    const styles = getComputedStyle(host);
    gl.uniform1f(uniform("uOpacity") as WebGLUniformLocation, opacity);
    gl.uniform3fv(
      uniform("uVein") as WebGLUniformLocation,
      toRgb(styles.getPropertyValue("--theme-heading").trim() || "#f6f4ef"),
    );
    gl.uniform3fv(
      uniform("uBackground") as WebGLUniformLocation,
      toRgb(styles.getPropertyValue("--theme-background").trim() || "#0a0a0a"),
    );

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0]),
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let textureAspect = 1.5;
    let ready = false;

    const image = new Image();
    image.decoding = "async";
    image.src = src;
    image
      .decode()
      .then(() => {
        textureAspect = image.naturalWidth / image.naturalHeight;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          image,
        );
        ready = true;
        resize();
        host.dataset.water = "on";
      })
      .catch(() => {});

    let width = 0;
    let height = 0;

    function resize() {
      const rect = host!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas!.width = width;
      canvas!.height = height;
      gl!.viewport(0, 0, width, height);

      const viewAspect = rect.width / rect.height;
      const cover =
        viewAspect > textureAspect
          ? [1, textureAspect / viewAspect]
          : [viewAspect / textureAspect, 1];
      gl!.uniform2f(uCover, cover[0], cover[1]);
      gl!.uniform1f(uAspect, viewAspect);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const pointer = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    let energy = 0;
    let targetEnergy = 0;

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.x = (event.clientX - rect.left) / rect.width;
      target.y = 1 - (event.clientY - rect.top) / rect.height;
      targetEnergy = 1;
    };
    const onPointerLeave = () => {
      targetEnergy = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    let frame = 0;
    const start = performance.now();

    let onScreen = true;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    visibility.observe(host);

    function render(now: number) {
      frame = requestAnimationFrame(render);
      if (!ready || !onScreen) return;

      pointer.x += (target.x - pointer.x) * 0.045;
      pointer.y += (target.y - pointer.y) * 0.045;
      energy += (targetEnergy - energy) * 0.03;
      targetEnergy *= 0.985;

      gl!.uniform2f(uPointer, pointer.x, pointer.y);
      gl!.uniform1f(uEnergy, energy);
      gl!.uniform1f(uTime, (now - start) / 1000);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      delete host.dataset.water;
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  });

  return <canvas ref={canvasRef} className="hero-home_texture-canvas" />;
}
