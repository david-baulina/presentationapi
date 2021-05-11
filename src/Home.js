import './App.css';
import React, {useState} from "react";


let incomingImage = 'https://omnipay-qr-images-qa1.s3.amazonaws.com/Terminal-00000391.svg';
let defaultImage = './adds/omniLogo.jpg';
const addsArray = [
  'https://d2iudltpvg47zz.cloudfront.net/fb-meta.jpg',
  'https://pbs.twimg.com/profile_images/985918092919361543/mZz9kRkm_400x400.jpg',
  'https://style.shockvisual.net/wp-content/uploads/2021/01/Ikea-compressor.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Fnac_Logo.svg/1200px-Fnac_Logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Logo_SNCF_2011.svg/1200px-Logo_SNCF_2011.svg.png'
  ];
let i=0;

export default function Home(){
  const [open, isOpen] = useState(false);
  let image = '';

  {incomingImage.length ?
    image = incomingImage : image= defaultImage
  }

  const presentationRequest = new PresentationRequest('/reciever.html');

  navigator.presentation.defaultRequest = presentationRequest;

  let presentationConnection;

  const handlePresentation = ()=>{
    presentationRequest.start()
    .then(connection => {
      presentationConnection = connection;
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleAdds =()=>{
    let addsImage;
    window.myVar = setInterval(()=>{
      if(i>addsArray.length){
        i=0;
      } else{
        i++;
      }
      if (i<addsArray.length){
        addsImage= addsArray[i];
      }
      const lang = document.body.lang || 'en-US';
      presentationConnection.send(JSON.stringify({message:`${addsImage}`}, lang));
    }, 2000)
  }

  const handleImage =() =>{
    clearInterval(window.myVar);
    const lang = document.body.lang || 'en-US';
    presentationConnection.send(JSON.stringify({message:`${image}`}, lang));
  }

  const handleCloseImages = ()=>{
    clearInterval(window.myVar);
    const lang = document.body.lang || 'en-US';
    presentationConnection.send(JSON.stringify({message:`${defaultImage}`}, lang));
  }

  const handleCancelPresentation = ()=>{
    presentationConnection.close();
  }

  const purgePresentation = () =>{
    presentationConnection.terminate();
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handlePresentation}>Presentacion</button>
          <button onClick={handleImage}>Imagen</button>
          <button onClick={handleAdds}>Adds</button>
          <button onClick={handleCloseImages}>Cerrar Todo</button>
          <button onClick={handleCancelPresentation}>Cerrar presentacion</button>
          <button onClick={purgePresentation}>Purgar</button>
      </header>
    </div>
  );
};
