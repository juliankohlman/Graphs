/* eslint no-restricted-syntax: off */
/* eslint react/no-multi-comp: off */
import React, { Component } from 'react';
import { Graph } from './graph';
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
    let canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    // Clear it
    ctx.fillStyle = '#2953A0';
    // ctx.fillStyle = 'white';
    // starts top left corner
    ctx.fillRect(0, 0, canvasWidth, canvasHeight); 
    console.log("in updateCanvas()", this.props.graph.vertices);

    // // !!! IMPLEMENT ME
    // // compute connected components
    // // draw edges
    // // draw verts
    // // draw vert values (labels)
    // }

    const vertexes = this.props.graph.vertices;
    const radius = 20;
    for (const v of vertexes) {
      ctx.beginPath();
      ctx.arc(v.pos.x, v.pos.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(v.value, v.pos.x, v.pos.y);
      ctx.stroke();
    }
    // for (const vertex of vertexes) {
    //   ctx.beginPath();
    //   ctx.arc(vertex.pos.x, vertex.pos.y, radius, 0, 2 * Math.PI);
    //   ctx.fillStyle = 'black';
    //   ctx.textAlign = 'center';
    //   ctx.textBaseline = 'middle';
    //   ctx.fillText(vertex.value, vertex.pos.x, vertex.pos.y);
    //   ctx.stroke();
    //   // connect edges to vertices
    //   for (const v of vertexes) {
    //     cxt.beginPath();
    //     ctx.moveTo(v.pos.x, v.pos.y);
    //     ctx.lineTo(v.edge.destination.pos.x / 2, v.edge.destination.pos.y);
    //     ctx.stroke();
    //   }
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
