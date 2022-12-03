import {React, useRef, useEffect, useState, useCallback} from "react";
import MainForm from "./MainForm";
import img1 from "../assets/images/img-1.jpg";
import img2 from "../assets/images/img-2.jpg";
import img3 from "../assets/images/img-3.jpg";
import img4 from "../assets/images/img-4.jpg";



export default function Main() {
    
    return (
        <div>
            <h1>Валютный калькулятор</h1>
            <div className="container">
                <MainForm />
                <div className="img-ul-main">
                    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor:</h2>
                    <div className="img-ul">
                    <ul>
                        <li>Incididunt ut labore et dolore magna aliqua</li>
                        <li>Incididunt ut labore et</li>
                        <li>Incididunt ut labore et dolore</li>
                        <li>Labore et dolore</li>
                        <li>Incididunt ut</li>
                        <li>Incididunt ut labore et dolore</li>
                        <li>Incididunt ut labore</li>
                    </ul>
                    <div className="images">
                        <div>
                        <img className="img1" src={img1} alt="img1"/>
                        <img className="img2" src={img2} alt="img2"/>
                        </div>
                        <div>
                        <img className="img3" src={img3} alt="img3"/>
                        <img className="img4" src={img4} alt="img4"/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div>футер</div>
        </div>
    )

}