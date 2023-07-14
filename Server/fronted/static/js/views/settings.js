import AbsVIew from './AbsVIew.js'

export default class extends AbsVIew {
  constructor (params) {
    super(params);
    this.setTitle('settings')
  }

  async getHtml () {
    return `
    <h1> welcome to seetings</h1>
    `
  };
}
