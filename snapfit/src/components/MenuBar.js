import "./MenuBar.css";
import { Outlet, Link } from "react-router-dom";

export function MenuBar(){
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
    )
}