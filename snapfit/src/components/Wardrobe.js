import './Wardrobe.css';
import {useState, useEffect} from 'react';
import db from "../firebase";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


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

  const handleChange = (event, value) => {
    console.log(value);
    setClothingType(value);
  };


  return (
    <div>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
        <Tabs
          id="selectorContainer"
          value={clothingType}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Shirts" value="shirts"/>
          <Tab label="Pants/Shorts" value="pants"/>
          <Tab label="Shoes" value="shoes"/>
        </Tabs>
      </Box>
      <br/>
      <br/>
      {images && images.map((image,index) => <img src={image} alt={clothingType} key={index}/>)}
    </div>
  );
}

