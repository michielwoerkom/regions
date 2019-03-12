import React, {Component} from 'react';
import * as d3 from "d3";
const healthRegionData = require('../data/zorgkantoor_regios.json');

// Get Unique region values from healthRegionData
const distinctRegions = [];
const map = new Map();
for (const d of healthRegionData) {
  if(!map.has(d.Zorgkantoorregio)) {
    map.set(d.Zorgkantoorregio, true);
    distinctRegions.push({regio: d.Zorgkantoorregio})
  }
}


let regioData = [];
distinctRegions.map((d, i) => {
  regioData[i] = [];
  return healthRegionData.reduce((previous, d) => {
    if (previous.regio === d.Zorgkantoorregio) {
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

    const width = 1000, height = 1000;
    const centerX = width / 2;
    const centerY = height /2;
    const circleRadius = 400;
    svg.attr('width', width)
    .attr('height', height);

    const myColor = d3.scaleOrdinal()
    .domain(distinctRegions)
    .range(d3.schemeCategory10);

    // Calculate the angle index in degrees
    const newAngle = 360 / healthRegionData.length;
    console.log(newAngle);
    distinctRegions.map((d,i) => {
      let instances = regioData[i].length;
      d.instances = instances;
      d.angleCalc = newAngle * instances;
    });
    console.log(distinctRegions);

    // Calculate the angle index in degrees
    const angle = 360 / distinctRegions.length;

    distinctRegions.reduce((previous, d, i) => {
      let circleCoord = previous+d.angleCalc;
      let spaceCompensation = circleCoord - (d.angleCalc/2);
      let sin = Math.sin(spaceCompensation * Math.PI /180);
      let cos = Math.cos(spaceCompensation * Math.PI /180);
      // SOH: Sin = Op / Hy --> SIN = Opposite / Hypotenuse;
      // Sin = angleCalc, Opposite = ?, Hypotenuse = circleRadius;
      // More info check this beauty: https://www.youtube.com/watch?v=bSM7RNSbWhM
      // centerX is because our SVG calcs from top-corner = 0, top-left = 0
      d.coordX = sin* circleRadius+centerX;
      d.coordY = cos* circleRadius+centerX;
      return previous+d.angleCalc;
    },0);
    console.log(distinctRegions);

    // Circular view
    healthRegionData.map((d,i) => {
      distinctRegions.map((e, i) => {
        if (e.regio === d.Zorgkantoorregio) {
          d.posX = e.coordX;
          d.posY = e.coordY;
         }
      });
    })

    const simulation = d3.forceSimulation(healthRegionData)
    .force('charge', d3.forceManyBody().strength(5))
    .force('x', d3.forceX().x(d => d.posX))
    .force('y', d3.forceY().y(d => d.posY))
    // .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(6))
    .on('tick', ticked);

    function ticked() {
      const u = d3.select('svg')
      .selectAll('circle')
      .data(healthRegionData)

      u.enter()
        .append('circle')
        .attr('r', 5)
        .merge(u)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .style("fill", d => myColor(d.Zorgkantoorregio))
        .attr('class', d => d.Zorgkantoorregio)

      u.exit().remove()
    }

  };

  render() {
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
