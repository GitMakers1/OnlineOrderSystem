import AbsVIew from './AbsVIew.js'

export default class extends AbsVIew {
  constructor (params) {
    super(params)
    this.setTitle('CreateMenu')
  }

  async getHtml () {
    const response = await fetch('/static/showAll.html') // Adjust the path to login.html if necessary
    const html = await response.text()
    return html
  }
  afterRender () {
    console.log('page loaded')
    let userid = 1
    let look = 'userid'
    fetch(`http://localhost:4000/api/getUser?userid=${userid}&look=${look}`, {
      method: 'GET'
    })
      .then(response => response.text())
      .then(content => {
        console.log('Response Content:', content) // Log the response content as a string
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }
}
