export default class API {
  constructor() {
    this.baseURL = `http://amini.canadaeast.cloudapp.azure.com:8080`
  }

  getHistory(start, end) {
    return fetch(this.baseURL + '/history').then(d=>d.json());
  }

}
