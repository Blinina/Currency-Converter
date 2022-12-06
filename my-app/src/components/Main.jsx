import React from "react";
import MainForm from "./MainForm";
import img1 from "../assets/images/img-1.jpg";
import img2 from "../assets/images/img-2.jpg";
import img3 from "../assets/images/img-3.jpg";
import img4 from "../assets/images/img-4.jpg";

export default function Main() {

    return (
        <div>
            <h1 className="title">Валютный калькулятор</h1>
            <div className="container">
                <MainForm />
                <div className=" item img-ul-main">
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
                            <div className="img-con">
                                <img className="img1" src={img1} alt="img1" />
                                <img className="img2" src={img2} alt="img2" />
                            </div>
                            <div className="img-con">
                                <img className="img3" src={img3} alt="img3" />
                                <img className="img4" src={img4} alt="img4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-footer">
                <div className="footer-text">
                    <h3>Нужна помощь?</h3>
                    <h3>Мы поможем! Просто свяжитесь с нами.</h3>
                    <p>Наши специалисты с радостью ответят на все ваши вопросы и дадут профессиональную консультацию по товарам.</p>
                </div>
                <div className="contacts">
                    <p className="phone"> <a href="tel:+78008889028">8 (800) 888-90-28</a></p>
                    <p className="or">или</p>
                    <p className="email"><a href="mailto:info@example.ru">info@example.ru</a></p>
                </div>
            </div>
        </div>
    )

}