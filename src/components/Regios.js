import React, {Component} from 'react';
import * as d3 from "d3";
const healthRegionData = require('../data/zorgkantoor_regios.json');

const distinctRegios = [...new Set(healthRegionData.map(d => d.Zorgkantoorregio))];

let regioData = [];
distinctRegios.map((d, i) => {
  regioData[i] = [];
  return healthRegionData.reduce((previous, d) => {
    if (previous === d.Zorgkantoorregio) {
      regioData[i].push({Regio: d.Zorgkantoorregio, Gemeente: d.Gemeente});
    }
    return previous;
  },d);
});




export class Regios extends Component {

  handleClick(e) {
    console.log(regioData);
  };

  componentDidMount() {
    const svg = d3.select('svg#svg');

    const width = 1000, height = 800;
    svg.attr('width', width)
    .attr('height', height);

    const myColor = d3.scaleOrdinal()
    .domain(distinctRegios)
    .range(d3.schemeCategory10);

    const arrValue = 2000 / distinctRegios.length;
    const categorienPosities = [];
    distinctRegios.map((d, i) => {
      categorienPosities.push({regio: d, value: i * arrValue});
    });

    console.log(categorienPosities);

    const xCenter = healthRegionData.map((d,i) => {
      categorienPosities.map((e, i) => {
        if (e.regio === d.Zorgkantoorregio) {
          d.pos = e.value;
         }
      });
    })

    console.log(healthRegionData);

    const simulation = d3.forceSimulation(healthRegionData)
    .force('charge', d3.forceManyBody().strength(5))
    .force('x', d3.forceX().x(d => d.pos))
    .force('y', d3.forceY().y(200))
    // .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => d.Inwoneraantal/100000))
    .on('tick', ticked);



    // simulation.force('x', d3.forceX().x(function(d) {
    //   return xCenter[d.Zorgkantoorregio];
    // }));

    function ticked() {
      const u = d3.select('svg')
      .selectAll('circle')
      .data(healthRegionData)

      u.enter()
        .append('circle')
        .attr('r', d => d.Inwoneraantal/100000)
        .merge(u)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .style("fill", d => myColor(d.Zorgkantoorregio))
        .attr('stroke-width', '2')

      u.exit().remove()
    }


  };



  render() {
    console.log(healthRegionData);
    console.log(regioData);
    // Make healthRegionData usefull -->  regioData



    return (
      <div className="main">
        <button
          onClick={() => this.handleClick()}
        >
        Klik hier!
        </button>

        <svg id="svg"/>


      </div>
    );
  }
}



export default Regios;
