import React from "react";
import { Link} from 'react-router-dom';
import style from "../pages/style/navbar.module.css"

export default function Navbar()
{
    return (
        <div className={style.navbar}>
        <Link to="/data">
        Audio
        </Link>
        <Link to="/">
       Uplaod audio
        </Link>
         <div>
    
      </div>
      </div>
    )
}