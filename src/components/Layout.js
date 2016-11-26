import React from 'react'
import { style as css } from 'glamor'
import { Row, Col } from '../uikit/Flex'
import logo from '../../public/logo.png'

export default ({ children }) => (
  <Col>
    <Row className={header}>
      <img className={navLogo} src={logo} />
      <span style={{ marginLeft: `auto` }}> </span>
    </Row>
    <Col style={{ marginTop: `80px` }}>{children}</Col>
  </Col>
)

let navLogo = css({
  width: `100px`,
  height: `40px`,
})

let navLink = css({
  letterSpacing: `2px`,
  transition: `0.25s color ease`,
  ':hover': {
    color: `rgb(233, 226, 55)`,
  },
})

let header = css({
  position: `fixed !important`,
  width: `100vw`,
  lineHeight: `80px`,
  color: `white`,
  padding: `0 50px`,
  zIndex: 100000,
  padding: `20px`,
  backgroundColor: `white`,
})

let hideSmall = css({
  '@media (max-width: 600px)': {
    display: `none`,
  },
})
