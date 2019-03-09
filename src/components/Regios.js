import React, {Component} from 'react';
import * as d3 from "d3";
const healthRegionData = require('../data/zorgkantoor_regios.json');

const distinctRegios = [...new Set(healthRegionData.map(d => d.Zorgkantoorregio))];

export class Regios extends Component {

  handleClick(e) {
    console.log(distinctRegios);
  };
  componentDidMount({
    console.log('CDM');
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append("")
      .attr("x", (d, i) => i * 70)
      .attr("y", 0)
      .attr("width", 25)
      .attr("height", (d, i) => d)
      .attr("fill", "green");
  })

  render() {
    console.log(healthRegionData);
    // Make healthRegionData usefull -->  regioData

    let regioData = [];
    distinctRegios.map((d, i) => {
      regioData[i] = [];
      return healthRegionData.reduce((previous, d) => {
        if (previous === d.Zorgkantoorregio) {
           regioData[i].push({Regio: d.Zorgkantoorregio, Gemeente: d.Gemeente, Inwoneraantal: d.Inwoneraantal});
        }
        return previous;
      },d);
    });

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
