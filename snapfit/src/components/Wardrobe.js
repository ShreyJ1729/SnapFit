import './Wardrobe.css';
import { useState, useEffect } from 'react';
import db from "../firebase";

export function Wardrobe() {
  let [images, setImage] = useState();

  useEffect(() => {
    let images = [];
    db.collection("shirts").onSnapshot((snapshot) => {
        for(let i = 0; i < snapshot.docs.length; i++){
          if(snapshot.docs[i].data().photo){
            let a = snapshot.docs[i].data().photo;
            images.push(a);
          }
        }
        setImage(images);
      });

      console.log(images);
      
  }, []);

  return (
    <div>
      {images && images.map(image => <img src={image} style={{width: "100%", height: "auto"}}/>)}
      <div className="scrollmenu">
        <Shirt/><Shirt/><Shirt/><Shirt/><Shirt/><Shirt/><Shirt/><Shirt/>
      </div>
      <div className="scrollmenu">
        <Pant/><Pant/><Pant/><Pant/><Pant/><Pant/><Pant/><Pant/>
      </div>
      <div className="scrollmenu">
        <Shoe/><Shoe/><Shoe/><Shoe/><Shoe/><Shoe/><Shoe/><Shoe/><Shoe/>
      </div>
    </div>
  );
}

function Shirt() {
  db.collection("shirts").onSnapshot((snapshot) => {
    snapshot.docs.map((doc) => {
      let base64Image = doc.data().photo;
      console.log(base64Image)
      return (
        <div>
          <img src={base64Image}></img>
        </div>
      );
    });
  });
}

function Pant() {
  return (
    <div class="thisshouldbeaphoto">
      <p>this is a pant</p>
    </div>
  );
}

function Shoe() {
  return (
    <div class="thisshouldbeaphoto">
      <p>shoo</p>
    </div>
  );
}

export default Wardrobe;
