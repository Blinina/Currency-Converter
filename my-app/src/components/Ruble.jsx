import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from './sliceCurrencies';
import red from '../assets/images/red.png';
import blue from '../assets/images/blue.png';
import info from '../assets/images/info.png';

export default function Ruble() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const data = useSelector((state) => state.currencies.currencies);
  const currencies = Object.entries(data).slice(0, 3);
  const images = [red, blue, red];

    return (
      <div className="rubles">
        <h2 className="title">Курс рубля</h2>
        <div className="cards">
          {currencies.map(([, b], index) => (
            <div key={b.ID} className="card">
              <img src={images[index]} alt={`${images[index]} картинка`} />
              <p className="char">{b.CharCode}</p>
              <div className="card-body">
                <p className="name">{b.Name}</p>
                <ul>
                  <li className="nominal">
                    Номинал:
                    {b.Nominal}
                  </li>
                  <li className="value">
                    Курс:
                    {b.Value}
                  </li>
                </ul>
              </div>
            </div>
))}
        </div>
        <div className="footer">
          <img src={info} alt="инфо-лого" className="info" />
          <div className="text">
            <p>
              Телефон: 
              {' '}
              <a href="tel:+78008889028">8 (800) 888-90-28</a>
              ,
              email:
              {' '}
              <a href="mailto:info@example.ru">info@example.ru</a>
            </p>
          </div>
        </div>
      </div>
    );
}