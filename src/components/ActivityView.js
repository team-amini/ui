import _ from 'lodash'
import React, { Component } from 'react'
import { style as css } from 'glamor'
import * as d3 from 'd3'

export default class ActivityView extends Component {

  constructor() {
    super();
    this.state = {
      topSendersByTX:[],
      topSendersByValue:[],
      topReceiversByTX: [],
      topReceiversByValue: []
    }
  }

  componentDidMount() {
    let data = this.props.data;
    // let element = d3.select(this.node);

    /*
    let w = parseFloat(element.style('width'));
    let h = parseFloat(element.style('height'));

    let svg = element.append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewbox', '0 0 ' + w + ' ' + h)
      .attr('preserveAspectRatio', 'xMinYMin');

    let g = svg.append('g');
    */

    // Eh...too tired to optimize this crap
    let agg = _.groupBy(data, (d)=>{return d.from});
    let keys = Object.keys(agg);
    let senders = [];
    let receivers = [];

    keys.forEach((key) => {
      senders.push({
        id: key,
        numTX: agg[key].length,
        totalValue: _.sum(agg[key].map(d=>d.v))
      });
    });

    agg = _.groupBy(data, (d)=>{return d.to});
    keys = Object.keys(agg);
    keys.forEach((key) => {
      receivers.push({
        id: key,
        numTX: agg[key].length,
        totalValue: _.sum(agg[key].map(d=>d.v))
      });
    });


    let num = 10;

    let topSendersByTX = _.take(senders.sort((d)=> { -d.numTX }), num);
    let topSendersByValue = _.take(senders.sort((d)=> { -d.totalValue}), num);

    let topReceiversByTX = _.take(receivers.sort((d)=> { -d.numTX }), num);
    let topReceiversByValue = _.take(receivers.sort((d)=> { -d.totalValue}), num);

    this.setState({
      topSendersByTX: topSendersByTX,
      topSendersByValue: topSendersByValue,
      topReceiversByTX: topReceiversByTX,
      topReceiversByValue: topReceiversByValue
    });
  }

  render() {

    let topSendersByTX = this.state.topSendersByTX.map(d =>
      <tr key={d.id + '-s1'} onClick={() => this.props.selectTransaction(d)}>
        <td>{d.id}</td>
        <td style={{textAlign:'right'}}>{d.numTX}</td>
      </tr>
    )

    let topSendersByValue = this.state.topSendersByValue.map(d =>
      <tr key={d.id + '-s2'} onClick={() => this.props.selectTransaction(d)}>
        <td>{d.id}</td>
        <td style={{textAlign:'right'}}>{d.totalValue}</td>
      </tr>
    )

    let topReceiversByTX = this.state.topReceiversByTX.map(d =>
      <tr key={d.id + '-r1'} onClick={() => this.props.selectTransaction(d)}>
        <td>{d.id}</td>
        <td style={{textAlign:'right'}}>{d.numTX}</td>
      </tr>
    )

    let topReceiversByValue = this.state.topReceiversByValue.map(d =>
      <tr key={d.id + '-r2'} onClick={() => this.props.selectTransaction(d)}>
        <td>{d.id}</td>
        <td style={{ textAlign: `right` }}>{d.totalValue}</td>
      </tr>
    )

    return (
      <div style={{ padding: `10px` }}>
        <div style={{ color: `silver`, padding: `12px`, fontWeight: 100 }}>
          Latest Activity
        </div>
        <div style={{display:'flex', 'justifyContent':'center', margin: '5px'}}>
          <table>
            <thead>
              <tr><th>Top Senders</th><th># TX</th></tr>
            </thead>
            <tbody>{topSendersByTX}</tbody>
          </table>

          <table>
            <thead>
              <tr><th>Top Senders</th><th>Amt</th></tr>
            </thead>
            <tbody>{topSendersByValue}</tbody>
          </table>

          <table>
            <thead>
              <tr><th>Top Receivers</th><th># TX</th></tr>
            </thead>
            <tbody>{topReceiversByTX}</tbody>
          </table>

          <table>
            <thead>
              <tr><th>Top Receivers</th><th>Amt</th></tr>
            </thead>
            <tbody>{topReceiversByValue}</tbody>
          </table>
        </div>
      </div>
    )
  }
}
