export default class FakeData {

  static num = 50;

  static fakeValues() {
    let r = [];
    for (let i=0; i < this.num; i++) {
      r.push({k:i, v: Math.random()});
    }
    return r;
  }

  static fakeGeo() {
    let r = [];
    for (let i=0; i < this.num; i++) {
      r.push({lat:Math.random()*180 - 90, lng: Math.random()*360 - 180});
    }
    return r;
  }

}
