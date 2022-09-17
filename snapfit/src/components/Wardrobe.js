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
  }, []);

  return (
    <div>
      <div className="scrollmenu">
        {images && images.map(image => <img src={image} style={{width: "100%", height: "auto"}}/>)}
      </div>
      <div className="scrollmenu">
        
      </div>
      <div className="scrollmenu">
        
      </div>
    </div>
  );
}

export default Wardrobe;
