import React from 'react'

const Tooltip = ({ component, children, setTooltip }) => (
  <span
    onMouseOver={() => setTooltip(component)}
    onMouseOut={() => setTooltip(null)}
  >
    {children}
  </span>
)

export default Tooltip
