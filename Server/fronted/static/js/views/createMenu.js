import AbsVIew from './AbsVIew.js'




export default class extends AbsVIew {
  constructor (params) {
    super(params);
    this.setTitle('CreateMenu')
  }

  async getHtml () {
    const response = await fetch("/static/createMenu.html"); // Adjust the path to login.html if necessary
    const html = await response.text();
    return html;
  }
  afterRender() {
    const loginButton = document.getElementById('createMenuBtn');
    loginButton.addEventListener('click', () => {
      const name = document.querySelector('#name').value;
      const profilesID = document.querySelector('#profilesID').value;
      const type = document.querySelector('#type').value;
      const start_time = document.querySelector('#start_time').value;
      const end_time = document.querySelector('#end_time').value;

      fetch('http://localhost:4000/api/createMenu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            profilesID: profilesID,
            type:type,
            start_time:start_time,
            end_time:end_time
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
}
