import React, { Component } from 'react'
import {Chart} from './chart';
import * as d3 from 'd3';

class App extends Component {

  constructor() {
    super();
    window.d3 = d3; // Daniel's hack
  }

  componentDidMount() {
    let x = new Chart(d3.select('#chart1'));
    x.render([100, 200, 300, 150, 300, 400]);
  }

  render() {
    return (
      <div>
        <h1>Amini yo ... ! </h1>
        <div id='chart1'></div>
      </div>
    )
  }
}

export default App
