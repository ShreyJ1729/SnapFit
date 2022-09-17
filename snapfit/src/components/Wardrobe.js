import './Wardrobe.css';
import {useState, useEffect} from 'react';
import db from "../firebase";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export function Wardrobe() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Shirts" />
        <Tab label="Pants/Shorts" />
        <Tab label="Shoes" />
      </Tabs>
    </Box>
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

