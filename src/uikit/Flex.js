import React, { Children, cloneElement } from 'react'

const baseStyle = {
  display: `flex`,
  flexDirection: `row`,
  boxSizing: `border-box`,
  position: `relative`,
  outline: `none`,
}

const Row = ({ flex, wrap, style, spacing, children, ...props }) => (
  <div
    style={{
      ...baseStyle,
      flex,
      ...(wrap ? { flexWrap: `wrap` } : {}),
      ...style,
    }}
    {...props}
  >
    {!spacing && children}
    {spacing && Children.map(children, (child, i) =>
      child &&
      cloneElement(child, {
        ...child.props,
        style: {
          ...(i ? { marginLeft: spacing } : {}),
          ...(child.props.style ? child.props.style : {}),
        },
      })
    )}
  </div>
)

const Col = ({ style, children, spacing, ...props }) => (
  <Row style={{ ...style, flexDirection: `column` }} {...props}>
    {!spacing && children}
    {spacing && Children.map(children, (child, i) =>
      child &&
      cloneElement(child, {
        ...child.props,
        style: {
          ...(i ? { marginTop: spacing } : {}),
          ...(child.props.style ? child.props.style : {}),
        },
      })
    )}
  </Row>
)

const Center = ({ style, children, ...props }) => (
  <Row style={{ ...style, justifyContent: `center`, alignItems: `center` }} {...props}>
    {children}
  </Row>
)

/*----------------------------------------------------------------------------*/

export { Row, Col, Center }
