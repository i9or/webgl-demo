import { Mesh } from "./mesh";

async function initPositionBuffer(
  gl: WebGLRenderingContext,
  data: Float32Array
) {
  const positionBuffer = gl.createBuffer();

  if (!positionBuffer) {
    throw new Error("Failed to create position buffer");
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const vertices = new Float32Array(data);

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  return positionBuffer;
}

async function initColorBuffer(gl: WebGLRenderingContext, data: Float32Array) {
  const colorBuffer = gl.createBuffer();

  if (!colorBuffer) {
    throw new Error("Failed creating color buffer");
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  return colorBuffer;
}

async function initIndexBuffer(gl: WebGLRenderingContext, data: Uint16Array) {
  const indexBuffer = gl.createBuffer();

  if (!indexBuffer) {
    throw new Error("Failed creating index buffer");
  }

  const indices = new Uint16Array(data);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indexBuffer;
}

async function retrieveMesh() {
  const response = await fetch("/cube.txt");
  const rawData = await response.text();

  const mesh = new Mesh();

  rawData
    .trim()
    .split("\n")
    .map((row) => {
      const [token, ...values] = row.split(" ");

      switch (token) {
        case "v": {
          const [x, y, z] = values;
          mesh.addVertex(parseFloat(x), parseFloat(y), parseFloat(z));
          break;
        }
        case "c": {
          const [r, g, b, a] = values;
          mesh.addColor(
            parseFloat(r),
            parseFloat(g),
            parseFloat(b),
            parseFloat(a)
          );
          break;
        }
        case "f": {
          const [a, b, c] = values;
          mesh.addFace(parseInt(a), parseInt(b), parseInt(c));
          break;
        }
        default:
          console.log(`Token "${token}" is not supported`);
      }
    });

  return mesh;
}

export async function initBuffers(gl: WebGLRenderingContext) {
  const cube = await retrieveMesh();

  const positionBuffer = await initPositionBuffer(gl, cube.getVertexData());
  const colorBuffer = await initColorBuffer(gl, cube.getColorData());
  const indexBuffer = await initIndexBuffer(gl, cube.getFaceData());

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}
