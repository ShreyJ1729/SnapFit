import './Wardrobe.css';
import {useState, useEffect} from 'react';
import db from "../firebase";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export function Wardrobe() {
  const [clothingType, setClothingType] = useState("shirts");
  const [images, setImages] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState();

  useEffect(() => {
    let testImages = [];
    db.collection(clothingType).onSnapshot((snapshot) => {
      for(let i = 0; i < snapshot.docs.length; i++){
        if(snapshot.docs[i].data().photo){
          testImages.push({
            id: snapshot.docs[i].id,
            photo: snapshot.docs[i].data().photo
          });
        }
      }
      setImages(testImages);
    });
  }, [clothingType, selectedImageIndex]);

  const handleChange = (event, value) => {
    setSelectedImageIndex(null);
    setClothingType(value);
  };

  function renderImageDetails(imageId){
    setSelectedImageIndex(imageId);
  }

  async function deleteImage(){
    setSelectedImageIndex(null);
    //remove from the database
    await db.collection(clothingType).doc(images[selectedImageIndex].id).delete();
  }
  return (
    <div>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
        <Tabs
          id="selectorContainer"
          value={clothingType}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="false"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Shirts" value="shirts"/>
          <Tab label="Pants/Shorts" value="pants"/>
          <Tab label="Shoes" value="shoes"/>
        </Tabs>
      </Box>
      <br/>
      <br/>
      {selectedImageIndex != null && (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
          <img id="editWardrobe" src={images[selectedImageIndex].photo}/>
          <Stack spacing={2} direction="row">
          <Button onClick={deleteImage} variant="contained">Delete Image</Button>
          <Button variant = "contained" onClick={() => {setSelectedImageIndex(null);}}>Return</Button>
          </Stack>
        </div>
      )}
      {selectedImageIndex == null && 
        <div>
          {images && images.map((image,index) => {return (
            <div className="imgContainer" style={{position: "relative"}}>
              <img src={image.photo} alt={clothingType} key={index} onClick={() => renderImageDetails(index)}/>
            </div>
          );
          })}
        </div>
      }
    </div>
  );
}

