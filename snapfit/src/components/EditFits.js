import { useState, useEffect } from 'react';
import db from "../firebase";

export function EditFits() {
  let [shirtimages, setShirtImage] = useState();
  let [pantimages, setPantImage] = useState();
  let [shoeimages, setShoeImage] = useState();

  useEffect(() => {
    let shirtimages = [];
    db.collection("shirts").onSnapshot((snapshot) => {
        for(let i = 0; i < snapshot.docs.length; i++){
          if(snapshot.docs[i].data().photo){
            let a = snapshot.docs[i].data().photo;
            shirtimages.push(a);
          }
        }
        setShirtImage(shirtimages);
      });
      let pantimages = [];
      db.collection("pants").onSnapshot((snapshot) => {
        for(let i = 0; i < snapshot.docs.length; i++){
          if(snapshot.docs[i].data().photo){
            let a = snapshot.docs[i].data().photo;
            pantimages.push(a);
          }
        }
        setPantImage(pantimages);
      });
      let shoeimages = [];
      db.collection("shoes").onSnapshot((snapshot) => {
        for(let i = 0; i < snapshot.docs.length; i++){
          if(snapshot.docs[i].data().photo){
            let a = snapshot.docs[i].data().photo;
            shoeimages.push(a);
          }
        }
        setShoeImage(shoeimages);
      });
  }, []);

  return (
    <div className="maincontainer">
      <div className="scrollmenu">
        <div/>
        {shirtimages && shirtimages.map((image, index) => <img src={image} alt={"shirt"} key={index}/>)}
        <div/>
      </div>
      <div className="scrollmenu">
        <div/>
        {pantimages && pantimages.map((image, index) => <img src={image} alt={"pant"} key={index}/>)}
        <div/>
      </div>
      <div className="scrollmenu">
        <div/>
        {shoeimages && shoeimages.map((image, index) => <img src={image} alt={"shoe"} key={index}/>)}
        <div/>
      </div>
      <div style={{height:"50px"}}/>
    </div>
  );
}

export default EditFits;
