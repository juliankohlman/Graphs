/* eslint no-restricted-syntax: off */
/* eslint react/no-multi-comp: off */
import React, { Component } from 'react';
import { Graph } from './graph';
import './App.css';

// !!! IMPLEMENT ME
const canvasWidth = 750;
const canvasHeight = 600;

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
    ctx.fillStyle = '#5086F2';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    console.log("in updateCanvas()", this.props.graph.vertexes);
    // compute connected components
    const vertexes = this.props.graph.vertexes;
    const radius = 20;

    // edge(s) TODO optimize these 2 loops
    for (const v of vertexes) {
      for (const edge of v.edges) {
        ctx.beginPath();
        ctx.moveTo(v.pos.x, v.pos.y);
        ctx.lineTo(edge.destination.pos.x, edge.destination.pos.y);
        // ctx.strokeStyle = 'orange';
        ctx.stroke();
      }
    }

    for (const vert of vertexes) {
      // vertex(s)
      ctx.beginPath();
      ctx.arc(vert.pos.x, vert.pos.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = 'black';
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
  // TODO print a message on canvas on app start up
  // message should prompt the user the click the button to 
  // generate a random graph.
  render() {
    return <canvas ref="canvas" width={canvasWidth} height={canvasHeight}></canvas>;
  }
}

/**
 * App
 */
class App extends Component {
  state = {
    graph: new Graph(),
  };
    // !!! IMPLEMENT ME
    // use the graph randomize() method
    // state.graph.randomize(3, 2, 150, 0.6);
    // this.state.graph.debugCreateTestData();
    // console.log('this object', this);
    // this.state.graph.dump();
  // }
  randGraph = () => {
    console.log('Random button clicked');
    const state = { graph: new Graph() };
    state.graph.randomize(2, 3, 150, 0.6);
    this.setState(() => state);
  }
  
  // viewBFS = () => {
  //   console.log('BFS button clicked');
  //   const state = { graph: new Graph() };
  //   state.graph.randomize(2, 3, 150, 0.6);
  //   this.setState(() => state); 
  //   state.graph.bfs(state.graph.vertexes[0]);
  // }
  // BFS --- CONNECTED COMPONENTS CALLS HERE
  render() {
    // TODO STYLE random generator button
    return (
      <div className="App">
        <div>
          <button className="Button" onClick={this.randGraph}>Generate Random Graph</button>
        </div>
        {/* <div>
          <button className="Button" onClick={this.viewBFS}>BFS -- Colored Components</button>
        </div> */}
        <GraphView graph={this.state.graph} />
      </div>
    );
  }
}

export default App;
