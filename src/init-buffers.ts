async function initPositionBuffer(gl: WebGLRenderingContext) {
  const response = await fetch("/triangle.txt");
  const rawData = await response.text();

  const data = rawData.split(" ").map((v) => parseFloat(v));

  const positionBuffer = gl.createBuffer();

  if (!positionBuffer) {
    throw new Error("Failed to create position buffer");
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // prettier-ignore
  const vertices = new Float32Array(data);

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  return positionBuffer;
}

async function initColorBuffer(gl: WebGLRenderingContext) {
  // prettier-ignore
  const colors = new Float32Array([
    0.6, 0.35, 0.71, 1,
    0.6, 0.35, 0.71, 1,
    0.6, 0.35, 0.71, 1,
    0.6, 0.35, 0.71, 1,

    0.2, 0.6, 0.86, 1.0,
    0.2, 0.6, 0.86, 1.0,
    0.2, 0.6, 0.86, 1.0,
    0.2, 0.6, 0.86, 1.0,

    0.95, 0.77, 0.06, 1,
    0.95, 0.77, 0.06, 1,
    0.95, 0.77, 0.06, 1,
    0.95, 0.77, 0.06, 1,

    0.91, 0.3, 0.24, 1,
    0.91, 0.3, 0.24, 1,
    0.91, 0.3, 0.24, 1,
    0.91, 0.3, 0.24, 1,

    0.1, 0.74, 0.61, 1.0,
    0.1, 0.74, 0.61, 1.0,
    0.1, 0.74, 0.61, 1.0,
    0.1, 0.74, 0.61, 1.0,

    0.18, 0.8, 0.44, 1,
    0.18, 0.8, 0.44, 1,
    0.18, 0.8, 0.44, 1,
    0.18, 0.8, 0.44, 1
  ]);

  const colorBuffer = gl.createBuffer();

  if (!colorBuffer) {
    throw new Error("Failed creating color buffer");
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

  return colorBuffer;
}

async function initIndexBuffer(gl: WebGLRenderingContext) {
  const indexBuffer = gl.createBuffer();

  if (!indexBuffer) {
    throw new Error("Failed creating index buffer");
  }

  const indices = new Uint16Array([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14,
    15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
  ]);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indexBuffer;
}

export async function initBuffers(gl: WebGLRenderingContext) {
  const positionBuffer = await initPositionBuffer(gl);
  const colorBuffer = await initColorBuffer(gl);
  const indexBuffer = await initIndexBuffer(gl);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indicies: indexBuffer,
  };
}
