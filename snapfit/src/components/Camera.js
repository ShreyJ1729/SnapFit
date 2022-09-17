import "./Camera.css";
import React, { useState, useEffect } from "react";
import db from "../firebase";
import Camera, {FACING_MODES} from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

export function CameraComponent() {
  const [source, setSource] = useState("");
  const [clothingType, setClothingType] = useState("shirts");

  function handleTakePhoto (dataUri) {
    setSource(dataUri);
  }

  function retakePhoto () {
    setSource(null);
  }

  function handleClothingTypeChange(e){
    setClothingType(e.target.value);
  }

  async function postImageData() {
    db.collection(clothingType).add({ photo: source });
    setSource("");
  }
  return (
    <div id="cameraDiv">
      {!source &&
        <Camera
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }
      }
      idealFacingMode = {FACING_MODES.ENVIRONMENT}
      style={{visibility: source ? "hidden" : "visible"}}
      />
      }
      {source && <img src={source} style={{ width: "100%", height: "auto" }} />}
      {source && 
        <select onChange={handleClothingTypeChange}name="clothingType" id="clothingType">
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="shoes">Shoes</option>
        </select>
      }
      {source && <button onClick={postImageData}>upload photo</button>}
      {source && <button onClick={retakePhoto}>retake photo</button>}
    </div>
  );
}