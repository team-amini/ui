export default class FakeData {

  static num = 50;

  static fakeValues() {
    let r = [];
    for (let i=0; i < this.num; i++) {
      r.push({k:i, v: Math.random()});
    }
    return r;
  }

}
