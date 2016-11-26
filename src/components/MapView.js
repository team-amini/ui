import React, { Component } from 'react'

export default class MapView extends Component {
  state = {
    node: null,
    mapSet: false,
  }

  componentWillReceiveProps(next) {
    if (this.group) {
      this.group.clearLayers()

      let canvas = document.querySelector(`canvas`)

      // canvas.width = canvas.width
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.drawMap(next.data)
    }
  }

  drawMap(data) {
    this.group = new window.L.FeatureGroup()

    data.forEach((d) => {
      let circle = window.L.circle([d.lat, d.lng], {
        stroke: false,
        fillColor: `#F03`,
        fillOpacity: 0.3,
        radius: 5000,
      })

      this.group.addLayer(circle)
    })

    data.forEach(d => {
      let x1 = +d.f_lat
      let y1 = +d.f_lng
      let x2 = +d.t_lat
      let y2 = +d.t_lng

      let midx = x1 + (x2 - x1) / 2

      // console.log(x1, y1, midx, y1, midx, y2, x2, y2)

      let bezier = new window.Bezier(x1, y1, midx, y1, midx, y2, x2, y2)
      let points = bezier.getLUT(20)
      let pointsPrime = points.map((p, i) => [p.x, p.y, i])

      let hotline = window.L.hotline(pointsPrime, {
        min: 0,
        max: 20,
        palette: {
          0.0: `#00CC00`,
          0.5: `#ffff00`,
          1.0: `#ff0000`,
        },
        weight: 3,
      })

      this.group.addLayer(hotline)
    })

    this.mymap.addLayer(this.group)
  }

  componentDidUpdate() {
    if (this.state.node && !this.state.mapSet) {
      this.setState({ mapSet: true })

      let token =
        `pk.eyJ1IjoibXdkY2hhbmciLCJhIjoiY2lqcDNwazhpMDEzaHVmbHhsdzdkZGF2MiJ9.ZYG2wT80kX2f-PCs7BAE4w`

      let mapId = `mwdchang.ooog665f`
      this.mymap = window.L.map(`mapview`, { zoomControl: false }).setView([45.505, -90.09], 3)

      window.L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}`, {
        attribution: 'Map data &copy <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: mapId,
        accessToken: token
      }).addTo(this.mymap)

      this.drawMap(this.props.data)
    }
  }

  render() {
    return (
      <div
        ref={
          node => {
            !this.state.node && this.setState({ node })
          }
        }
      >
        {this.state.node &&
          <div
            id="mapview"
            style={{ width: `${this.state.node.clientWidth}px`, height: `400px` }}
          />
        }
      </div>
    )
  }
}
