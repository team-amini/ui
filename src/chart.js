export class Chart {

  constructor(element) {
    this.element = element;
    console.log('element', this.element.size());
  }

  render(data) {
    let element = this.element;
    let svg = this.element.append('svg')
      .attr('width', '400px')
      .attr('height', '200px');

    let g = svg.append('g');
    g.selectAll('.bars')
      .data(data)
      .enter()
      .append('rect')
      .classed('bars', true)
      .attr('x', (d, i)=> { return 10 + 10*i; })
      .attr('y', (d, i)=> { return 0; })
      .attr('height', (d, i)=> { return d;})
      .attr('width', 9)
      .style('fill', '#369');
  }
}
