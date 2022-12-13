import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { getData } from './sliceCurrencies';
import infoRed from '../assets/images/info-red.png';
import { useForm } from "react-hook-form";


export default function MainForm() {
  const dispatch = useDispatch();
  const [result, setResult] = useState(0);
  const { register, handleSubmit, setFocus, formState: { errors } } = useForm();

  const data = useSelector((state) => state.currencies.currencies);
  const currencies = Object.entries(data);
  const objRUB = {
    ID: 'хз',
    NumCode: '643',
    CharCode: 'RUB',
    Nominal: 1,
    Name: 'Российский рубль',
    Value: 1,
    Previous: 1
  };
  const objCurr = [objRUB, ...currencies.map(([, b]) => b)];
  const findCurrency = (cur) => objCurr.find((el) => (el.Name.toLowerCase() === cur.toLowerCase().trim()) || (el.CharCode.toLowerCase() === cur.toLowerCase().trim()));

  const valueArr = currencies.flatMap(([, b]) => [b.CharCode, b.Name]);
  valueArr.push('Российский рубль', 'RUB');
  const LowerValidArr = valueArr.map((el) => el.toLowerCase());
  const UpperValidArr = valueArr.map((el) => el.toUpperCase());
  const validArr = [...LowerValidArr, ...UpperValidArr, valueArr];

  const onSubmit = data => {
    const { currencyFrom, currencyTo, amount } = data;
    const from = findCurrency(currencyFrom);
    const to = findCurrency(currencyTo);
    let res = ((amount * from.Value) / from.Nominal) / (to.Value / to.Nominal);
    if (res < 0.1) {
      res = res.toFixed(4);
    } else {
      res = res.toFixed(2);
    }
    setResult(res);
  };
  useEffect(() => {
    dispatch(getData());
    setFocus('currencyFrom')
  }, [setFocus]);

  return (
    <div className="item">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="currencyFrom">
          Валюта 1
          <Form.Control
            type="text"
            name="currencyFrom"
            id="currencyFrom"
            placeholder="Введите название или код"
            isInvalid={errors.currencyFrom}
            className={errors.currencyFrom && 'invalid'}
            {...register("currencyFrom", {
              required: {
                value: true,
                message: 'Поле должно быть заполнено'
              },
              validate: {
                value: v => validArr.includes(v) || 'Такого значения валюты нет',
              }
            })}
          />
          {errors.currencyFrom && <span className="danger">{errors.currencyFrom.message}</span>}
        </label>
        <label htmlFor="currencyTo">
          Валюта 2
          <Form.Control
            type="text"
            name="currencyTo"
            id="currencyTo"
            placeholder="Введите название или код"
            isInvalid={errors.currencyTo}
            className={errors.currencyTo && 'invalid'}
            {...register("currencyTo", {
              required: {
                value: true,
                message: 'Поле должно быть заполнено'
              },
              validate: {
                value: v => validArr.includes(v) || 'Такого значения валюты нет',
              }
            })}
          />
          {errors.currencyTo && <span className="danger">{errors.currencyTo.message}</span>}
        </label>
        <label htmlFor="currencyTo">
          Количество
          <Form.Control
            type="number"
            placeholder="Введите число"
            name="amount"
            isInvalid={errors.amount}
            className={errors.amount && 'invalid'}
            {...register("amount", {
              required: {
                value: true,
                message: 'Поле должно быть заполнено'
              },
              min: { value: 0, message: 'Не может быть отрицательным' }
            })}
          />
          {errors.amount && <span className="danger">{errors.amount.message}</span>}
        </label>
        <button className="hidden" onClick={handleSubmit(onSubmit)} type="submit">k</button>
      </form>
      <div className="result">
        <img src={infoRed} alt="info" className="info-red" />
        <p>
          Итого:
          {result === 0 ? '...' : result}
        </p>
      </div>
    </div>
  );
}