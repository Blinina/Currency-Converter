import {React, useRef, useEffect, useState, useCallback} from "react";
import MainForm from "./MainForm";


export default function Main() {
    
    return (
        <div>
            <h2>Валютный калькулятор</h2>
            <div className="container">
                <MainForm />
                <div>поле с картинкам</div>
            </div>
            <div>футер</div>
        </div>
    )

}