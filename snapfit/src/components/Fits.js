import EditFits from "./EditFits";
import {useState, useEffect} from 'react';
import db from "../firebase";
import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export function Fits(){
    const [fits, setFits] = useState();
    const [currentFit, setCurrentFit] = useState(0);

    const [addingFit, setAddingFit] = useState(false);
    const [editingFit, setEditingFit] = useState(false);

    useEffect(() => {
        //get fits
        let tempFits = [];
        db.collection("fits").onSnapshot(async (snapshot) => {
            for(let i = 0; i < snapshot.docs.length; i++){
                let shirtDoc = await db.collection('shirts').doc(snapshot.docs[i].data().shirt).get();
                let pantsDoc = await db.collection('pants').doc(snapshot.docs[i].data().pants).get();
                let shoesDoc = await db.collection('shoes').doc(snapshot.docs[i].data().shoes).get();
                
                let pantsPhoto;
                let shoesPhoto;
                let shirtPhoto;

                try{
                     pantsPhoto = pantsDoc.data().photo;
                }
                catch(error){
                    pantsPhoto = "./noPhotoFound.png";
                }

                try{
                     shoesPhoto = shoesDoc.data().photo;
                }
                catch(error){
                    shoesPhoto = "./noPhotoFound.png";
                }

                try{
                     shirtPhoto = shirtDoc.data().photo;
                }
                catch(error){
                    shirtPhoto = "./noPhotoFound.png";
                }
                
                
                tempFits.push({
                    shirt: shirtPhoto,
                    shirtId:snapshot.docs[i].data().shirt,
                    pants: pantsPhoto,
                    pantsId: snapshot.docs[i].data().pants,
                    shoes: shoesPhoto,
                    shoesId: snapshot.docs[i].data().shoes,
                    fitId: snapshot.docs[i].id
                });
            }
            setFits(tempFits);
        });
    },[addingFit, editingFit]);

    return (
        <div>
            {(!(addingFit || editingFit) && ((fits != null) && fits.length > 0)) && 
            <div style={{display: "flex", alignItems: "center"}}>
                <Fab color="primary" style={{width: "100px", height: "50px", marginLeft: "10px"}} onClick={()=>{setCurrentFit(currentFit - 1 < 0 ? currentFit : currentFit-1)}}><ArrowBackIosIcon /></Fab>
                <div style={{display: "flex", justifyContent: "center"}} onClick={() => {console.log("i was clicked"); setEditingFit(true); setAddingFit(true);}}>   
                    <div style={{width: "100%"}}>
                        <div><img id="fitPhoto" src={fits[currentFit].shirt}/></div>
                        <div><img id="fitPhoto" src={fits[currentFit].pants}/></div>
                        <div><img id="fitPhoto" src={fits[currentFit].shoes}/></div>
                    </div>
                </div>  
                <Fab color = "primary" style={{width: "100px", height: "50px", marginRight: "10px"}} onClick={()=>{setCurrentFit(currentFit + 1 >= fits.length ? currentFit : currentFit+1)}}><ArrowForwardIosIcon /></Fab>
            </div>
            }
            {(addingFit || editingFit ) && <EditFits setFitStatus={setAddingFit} setFitStatus2={setEditingFit} currentShirt={editingFit && fits != null && fits.length > 0 ? fits[currentFit].shirtId : null} currentPants={editingFit && fits != null && fits.length > 0 ? fits[currentFit].pantsId : null} currentShoes={editingFit && fits != null && fits.length > 0 ? fits[currentFit].shoesId : null} fitId={ editingFit && fits != null && fits.length > 0 ? fits[currentFit].fitId: null}/>}
            {!(addingFit || editingFit ) && <Fab color="primary" onClick={() => setAddingFit(true)}><AddIcon /></Fab>}
            <div style={{height: "200px"}}></div>
        </div>
        
    );
}