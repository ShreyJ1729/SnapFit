import './Wardrobe.css';
import { useState, useEffect } from 'react';
import db from "../firebase";

export function Wardrobe() {
  let [image, setImage] = useState();

  useEffect(() => {
    db.collection("shirts").onSnapshot((snapshot) => {
        for(let i = 0; i < snapshot.docs.length; i++){
          console.log(snapshot.docs[i].data());
          if(snapshot.docs[i].data().photo){
            let a = snapshot.docs[i].data().photo;
            setImage(a);
          }
        }
      });
  }, []);

  return (
    <div className="scrollmenu">
      <p>Test</p> 
      {image && <img src={image} style={{width: "100%", height: "auto"}}/>}
    </div>
  );
}

export default Wardrobe;
