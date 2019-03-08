import React, {Component} from 'react';
import axios from 'axios';
const data = require('../data/kosten_data_vektis.json');

export class City extends Component {
  render() {
    console.log(data);
    data.map((d,i) => {
      switch (d.GEMEENTENAAM) {
        case 'DRONTEN':
          console.log(d.LEEFTIJDSKLASSE, d.KOSTEN_LANGDURIGE_GGZ);
          break;
      }
    });

    return (
      <div>tesks</div>
    );
  }
}



export default City;
