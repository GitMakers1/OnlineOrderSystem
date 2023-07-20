import AbsVIew from './AbsVIew.js'

export default class extends AbsVIew {
  constructor (params) {
    super(params)
    this.setTitle('CreateMenu')
  }

  async getHtml () {
    const response = await fetch('/static/createProfile.html') // Adjust the path to login.html if necessary
    const html = await response.text()
    return html
  }
  afterRender () {
    document.forms.createProfile.addEventListener('submit', e => {
      e.preventDefault()
      let form = e.target
      const formdata = new FormData(form)
      fetch('http://localhost:4000/api/uploadimage', {
        method: 'POST',
        body: formdata
      })
      .then(response => response.json())
      .then(data => {
        formdata.append('imageid',data.imageid);

        console.log(formdata);
        fetch('http://localhost:4000/api/createProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formdata))
      }
      )
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error uploading file:', data);
      });
        
      })
      .catch(error => {
        console.error('Error uploading file:', data);
      });
    }
    );

  }
}
