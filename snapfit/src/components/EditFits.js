import './EditFits.css';
import { useState, useEffect } from 'react';
import db from "../firebase";
import { border } from '@mui/system';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function EditFits(props) {
  let [shirtimages, setShirtImage] = useState();
  let [pantimages, setPantImage] = useState();
  let [shoeimages, setShoeImage] = useState();

  let [selectedShirt, setSelectedShirt] = useState(props.currentShirt);
  let [selectedPants, setSelectedPants] = useState(props.currentPants);
  let [selectedShoes, setSelectedShoes] = useState(props.currentShoes);

  useEffect(() => {
    let shirtimages = [];
    db.collection("shirts").onSnapshot((snapshot) => {
        for(let i = 0; i < snapshot.docs.length; i++){
          if(snapshot.docs[i].data().photo){
            shirtimages.push({
              id: snapshot.docs[i].id,
              photo: snapshot.docs[i].data().photo
            });
          }
        }
        setShirtImage(shirtimages);
      });
      let pantimages = [];
      db.collection("pants").onSnapshot((snapshot) => {
        for(let i = 0; i < snapshot.docs.length; i++){
          if(snapshot.docs[i].data().photo){
            pantimages.push({
              id: snapshot.docs[i].id,
              photo: snapshot.docs[i].data().photo
            });
          }
        }
        setPantImage(pantimages);
      });
      let shoeimages = [];
      db.collection("shoes").onSnapshot((snapshot) => {
        for(let i = 0; i < snapshot.docs.length; i++){
          if(snapshot.docs[i].data().photo){
            shoeimages.push({
              id: snapshot.docs[i].id,
              photo: snapshot.docs[i].data().photo
            });
          }
        }
        setShoeImage(shoeimages);
      });
  }, []);

  async function deleteFit(){
    if(props.fitId != null){
      await db.collection('fits').doc(props.fitId).delete();
    }
    props.setFitStatus(false);
    props.setFitStatus2(false);
  }

  async function confirmNewFit(){
    //delete old fit from database
    if(props.fitId != null){
      await db.collection('fits').doc(props.fitId).delete();
    }
    //add new fit into database
    await db.collection('fits').add({ shirt: selectedShirt, pants: selectedPants, shoes: selectedShoes});
    props.setFitStatus(false);
    props.setFitStatus2(false);
  }

  function goBack(){
    props.setFitStatus(false);
    props.setFitStatus2(false);
  }

  return (
    <div className="maincontainer">
      <div className="scrollmenu">
        <div/>
        {shirtimages && shirtimages.map((image, index) => <img src={image.photo} alt={"shirt"} key={index} onClick={() => setSelectedShirt(image.id)} style={image.id == selectedShirt ? {borderColor: "black", borderSize: "2px", borderStyle: "solid"}: {}}/>)}
        <div/>
      </div>
      <div className="scrollmenu">
        <div/>
        {pantimages && pantimages.map((image, index) => <img src={image.photo} alt={"pant"} key={index} onClick={() => setSelectedPants(image.id)} style={image.id == selectedPants ? {borderColor: "black", borderSize: "2px", borderStyle: "solid"}: {}}/>)}
        <div/>
      </div>
      <div className="scrollmenu">
        <div/>
        {shoeimages && shoeimages.map((image, index) => <img src={image.photo} alt={"shoe"} key={index} onClick={() => setSelectedShoes(image.id)} style={image.id == selectedShoes ? {borderColor: "black", borderSize: "2px", borderStyle: "solid"}: {}}/>)}
        <div/>
      </div>
      <Stack textAlign="center" spacing={2} direction="row">
        <Button onClick={goBack} variant="contained">Go Back</Button>
        <Button onClick={confirmNewFit} variant="contained">Confirm Fit</Button>
        <Button onClick={deleteFit} variant="contained">Delete Fit</Button>
      </Stack>
      <div style={{height:"50px"}}/>
    </div>
  );
}

export default EditFits;
