import "./Camera.css";
import React, { useState, useEffect, useRef } from "react";
import db from "../firebase";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import * as tf from "@tensorflow/tfjs";

export function CameraComponent() {
  const [source, setSource] = useState("");
  const [clothingType, setClothingType] = useState("shirts");
  let [model, setModel] = useState(null);
  class L2 {
    static className = "L2";

    constructor(config) {
      return tf.regularizers.l1l2(config);
    }
  }
  tf.serialization.registerClass(L2);

  useEffect(() => {
    const loadModel = async () => {
      let model_ = await tf.loadLayersModel("tfjs_model/model.json"); 
      setModel(model_);
    };

    loadModel()
      .then(() => {
        alert("LOADED MODEL!")
        console.log("LOADED!");
      })
      .catch((error) => {
        alert("ERROR LOADING MODEL: ", error)
        console.error("ERROR LOADING MODEL: ", error);
      });
  }, [setModel]);

  function createImage(url){
    return new Promise((resolve, reject) => {
      const im = new Image()
          im.crossOrigin = 'anonymous'
          im.src = url
          im.onload = () => {
            resolve(im)
          }
     })
  }
  async function predictImage(base64data) {
    console.log("MAKING IMAGE")
    const image = await createImage(base64data)
    console.log("MADE IMAGE")
    let tensor = await tf.browser.fromPixels(image).resizeBilinear([224, 224]).div(225)
    tensor = tf.expandDims(tensor, 0);
    console.log("TENSOR:");
    console.log(await tensor.data());
    let output = model.predict(tensor);

    let outputdata = await output.data();
    let labels = [
      "shirt",
      "shoes",
      "pants",
      "shirt",
      "pants",
      "pants",
      "shirt",
      "pants",
      "shirt",
      "shirt",
      "shoes",
      "pants",
      "shirt",
      "shirt",
      "shirt",
      "shirt",
    ];
    let i = outputdata.indexOf(Math.max(...outputdata));
    console.log(outputdata);
    alert(labels[i] + i);
    handleClothingTypeChange(labels[i])

  }

  async function handleTakePhoto(dataUri) {
    setSource(dataUri);
    predictImage(dataUri);
  }

  function retakePhoto() {
    setSource(null);
  }

  function handleClothingTypeChange(value) {
    setClothingType(value);
  }

  async function postImageData() {
    let addedDocument = await db
      .collection(clothingType)
      .add({ photo: source });
    console.log(addedDocument.id);
    setSource("");
  }
  return (
    <div id="cameraDiv">
      {!source && (
        <Camera
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isFullscreen={true}
          style={{ visibility: source ? "hidden" : "visible" }}
        />
      )}
      <img
        src={source}
        id={"takenImage"}
        alt=""
        style={{
          width: "100%",
          height: "90%",
          visibility: source ? "visible" : "hidden",
        }}
      />
      {/* {source && (
        <select
          onChange={handleClothingTypeChange}
          name="clothingType"
          id="clothingType"
        >
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="shoes">Shoes</option>
        </select>
      )} */}
      {source && <button onClick={postImageData}>upload photo</button>}
      {source && <button onClick={retakePhoto}>retake photo</button>}
      <div style={{height: "100px"}}></div>
    </div>
  );
}
