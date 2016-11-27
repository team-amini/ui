import React, { Component } from 'react'
import Layout from './components/Layout'
import { style as css } from 'glamor'
import { withState } from 'recompose'
import { Row, Col, Center } from './uikit/Flex'
import hands from '../public/hands.svg'
import logoWhite from '../public/logo.png'
import chartSvg from '../public/chart.svg'
import BarChart from './components/BarChart'
import MapView from './components/MapView'
import ActivityView from './components/ActivityView'
import News from './components/News'
import FakeData from './FakeData'
import Login from './Login'
import Alerts from './components/Alerts'
import API from './API'

let sourceUrl = `http://amini.canadaeast.cloudapp.azure.com:8080/stream`

let source = new EventSource(sourceUrl)

class App extends Component {
  state = {
    alerts: false,
    loggedIn: false,
    selectedTransaction: null,
    timeRange: {
      min: 2,
      max: 10,
    },
    amountRange: {
      min: 250,
      max: 500,
    },
    currentAlert: ``,
    currentAlertTitle: ``,
    createdAlerts: [
      {
        name: `Client sends 5 tx within single minute`,
        created: new Date(),
        string:
          `SELECT userId,count(*) as totalViews
              FROM Request.win:time(30 sec) GROUP BY userId`
        ,
      },
    ],
  }

  componentDidMount() {
    this.api = new API()

    source.onmessage = e => {
      console.log(JSON.parse(e.data))
    }

    this.api.getHistory(1, 2).then(d => {
      console.log(`API history`, d)
    })
  }

  render() {
    //if (!state.loggedIn) return <Login setState={setState} />
    return (
      <Layout
        handleAmountChange={(component, amountRange) => this.setState({ amountRange })}
        handleRangeChange={(component, timeRange) => this.setState({ timeRange })}
        toggleAlerts={alerts => this.setState({ alerts })}
        {...this.state}
      >
        <Col>
          {!this.state.alerts &&
            <span>
              <Row>
                <Col flex="1">
                  <MapView data={FakeData.fakeGeo({ amountRange: this.state.amountRange })} />
                </Col>
                <Col flex="1" style={{ justifyContent: `center`, alignItems: `center` }}>
                  <News data={FakeData.fakeNews({ amountRange: this.state.amountRange })} />
                </Col>
              </Row>
              <Row>
                <Col flex="1" style={{ padding: `10px` }}>
                  <BarChart data={FakeData.fakeChartValues({ amountRange: this.state.amountRange })}/>
                </Col>
                <Col flex="1">
                  <ActivityView
                    selectedTransaction={this.state.selectedTransaction}
                    selectTransaction={selectedTransaction => this.setState({ selectedTransaction })}
                    data={FakeData.fakeValues({ amountRange: this.state.amountRange })}
                  />
                </Col>
              </Row>
            </span>
          }
          {this.state.alerts &&
            <Alerts
              handleAlertChange={currentAlert => this.setState({ currentAlert })}
              currentAlert={this.state.currentAlert}
              clear={() => this.setState({ currentAlert: `` })}
              createdAlerts={this.state.createdAlerts}
              currentAlertTitle={this.state.currentAlertTitle}
              updateAlertTitle={e => this.setState({ currentAlertTitle: e.target.value })}
            />
          }
        </Col>
      </Layout>
    )
  }
}

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

export default App
