import React from 'react'
import Layout from './components/Layout'
import { style as css, insertRule } from 'glamor'
import Head from 'react-helmet'
import { Row, Col, Center } from './uikit/Flex'
import hands from '../public/hands.svg'
import logoWhite from '../public/logo-white.svg'

export default () => (
  <Layout>
    <Head
      title="amini"
      meta={[
        { name: `viewport`, content: `width=device-width, initial-scale=1` },
      ]}
    />
    <Center style={{ height: `calc(100vh - 5px)` }}>
      <Col className={heroContainer}>
        <img className={heroHands} src={hands} />
        <img className={heroLogo} src={logoWhite} />
        <span className={slogan}>Something something something blockchain.</span>
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
          <img className={chart} src="/static/chart.svg" />
        </Center>
      </Row>
    </Col>
  </Layout>
)

insertRule(`
  p {
    line-height: 25px;
  }
`)

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
