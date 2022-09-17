import "./Camera.css";
import React, { useState } from 'react';    


export function Camera(){
    const [source, setSource] = useState("");

    function toDataURL(src, callback, outputFormat) {
        let image = new Image();
        image.crossOrigin = 'Anonymous';
        image.onload = function () {
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          let dataURL;
          canvas.height = this.naturalHeight;
          canvas.width = this.naturalWidth;
          ctx.drawImage(this, 0, 0);
          dataURL = canvas.toDataURL(outputFormat);
          callback(dataURL);
        };
        image.src = src;
        if (image.complete || image.complete === undefined) {
          image.src = "data:image/gif;base64, R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          image.src = src;
        }
    }
    
    function handleImageUpload(event){
        let file = event.target.files[0];
        const newUrl = URL.createObjectURL(file);
        toDataURL(newUrl,
        function (dataUrl) {
            setSource(dataUrl);
        }
      )
    }

    async function postImageData(){
      //post image data here
      console.log(source);
    }
    return (
        <div id="cameraDiv">
            <input accept="image/*"type="file" capture="environment" onChange={handleImageUpload}/>
            {source && <img src={source} style={{width: "100%", height: "auto"}}/>}
            {source && <button onClick={postImageData}>upload photo</button>}
        </div>
    );
}