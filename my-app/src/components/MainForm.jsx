import { React, useRef, useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from './sliceCurrencies'

export default function MainForm() {
    const dispatch = useDispatch();
    const fromEl = useRef();
    const [result, setResult] = useState(0);

    useEffect(() => {
        fromEl.current.focus();
        dispatch(getData())
    }, [])
    const data = useSelector((state) => state.currencies.currencies);
    const currencies = Object.entries(data);
    const valueArr = currencies.flatMap(([, b]) => [b.CharCode, b.Name]);
    const objRUB = {
        "ID": "хзвообще",
        "NumCode": "643",
        "CharCode": "RUB",
        "Nominal": 1,
        "Name": "Российский рубль",
        "Value": 1,
        "Previous": 1
};
    const objCurr = [objRUB, ...currencies.map(([, b]) => b)];
    const findCurrency = (cur) => {
       return objCurr.find((el) => 
            (el.Name.toLowerCase() === cur.toLowerCase().trim()) || (el.CharCode.toLowerCase() === cur.toLowerCase().trim())
        );
        
    }


    const formik = useFormik({
        initialValues: { currencyFrom: 'lol', currencyTo: '', amount: 0 },
        validationSchema: yup.object().shape({
            currencyFrom: yup.string().required(),
            currencyTo: yup.string().required(),
            amount: yup.number().required(),
        }),
        onSubmit: (values) => {
            const { currencyFrom, currencyTo, amount } = values;
            const from = findCurrency(currencyFrom);
            const to = findCurrency(currencyTo);
        
            let res = (amount*from.Value/from.Nominal) / (to.Value/to.Nominal);
            if(res < 0.1) {
                res = res.toFixed(4);
            }else{
                res = res.toFixed(2);
            }
            console.log('поменялось')

            setResult(res);
        },
    });
    return (<div>
        <form onSubmit={formik.handleSubmit} className="form">
            <label>
                Валюта 1
                <input type="text"
                    name="currencyFrom"
                    id="currencyFrom"
                    placeholder="Введите название или код"
                    ref={fromEl}
                    value={formik.currencyFrom}
                    onChange={formik.handleChange}
                />
            </label>
            <label>
                Валюта 2
                <input type="text"
                    name="currencyTo"
                    id="currencyTo"
                    placeholder="Введите название или код"
                    value={formik.currencyTo}
                    onChange={formik.handleChange}
                />
            </label>
            <label>
                Количество
                <input
                    type="number"
                    placeholder="Введите число"
                    name="amount"
                    value={formik.amount}
                    onChange={formik.handleChange}
                />
            </label>
            <button  className="hidden" onClick={formik.handleSubmit} type="submit">kkkk</button>
        </form>
        <div><p>Итого:  {result === 0 ? '...' : result}</p></div>
    </div>
    )
}