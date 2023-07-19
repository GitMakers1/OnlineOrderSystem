//import { response } from 'express';
import AbsVIew from './AbsVIew.js'




export default class extends AbsVIew {
  constructor (params) {
    super(params);
    this.setTitle('uploadimage')
  }

  async getHtml () {
    const response = await fetch("/static/uploadImage.html"); // Adjust the path to login.html if necessary
    const html = await response.text();
    return html;
  }
  afterRender() {

    const fileInput = document.getElementById('image');
    const uploadBtn = document.getElementById('uploadBtn');
    
    uploadBtn.addEventListener('click', function () {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('image', file);
    
      console.log(formData);
      fetch('/api/uploadimage', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('File uploaded successfully:', data);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    });
    




    const getimageBtn = document.getElementById('getimage')

    getimageBtn.addEventListener('click',() =>
    {
      const imageid = document.querySelector('#imageid').value;
      
      fetch('http://localhost:4000/api/getimage/',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageid:imageid
      }),
      }).then((response) =>response.json())
      .then((data)=>{
        console.log(data.path)
      // Set the image path as the src attribute of the <img> tag
      const imageElement = document.getElementById('imageplace');
      imageElement.src = data.path;
      }).catch((error)=>{
        console.error(error);
      })



    });
}
}

