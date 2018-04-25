/* eslint no-restricted-syntax: off */
/* eslint react/no-multi-comp: off */
import React, { Component } from 'react';
import { Graph, Vertex, Edge } from './graph';
import './App.css';

// !!! IMPLEMENT ME
const canvasWidth = 640;
const canvasHeight = 480;

/**
 * GraphView
 */
class GraphView extends Component {
  /**
   * On mount
   */
  componentDidMount() {
    this.updateCanvas();
  }

  /**
   * On state update
   */
  componentDidUpdate() {
    this.updateCanvas();
  }

  /**
   * Render the canvas
   */
  updateCanvas() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    // Clear it
    ctx.fillStyle = '#88C1F2';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    console.log("in updateCanvas()", this.props.graph.vertexes);
    // // !!! IMPLEMENT ME
    // // compute connected components
    // // draw edges
    // }
    const vertexes = this.props.graph.vertexes;
    const radius = 20;

    for (const vert of vertexes) {
      // vertex(s)
      ctx.beginPath();
      ctx.arc(vert.pos.x, vert.pos.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = 'black';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(vert.value, vert.pos.x, vert.pos.y);
      ctx.stroke();
      // edge(s)
      for (const edge of vert.edges) {
        // console.log(edge.destination.pos.x);
        ctx.beginPath();
        ctx.moveTo(vert.pos.x, vert.pos.y);
        ctx.lineTo(edge.destination.pos.x, edge.destination.pos.y);
        ctx.stroke();
      }
    }
  }
  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={canvasWidth} height={canvasHeight}></canvas>;
  }
}


/**
 * App
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: new Graph(),
    };
    // !!! IMPLEMENT ME
    // use the graph randomize() method
    this.state.graph.debugCreateTestData();
    // console.log('this object', this);
    this.state.graph.dump();
  }

  render() {
    return (
      <div className="App">
        <GraphView graph={this.state.graph}></GraphView>
      </div>
    );
  }
}

export default App;
