import React, { Component } from 'react'

class GTooltip extends Component {
  componentDidMount() {
    window.addEventListener(`mousemove`, this.moveTooltip)
  }

  componentWillUnmount() {
    window.removeEventListener(`mousemove`, this.moveTooltip)
  }

  moveTooltip = event => {
    this.globalTooltip.style.left = event.pageX - 280 + `px`
    this.globalTooltip.style.top = event.pageY - this.globalTooltip.offsetHeight - 85 + `px`
  }

  showTooltip = () => this.setState({ showTootip: true });
  hideTooltip = () => this.setState({ showTootip: false });

  render() {
    return (
      <span
        className="global-tooltip"
        ref={node => this.globalTooltip = node}
        style={{ visibility: this.props.tooltip ? `visible` : `hidden` }}
      >
        {this.props.tooltip}
      </span>
    )
  }
}

export default GTooltip
