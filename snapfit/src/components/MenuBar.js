import "./MenuBar.css";
import { Outlet, Link } from "react-router-dom";
import db from "../firebase";
import { useEffect } from "react";

export function MenuBar() {
  useEffect(() => {
    db.collection("test").onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          console.log(doc.data());
        });
      });
      db.collection("test").add(
        {hi: "everyone"}
      );
  }, []);

  return (
    <div id="container">
      <Link to="/wardrobe">
        <button>My Wardrobe</button>
      </Link>
      <Link to="/camera">
        <button>Camera</button>
      </Link>
      <Link to="/fits">
        <button>My Fits</button>
      </Link>
    </div>
  );
}
