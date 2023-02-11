import "./style.css";
import vsSimple from "./simple.vert?raw";
import fsSimple from "./simple.frag?raw";
import { getSimpleShaderProgramInfo } from "./simple-shader-program-info";
import { initBuffers } from "./init-buffers";
import { drawScene } from "./draw-scene";

function loadShader(gl: WebGLRenderingContext, type: GLenum, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("Failed creating a shader");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const shaderInfoLog = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`An error occured compiling the shader: ${shaderInfoLog}`);
  }

  return shader;
}

function initShaderProgram(
  gl: WebGLRenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = loadShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  const shaderProgram = gl.createProgram();

  if (!shaderProgram) {
    throw new Error("Failed creating shader program");
  }

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    const programInfoLog = gl.getProgramInfoLog(shaderProgram);
    gl.deleteProgram(shaderProgram);
    throw new Error(
      `Unable to initialize the shader program: ${programInfoLog}`
    );
  }

  return shaderProgram;
}

async function main() {
  const canvas: Nullable<HTMLCanvasElement> =
    document.querySelector("#viewport");

  if (!canvas) {
    throw new Error("Canvas element is not found");
  }

  const gl = canvas.getContext("webgl");

  if (!gl) {
    throw new Error("WebGL context could not be initialized");
  }

  const simpleShaderProgram = initShaderProgram(gl, vsSimple, fsSimple);
  const programInfo = getSimpleShaderProgramInfo(gl, simpleShaderProgram);
  const buffers = await initBuffers(gl);

  let previousDelta = 0;
  let rotation = 0;

  function render(now: DOMHighResTimeStamp) {
    const currentTimeInSeconds = now * 0.001;
    const deltaTime = currentTimeInSeconds - previousDelta;
    previousDelta = currentTimeInSeconds;

    drawScene(gl!, programInfo, buffers, rotation);
    rotation += deltaTime;

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

window.onload = main;
