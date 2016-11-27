import React, { Component } from 'react'
import * as d3 from 'd3'
import transactions from '../transactions-clique'

// console.log(123, transactions)

export default class Nodelink extends Component {
  componentDidMount() {
    Number.prototype.formatMoney = function(c, d, t){
      var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

    var svg    = d3.select("#nodelink"),
        width  = +svg.attr("width"),
        height = +svg.attr("height");

    var color = d3.scaleLinear()
        .range(["#B2BC11", "#0D3715"])
        .interpolate(d3.interpolateHcl),
        size  = d3.scaleLinear().range([1, 30]),
        distance = d3.scaleLinear().range([20,50]);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink()
          .id(function(d) { return +d.id; }).distance(50))
        .force("charge", d3.forceManyBody().strength(-7))
        .force("center", d3.forceCenter(width / 2, height / 2));

    var nodes = {},
        edges = [],
        nodeArray = [];


    for (var i = 0; i < transactions.length; i++){
      var t = transactions[i],
          from_ = +t.from,
          to    = +t.to,
          value = +t.amount;

      if (nodes[from_] == undefined){
        nodes[from_] = {city: t.fromPoint.city, id: from_, volume: 0};
        nodeArray.push(nodes[from_]);
      }
      if (nodes[to] == undefined) {
        nodes[to] = {city: t.toPoint.city, id: to, volume: 0};
        nodeArray.push(nodes[to]);
      }

      edges.push({
        source: from_,
        target: to,
        value: value,
        time: t.transactionTime,
        // show: value > 5000
      });

      nodes[to].volume += value;
      nodes[from_].volume += value;

      // if (value > 5000){
      //   nodes[to].show = true;
      //   nodes[from_].show = true;
      // }
    }

    size.domain(d3.extent(nodeArray, function(d){return d.volume;}));
    color.domain(d3.extent(nodeArray, function(d){return d.volume;}));
    // distance.domain(d3.extent(edges, function(d){return d.value;}));

    // FILTER
    var threshold = 5000,
        overviewEdges = [],
        overviewNodes = {};

debugger
    edges.forEach(function(e){
      if (e.value > threshold){
        overviewEdges.push(e);
        overviewNodes[e.source] = nodes[e.source];
        overviewNodes[e.target] = nodes[e.target];
      }
    });
    // console.log(overviewNodes);
    overviewNodes = d3.values(overviewNodes);


    // var overviewEdges = edges.filter(function(e){return e.value > 5000;}),
        // overviewNodes = /*nodeArray;*/nodeArray.filter(function(n){return n.show;});

    var link = svg.append("g")
        .attr("class", "links")
      .selectAll("line")
      .data(overviewEdges)
      .enter().append("line")
        .attr("stroke", function(d){return color(d.value);})
        // .classed("background", function(d){return !d.show})
        .on("mouseover", d => {
          this.props.setTooltip(<div><div><span className="tt_hl">From</span>: {d.source.id}</div>
            <div><span className="tt_hl">To:</span> {d.target.id}</div>
            <div><span className="tt_hl">Timestamp:</span> {d.transactionTime}</div>
            <div><span className="tt_hl">Value:</span> ${d.value.formatMoney(2, ".", ",")}</div></div>)
        })
        .on("mouseout", d => {
          this.props.setTooltip(null)
        });
        // .attr("stroke-width", function(d) { return 2; })


    var node = svg.append("g")
        .attr("class", "nodes")
      .selectAll("circle")
      .data(overviewNodes)
      .enter().append("circle")
        // .classed("background", function(d){return !d.show})
        .attr("r", function(d){return size(d.volume); })
        // .attr("fill", function(d){return color(d.volume);})
        // .attr("fill", function(d) { return "black"; })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // node.append("title")
        // .text(function(d) { return d.id; });

    simulation
        .nodes(overviewNodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(overviewEdges);

    function ticked() {
      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    }


    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.1).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  render() {
    return (
      <div>
        <div style={{ color: `silver`, padding: `12px`, fontWeight: 100 }}>
          Network Diagram
        </div>
        <svg id="nodelink" width="900" height="600" />
      </div>
    )
  }
}
