import './Wardrobe.css';
import {useState, useEffect} from 'react';
import db from "../firebase";

export function Wardrobe() {
  const [clothingType, setClothingType] = useState("shirts");
  const [images, setImages] = useState();

  useEffect(() => {
    let testImages = [];
    console.log(clothingType);
    db.collection("shirts").onSnapshot((snapshot) => {
        for(let i = 0; i < snapshot.docs.length; i++){
          if(snapshot.docs[i].data().photo){
            let a = snapshot.docs[i].data().photo;
            testImages.push(a);
          }
        }
        setImages(testImages);
      });
  }, []);

  return (
    <div>
      {images && images.map((image,index) => <img src={image} alt={clothingType} key={index}/>)}
    </div>
  );
}

