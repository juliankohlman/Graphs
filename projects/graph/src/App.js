/* eslint no-restricted-syntax: off */
/* eslint react/no-multi-comp: off */
import React, { Component } from 'react';
import { Graph } from './graph';
import './App.css';

// !!! IMPLEMENT ME
const canvasWidth = 750;
const canvasHeight = 750;
const x = 3;
const y = 3;
const boxSize = 150;
const existProb = 0.6;

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
  // TODO BREAK UP THIS FUNCTION: need to change updateCanvas
  updateCanvas() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    // Clear it
    // ctx.fillStyle = '#5086F2';
    ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // compute connected components
    const vertexes = this.props.graph.vertexes;
    const radius = 20;
    
    // let ascVerts = vertexes.sort((a,b) => {
    //   return b.edges.length - a.edges.length
    // });
    // console.log(ascVerts);
    // let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    for (const v of vertexes) {
      for (const edge of v.edges) {
        const xCenter = (v.pos.x + edge.destination.pos.x) / 2
        const yCenter = (v.pos.y + edge.destination.pos.y) / 2;
        // console.log(xCenter); 
        ctx.beginPath();
        ctx.strokeStyle = v.color;
        ctx.moveTo(v.pos.x, v.pos.y);
        ctx.lineTo(edge.destination.pos.x, edge.destination.pos.y);
        ctx.stroke();
        
        // TODO fix weights being drawn multiple times
        ctx.fillStyle = 'black';
        ctx.font = '22px Titillium Web';
        console.log(`edge ${edge}:`, edge.weight);
        ctx.fillText(`Weight: ${edge.weight}`, xCenter, yCenter, canvasHeight);
      }
    }

    for (const vert of vertexes) {
      // vertex(s)
      ctx.beginPath();
      ctx.arc(vert.pos.x, vert.pos.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#2953A0';
      ctx.fill();
      ctx.stroke();

      // vert.color === 'white' ? ctx.fillStyle = 'black' : ctx.fillStyle = 'white';
      ctx.fillStyle = 'white';
      ctx.font = '12px Titillium Web';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(vert.value, vert.pos.x, vert.pos.y);
      ctx.stroke();
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

    this.state.graph.randomize(x, y, boxSize, existProb);
    this.state.graph.getConnectedComponents();
  }

  randGraph = () => {
    console.log('Random button clicked');
    const state = { graph: new Graph() };
    state.graph.randomize(x, y, boxSize, existProb);
    state.graph.getConnectedComponents();
    this.setState(() => state);
  }
  
  render() {
    return <div className="App">
        <div>
          <button className="Button" onClick={this.randGraph}>
            Generate Graph
          </button>
        </div>
        <GraphView graph={this.state.graph} />
      </div>;
  }
}

export default App;
