import _ from 'lodash'
import data from './data'

export default class FakeData {

  static num = 50;

  static fakeNews({ amountRange }) {
    return data.filter(d => d.amount > amountRange.min && d.amount < amountRange.max).slice(0, 11)
  }

  static fakeChartValues({ amountRange }) {
    let r = data.filter(d => d.amount > amountRange.min && d.amount < amountRange.max)
    .map(d => ({
      k: d.transactiontime,
      v: d.amount,
      from: d.from,
      to: d.to,
    }))

    let r2 = _.groupBy(r, (d)=>d.k);
    let r3 = [];

    let keys = Object.keys(r2);
    keys.forEach((key)=> {
      r3.push({
        k: key,
        v: _.sum(r2[key].map((d)=>d.v))
      });
    });
    return _.orderBy(r3, (d)=> { return d.k; });
  }

  static fakeValues() {
    let r = data.map((d)=> {
      return {
        k: d.transactiontime,
        v: d.amount,
        from: d.from,
        to: d.to
      };
    });

    return _.orderBy(r, (d)=> { return d.k; });
  }



  static fakeGeo() {
    /*
    let r = [];
    for (let i=0; i < this.num; i++) {
      r.push({lat:Math.random()*180 - 90, lng: Math.random()*360 - 180});
    }
    return r;
    */
    return data.map((d)=> {
      return {
        lat: d.fromPoint.latitude,
        lng: d.fromPoint.longitude,

        f_lat: d.fromPoint.latitude,
        f_lng: d.fromPoint.longitude,
        t_lat: d.toPoint.latitude,
        t_lng: d.toPoint.longitude
      }
    });
  }

}
