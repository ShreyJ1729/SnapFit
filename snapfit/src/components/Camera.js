import "./Camera.css";
import React, { useState, useEffect } from "react";
import db from "../firebase";
import Camera, {FACING_MODES} from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
    let addedDocument = await db.collection(clothingType).add({ photo: source });
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
      isFullscreen = {true}
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
      <Stack spacing={2} direction="row">
      {source && <Button variant="contained" onClick={postImageData}>upload photo</Button>}
      {source && <Button variant="contained" onClick={retakePhoto}>retake photo</Button>}
      </Stack>
    </div>
  );
}