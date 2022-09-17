import "./MenuBar.css";
import { Outlet, Link } from "react-router-dom";

export function MenuBar(){
    return (
        <div id="container">
            <Link to="/wardrobe">
                <button>My Wardrobe</button>
            </Link>
            <button>Camera</button>
            <button>My Fits</button>
        </div>
    )
}