import React from 'react'
import { style as css } from 'glamor'
import { Row, Col } from '../uikit/Flex'
import logo from '../../public/logo.png'
import InputRange from 'react-input-range'

export default ({ selectedTransaction, timeRange, handleRangeChange, children }) => (
  <Col>
    <Row className={header}>
      <img className={navLogo} src={logo} />
      <span style={{ marginLeft: `auto` }}>
        {selectedTransaction &&
          <span>FILTERING ON TX ID: {selectedTransaction.id}</span>
        }
      </span>
    </Row>
    <Row style={{ marginTop: `80px` }}>
      <Col className={sidebar}>
        <Col style={{ padding: `20px`, marginTop: `20px` }}>
          <div style={{ color: `white`, paddingBottom: `30px` }}>Date Range</div>
          <InputRange
            maxValue={20}
            minValue={0}
            value={timeRange}
            onChange={handleRangeChange}
          />
        </Col>
      </Col>
      <Col flex="1">{children}</Col>
    </Row>
  </Col>
)

let sidebar = css({
  backgroundColor: `#1e1e1e`,
  width: `280px`,
  borderRight: `1px solid rgb(45, 49, 51)`,
})

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
  color: `rgb(0, 0, 0)`,
  backgroundColor: `#00d3b1`,
  padding: `0 50px`,
  zIndex: 100000,
  padding: `20px`,
})

let hideSmall = css({
  '@media (max-width: 600px)': {
    display: `none`,
  },
})
