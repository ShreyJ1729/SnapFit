import './Wardrobe.css';
import {useState, useEffect} from 'react';
import db from "../firebase";
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export function Wardrobe() {
  const [clothingType, setClothingType] = useState("shirts");
  const [images, setImages] = useState();

  useEffect(() => {
    let testImages = [];
    console.log(clothingType);
    db.collection(clothingType).onSnapshot((snapshot) => {
      for(let i = 0; i < snapshot.docs.length; i++){
        if(snapshot.docs[i].data().photo){
          let a = snapshot.docs[i].data().photo;
          testImages.push(a);
        }
      }
      setImages(testImages);
    });
  }, [clothingType]);

  const handleClick = (value) => {
    setClothingType(value);
  };


  return (
    <div>
    <Stack id="selectorContainer" direction="row" spacing={1}>
      <Chip label="Shirts" variant="outlined" value="shirts" onClick={() => handleClick("shirts")} />
      <Chip label="Pants/Shorts" variant="outlined" value="pants" onClick={() => handleClick("pants")} />
      <Chip label="Shoes" variant="outlined"value="shoes" onClick={() => handleClick("shoes")} />
    </Stack>
    <br/>
    <br/>
      {images && images.map((image,index) => <img src={image} alt={clothingType} key={index}/>)}
    </div>
  );
}

