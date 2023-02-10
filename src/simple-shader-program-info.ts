export function getSimpleShaderProgramInfo(
  gl: WebGLRenderingContext,
  program: WebGLProgram
) {
  const vertexPosition = gl.getAttribLocation(program, "aVertexPosition");
  const vertexColor = gl.getAttribLocation(program, "aVertexColor");
  const projectionMatrix = gl.getUniformLocation(program, "uProjectionMatrix");
  const modelViewMatrix = gl.getUniformLocation(program, "uModelViewMatrix");

  if (!projectionMatrix) {
    throw new Error("Failed getting projection matrix uniform location");
  }

  if (!modelViewMatrix) {
    throw new Error("Failed getting model view matrix uniform location");
  }

  return {
    program,
    attribLocations: {
      vertexPosition,
      vertexColor,
    },
    uniformLocations: {
      projectionMatrix,
      modelViewMatrix,
    },
  };
}
