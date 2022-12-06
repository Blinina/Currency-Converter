import { React, useRef, useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from './sliceCurrencies'
import infoRed from "../assets/images/info-red.png";
import Form from 'react-bootstrap/Form';

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
    const valueArr = currencies.flatMap(([, b]) => [b.CharCode, b.Name]);

    valueArr.push("Российский рубль", "RUB");
    const LowerValidArr = valueArr.map((el) => el.toLowerCase());
    const UpperValidArr = valueArr.map((el) => el.toUpperCase());
    const validArr = [...LowerValidArr, ...UpperValidArr, valueArr];

    const formik = useFormik({
        initialValues: { currencyFrom: '', currencyTo: '', amount: 0 },
        validationSchema: yup.object({
            currencyFrom: yup.string()
                .required('Поле должно быть заполнено')
                .oneOf(validArr, 'Такого значения валюты нет'),
            currencyTo: yup.string()
                .required('Поле должно быть заполнено')
                .oneOf(validArr, 'Такого значения валюты нет'),
            amount: yup.number()
                .required('Поле должно быть заполнено')
                .positive('Не может быть отрицательным')
                .integer(),
        }),
        onSubmit: (values) => {
            const { currencyFrom, currencyTo, amount } = values;
            const from = findCurrency(currencyFrom);
            const to = findCurrency(currencyTo);
            let res = (amount * from.Value / from.Nominal) / (to.Value / to.Nominal);
            if (res < 0.1) {
                res = res.toFixed(4);
            } else {
                res = res.toFixed(2);
            }
            setResult(res);
        },

    });
    return (<div className="item">
        <form onSubmit={formik.handleSubmit} className="form">
            <label htmlFor="currencyFrom">
                Валюта 1
                <Form.Control type="text"
                    name="currencyFrom"
                    id="currencyFrom"
                    placeholder="Введите название или код"
                    ref={fromEl}
                    value={formik.currencyFrom}
                    onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    isInvalid={formik.errors.currencyFrom}
                    className={formik.errors.currencyFrom && 'invalid'}
                />
                {formik.errors.currencyFrom && <p className="danger">{formik.errors.currencyFrom}</p>}
            </label>
            <label>
                Валюта 2
                <Form.Control type="text"
                    name="currencyTo"
                    id="currencyTo"
                    placeholder="Введите название или код"
                    value={formik.currencyTo}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.currencyTo}
                    className={formik.errors.currencyTo && 'invalid'}
                />
                {formik.errors.currencyTo && <p className="danger">{formik.errors.currencyTo}</p>}

            </label>
            <label>
                Количество
                <Form.Control
                    type="number"
                    placeholder="Введите число"
                    name="amount"
                    value={formik.amount}
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.amount}
                    className={formik.errors.amount && 'invalid'}
                />
                <p className="danger">{formik.errors.amount}</p>

            </label>
            <button className="hidden" onClick={formik.handleSubmit} type="submit">kkkk</button>
        </form>
        <div className="result">
            <img src={infoRed} alt="info" className="info-red" />
            <p>Итого:  {result === 0 ? '...' : result}</p>
        </div>
    </div>
    )
}