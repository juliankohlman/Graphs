// updateCanvas() {
//     const canvas = this.refs.canvas;
//     const ctx = canvas.getContext('2d');
//     // Clear it
//     ctx.fillStyle = '#5086F2';
//     ctx.fillRect(0, 0, canvasWidth, canvasHeight);
//     console.log("in updateCanvas()", this.props.graph.vertexes);
//     // compute connected components
//     const vertexes = this.props.graph.vertexes;
//     const radius = 20;

//     // edge(s) TODO optimize these 2 loops
//     for (const v of vertexes) {
//       for (const edge of v.edges) {    
//         ctx.beginPath();
//         ctx.moveTo(v.pos.x, v.pos.y);
//         ctx.lineTo(edge.destination.pos.x, edge.destination.pos.y);
//         ctx.strokeStyle = 'white';
//         ctx.stroke();
//       }
//     }

//     for (const vert of vertexes) {
//       // vertex(s)
//       ctx.beginPath();
//       ctx.arc(vert.pos.x, vert.pos.y, radius, 0, 2 * Math.PI);
//       ctx.fillStyle = 'white';
//       ctx.fill();
//       ctx.stroke();

//       ctx.fillStyle = 'black';
//       ctx.font = '12px Titillium Web';
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
//       ctx.fillText(vert.value, vert.pos.x, vert.pos.y);
//       ctx.stroke();
//     }
//   }