import React from 'react'
import Layout from './components/Layout'
import { style as css } from 'glamor'
import { Row, Col, Center } from './uikit/Flex'
import hands from '../public/hands.svg'
import logoWhite from '../public/logo-white.svg'
import chartSvg from '../public/chart.svg'
import BarChart from './components/BarChart'
import FakeData from './FakeData'

export default () => (
  <Layout>
    <Center style={{ height: `calc(100vh - 5px)` }}>
      <Col className={heroContainer}>
        <img className={heroHands} src={hands} />
        <img className={heroLogo} src={logoWhite} />
        <span className={slogan}>Somethiasdasdasng something something blockchain.</span>
        <BarChart data={FakeData.fakeValues()} label="chart 1"></BarChart>
        <BarChart data={FakeData.fakeValues()} label="chart 2"></BarChart>
        <BarChart data={FakeData.fakeValues()} label="chart 3"></BarChart>
      </Col>
    </Center>
    <Col className={card}>
      <Row className={cardPadding}>
        <Col flex="1">
          <h1>We make your life easier by blah blah</h1>
          <p>
            Bacon ipsum dolor amet leberkas chicken tenderloin, beef ribs ground
            round frankfurter doner porchetta. Burgdoggen turkey bacon andouille
            cow pig prosciutto venison tongue ground round biltong drumstick beef
            ribs picanha. Shankle hamburger sausage shank kielbasa boudin pork chop
            alcatra pork belly. Kielbasa short ribs ham brisket, salami meatball
            drumstick sirloin shank fatback chicken. Ham hock jowl pastrami turducken
            leberkas, tri-tip porchetta beef landjaeger hamburger kevin picanha.
          </p>
        </Col>
        <Center flex="1">
          <img className={chart} src={chartSvg} />
        </Center>
      </Row>
    </Col>
  </Layout>
)

let heroContainer = css({
  marginBottom: `200px`,
  alignItems: `center`,
})

let heroHands = css({
  width: `150px`,
})

let heroLogo = css({
  width: `400px`,
})

let slogan = css({
  fontSize: `20px`,
  color: `white`,
})

let card = css({
  backgroundColor: `white`,
})

let chart = css({
  width: `350px`,
})

let cardPadding = css({
  padding: `100px`,
})
