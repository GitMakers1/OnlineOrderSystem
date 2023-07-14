import AbsVIew from './AbsVIew.js'

export default class extends AbsVIew {
  constructor (params) {
    super(params);
    this.setTitle('posts')
  }

  async getHtml () {
    return `
    <h1> welcome to posts</h1>
    `
  }
}
