import React from 'react'
import { style as css } from 'glamor'
import { Row, Col } from '../uikit/Flex'
import logo from '../../public/logo.png'
import Sidebar from './Sidebar'
import hands from '../../public/hands-BLANK.svg'

export default ({
  timeRange,
  amountRange,
  handleAmountChange,
  handleRangeChange,
  children,
  setPage,
  currentPage,
}) => (
  <Col>
    <Row className={header}>
      <img className={heart} src={hands} />
      <img className={navLogo} src={logo} />
      <Row style={{ marginLeft: `auto` }}>
        <Row
          className={`${navLink} ${currentPage === `Dashboard` ? activeLink : ``}`}
          onClick={() => setPage(`Dashboard`)}
        >
          <i className="fa fa-bar-chart" style={{ marginRight: `5px` }}/>
          <span>Dashboard</span>
        </Row>
        <Row
          className={`${navLink} ${currentPage === `View Alerts` ? activeLink : ``}`}
          onClick={() => setPage(`View Alerts`)}
        >
          <i className="fa fa-bell-o" style={{ marginRight: `5px` }}/>
          <span>View Alerts</span>
        </Row>
        <Row
          className={`${navLink} ${currentPage === `Manage Alerts` ? activeLink : ``}`}
          onClick={() => setPage(`Manage Alerts`)}
        >
          <i className="fa fa-edit" style={{ marginRight: `5px` }}/>
          <span>Manage Alerts</span>
        </Row>
      </Row>
    </Row>
    {currentPage === `Dashboard` &&
      <Row className={viewing}>
        CAD > BTC
      </Row>
    }
    <Row style={{ marginTop: `50px` }}>
      <Col className={sidebar}>
        <Sidebar
          timeRange={timeRange}
          handleRangeChange={handleRangeChange}
          amountRange={amountRange}
          handleAmountChange={handleAmountChange}
        />
      </Col>
      <Col flex="1">{children}</Col>
    </Row>
  </Col>
)

let viewing = css({
  position: `fixed !important`,
  marginTop: `30px`,
  color: `white`,
  padding: `50px`,
  fontSize: `25px`,
  zIndex: 1000,
  color: `#00d3b1`,
  textTransform: `uppercase`,
  marginLeft: `260px`,
  fontFamily: `'Bungee Inline', cursive`,
})

let heart = css({
  position: `relative`,
  top: `5px`,
  width: `40px`,
  height: `40px`,
})

let sidebar = css({
  backgroundColor: `#1e1e1e`,
  width: `280px`,
  borderRight: `1px solid rgb(45, 49, 51)`,
})

let navLogo = css({
  width: `130px`,
  height: `50px`,
})

let navLink = css({
  cursor: `pointer`,
  alignItems: `center`,
  padding: `0 15px`,
  transition: `0.2s all ease`,
  ':hover': {
    backgroundColor: `#1fb69e`,
  },
})

let activeLink = css({
  backgroundColor: `#1fb69e`,
})

let header = css({
  lineHeight: `50px`,
  position: `fixed !important`,
  width: `100vw`,
  color: `rgb(0, 0, 0)`,
  backgroundColor: `#00d3b1`,
  padding: `0 50px`,
  zIndex: 100000,
})

let hideSmall = css({
  '@media (max-width: 600px)': {
    display: `none`,
  },
})
