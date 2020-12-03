import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <nav className="header">
            <div className="title">
<<<<<<< HEAD
                <span className="home-link no-select">CONJUGACIONES</span>
                {/* <Link to="/" className="home-link">CONJUGACIONES</Link> */}
=======
                <Link to="/" className="home-link">CONJUGACIONES</Link>
>>>>>>> 6b25ea3... Styling in progress - pushing for end of day
            </div>
            <ul className="nav-menu">
                <li className="nav-item">
                    <Link to="/contact" className="link">Contact</Link>
                </li>                                
            </ul>
        </nav>
    )
}
