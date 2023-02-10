import { mat4 } from "gl-matrix";

import { getSimpleShaderProgramInfo } from "./simple-shader-program-info";
import { initBuffers } from "./init-buffers";

type ProgramInfo = ReturnType<typeof getSimpleShaderProgramInfo>;
type Buffers = Awaited<ReturnType<typeof initBuffers>>;

const fieldOfView = (60 * Math.PI) / 180;
const zNear = 0.1;
const zFar = 100.0;
const projectionMatrix = mat4.create();
const modelViewMatrix = mat4.create();

function setPositionAttribute(
  gl: WebGLRenderingContext,
  buffers: Buffers,
  programInfo: ProgramInfo
) {
  const numComponents = 3;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

function setColorAttribute(
  gl: WebGLRenderingContext,
  buffers: Buffers,
  programInfo: ProgramInfo
) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexColor,
    4,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export function drawScene(
  gl: WebGLRenderingContext,
  programInfo: ProgramInfo,
  buffers: Buffers,
  delta: number = 0
) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const aspect = gl.canvas.width / gl.canvas.height;

  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  mat4.identity(modelViewMatrix);
  mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -6.0]);
  mat4.rotateY(modelViewMatrix, modelViewMatrix, delta / 2);
  mat4.rotateX(modelViewMatrix, modelViewMatrix, delta);

  setPositionAttribute(gl, buffers, programInfo);
  setColorAttribute(gl, buffers, programInfo);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indicies);

  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;

    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
}
