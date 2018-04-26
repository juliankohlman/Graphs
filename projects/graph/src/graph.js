/* eslint no-restricted-syntax: off */
/**
 * Edge
 */
export class Edge {
  constructor(destination, weight = 1) {
    this.destination = destination;
    this.weight = weight;
  }
}

/**
 * Vertex
 */
export class Vertex {
  constructor(value = 'vertex', pos = { x: 25, y: 25 }) {
    this.value = value;
    this.edges = [];
    this.pos = pos;
    this.visited = false;
    this.color = 'white';
  }
}

/**
 * Graph
 */
export class Graph {
  constructor() {
    this.vertexes = [];
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
    let grid = [];
    for (let y = 0; y < height; y++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        let v = new Vertex();
        //v.value = 'v' + x + ',' + y;
        v.value = 'v' + count++;
        row.push(v);
      }
      grid.push(row);
    }

    // Go through the grid randomly hooking up edges
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Connect down
        if (y < height - 1) {
          if (Math.random() < probability) {
            connectVerts(grid[y][x], grid[y+1][x]);
          }
        }

        // Connect right
        if (x < width - 1) {
          if (Math.random() < probability) {
            connectVerts(grid[y][x], grid[y][x+1]);
          }
        }
      }
    }

    // Last pass, set the x and y coordinates for drawing
    const boxBuffer = 0.6;
    const boxInner = pxBox * boxBuffer;
    const boxInnerOffset = (pxBox - boxInner) / 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        grid[y][x].pos = {
          'x': (x * pxBox + boxInnerOffset + Math.random() * boxInner) | 0,
          'y': (y * pxBox + boxInnerOffset + Math.random() * boxInner) | 0
        };
      }
    }

    // Finally, add everything in our grid to the vertexes in this Graph
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.vertexes.push(grid[y][x]);
      }
    }
  }

  /**
   * Dump graph data to the console
   */
  dump() {
    let s;

    for (let v of this.vertexes) {
      if (v.pos) {
        s = v.value + ' (' + v.pos.x + ',' + v.pos.y + '):';
      } else {
        s = v.value + ':';
      }

      for (let e of v.edges) {
        s += ` ${e.destination.value}`;
      }
      console.log(s);
    }
  }

  /**
   * BFS
   */
  /*
  0. Pick a color
  1. Add the first vertex in the array to the queue and add it to visited list
  2. Visit the first item in the queue (mark with color)
  3. -
  4. Loop through the edge array in the first item in the queue
  a. add each destination to queue if not visited
  b. for each destination, add to found list
  5. Dequeue the first item in queue
  a. if queue is not empty, go to step 2
  */
 getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

  bfs = (s) => {
    console.log('calling bfs() at vert', s.value);
    let color = this.getRandomColor();
    let queue = [];
    queue.push(s);
    s.visited = true;

    while (queue.length > 0) {
      const vertex = queue[0];
      vertex.color = color;

      for (let edge of vertex.edges) {
        if (!edge.destination.visited) {
          queue.push(edge.destination);
          edge.destination.visited = true;
          console.log('found edge: ', edge.destination.value);
        }
      }
      queue.shift();
    } 
  }
 
  /**
   * Get the connected components
   */
  getConnectedComponents = () => {
    console.log('called connected components');
    /*
    A. Loop through the list of vertexes
       if a vertex that has not been found is found do bfs:
    bfs(with vertex found in Step A.)
    */
    for (let v of this.vertexes) {
      if (!v.visited) this.bfs(v);
    }
  }
}