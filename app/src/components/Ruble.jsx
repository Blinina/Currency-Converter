import {React,  useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import {getData} from './sliceCurrencies'


export default function Ruble(){
const dispatch = useDispatch();

useEffect(()=>{
dispatch(getData())
}, [dispatch])

const data = useSelector((state)=>state.currencies.currencies);
const currencies = Object.entries(data).slice(0, 3);
console.log(currencies)


    return(
        <div>
            <h2>Курс рубля</h2>
            <div className="cards">
                {currencies.map(([,b])=><div key={b.ID} className="card">
                    <p className="char">{b.CharCode}</p>
                    <p className="name">{b.Name}</p>
                    <p className="nominal">Номинал: {b.Nominal}</p>
                    <p className="value">Курс: {b.Value}</p>
                    </div>
                    )}
            </div>
            <div>
                <div><p>Телефон: <a href="tel:+78008889028">8 (800) 888-90-28</a></p><p>email: <a href="mailto:info@example.ru">info@example.ru</a></p></div>
            </div>
        </div>
    )
}