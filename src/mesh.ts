class Vertex {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Color {
  r: number;
  g: number;
  b: number;
  a: number;

  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

class Face {
  a: number;
  b: number;
  c: number;

  constructor(indexFirst: number, indexSecond: number, indexThird: number) {
    this.a = indexFirst;
    this.b = indexSecond;
    this.c = indexThird;
  }
}

export class Mesh {
  vertices: Vertex[];
  colors: Color[];
  faces: Face[];

  constructor() {
    this.vertices = [];
    this.colors = [];
    this.faces = [];
  }

  addVertex = (x: number, y: number, z: number) => {
    this.vertices.push(new Vertex(x, y, z));
  };

  addColor = (r: number, g: number, b: number, a: number) => {
    this.colors.push(new Color(r, g, b, a));
  };

  addFace = (a: number, b: number, c: number) => {
    this.faces.push(new Face(a, b, c));
  };

  getVertexData = () => {
    return new Float32Array(this.vertices.flatMap((v) => [v.x, v.y, v.z]));
  };

  getColorData = () => {
    return new Float32Array(this.colors.flatMap((c) => [c.r, c.g, c.b, c.a]));
  };

  getFaceData = () => {
    return new Uint16Array(this.faces.flatMap((f) => [f.a, f.b, f.c]));
  };

  logAllData = () => {
    console.log(
      "Vertices:\n",
      this.vertices
        .map((v, index) => `${index}: ${v.x} ${v.y} ${v.z}\n`)
        .join("")
    );

    console.log(
      "Colors:\n",
      this.colors
        .map((c, index) => `${index}: ${c.r} ${c.g} ${c.b} ${c.a}\n`)
        .join("")
    );

    console.log(
      "Faces:\n",
      this.faces.map((f, index) => `${index}: ${f.a} ${f.b} ${f.c}\n`).join("")
    );
  };
}
