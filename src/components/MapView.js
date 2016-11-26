import React, { Component } from 'react'

export default class MapView extends Component {

  componentDidMount() {
    let token = 'pk.eyJ1IjoibXdkY2hhbmciLCJhIjoiY2lqcDNwazhpMDEzaHVmbHhsdzdkZGF2MiJ9.ZYG2wT80kX2f-PCs7BAE4w';
    let mapId = 'mwdchang.p079gon0';
    let mymap = window.L.map('mapview', {zoomControl: false}).setView([45.505, -90.09], 3);

    window.L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: mapId,
        accessToken: token
    }).addTo(mymap);

    let data = this.props.data;

    data.forEach((d)=> {
      var circle = window.L.circle([d.lat, d.lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 50000
      }).addTo(mymap);
    });

  }

  render() {
    return (
      <div style={{ marginTop: `50px` }}>
        <div id="mapview" style={{ height: `500px`, width: `100vw` }} />
      </div>
    )
  }
}
