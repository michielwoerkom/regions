import React, { Component } from 'react';
import HealthCareCosts from './HealthCareCosts';
import Regios from './Regios';

class App extends Component {
  render() {
    return(
      <div>
        <Regios/>
        <HealthCareCosts />
      </div>
    );
  }
}

export default App;
