import React, { Component } from 'react'
import Layout from './components/Layout'
import { style as css } from 'glamor'
import { Row, Col } from './uikit/Flex'
import GTooltip from './uikit/GTooltip'
import BarChart from './components/BarChart'
import MapView from './components/MapView'
import ActivityView from './components/ActivityView'
import News from './components/News'
import FakeData from './FakeData'
import Alerts from './components/Alerts'
import AlertsTable from './components/AlertsTable'
import Nodelink from './components/Nodelink'
import API from './API'

let api = `http://amini.canadaeast.cloudapp.azure.com:8080`
let sourceUrl = `http://amini.canadaeast.cloudapp.azure.com:8080/stream`
let source = new EventSource(sourceUrl)

class App extends Component {
  state = {
    currentPage: `Dashboard`,
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
    actualAlerts: [],
    createdAlerts: [
      {
        id: `fake`,
        name: `Client sends 5 tx within single minute`,
        created: new Date(),
        disabled: false,
        string:
          `SELECT userId,count(*) as totalViews
              FROM Request.win:time(30 sec) GROUP BY userId`
        ,
      },
    ],
    tooltip: null,
  }

  constructor(props) {
    super(props)
    this.submitAlert = this.submitAlert.bind(this)
  }

  async componentDidMount() {
    source.onmessage = e => {
      console.log(JSON.parse(e.data))
      this.setState({
        actualAlerts: [
          JSON.parse(e.data),
          ...this.state.actualAlerts,
        ],
      })
    }

    let response = await fetch(`${api}/alerts`)
    let data = await response.json()

    this.setState({
      createdAlerts: [
        ...this.state.createdAlerts,
        ...data,
      ],
    })
  }

  async submitAlert() {
    let response = await fetch(`${api}/alerts`, {
      method: `POST`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify({
        name: this.state.currentAlertTitle,
        description: `Super Dumb`,
        epl: this.state.currentAlert,
      }),
    })

    let data = await response.json()

    this.setState({
      createdAlerts: [
        ...this.state.createdAlerts,
        data,
      ],
    })
  }

  async toggleEnabled(alert) {
    let disabled = !alert.disabled
    let i = this.state.createdAlerts.findIndex(x => x.id === alert.id)

    fetch(`${api}/alerts/${alert.id}/${disabled ? `disable` : `enable`}`, { method: `PUT` })

    this.setState({
      createdAlerts: [
        ...(this.state.createdAlerts.slice(0, i)),
        {
          ...alert,
          disabled,
        },
        ...(this.state.createdAlerts.slice(i + 1, Infinity)),
      ],
    })
  }

  render() {
    return (
      <Layout
        handleAmountChange={(component, amountRange) => this.setState({ amountRange })}
        handleRangeChange={(component, timeRange) => this.setState({ timeRange })}
        setPage={currentPage => this.setState({ currentPage })}
        {...this.state}
      >
        <Col>
          {this.state.currentPage === `Dashboard` &&
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
                  <BarChart
                    data={FakeData.fakeChartValues({ amountRange: this.state.amountRange })}
                    setTooltip={tooltip => this.setState({ tooltip })}
                  />
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
          {this.state.currentPage === `Manage Alerts` &&
            <Alerts
              handleAlertChange={currentAlert => this.setState({ currentAlert })}
              currentAlert={this.state.currentAlert}
              clear={() => this.setState({ currentAlert: ``, currentAlertTitle: `` })}
              createdAlerts={this.state.createdAlerts}
              currentAlertTitle={this.state.currentAlertTitle}
              updateAlertTitle={e => this.setState({ currentAlertTitle: e.target.value })}
              submitAlert={this.submitAlert}
              toggleEnabled={alert => this.toggleEnabled(alert)}
            />
          }

          {this.state.currentPage === `View Alerts` &&
            <AlertsTable
              actualAlerts={this.state.actualAlerts}
              createdAlerts={this.state.createdAlerts}
            />
          }
          <Nodelink />
        </Col>
        <GTooltip tooltip={this.state.tooltip} />
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
