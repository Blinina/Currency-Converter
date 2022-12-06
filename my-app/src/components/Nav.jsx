import { React } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">
              Калькулятор
            </Link>
          </li>
          <li>
            <Link to="/ruble">
              Курс рубля
            </Link>
          </li>
        </ul>
      </nav>

    );
}