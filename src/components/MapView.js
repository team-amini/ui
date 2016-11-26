import React, { Component } from 'react'

export default class MapView extends Component {

  componentDidMount() {
    let token = 'pk.eyJ1IjoibXdkY2hhbmciLCJhIjoiY2lqcDNwazhpMDEzaHVmbHhsdzdkZGF2MiJ9.ZYG2wT80kX2f-PCs7BAE4w';
    let mapId = 'mwdchang.p079gon0';
    mapId = 'mwdchang.ooog665f';
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
        // color: '#F00',
        stroke: false,
        fillColor: '#F03',
        fillOpacity: 0.3,
        radius: 5000
      }).addTo(mymap);
    });


    data.forEach((d)=> {
      let x1 = +d.f_lat;
      let y1 = +d.f_lng;
      let x2 = +d.t_lat;
      let y2 = +d.t_lng;

      let midx = x1 + (x2-x1)/2;

      let bezier = new window.Bezier(x1, y1, midx, y1, midx, y2, x2, y2)
      let points = bezier.getLUT(20);
      let pointsPrime = points.map((p, i) => {
        return [p.x, p.y, i];
      });


      window.L.hotline(pointsPrime, {
      //window.L.hotline([[+d.f_lat, +d.f_lng, 10], [+d.t_lat, +d.t_lng, 20]], {
      //window.L.hotline([[0, 0, 10], [40, 40, 15], [70, 70, 20]], {
        min: 0,
        max: 20,
        palette: {
          0.0: '#00CC00',
          0.5: '#ffff00',
          1.0: '#ff0000'
        },
        weight: 2
        //outlineColor: '#000000',
        //outlineWidth: 1
      }).addTo(mymap);

    });

  }

  render() {
    return (
      <div style={{ marginTop: `50px` }}>
        <div id="mapview" style={{ height: `350px`, width: `100vw` }} />
      </div>
    )
  }
}
