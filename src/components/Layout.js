import React from 'react'
import { style as css } from 'glamor'
import { Row, Col } from '../uikit/Flex'
import logoWhite from '../../public/logo-white.svg'

export default ({ children }) => (
  <Col>
    <Row className={header}>
      <img className={navLogo} src={logoWhite} />
      <span style={{ marginLeft: `auto` }}>
        <Row className={hideSmall} spacing="25px">
          {/* <span><Link to="/about"><a className={navLink}>ABOUT</a></Link></span> */}
          {/* <span><Link to="/contact"><a className={navLink}>CONTACT</a></Link></span> */}
        </Row>
      </span>
    </Row>
    <Col>{children}</Col>
  </Col>
)

let navLogo = css({
  width: `100px`,
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
  width: `calc(100vw - 100px)`,
  lineHeight: `80px`,
  color: `white`,
  margin: `0 50px`,
  zIndex: 10,
})

let hideSmall = css({
  '@media (max-width: 600px)': {
    display: `none`,
  },
})
