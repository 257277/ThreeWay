import React from "react";
import {Routes,Route} from "react-router-dom"
import Data from "../pages/data";
import Upload from "../pages/upload";

export default function AllRoute()
{
    return (
        <div>
        <Routes>
        <Route path="/" element={<Upload/>}></Route>
        <Route path="/data" element={<Data/>}></Route>
        </Routes>
        </div>
    )
}