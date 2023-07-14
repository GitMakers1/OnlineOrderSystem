import AbsVIew from './AbsVIew.js'




export default class extends AbsVIew {
  constructor (params) {
    super(params);
    this.setTitle('Dashboard')
  }

  async getHtml () {
    const response = await fetch("/static/register.html"); // Adjust the path to login.html if necessary
    const html = await response.text();
    return html;
  }
  afterRender() {
    const loginButton = document.getElementById('registerBtn');
    loginButton.addEventListener('click', () => {
      const account = document.querySelector('#account').value;
      const password = document.querySelector('#password').value;
      const email = document.querySelector('#email').value;

      fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: account,
          password: password,
          email:email
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
