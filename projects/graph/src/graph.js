/* eslint no-restricted-syntax: off */
/**
 * Edge
 */
export class Edge {
  // !!! IMPLEMENT ME
  constructor(weight = 1, destination) {
    this.weight = weight;
    this.destination = destination;
  }
}

/**
 * Vertex
 */
export class Vertex {
  // !!! IMPLEMENT ME
  // value property
  // edges property
  constructor(value = 'default vertex label', pos = { x: 50, y: 50 }) {
    this.value = value;
    this.edges = [];
    this.pos = pos;
  }
}

/**
 * Graph
 */
export class Graph {
  constructor() {
    this.vertices = [];
  }

  debugCreateTestData() {
    const testVertex1 = new Vertex('V-1', { x: 125, y: 125 });
    const testVertex2 = new Vertex('V-2', { x: 325, y: 325 });
    const edge1 = new Edge(testVertex2);
    testVertex1.edges.push(edge1);
    const edge2 = new Edge(testVertex1);
    testVertex2.edges.push(edge2);

    this.vertices.push(testVertex1, testVertex2);
  }

  /**
   * Create a random graph
   */
  randomize(width, height, pxBox, probability = 0.6) {
    // Helper function to set up two-way edges
    function connectVerts(v0, v1) {
      v0.edges.push(new Edge(v1));
      v1.edges.push(new Edge(v0));
    }

    let count = 0;

    // Build a grid of verts
    const grid = [];
    for (let y = 0; y < height; y += 1) {
      const row = [];
      for (let x = 0; x < width; x += 1) {
        const v = new Vertex();
        // v.value = 'v' + x + ',' + y;
        v.value = `${v} + ${count += 1}`;
        row.push(v);
      }
      grid.push(row);
    }

    // Go through the grid randomly hooking up edges
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        // Connect down
        if (y < height - 1) {
          if (Math.random() < probability) {
            connectVerts(grid[y][x], grid[y + 1][x]);
          }
        }

        // Connect right
        if (x < width - 1) {
          if (Math.random() < probability) {
            connectVerts(grid[y][x], grid[y][x + 1]);
          }
        }
      }
    }

    // Last pass, set the x and y coordinates for drawing
    const boxBuffer = 0.8;
    const boxInner = pxBox * boxBuffer;
    const boxInnerOffset = (pxBox - boxInner) / 2;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        grid[y][x].pos = {
          x: (x * pxBox + boxInnerOffset + Math.random() * boxInner) | 0,
          y: (y * pxBox + boxInnerOffset + Math.random() * boxInner) | 0
        };
      }
    }

    // Finally, add everything in our grid to the vertices in this Graph
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        this.vertices.push(grid[y][x]);
      }
    }
  }

  /**
   * Dump graph data to the console
   */
  dump() {
    let s;

    for (const v of this.vertices) {
      if (v.pos) {
        s = `v.value (${v.pos.x}, ${v.pos.y})`;
      } else {
        s = `${v.value}:`;
      }

      for (const e of v.edges) {
        // s += ` ${e.destination.value}`;
        // `${s} += ${e.value}`;
        s += e.value;
      }
      console.log(s);
    }
  }

  /**
   * BFS
   */
  bfs(start) {
    // !!! IMPLEMENT ME
  }

  /**
   * Get the connected components
   */
  getConnectedComponents() {
    // !!! IMPLEMENT ME
  }
}
