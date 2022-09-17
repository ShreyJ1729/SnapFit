import "./Camera.css";
import React, { useState, useEffect } from 'react';
import db from "../firebase";

export function Camera(){
    const [source, setSource] = useState("");
    const [url, setUrl] = useState("");
    const [clothingType, setClothingType] = useState("shirts");

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
        setUrl(event.target.value);
        let file = event.target.files[0];
        const newUrl = URL.createObjectURL(file);
        toDataURL(newUrl,
        function (dataUrl) {
            setSource(dataUrl);
        }
      )
    }

    function handleClothingTypeChange(e){
      setClothingType(e.target.value);
    }

    async function postImageData(){
        db.collection(clothingType).add(
          {photo: source}
        )
        setUrl("");
        setSource("");
    }
    return (
        <div id="cameraDiv">
            <input accept="image/*"type="file" capture="environment" onChange={handleImageUpload} value={url}/>
            {source && <img src={source} style={{width: "100%", height: "auto"}}/>}
            {source && 
            <select onChange={handleClothingTypeChange}name="clothingType" id="clothingType">
              <option value="shirts">Shirts</option>
              <option value="pants">Pants</option>
              <option value="shoes">Shoes</option>
            </select>
            }
            {source && <button onClick={postImageData}>upload photo</button>}
        </div>
    );
}